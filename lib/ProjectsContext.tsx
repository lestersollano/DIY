import type { Project } from "@/interfaces/interfaces"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Directory, File, Paths } from "expo-file-system"
import { createContext, useContext, useEffect, useState } from "react"

const PROJECTS_KEY = "@my_projects_list"

type ProjectsContextType = {
	projects: Project[]
	loading: boolean
	addProject: (p: Project, tempImageUri?: string) => Promise<Project>
	// Change: updatedProject is now Partial and we explicitly require the id
	updateProject: (
		id: string,
		updates: Partial<Project>,
		tempImageUri?: string,
	) => Promise<void>
	deleteProject: (id: string) => Promise<void>
}

const ProjectsContext = createContext<ProjectsContextType | null>(null)

export function ProjectsProvider({ children }: { children: React.ReactNode }) {
	const [projects, setProjects] = useState<Project[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		loadProjects()
	}, [])

	const loadProjects = async () => {
		try {
			const saved = await AsyncStorage.getItem(PROJECTS_KEY)
			if (saved) setProjects(JSON.parse(saved))
		} finally {
			setLoading(false)
		}
	}

	const addProject = async (newProject: Project, tempImageUri?: string) => {
		let permanentUri = newProject.imageUri

		if (tempImageUri) {
			const projectDir = new Directory(Paths.document, "projects")
			if (!projectDir.exists) projectDir.create()

			const fileName = `img_${Date.now()}.jpg`
			const destFile = new File(projectDir, fileName)
			await new File(tempImageUri).copy(destFile)

			permanentUri = destFile.uri
		}

		const projectToSave: Project = {
			...newProject,
			id: newProject.id || Date.now().toString(),
			imageUri: permanentUri,
			createdAt: Date.now(),
		}

		setProjects((prev) => {
			const updated = [projectToSave, ...prev]
			AsyncStorage.setItem(PROJECTS_KEY, JSON.stringify(updated))
			return updated
		})

		return projectToSave
	}

	const updateProject = async (
		id: string,
		updates: Partial<Project>,
		tempImageUri?: string,
	) => {
		let newImageUri = updates.imageUri

		// Handle new image file persistence if provided
		if (tempImageUri) {
			const dir = new Directory(Paths.document, "projects")
			if (!dir.exists) dir.create()

			const dest = new File(dir, `img_${Date.now()}.jpg`)
			await new File(tempImageUri).copy(dest)
			newImageUri = dest.uri
		}

		setProjects((prev) => {
			const updated = prev.map((p) => {
				if (p.id === id) {
					// Merge existing project with updates
					// If a new image was processed, use it; otherwise, check updates, otherwise keep old
					return {
						...p,
						...updates,
						imageUri: newImageUri ?? updates.imageUri ?? p.imageUri,
					}
				}
				return p
			})

			AsyncStorage.setItem(PROJECTS_KEY, JSON.stringify(updated))
			return updated
		})
	}

	const deleteProject = async (id: string) => {
		setProjects((prev) => {
			const project = prev.find((p) => p.id === id)

			// Delete image file if it exists
			if (project?.imageUri) {
				try {
					const file = new File(project.imageUri)
					if (file.exists) file.delete()
				} catch (e) {
					console.warn("Failed to delete image", e)
				}
			}

			const updated = prev.filter((p) => p.id !== id)
			AsyncStorage.setItem(PROJECTS_KEY, JSON.stringify(updated))
			return updated
		})
	}

	return (
		<ProjectsContext.Provider
			value={{
				projects,
				loading,
				addProject,
				updateProject,
				deleteProject,
			}}
		>
			{children}
		</ProjectsContext.Provider>
	)
}

export const useProjects = () => {
	const ctx = useContext(ProjectsContext)
	if (!ctx) throw new Error("useProjects must be used inside ProjectsProvider")
	return ctx
}
