import { LinearGradient } from "expo-linear-gradient"
import { SearchIcon } from "lucide-react-native"
import {
	Image,
	ImageBackground,
	Pressable,
	ScrollView,
	Text,
	View,
} from "react-native"
import ProjectCard from "../components/projectCard"

export default function Index() {
	return (
		<ImageBackground
			source={require("../assets/images/background.png")}
			style={{ flex: 1 }}
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
						source={require("../assets/images/transparent.png")}
						style={{ width: 125, height: 125, marginLeft: 10 }}
						resizeMode="contain"
					/>
					<Image
						source={require("../assets/images/profile.jpg")}
						style={{ width: 50, height: 50, marginRight: 20, borderRadius: 10 }}
						resizeMode="contain"
					/>
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
					<Text
						style={{
							color: "#6B6B6B",
							fontFamily: "Regular",
							fontSize: 12,
						}}
					>
						Search
					</Text>
				</View>
				<View
					style={{
						marginHorizontal: 20,
						flexDirection: "row",
						justifyContent: "space-between",
						marginBottom: 20,
						gap: 20,
					}}
				>
					<Pressable style={{}}>
						<LinearGradient
							colors={["#1ED208", "#50E2CD"]}
							start={{ x: 0.14644661, y: 0.14644661 }}
							end={{ x: 0.85355339, y: 0.85355339 }}
							style={{
								padding: 10,
								borderRadius: 10,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
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
						</LinearGradient>
					</Pressable>
					<Pressable
						style={{
							padding: 10,
							borderRadius: 10,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							backgroundColor: "#1F1F1F",
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
							backgroundColor: "#1F1F1F",
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
							backgroundColor: "#1F1F1F",
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
					}}
				>
					<ProjectCard />
					<ProjectCard />
					<ProjectCard />
					<ProjectCard />
					<ProjectCard />
					<ProjectCard />
					<ProjectCard />
					<ProjectCard />
					<ProjectCard />
					<ProjectCard />
					<ProjectCard />
					<ProjectCard />
					<ProjectCard />
					<ProjectCard />
					<ProjectCard />
				</ScrollView>
			</View>
		</ImageBackground>
	)
}
