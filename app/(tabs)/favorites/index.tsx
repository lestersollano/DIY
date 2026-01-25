import HeaderBack from "@/components/headerBack"
import ProjectCard from "@/components/projectCard"
import { useProjects } from "@/lib/ProjectsContext"
import { HeartIcon } from "lucide-react-native"
import { FlatList, ImageBackground, Text, View } from "react-native"

export default function Favorites() {
	const { projects } = useProjects()
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
					data={projects.filter((project) => project.favorite)}
					keyExtractor={(item, index) =>
						item.id?.toString() || index.toString()
					}
					renderItem={({ item }) => <ProjectCard project={item} />}
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
