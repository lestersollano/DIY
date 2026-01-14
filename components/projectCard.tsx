import type { Project } from "@/interfaces/interfaces"
import { Ionicons } from "@react-native-vector-icons/ionicons"
import { useRouter } from "expo-router"
import { Image, Text, TouchableOpacity, View } from "react-native"

export default function ProjectCard({
	title = "Unknown",
	author = "Unknown",
	description = "No description provided.",
	favorite = false,
	imageUri,
}: Project) {
	const router = useRouter()

	return (
		<TouchableOpacity
			style={{
				backgroundColor: "#1F1F1F",
				padding: 15,
				marginHorizontal: 20,
				borderRadius: 10,
				flexDirection: "row",
				marginBottom: 20,
			}}
			onPress={() => {
				router.push("/screens/project")
			}}
		>
			<Image
				source={{ uri: imageUri }}
				style={{
					width: 100,
					height: 100,
					borderRadius: 10,
					marginRight: 10,
				}}
				resizeMode="cover"
			/>
			<View
				style={{
					flex: 1,
				}}
			>
				<View
					style={{
						justifyContent: "space-between",
						flexDirection: "row",
						marginBottom: 10,
					}}
				>
					<View
						style={{
							flex: 1,
						}}
					>
						<Text
							style={{
								color: "white",
								fontFamily: "Bold",
								fontSize: 12,
							}}
						>
							{title}
						</Text>
						<Text
							style={{
								color: "#5C5B5B",
								fontFamily: "Bold",
								fontSize: 8,
							}}
						>
							by {author}
						</Text>
					</View>
					<Ionicons
						name="heart"
						size={25}
						color={favorite ? "#FF6B6B" : "#5C5C5C"}
					/>
				</View>
				<Text
					style={{
						color: "white",
						fontFamily: "Regular",
						fontSize: 8,
						flexWrap: "wrap",
					}}
					numberOfLines={4}
					ellipsizeMode="tail"
				>
					{description}
				</Text>
			</View>
		</TouchableOpacity>
	)
}
