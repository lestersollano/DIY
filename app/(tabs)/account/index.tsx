import ProjectCard from "@/components/projectCard"
import { useAccount } from "@/lib/AccountContext"
import { useProjects } from "@/lib/ProjectsContext"
import Ionicons from "@react-native-vector-icons/ionicons"
import { LinearGradient } from "expo-linear-gradient"
import { useFocusEffect, useRouter } from "expo-router"
import { useCallback } from "react"
import {
	Image,
	ImageBackground,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native"

export default function Account() {
	const router = useRouter()
	const { projects } = useProjects()
	const { account, loading } = useAccount()

	useFocusEffect(
		useCallback(() => {
			if (!loading && account === null) {
				router.back()
				router.push("/createAccount")
			}
		}, [loading, account, router]), // Dependencies go here
	)

	return (
		<View style={styles.container}>
			<ScrollView
				style={{
					flex: 1,
					backgroundColor: "black",
				}}
			>
				<View style={styles.bannerWrap}>
					<ImageBackground
						source={require("../../../assets/images/leaves.jpg")}
						style={styles.banner}
						imageStyle={styles.bannerImage}
						resizeMode="cover"
					/>

					{/* Avatar wrapper sits absolutely over the banner */}
					<View style={styles.avatarWrap}>
						<View style={styles.avatarBorder}>
							<Image
								source={{ uri: account?.avatarUri }} // replace with your avatar
								style={styles.avatar}
							/>
						</View>
					</View>
				</View>

				{/* Content below the avatar */}
				<View
					style={{
						alignItems: "center",
						marginTop: 20,
					}}
				>
					<Text
						style={{
							color: "white",
							fontFamily: "Bold",
							fontSize: 24,
						}}
					>
						{account?.name}
					</Text>
					<Text
						style={{
							color: "white",
							fontFamily: "Regular",
						}}
					>
						{account?.email}
					</Text>
				</View>
				<ImageBackground
					source={require("../../../assets/images/gradient.png")}
					style={{
						flexDirection: "row",
						marginTop: 20,
						marginHorizontal: 20,
						paddingVertical: 20,
						borderRadius: 10,
						overflow: "hidden",
					}}
					imageStyle={{ borderRadius: 10 }}
				>
					<View
						style={{
							flex: 1,
							alignItems: "center",
						}}
					>
						<Text
							style={{
								color: "white",
								fontFamily: "Regular",
								fontSize: 15,
								textShadowColor: "rgba(0,0,0,0.6)",
								textShadowOffset: { width: 0, height: 1 },
								textShadowRadius: 3,
							}}
						>
							Projects
						</Text>
						<Text
							style={{
								color: "white",
								fontFamily: "Regular",
								fontSize: 32,
								textShadowColor: "rgba(0,0,0,0.6)",
								textShadowOffset: { width: 0, height: 1 },
								textShadowRadius: 3,
							}}
						>
							{projects.length}
						</Text>
					</View>
					<View
						style={{
							flex: 1,
							alignItems: "center",
						}}
					>
						<Text
							style={{
								color: "white",
								fontFamily: "Regular",
								fontSize: 15,
								textShadowColor: "rgba(0,0,0,0.6)",
								textShadowOffset: { width: 0, height: 1 },
								textShadowRadius: 3,
							}}
						>
							Favorites
						</Text>
						<Text
							style={{
								color: "white",
								fontFamily: "Regular",
								fontSize: 32,
								textShadowColor: "rgba(0,0,0,0.6)",
								textShadowOffset: { width: 0, height: 1 },
								textShadowRadius: 3,
							}}
						>
							{projects.filter((p) => p.favorite).length}
						</Text>
					</View>
				</ImageBackground>
				<View
					style={{
						flexDirection: "row",
						marginTop: 20,
						marginHorizontal: 20,
						gap: 10,
					}}
				>
					<LinearGradient
						colors={["#1ED208", "#50E2CD"]}
						start={{ x: 0.14644661, y: 0.14644661 }}
						end={{ x: 0.85355339, y: 0.85355339 }}
						style={{
							flex: 0.9,
							padding: 10,
							borderRadius: 10,
						}}
					>
						<View>
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
								PROJECTS
							</Text>
						</View>
					</LinearGradient>
					<Pressable
						style={{
							flex: 1,
							backgroundColor: "#1f1f1f",
							justifyContent: "center",
							alignItems: "center",
							borderRadius: 10,
						}}
						onPress={() => {
							router.push("/account/create")

							// console.log(account)
						}}
					>
						<Ionicons name="add" color="white" size={20} />
					</Pressable>
				</View>
				<View
					style={{
						marginTop: 20,
					}}
				>
					{projects.map((project, index) => (
						<ProjectCard key={index} project={project} />
					))}
				</View>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#000" },
	bannerWrap: {
		height: 160,
		overflow: "visible",
	},
	banner: {
		flex: 1,
		margin: 20,
	},
	bannerImage: {
		width: "100%",
		height: "100%",
		borderRadius: 10,
	},
	avatarWrap: {
		position: "absolute",
		left: 0,
		right: 0,
		bottom: -10, // half of avatarBorder height to overlap
		alignItems: "center",
	},
	avatarBorder: {
		width: 110,
		height: 110,
		borderRadius: 55,
		backgroundColor: "#000",
		justifyContent: "center",
		alignItems: "center",
		// shadow (iOS)
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
		// elevation (Android)
		elevation: 6,
	},
	avatar: {
		width: 100,
		height: 100,
		borderRadius: 50,
	},
})
