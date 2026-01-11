import AsyncStorage from "@react-native-async-storage/async-storage"

export type Project = {
  id: string
  title: string
  author?: string
  shortDescription?: string
  favorite?: boolean
  [key: string]: any
}

const STORAGE_KEY = "@diy:projects"

function generateId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`
}

export async function getAllProjects(): Promise<Project[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as Project[]
  } catch {
    return []
  }
}

async function saveAllProjects(projects: Project[]) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
}

export async function addProject(payload: Omit<Project, "id">): Promise<Project> {
  const projects = await getAllProjects()
  const project: Project = { id: generateId(), ...payload }
  projects.unshift(project)
  await saveAllProjects(projects)
  return project
}

export async function removeProject(id: string): Promise<void> {
  const projects = (await getAllProjects()).filter(p => p.id !== id)
  await saveAllProjects(projects)
}

export async function updateProject(updated: Project): Promise<Project | null> {
  const projects = await getAllProjects()
  const idx = projects.findIndex(p => p.id === updated.id)
  if (idx === -1) return null
  projects[idx] = { ...projects[idx], ...updated }
  await saveAllProjects(projects)
  return projects[idx]
}

export async function getProject(id: string): Promise<Project | null> {
  const projects = await getAllProjects()
  return projects.find(p => p.id === id) ?? null
}

export async function clearAllProjects(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY)
}