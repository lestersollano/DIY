import HeaderBack from "@/components/headerBack"
import { useProjects } from "@/lib/ProjectsContext"
import { LinearGradient } from "expo-linear-gradient"
import { useLocalSearchParams } from "expo-router"
import { Image, ImageBackground, ScrollView, Text, View } from "react-native"

export default function Project() {
	const { id } = useLocalSearchParams<{ id: string }>()

	const { projects } = useProjects()

	const project = projects.find((p) => p.id === id)

	if (!projects) return <View></View>
	return (
		<ImageBackground
			source={require("../assets/images/background.png")}
			style={{
				flex: 1,
				backgroundColor: "black",
			}}
			resizeMode="cover"
		>
			<HeaderBack title={project?.author ?? ""} />
			<ScrollView
				style={{
					flex: 1,
				}}
			>
				<View
					style={{
						flexDirection: "row",
					}}
				>
					<View
						style={{
							marginTop: 20,
							marginHorizontal: 20,
							aspectRatio: 16 / 9,
							alignItems: "center",
							flex: 1,
							borderRadius: 10,

							shadowColor: "#ffffff",
							shadowOpacity: 0.4,
							shadowRadius: 15,
							elevation: 20,
						}}
					>
						<Image
							source={{ uri: project?.imageUri }}
							style={{
								flex: 1,
								width: "100%",
								borderRadius: 10,
							}}
							resizeMode="cover"
						/>
					</View>
				</View>
				<LinearGradient
					colors={["#1ED208", "#50E2CD"]}
					start={{ x: 0.14644661, y: 0.14644661 }}
					end={{ x: 0.85355339, y: 0.85355339 }}
					style={{
						margin: 20,
						padding: 10,
						borderRadius: 10,
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "center",
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
								textShadowColor: "rgba(0,0,0,0.6)",
								textShadowOffset: { width: 0, height: 1 },
								textShadowRadius: 3,
								textAlign: "center",
							}}
						>
							{project?.title}
						</Text>
					</View>
				</LinearGradient>
				<Text
					style={{
						color: "white",
						fontFamily: "Regular",
						fontSize: 12,
						textAlign: "center",
						marginHorizontal: 20,
					}}
				>
					{project?.description}
				</Text>
				<View
					style={{
						marginTop: 20,
						padding: 20,
						backgroundColor: "#1f1f1f",
						marginHorizontal: 20,
						borderRadius: 10,
					}}
				>
					<Text
						style={{
							color: "white",
							fontFamily: "Bold",
							fontSize: 12,
						}}
					>
						Materials Needed:
					</Text>
					{project?.materials !== undefined ? (
						project?.materials.map((material, index) => (
							<Text
								key={index}
								style={{
									color: "white",
									fontFamily: "Regular",
									fontSize: 12,
									marginTop: 20,
								}}
							>
								‣ {material}
							</Text>
						))
					) : (
						<></>
					)}
				</View>
				<View
					style={{
						marginTop: 20,
						padding: 20,
						backgroundColor: "#1f1f1f",
						marginHorizontal: 20,
						borderRadius: 10,
					}}
				>
					<Text
						style={{
							color: "white",
							fontFamily: "Bold",
							fontSize: 12,
						}}
					>
						Note:
					</Text>
					<Text
						style={{
							color: "white",
							fontFamily: "Regular",
							fontSize: 12,
							marginTop: 20,
							textAlign: "justify",
						}}
					>
						{project?.notes}
					</Text>
				</View>
				<View
					style={{
						marginTop: 20,
						padding: 20,
						backgroundColor: "#1f1f1f",
						marginHorizontal: 20,
						borderRadius: 10,
						marginBottom: "50%",
					}}
				>
					<Text
						style={{
							color: "white",
							fontFamily: "Bold",
							fontSize: 12,
						}}
					>
						Instructions:
					</Text>
					{project?.instructions !== undefined ? (
						project?.instructions.map((inst, index) => (
							<Text
								key={index}
								style={{
									color: "white",
									fontFamily: "Regular",
									fontSize: 12,
									marginTop: 20,
								}}
							>
								‣ {inst}
							</Text>
						))
					) : (
						<></>
					)}
				</View>
			</ScrollView>
		</ImageBackground>
	)
}
