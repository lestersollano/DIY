import Ionicons from "@react-native-vector-icons/ionicons"
import { LinearGradient } from "expo-linear-gradient"
import { ChevronRightIcon } from "lucide-react-native"
import { Image, ImageBackground, ScrollView, Text, View } from "react-native"

export default function Settings() {
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
					<View style={{ flex: 1 }}>
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
							SETTINGS
						</Text>
					</View>
				</LinearGradient>
				<ScrollView>
					<View
						style={{
							marginHorizontal: 20,
							paddingVertical: 20,
							paddingHorizontal: 30,
							backgroundColor: "#2A2A2A",
							borderWidth: 1,
							borderStyle: "solid",
							borderColor: "#6B6B6B",
							borderRadius: 10,
							justifyContent: "space-between",
							flexDirection: "row",
							alignItems: "center",
							marginBottom: 40,
						}}
					>
						<View
							style={{
								flexDirection: "row",
								gap: 20,
								alignItems: "center",
							}}
						>
							<Image
								source={require("../assets/images/profile.jpg")}
								style={{
									width: 64,
									height: 64,
									borderRadius: 32,
									borderWidth: 1,
									borderColor: "#6B6B6B",
								}}
								resizeMode="contain"
							/>
							<View>
								<Text
									style={{
										color: "white",
										fontFamily: "Bold",
										fontSize: 12,
									}}
								>
									Lester Matthew Sollano
								</Text>
								<Text
									style={{
										color: "white",
										fontFamily: "Regular",
										fontSize: 10,
									}}
								>
									lestermatthewsollano@gmail.com
								</Text>
							</View>
						</View>
						<ChevronRightIcon color={"#6B6B6B"} />
					</View>
					<Text
						style={{
							color: "#6B6B6B",
							fontFamily: "Bold",
							marginLeft: 20,
							marginBottom: 20,
						}}
					>
						OTHER SETTINGS
					</Text>
					<View
						style={{
							marginHorizontal: 20,
							paddingVertical: 20,
							paddingHorizontal: 30,
							backgroundColor: "#2A2A2A",
							borderWidth: 1,
							borderStyle: "solid",
							borderColor: "#6B6B6B",
							borderBottomWidth: 0,
							borderTopRightRadius: 10,
							borderTopLeftRadius: 10,
							justifyContent: "space-between",
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						<View
							style={{
								flexDirection: "row",
								gap: 20,
								alignItems: "center",
							}}
						>
							<Ionicons name="person-outline" size={32} color={"white"} />
							<View>
								<Text
									style={{
										color: "white",
										fontFamily: "Bold",
										fontSize: 12,
									}}
								>
									Profile Details
								</Text>
							</View>
						</View>
						<ChevronRightIcon color={"#6B6B6B"} />
					</View>
					<View
						style={{
							borderBottomWidth: 0,

							marginHorizontal: 20,
							paddingVertical: 20,
							paddingHorizontal: 30,
							backgroundColor: "#2A2A2A",
							borderWidth: 1,
							borderStyle: "solid",
							borderColor: "#6B6B6B",
							justifyContent: "space-between",
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						<View
							style={{
								flexDirection: "row",
								gap: 20,
								alignItems: "center",
							}}
						>
							<Ionicons name="lock-closed-outline" size={32} color={"white"} />
							<View>
								<Text
									style={{
										color: "white",
										fontFamily: "Bold",
										fontSize: 12,
									}}
								>
									Password
								</Text>
							</View>
						</View>
						<ChevronRightIcon color={"#6B6B6B"} />
					</View>
					<View
						style={{
							marginHorizontal: 20,
							paddingVertical: 20,
							paddingHorizontal: 30,
							backgroundColor: "#2A2A2A",
							borderWidth: 1,
							borderStyle: "solid",
							borderColor: "#6B6B6B",
							justifyContent: "space-between",
							flexDirection: "row",
							alignItems: "center",
							borderBottomLeftRadius: 10,
							borderBottomRightRadius: 10,
							marginBottom: 20,
						}}
					>
						<View
							style={{
								flexDirection: "row",
								gap: 20,
								alignItems: "center",
							}}
						>
							<Ionicons
								name="notifications-outline"
								size={32}
								color={"white"}
							/>
							<View>
								<Text
									style={{
										color: "white",
										fontFamily: "Bold",
										fontSize: 12,
									}}
								>
									Password
								</Text>
							</View>
						</View>
						<ChevronRightIcon color={"#6B6B6B"} />
					</View>
					<View
						style={{
							marginHorizontal: 20,
							paddingVertical: 20,
							paddingHorizontal: 30,
							backgroundColor: "#2A2A2A",
							borderWidth: 1,
							borderStyle: "solid",
							borderColor: "#6B6B6B",
							borderBottomWidth: 0,
							borderTopRightRadius: 10,
							borderTopLeftRadius: 10,
							justifyContent: "space-between",
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						<View
							style={{
								flexDirection: "row",
								gap: 20,
								alignItems: "center",
							}}
						>
							<Ionicons
								name="information-circle-outline"
								size={32}
								color={"white"}
							/>
							<View>
								<Text
									style={{
										color: "white",
										fontFamily: "Bold",
										fontSize: 12,
									}}
								>
									About Application
								</Text>
							</View>
						</View>
						<ChevronRightIcon color={"#6B6B6B"} />
					</View>
					<View
						style={{
							marginHorizontal: 20,
							paddingVertical: 20,
							paddingHorizontal: 30,
							backgroundColor: "#2A2A2A",
							borderWidth: 1,
							borderStyle: "solid",
							borderColor: "#6B6B6B",
							justifyContent: "space-between",
							flexDirection: "row",
							alignItems: "center",
							borderBottomLeftRadius: 10,
							borderBottomRightRadius: 10,
							marginBottom: 20,
						}}
					>
						<View
							style={{
								flexDirection: "row",
								gap: 20,
								alignItems: "center",
							}}
						>
							<Ionicons name="help-circle-outline" size={32} color={"white"} />
							<View>
								<Text
									style={{
										color: "white",
										fontFamily: "Bold",
										fontSize: 12,
									}}
								>
									Help/FAQ
								</Text>
							</View>
						</View>
						<ChevronRightIcon color={"#6B6B6B"} />
					</View>
				</ScrollView>
			</View>
		</ImageBackground>
	)
}
