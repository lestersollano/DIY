import { ProjectsProvider } from "@/lib/ProjectsContext";
import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <ProjectsProvider>
            <Stack screenOptions={{ headerShown: false }}>
                {/* Tabs */}
                <Stack.Screen
                    name="(tabs)"
                    options={{ animation: "ios_from_right" }}
                />

                {/* Global screens */}
                <Stack.Screen
                    name="project"
                    options={{
                        animation: "none",
                    }}
                />
                <Stack.Screen name="settings" />
            </Stack>
        </ProjectsProvider>
    );
}
