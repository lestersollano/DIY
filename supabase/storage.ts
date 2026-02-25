import axios from "axios"

export async function uploadImage(url: string, imageUri: string) {
	const formData = new FormData()

	// Extract filename from URI
	const filename = imageUri.split("/").pop() || "photo.jpg"

	// Infer file type
	const match = /\.(\w+)$/.exec(filename)
	const type = match ? `image/${match[1]}` : `image`

	formData.append("file", {
		uri: imageUri,
		name: filename,
		type,
	} as any)

	try {
		const response = await axios.post(url, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		})

		return response.data
	} catch (error: any) {
		throw error.response?.data || error.message
	}
}
