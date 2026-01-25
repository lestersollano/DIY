import HeaderBack from "@/components/headerBack"
import ProjectCard from "@/components/projectCard"
import { useProjects } from "@/lib/ProjectsContext"
import { ImageBackground, ScrollView, Text, View } from "react-native"

export default function History() {
	const { projects } = useProjects()
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
						<ProjectCard key={index} project={project} />
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
						<ProjectCard key={index} project={project} />
					))}
				</ScrollView>
			</View>
		</ImageBackground>
	)
}
