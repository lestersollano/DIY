import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize the API client
// best practice: store your key in an environment variable
const genAI = new GoogleGenerativeAI(
	process.env.GEMINI_API_KEY || "AIzaSyCLHR0vbLKzusknR7GNUsNqnQ6rvhkdBn8",
)

/**
 * Generates text content from a text prompt and a Base64 encoded image.
 * * @param base64Image - The Base64 string of the image (can include 'data:image/...' prefix or just raw data).
 * @param prompt - The text message/question to ask the AI.
 * @param mimeType - The mime type of the image (default: "image/png").
 * @returns The AI's response text.
 */
export async function getGeminiVisionResponse(
	base64Image: string,
	prompt: string,
	gemini: "gemini-2.5-flash-lite" | "gemini-2.5-flash",
	mimeType: string = "image/png",
): Promise<string> {
	try {
		// 1. Select the model (gemini-1.5-flash is fast and supports multimodal input)
		const model = genAI.getGenerativeModel({ model: gemini })

		// 2. Clean the Base64 string if it contains the data URI prefix
		// The API expects just the raw base64 data, not the "data:image/png;base64," part.
		const cleanBase64 = base64Image.replace(/^data:image\/\w+;base64,/, "")

		// 3. Construct the request payload
		const result = await model.generateContent([
			prompt,
			{
				inlineData: {
					data: cleanBase64,
					mimeType: mimeType,
				},
			},
		])

		// 4. Extract and return the text response
		const response = await result.response
		return response.text()
	} catch (error) {
		console.error("Error generating content:", error)
		throw new Error("Failed to get response from Gemini AI.")
	}
}
