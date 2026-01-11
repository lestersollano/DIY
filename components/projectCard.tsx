import type { ProjectProps } from "@/interfaces/interfaces"
import { Ionicons } from "@react-native-vector-icons/ionicons"
import { useRouter } from "expo-router"
import { Image, Pressable, Text, View } from "react-native"

export default function ProjectCard({
	title = "Unknown",
	author = "Unknown",
	shortDescription = "No description provided.",
	favorite = false,
}: ProjectProps) {
	const router = useRouter()

	return (
		<Pressable
			style={{
				backgroundColor: "#1F1F1F",
				padding: 15,
				marginHorizontal: 20,
				borderRadius: 10,
				flexDirection: "row",
				marginBottom: 20,
			}}
			onPress={() => {
				router.push("/project")
			}}
		>
			<Image
				source={require("../assets/images/DIY(2).png")}
				style={{
					width: 100,
					height: 100,
					borderRadius: 10,
					marginRight: 10,
				}}
				resizeMode="contain"
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
					{shortDescription}
				</Text>
			</View>
		</Pressable>
	)
}
