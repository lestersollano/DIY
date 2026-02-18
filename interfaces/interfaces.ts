export interface Project {
	id?: string
	imageUri?: string
	title?: string
	description?: string
	materials?: string[]
	instructions?: string[]
	notes?: string
	mainMaterial?: string
	author?: string
	createdAt?: number
	lastOpenedAt?: number
	favorite?: boolean
	youtubeURL?: string
}

export interface Account {
	id: string
	name: string
	email: string
	avatarUri?: string
	createdAt: number
	password?: string
}
