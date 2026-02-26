import HeaderBack from "@/components/headerBack"
import ProjectCard from "@/components/projectCard"
import { Project } from "@/interfaces/interfaces"
import { getUser } from "@/supabase/auth"
import { fetchData } from "@/supabase/database"
import { useFocusEffect } from "expo-router"
import { HeartIcon } from "lucide-react-native"
import { useCallback, useState } from "react"
import { FlatList, ImageBackground, Text, View } from "react-native"

export default function Favorites() {
	const [projects, setProjects] = useState<Project[]>([])
	const [user, setUser] = useState<any>({})
	const [antid, setantid] = useState<any>()
	const [favorites, setFavorites] = useState<any>([])

	useFocusEffect(
		useCallback(() => {
			let isActive = true

			async function init() {
				try {
					const uzer = await getUser()
					if (!isActive) return

					setUser(uzer)

					const info = await fetchData("DIY Account Information")
					const akawnt = info.find((i) => i.email === uzer?.email)

					if (!isActive) return
					setFavorites(akawnt?.favorites ?? [])
					setantid(akawnt?.id)
				} catch (e) {
					console.log(e)
				}

				const data = await fetchData("DIY Project")
				if (isActive) setProjects(data)
			}

			init()

			return () => {
				isActive = false
			}
		}, []),
	)
	return (
		<ImageBackground
			source={require("../../../assets/images/background.png")}
			style={{
				flex: 1,
				backgroundColor: "black",
			}}
			resizeMode="cover"
		>
			<View
				style={{
					flex: 1,
				}}
			>
				<HeaderBack title="FAVORITES" />
				<FlatList
					data={projects.filter((project) => favorites.includes(project.id))}
					keyExtractor={(item, index) =>
						item.id?.toString() || index.toString()
					}
					renderItem={({ item }) => (
						<ProjectCard project={item} fav={favorites} antid={antid} />
					)}
					style={{
						flex: 1,
					}}
					contentContainerStyle={{ flexGrow: 1, paddingVertical: 20 }}
					ListEmptyComponent={
						<View
							style={{
								flex: 1,
								justifyContent: "center",
								alignItems: "center",
								gap: 20,
							}}
						>
							<HeartIcon color="grey" size={64} />
							<Text
								style={{
									color: "grey",
									fontFamily: "Regular",
								}}
							>
								Press the heart icon to favorite a project.
							</Text>
						</View>
					}
				/>
			</View>
		</ImageBackground>
	)
}
