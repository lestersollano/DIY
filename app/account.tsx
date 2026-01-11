import ProjectCard from "@/components/projectCard"
import Ionicons from "@react-native-vector-icons/ionicons"
import { LinearGradient } from "expo-linear-gradient"
import {
	Image,
	ImageBackground,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native"

export default function Account() {
	return (
		<View style={styles.container}>
			<View style={styles.bannerWrap}>
				<ImageBackground
					source={require("../assets/images/leaves.jpg")}
					style={styles.banner}
					imageStyle={styles.bannerImage}
					resizeMode="cover"
				/>
				{/* Avatar wrapper sits absolutely over the banner */}
				<View style={styles.avatarWrap}>
					<View style={styles.avatarBorder}>
						<Image
							source={require("../assets/images/profile.jpg")} // replace with your avatar
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
					Lester Matthew Sollano
				</Text>
				<Text
					style={{
						color: "white",
						fontFamily: "Regular",
					}}
				>
					lestermatthewsollano@gmail.com
				</Text>
			</View>
			<View
				style={{
					flexDirection: "row",
					backgroundColor: "#37D86B",
					marginTop: 20,
					marginHorizontal: 20,
					paddingVertical: 20,
					borderRadius: 10,
				}}
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
						20
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
						8
					</Text>
				</View>
			</View>
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
				<View
					style={{
						flex: 1,
						backgroundColor: "#1f1f1f",
						justifyContent: "center",
						alignItems: "center",
						borderRadius: 10,
					}}
				>
					<Ionicons name="add" color="white" size={20} />
				</View>
			</View>
			<ScrollView
				style={{
					marginTop: 20,
				}}
			>
				<ProjectCard
					title="Tin Can Organizer"
					author="Ric Magbitang"
					shortDescription="Turn simple tin cans into cute and useful organizers using burlap, lace, buttons, ribbon, and recycled paper for a fun and eco-friendly craft project."
					favorite={true}
				/>
				<ProjectCard
					title="Tin Can Organizer"
					author="Ric Magbitang"
					shortDescription="Turn simple tin cans into cute and useful organizers using burlap, lace, buttons, ribbon, and recycled paper for a fun and eco-friendly craft project."
					favorite={true}
				/>
				<ProjectCard
					title="Tin Can Organizer"
					author="Ric Magbitang"
					shortDescription="Turn simple tin cans into cute and useful organizers using burlap, lace, buttons, ribbon, and recycled paper for a fun and eco-friendly craft project."
					favorite={true}
				/>
				<ProjectCard
					title="Tin Can Organizer"
					author="Ric Magbitang"
					shortDescription="Turn simple tin cans into cute and useful organizers using burlap, lace, buttons, ribbon, and recycled paper for a fun and eco-friendly craft project."
					favorite={true}
				/>
				<ProjectCard
					title="Tin Can Organizer"
					author="Ric Magbitang"
					shortDescription="Turn simple tin cans into cute and useful organizers using burlap, lace, buttons, ribbon, and recycled paper for a fun and eco-friendly craft project."
					favorite={true}
				/>
				<ProjectCard
					title="Tin Can Organizer"
					author="Ric Magbitang"
					shortDescription="Turn simple tin cans into cute and useful organizers using burlap, lace, buttons, ribbon, and recycled paper for a fun and eco-friendly craft project."
					favorite={true}
				/>
				<ProjectCard
					title="Tin Can Organizer"
					author="Ric Magbitang"
					shortDescription="Turn simple tin cans into cute and useful organizers using burlap, lace, buttons, ribbon, and recycled paper for a fun and eco-friendly craft project."
					favorite={true}
				/>
				<ProjectCard
					title="Tin Can Organizer"
					author="Ric Magbitang"
					shortDescription="Turn simple tin cans into cute and useful organizers using burlap, lace, buttons, ribbon, and recycled paper for a fun and eco-friendly craft project."
					favorite={true}
				/>
				<ProjectCard
					title="Tin Can Organizer"
					author="Ric Magbitang"
					shortDescription="Turn simple tin cans into cute and useful organizers using burlap, lace, buttons, ribbon, and recycled paper for a fun and eco-friendly craft project."
					favorite={true}
				/>
				<ProjectCard
					title="Tin Can Organizer"
					author="Ric Magbitang"
					shortDescription="Turn simple tin cans into cute and useful organizers using burlap, lace, buttons, ribbon, and recycled paper for a fun and eco-friendly craft project."
					favorite={true}
				/>
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
