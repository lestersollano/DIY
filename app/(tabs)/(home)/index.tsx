import { useAccount } from "@/lib/AccountContext"
import { useProjects } from "@/lib/ProjectsContext"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"
import { SearchIcon, SettingsIcon } from "lucide-react-native"
import { useState } from "react"
import {
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
					}}
				>
					<View style={{ flex: 1 }}>
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
							Glass can be recycled endlessly without losing quality or purity.
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
							Each ton of recycled glass saves over a ton of natural resources,
							including sand, soda ash, and limestone.
						</Text>
					</View>
				</LinearGradient>
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
