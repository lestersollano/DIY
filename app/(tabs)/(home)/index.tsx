import { Project } from "@/interfaces/interfaces"
import { useAccount } from "@/lib/AccountContext"
import { getUser } from "@/supabase/auth"
import { fetchData } from "@/supabase/database"
import { LinearGradient } from "expo-linear-gradient"
import { useFocusEffect, useRouter } from "expo-router"
import { SearchIcon, SettingsIcon } from "lucide-react-native"
import { useCallback, useEffect, useRef, useState } from "react"
import {
	Animated,
	Image,
	ImageBackground,
	Pressable,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native"
import ProjectCard from "../../../components/projectCard"

export default function Index() {
	const [projects, setProjects] = useState<Project[]>([])
	const [user, setUser] = useState<any>({})
	const [antid, setantid] = useState<any>()
	const [favorites, setFavorites] = useState<any>([])

	const [triviaList, setTriviaList] = useState<
		{ message: string; description: string; duration: number }[]
	>([])
	const [currentIndex, setCurrentIndex] = useState(0)
	const [uploading, setUploading] = useState(false)

	const handleLogoPress = async () => {
		// setUploading(true)
		// try {
		// 	const result = await ImagePicker.launchImageLibraryAsync({
		// 		mediaTypes: ImagePicker.MediaTypeOptions.Images,
		// 		allowsEditing: true,
		// 		aspect: [1, 1],
		// 		quality: 0.8,
		// 	})
		// 	if (!result.canceled) {
		// 		const uri = result.assets[0].uri
		// 		console.log("Image picked:", { uri })
		// 		// Upload URL for Supabase storage
		// 		const uploadUrl = "https://lestersollano-diy-yolo.hf.space/upload"
		// 		// Upload to supabase storage
		// 		const data = await uploadImage(uploadUrl, uri)
		// 		Alert.alert("Success", "Image uploaded successfully")
		// 		console.log("Upload response:", data)
		// 	}
		// } catch (error) {
		// 	console.error("Upload error:", error)
		// 	Alert.alert(
		// 		"Error",
		// 		`Failed to upload image: ${error instanceof Error ? error.message : String(error)}`,
		// 	)
		// } finally {
		// 	setUploading(false)
		// }
		// router.push("/signIn")
		// const data = await getUser()
		// console.log(data?.email)
		// const { email } = await getUser()
		// console.log(email)
		const { email } = await getUser()
		const data = await fetchData("DIY Account Information")
		const history = data.find((item) => item.email == email).history
		console.log(history)
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

				const data = await fetchData("DIY Project")
				if (isActive) setProjects(data)
			}

			init()

			return () => {
				isActive = false
			}
		}, []),
	)

	// Fetch trivia data from database
	useEffect(() => {
		const loadTrivia = async () => {
			try {
				const data = await fetchData("DIY Trivia Wheel")
				// Transform the data structure: title -> message, message -> description
				const transformed = data.map((item: any) => ({
					message: item.title,
					description: item.message,
					duration: item.duration,
				}))
				setTriviaList(transformed)
			} catch (error) {
				console.error("Failed to fetch trivia data:", error)
			}
		}
		loadTrivia()
	}, [])

	// Animated values
	const translateY = useRef(new Animated.Value(-20)).current // Starts 20px above
	const opacity = useRef(new Animated.Value(0)).current // Starts invisible

	useEffect(() => {
		if (triviaList.length === 0) return

		// 1. IMMEDIATELY trigger the "Slide In" animation for the current item
		Animated.parallel([
			Animated.timing(translateY, {
				toValue: 0,
				duration: 600,
				useNativeDriver: true,
			}),
			Animated.timing(opacity, {
				toValue: 1,
				duration: 600,
				useNativeDriver: true,
			}),
		]).start()

		// 2. Set the timer for the "Slide Out" and Index change
		const currentDuration = (triviaList[currentIndex]?.duration || 5) * 1000

		const timeout = setTimeout(() => {
			// Slide Out Animation
			Animated.parallel([
				Animated.timing(translateY, {
					toValue: 20,
					duration: 400,
					useNativeDriver: true,
				}),
				Animated.timing(opacity, {
					toValue: 0,
					duration: 400,
					useNativeDriver: true,
				}),
			]).start(() => {
				setCurrentIndex((prev) =>
					prev === triviaList.length - 1 ? 0 : prev + 1,
				)
				// Reset position to top for the next item's entrance
				translateY.setValue(-20)
			})
		}, currentDuration)

		return () => clearTimeout(timeout)
	}, [currentIndex, triviaList])

	const currentInfo = triviaList[currentIndex]

	const { account } = useAccount()
	const [search, setSearch] = useState("")
	const [material, setMaterial] = useState("")
	const router = useRouter()

	let filteredProjects = projects.filter((project) =>
		project.title?.toLowerCase().includes(search.toLowerCase()),
	)

	filteredProjects = projects.filter((project) =>
		project.mainMaterial?.toLowerCase().includes(material.toLowerCase()),
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
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Pressable
						onLongPress={handleLogoPress}
						disabled={uploading}
						style={{ opacity: uploading ? 0.6 : 1 }}
					>
						<Image
							source={require("../../../assets/images/transparent.png")}
							style={{ width: 125, height: 125, marginLeft: 10 }}
							resizeMode="contain"
						/>
					</Pressable>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							gap: 10,
						}}
					>
						<TouchableOpacity
							onPress={() => {
								if (account !== null) {
									router.push("/settings")
								} else {
									router.push("/createAccount")
								}
							}}
						>
							<SettingsIcon color={"grey"} />
						</TouchableOpacity>
						<Pressable
							onPress={() => {
								if (account !== null) {
									router.push("/(tabs)/account")
								} else {
									router.push("/createAccount")
								}
							}}
						>
							<Image
								source={
									account?.avatarUri === undefined
										? require("../../../assets/images/profile.png")
										: { uri: account.avatarUri }
								}
								style={{
									width: 50,
									height: 50,
									marginRight: 20,
									borderRadius: 25,
								}}
								resizeMode="contain"
							/>
						</Pressable>
					</View>
				</View>
				<Pressable
					onLongPress={() => {
						router.push("/ManageInfo")
					}}
				>
					<LinearGradient
						colors={["#1ED208", "#50E2CD"]}
						start={{ x: 0.14644661, y: 0.14644661 }}
						end={{ x: 0.85355339, y: 0.85355339 }}
						style={{
							marginHorizontal: 20,
							paddingHorizontal: 15,
							paddingVertical: 20,
							borderRadius: 10,
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "center",
							marginBottom: 20,
							height: 150,
						}}
					>
						<View
							style={{ flex: 1, justifyContent: "center", overflow: "hidden" }}
						>
							{currentInfo && (
								<Animated.View
									style={{
										opacity: opacity, // Bind opacity to animated value
										transform: [{ translateY: translateY }], // Bind Y position to animated value
									}}
								>
									<Text
										style={{
											color: "white",
											fontFamily: "Bold",
											fontSize: 15,
											textShadowColor: "rgba(0,0,0,0.6)",
											textShadowOffset: { width: 0, height: 1 },
											textShadowRadius: 3,
											marginBottom: 10,
											textAlign: "center",
										}}
									>
										{currentInfo.message}
									</Text>
									<Text
										style={{
											color: "white",
											fontFamily: "Regular",
											fontSize: 10,
											textShadowColor: "rgba(0,0,0,0.5)",
											textShadowOffset: { width: 0, height: 1 },
											textShadowRadius: 2,
											textAlign: "center",
										}}
									>
										{currentInfo.description}
									</Text>
								</Animated.View>
							)}
						</View>
					</LinearGradient>
				</Pressable>
				<View
					style={{
						marginHorizontal: 20,
						flexDirection: "row",
						alignItems: "center",
						backgroundColor: "#1F1F1F",
						paddingHorizontal: 20,
						paddingVertical: 10,
						borderRadius: 10,
						gap: 10,
						borderStyle: "solid",
						borderWidth: 1,
						borderColor: "#1ED208",
						marginBottom: 20,
					}}
				>
					<SearchIcon color={"white"} />
					<TextInput
						style={{
							color: "#6B6B6B",
							fontFamily: "Regular",
							fontSize: 12,
							flex: 1,
							height: "100%",
						}}
						placeholder="Search..."
						value={search}
						onChangeText={(text) => {
							setSearch(text)
						}}
					/>
				</View>
				<View
					style={{
						marginHorizontal: 20,
						flexDirection: "row",
						justifyContent: "center",
						paddingBottom: 10,
						gap: 15,
					}}
				>
					<Pressable
						style={{
							padding: 10,
							borderRadius: 10,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							backgroundColor: material === "" ? "#1ED208" : "#1F1F1F",
						}}
						onPress={() => {
							setMaterial("")
						}}
					>
						<Text
							style={{
								color: "white",
								fontFamily: "Regular",
								fontSize: 12,
							}}
						>
							All
						</Text>
					</Pressable>
					<Pressable
						style={{
							padding: 10,
							borderRadius: 10,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							backgroundColor: material === "plastic" ? "#1ED208" : "#1F1F1F",
						}}
						onPress={() => {
							setMaterial("plastic")
						}}
					>
						<Text
							style={{
								color: "white",
								fontFamily: "Regular",
								fontSize: 12,
							}}
						>
							Plastic
						</Text>
					</Pressable>
					<Pressable
						style={{
							padding: 10,
							borderRadius: 10,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							backgroundColor: material === "card" ? "#1ED208" : "#1F1F1F",
						}}
						onPress={() => {
							setMaterial("card")
						}}
					>
						<Text
							style={{
								color: "white",
								fontFamily: "Regular",
								fontSize: 12,
							}}
						>
							Cardboard
						</Text>
					</Pressable>
					<Pressable
						style={{
							padding: 10,
							borderRadius: 10,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							backgroundColor: material === "metal" ? "#1ED208" : "#1F1F1F",
						}}
						onPress={() => {
							setMaterial("metal")
						}}
					>
						<Text
							style={{
								color: "white",
								fontFamily: "Regular",
								fontSize: 12,
							}}
						>
							Metal Can
						</Text>
					</Pressable>
				</View>
				<ScrollView
					style={{
						flex: 1,
						paddingTop: 10,
					}}
				>
					{filteredProjects.map((project, index) => (
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
