import { useAccount } from "@/lib/AccountContext"
import { useProjects } from "@/lib/ProjectsContext"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"
import { SearchIcon, SettingsIcon } from "lucide-react-native"
import { useEffect, useRef, useState } from "react"
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

import { useInfo } from "@/lib/InfoContext"

export default function Index() {
	const { infoList } = useInfo()
	const [currentIndex, setCurrentIndex] = useState(0)

	// Animated values
	const translateY = useRef(new Animated.Value(-20)).current // Starts 20px above
	const opacity = useRef(new Animated.Value(0)).current // Starts invisible

	useEffect(() => {
		if (infoList.length === 0) return

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
		const currentDuration = (infoList[currentIndex]?.duration || 5) * 1000

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
				setCurrentIndex((prev) => (prev === infoList.length - 1 ? 0 : prev + 1))
				// Reset position to top for the next item's entrance
				translateY.setValue(-20)
			})
		}, currentDuration)

		return () => clearTimeout(timeout)
	}, [currentIndex, infoList])

	const currentInfo = infoList[currentIndex]

	const { projects } = useProjects()
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
					<Image
						source={require("../../../assets/images/transparent.png")}
						style={{ width: 125, height: 125, marginLeft: 10 }}
						resizeMode="contain"
					/>
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
						<ProjectCard key={index} project={project} />
					))}
				</ScrollView>
			</View>
		</ImageBackground>
	)
}
