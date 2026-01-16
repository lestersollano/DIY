import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import { ClockIcon, HeartIcon, HomeIcon, UserIcon } from "lucide-react-native";

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        Bold: require("../../assets/fonts/glacial-indifference.bold.otf"),
        Regular: require("../../assets/fonts/glacial-indifference.regular.otf"),
    });

    if (!fontsLoaded) return null;

    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {},
                headerTitle: () => null, // hide title
                headerStyle: { height: 50 },
                // tabBarShowLabel: false,
            }}
        >
            <Tabs.Screen
                name="(home)"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <HomeIcon color={color} size={size} />
                    ),
                    tabBarLabel: "Home",
                    headerBackground: () => (
                        <LinearGradient
                            colors={["#1ED208", "#50E2CD"]}
                            start={{ x: 0.14644661, y: 0.14644661 }}
                            end={{ x: 0.85355339, y: 0.85355339 }}
                            style={{ flex: 1 }}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="favorites"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <HeartIcon color={color} size={size} />
                    ),
                    headerShown: false,
                }}
            />
            <Tabs.Screen name="recognition" />
            <Tabs.Screen
                name="history"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <ClockIcon color={color} size={size} />
                    ),
                    headerBackground: () => (
                        <LinearGradient
                            colors={["#1ED208", "#50E2CD"]}
                            start={{ x: 0.14644661, y: 0.14644661 }}
                            end={{ x: 0.85355339, y: 0.85355339 }}
                            style={{ flex: 1 }}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="account"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <UserIcon color={color} size={size} />
                    ),
                    headerBackground: () => (
                        <LinearGradient
                            colors={["#1ED208", "#50E2CD"]}
                            start={{ x: 0.14644661, y: 0.14644661 }}
                            end={{ x: 0.85355339, y: 0.85355339 }}
                            style={{ flex: 1 }}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
