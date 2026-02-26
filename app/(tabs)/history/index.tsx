import HeaderBack from "@/components/headerBack"
import ProjectCard from "@/components/projectCard"
import { getUser } from "@/supabase/auth"
import { fetchData } from "@/supabase/database"
import { useFocusEffect } from "expo-router"
import { useCallback, useState } from "react"
import { ImageBackground, ScrollView, Text, View } from "react-native"

export default function History() {
	const [projects, setProjects] = useState<any>([])

	const [user, setUser] = useState<any>({})
	const [antid, setantid] = useState<any>()
	const [favorites, setFavorites] = useState<any>([])
	let filteredProjects = projects.filter(
		(project) => project.lastOpenedAt !== undefined,
	)

	const sortedProjects = filteredProjects.sort(
		(a, b) => b.lastOpenedAt - a.lastOpenedAt,
	)

	const todayProjects = sortedProjects.filter(
		(project) => project.lastOpenedAt > Date.now() - 86400000,
	)

	const weekProjects = sortedProjects.filter(
		(project) => project.lastOpenedAt < Date.now() - 86400000,
	)

	function combineById(a, b) {
		// Create a lookup map from array A
		const aMap = new Map(a.map((item) => [item.id, item]))

		// Combine only when A exists for B
		return b
			.filter((project) => aMap.has(project.id))
			.map((project) => ({
				...project,
				...aMap.get(project.id),
			}))
	}

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
			}

			init()

			async function inita() {
				const { email } = await getUser()
				const data = await fetchData("DIY Account Information")
				const history = data.find((item) => item.email == email).history
				const projiks = await fetchData("DIY Project")
				setProjects(combineById(history, projiks))
			}
			inita()

			return () => {
				isActive = false
			}
		}, []),
	)

	//@ts-ignore
	function combineById(a, b) {
		// Create a lookup map from array A
		//@ts-ignore
		const aMap = new Map(a.map((item) => [item.id, item]))

		// Combine only when A exists for B
		return (
			b
				//@ts-ignore
				.filter((project) => aMap.has(project.id))
				//@ts-ignore
				.map((project) => ({
					...project,
					//@ts-ignore
					...aMap.get(project.id),
				}))
		)
	}

	return (
		<ImageBackground
			source={require("../../../assets/images/background.png")}
			style={{ flex: 1, backgroundColor: "black" }}
			resizeMode="cover"
		>
			<View
				style={{
					flex: 1,
				}}
			>
				<HeaderBack title="HISTORY" />
				<ScrollView
					style={{
						flex: 1,
						paddingTop: 20,
					}}
				>
					<Text
						style={{
							fontFamily: "Bold",
							color: "grey",
							marginLeft: 20,
							fontSize: 24,
							marginBottom: 20,
						}}
					>
						TODAY
					</Text>
					{todayProjects.map((project, index) => (
						<ProjectCard
							key={index}
							project={project}
							fav={favorites}
							antid={antid}
						/>
					))}
					<Text
						style={{
							fontFamily: "Bold",
							color: "grey",
							marginLeft: 20,
							fontSize: 24,
							marginBottom: 20,
						}}
					>
						LAST WEEK
					</Text>
					{weekProjects.map((project, index) => (
						<ProjectCard
							key={index}
							project={project}
							fav={favorites}
							antid={antid}
						/>
					))}
				</ScrollView>
			</View>
		</ImageBackground>
	)
}
