import ProjectCard from "@/components/projectCard"
import { LinearGradient } from "expo-linear-gradient"
import { ImageBackground, ScrollView, Text, View } from "react-native"

export default function Favorites() {
	return (
		<ImageBackground
			source={require("../../assets/images/background.png")}
			style={{
				flex: 1,
			}}
			resizeMode="cover"
		>
			<View
				style={{
					flex: 1,
				}}
			>
				<LinearGradient
					colors={["#1ED208", "#50E2CD"]}
					start={{ x: 0.14644661, y: 0.14644661 }}
					end={{ x: 0.85355339, y: 0.85355339 }}
					style={{
						margin: 20,
						paddingVertical: 15,
						borderRadius: 10,
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "center",
						marginBottom: 20,
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
								fontSize: 15,
								textShadowColor: "rgba(0,0,0,0.6)",
								textShadowOffset: { width: 0, height: 1 },
								textShadowRadius: 3,
								textAlign: "center",
							}}
						>
							FAVORITES
						</Text>
					</View>
				</LinearGradient>
				<ScrollView
					style={{
						flex: 1,
					}}
				>
					<ProjectCard
						title="Tin Can Organizer"
						author="Ric Magbitang"
						description="Turn simple tin cans into cute and useful organizers using burlap, lace, buttons, ribbon, and recycled paper for a fun and eco-friendly craft project."
						favorite={true}
					/>
				</ScrollView>
			</View>
		</ImageBackground>
	)
}
