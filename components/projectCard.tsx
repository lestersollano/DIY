import type { Project } from "@/interfaces/interfaces"
import { getUser } from "@/supabase/auth"
import { fetchData, updateData } from "@/supabase/database"
import { Ionicons } from "@react-native-vector-icons/ionicons"
import { useRouter } from "expo-router"
import { useState } from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"

export default function ProjectCard({
	project,
	fav,
	antid,
}: {
	project: Project
	fav: any
	antid: any
}) {
	const router = useRouter()
	const [favorite, setFavorite] = useState(fav.includes(project.id))

	function upsertLastOpened(id: any, arr: any) {
		const now = Date.now()

		const index = arr.findIndex((item) => item.id === id)

		// If ID exists → update lastOpenedAt
		if (index !== -1) {
			return arr.map((item, i) =>
				i === index ? { ...item, lastOpenedAt: now } : item,
			)
		}

		// If ID does not exist → add new object
		return [...arr, { id, lastOpenedAt: now }]
	}

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
			onPress={async () => {
				console.log(project)
				try {
					const { email } = await getUser()
					console.log("got user")
					const data = await fetchData("DIY Account Information")
					console.log("got db")
					const history = data.find((item) => item.email == email).history
					console.log(history)
					const id = data.find((item) => item.email == email).id

					updateData(
						"DIY Account Information",
						{ history: upsertLastOpened(project.id, history) },
						id,
					)
				} catch {
					console.log("something went wrong")
				}

				router.push({
					pathname: "/project",
					params: { id: project.id },
				})
			}}
		>
			<Image
				source={{ uri: project.imageUri }}
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
							{project.title}
						</Text>
						<Text
							style={{
								color: "#5C5B5B",
								fontFamily: "Bold",
								fontSize: 8,
							}}
						>
							by {project.author}
						</Text>
					</View>
					<TouchableOpacity
						onPress={() => {
							if (favorite) {
								updateData(
									"DIY Account Information",
									{ favorites: fav.filter((n) => n != project.id) },
									antid,
								)
							} else {
								updateData(
									"DIY Account Information",
									{ favorites: [...fav, project.id] },
									antid,
								)
							}
							setFavorite(!favorite)
						}}
					>
						<Ionicons
							name="heart"
							size={25}
							color={favorite ? "#FF6B6B" : "#5C5C5C"}
						/>
					</TouchableOpacity>
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
					{project.description}
				</Text>
			</View>
		</TouchableOpacity>
	)
}
