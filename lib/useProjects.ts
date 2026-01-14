import type { Project } from "@/interfaces/interfaces"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Directory, File, Paths } from "expo-file-system"
import { useEffect, useState } from "react"

const PROJECTS_KEY = "@my_projects_list"

export const useProjects = () => {
	const [projects, setProjects] = useState<Project[]>([])
	const [loading, setLoading] = useState(true)

	// 1. Load all projects on mount
	useEffect(() => {
		const loadProjects = async () => {
			try {
				const savedData = await AsyncStorage.getItem(PROJECTS_KEY)
				if (savedData) {
					setProjects(JSON.parse(savedData))
				}
			} catch (e) {
				console.error("Failed to load projects", e)
			} finally {
				setLoading(false)
			}
		}
		loadProjects()
	}, [])

	// 2. The Save Function (Modern FileSystem + State Update)
	const addProject = async (newProject: Project, tempImageUri?: string) => {
		try {
			let permanentUri = newProject.imageUri

			// Handle Image Saving if a temp URI is provided
			if (tempImageUri) {
				const projectDir = new Directory(Paths.document, "projects")
				if (!projectDir.exists) projectDir.create()

				const fileName = `img_${Date.now()}.jpg`
				const destFile = new File(projectDir, fileName)

				const tempFile = new File(tempImageUri)
				await tempFile.copy(destFile)
				permanentUri = destFile.uri
			}

			const projectToSave: Project = {
				...newProject,
				id: newProject.id || Date.now().toString(),
				imageUri: permanentUri,
				createdAt: Date.now(),
			}

			// Update State and AsyncStorage
			const updatedList = [projectToSave, ...projects]
			setProjects(updatedList)
			await AsyncStorage.setItem(PROJECTS_KEY, JSON.stringify(updatedList))

			return projectToSave
		} catch (e) {
			console.error("Save failed", e)
			throw e
		}
	}

	return { projects, addProject, loading }
}
