import HeaderBack from "@/components/headerBack"
import ProjectCard from "@/components/projectCard"
import { useProjects } from "@/lib/ProjectsContext"
import { useLocalSearchParams } from "expo-router"
import { FlatList, Image, ImageBackground, Text, View } from "react-native"

export default function Recognition() {
	const { uri, material } = useLocalSearchParams()
	const { projects } = useProjects()

	const relevantProjects = projects.filter(
		(project) => project.mainMaterial?.toLowerCase() === material.toLowerCase(),
	)

	return (
		<ImageBackground
			source={require("@/assets/images/background.png")}
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
				<HeaderBack title="RESULTS" />
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						marginRight: 20,
						marginLeft: 10,
					}}
				>
					<Image
						source={require("@/assets/images/transparent.png")}
						style={{ width: 125, height: 125 }}
						resizeMode="contain"
					/>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							gap: 20,
						}}
					>
						<View
							style={{
								alignItems: "flex-end",
							}}
						>
							<Text
								style={{
									fontFamily: "Bold",
									color: "white",
								}}
							>
								{material}
							</Text>
							<Text
								style={{
									fontFamily: "Regular",
									color: "white",
									fontSize: 10,
								}}
							>
								RECYCLABLE
							</Text>
						</View>
						<Image // @ts-ignore
							source={{ uri: uri }}
							style={{ width: 100, height: 100, borderRadius: 10 }}
							resizeMode="cover"
						/>
					</View>
				</View>
				<FlatList
					style={{
						flex: 1,
					}}
					data={relevantProjects}
					renderItem={({ item }) => <ProjectCard project={item} />}
				/>
			</View>
		</ImageBackground>
	)
}
