import HeaderBack from "@/components/headerBack"
import { getUser } from "@/supabase/auth"
import { deleteData, fetchData } from "@/supabase/database"
import { LinearGradient } from "expo-linear-gradient"
import { useLocalSearchParams, useRouter } from "expo-router"
import { FlagOffIcon, PencilIcon, TrashIcon } from "lucide-react-native"
import { useEffect, useState } from "react"
import {
	Alert,
	Image,
	ImageBackground,
	Linking,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native"

export default function Project() {
	const router = useRouter()

	const { id } = useLocalSearchParams<{ id: string }>()

	const [projects, setProjects] = useState<any>([])
	const [username, setUsername] = useState("")

	useEffect(() => {
		async function init() {
			const data = await fetchData("DIY Project")
			console.log(data)
			setProjects(data)
		}
		init()
		async function inita() {
			try {
				const { email } = await getUser()
				const data = await fetchData("DIY Account Information")
				console.log(data)
				const usern = data.find((item) => item.email == email).username
				console.log(usern)
				setUsername(usern)
			} catch (e) {
				console.log("something went wrong")
				throw e
			}
		}
		inita()
	}, [])

	// @ts-ignore
	const project = projects.find((p) => p.id == id)

	const openYouTube = async () => {
		const url = project?.youtubeURL

		// @ts-ignore
		const supported = await Linking.canOpenURL(url)

		// @ts-ignore
		await Linking.openURL(url)

		console.log(supported)
	}

	if (!project) {
		return (
			<View
				style={{
					flex: 1,
					backgroundColor: "black",
				}}
			>
				<HeaderBack title="Loading"></HeaderBack>
			</View>
		)
	}

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
						<TouchableOpacity
							style={{
								flex: 1,
								width: "100%",
							}}
							onPress={openYouTube}
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
						</TouchableOpacity>
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
						// @ts-ignore
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
						// @ts-ignore
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
				<View
					style={{
						flexDirection: "row",
						justifyContent: "flex-end",
						padding: 20,
						gap: 10,
						marginBottom: 200,
					}}
				>
					<TouchableOpacity
						onPress={() => {}}
						style={{
							display: project.author == username ? "none" : "flex",
						}}
					>
						<FlagOffIcon color={"grey"} />
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							router.push({
								pathname: "/edit",
								params: {
									// @ts-ignore
									id: project.id,
								},
							})
						}}
						style={{
							display: project.author == username ? "flex" : "none",
						}}
					>
						<PencilIcon color={"grey"} />
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							display: project.author == username ? "flex" : "none",
						}}
						onPress={() => {
							Alert.alert(
								"Delete Project",
								"Are you sure you want to delete this project? This action cannot be undone.",
								[
									{
										text: "Cancel",
										onPress: () => {
											console.log("canceled operation")
										},
										style: "cancel",
									},
									{
										text: "Delete",
										onPress: () => {
											// @ts-ignore
											// deleteProject(project.id)
											async function wawa() {
												await deleteData("DIY Project", Number(id))
												router.back()
											}
											wawa()
										},
										style: "destructive",
									},
								],
							)
						}}
					>
						<TrashIcon color={"grey"} />
					</TouchableOpacity>
				</View>
			</ScrollView>
		</ImageBackground>
	)
}
