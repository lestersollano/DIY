import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { StyleSheet, TouchableOpacity } from "react-native"

export const RecognitionTab = () => {
	const router = useRouter()
	const handlePress = () => {
		router.push("/(tabs)/recognition")
	}

	return (
		<TouchableOpacity
			onPress={handlePress}
			style={styles.button}
			activeOpacity={0.85}
		>
			<Ionicons name="scan-outline" size={42} color="#fff" />
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	button: {
		position: "absolute",
		top: -20,
		left: "50%",
		transform: [{ translateX: -40 }],
		backgroundColor: "#1ED208",
		borderRadius: 24,
		width: 80,
		height: 80,
		alignItems: "center",
		justifyContent: "center",
		boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
	},
})
