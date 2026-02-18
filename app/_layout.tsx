import { AccountProvider } from "@/lib/AccountContext"
import { InfoProvider } from "@/lib/InfoContext"
import { ProjectsProvider } from "@/lib/ProjectsContext"
import { Stack } from "expo-router"

export default function RootLayout() {
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
