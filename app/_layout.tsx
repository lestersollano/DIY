import { AccountProvider } from "@/lib/AccountContext"
import { InfoProvider } from "@/lib/InfoContext"
import { ProjectsProvider } from "@/lib/ProjectsContext"
import { onAuthStateChange } from "@/supabase/auth"
import { Stack } from "expo-router"
import { useEffect } from "react"

export default function RootLayout() {
	useEffect(() => {
		const sub = onAuthStateChange((session) => {
			console.log("SESSION:", session)
		})

		return () => sub.unsubscribe()
	}, [])

	return (
		<InfoProvider>
			<AccountProvider>
				<ProjectsProvider>
					<Stack screenOptions={{ headerShown: false }}>
						{/* Tabs */}
						<Stack.Screen name="(tabs)" />

						{/* Global screens */}
						<Stack.Screen name="project" />
						<Stack.Screen name="settings" />
						<Stack.Screen name="createAccount" />
						<Stack.Screen name="results" />
					</Stack>
				</ProjectsProvider>
			</AccountProvider>
		</InfoProvider>
	)
}
