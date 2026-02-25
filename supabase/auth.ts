// auth.ts
import { Session, User } from "@supabase/supabase-js"
import { insertData } from "./database"
import { uploadImage } from "./storage"
import supabase from "./supabase"

// Storage configuration
const STORAGE_UPLOAD_URL = "http://192.168.254.107:8000/upload"

/**
 * Sign Up
 * @param email - User email
 * @param password - User password
 * @param imageUri - Path to profile image
 * @param username - Username for the account
 */
export async function signUp(
	email: string,
	password: string,
	imageUri: string,
	username: string,
) {
	// 1. Save image to storage
	const uploadResponse = await uploadImage(STORAGE_UPLOAD_URL, imageUri)
	const profileURL = uploadResponse.url

	console.log("Image Success")

	// 2. Sign user up in supabase
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
	})

	console.log("Auth Success")

	if (error) throw error

	// 3. Save username, email, and profileURL to database
	await insertData("DIY Account Information", {
		username,
		email,
		profileURL,
	})

	console.log("DB Success")

	return data
}

/**
 * Sign In with Email & Password
 */
export async function signIn(email: string, password: string) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	})

	if (error) throw error

	return data
}

/**
 * Sign Out
 */
export async function signOut() {
	const { error } = await supabase.auth.signOut()

	if (error) throw error
}

/**
 * Get Current Session
 */
export async function getSession(): Promise<Session | null> {
	const { data, error } = await supabase.auth.getSession()

	if (error) throw error

	return data.session
}

/**
 * Get Current User
 */
export async function getUser(): Promise<User | null> {
	const { data, error } = await supabase.auth.getUser()

	if (error) throw error

	return data.user
}

/**
 * Listen to Auth Changes
 */
export function onAuthStateChange(callback: (session: Session | null) => void) {
	const { data } = supabase.auth.onAuthStateChange((_event, session) => {
		callback(session)
	})

	return data.subscription
}

/**
 * Reset Password (sends email)
 */
export async function resetPassword(email: string) {
	const { error } = await supabase.auth.resetPasswordForEmail(email)

	if (error) throw error
}

/**
 * Update Password (after reset)
 */
export async function updatePassword(password: string) {
	const { error } = await supabase.auth.updateUser({
		password,
	})

	if (error) throw error
}
