import HeaderBack from "@/components/headerBack"
import { useAccount } from "@/lib/AccountContext"
import Ionicons from "@react-native-vector-icons/ionicons"
import { useRouter } from "expo-router"
import { ChevronRightIcon } from "lucide-react-native"
import {
	Image,
	ImageBackground,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native"

export default function Settings() {
	const router = useRouter()

	const { account } = useAccount()

	const handleAccount = () => {
		router.push("/settings/account")
	}
	return (
		<ImageBackground
			source={require("../../assets/images/background.png")}
			style={{ flex: 1, backgroundColor: "black" }}
			resizeMode="cover"
		>
			<View
				style={{
					flex: 1,
				}}
			>
				<HeaderBack title="SETTINGS" />
				<ScrollView>
					<TouchableOpacity
						onPress={handleAccount}
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
							marginTop: 20,
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
								source={
									account !== null
										? { uri: account.avatarUri }
										: require("../../assets/images/profile.jpg")
								}
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
									{account === null ? "-" : account.name}
								</Text>
								<Text
									style={{
										color: "white",
										fontFamily: "Regular",
										fontSize: 10,
									}}
								>
									{account === null ? "-" : account.email}
								</Text>
							</View>
						</View>
						<ChevronRightIcon color={"#6B6B6B"} />
					</TouchableOpacity>
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
					<TouchableOpacity
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
						onPress={handleAccount}
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
					</TouchableOpacity>
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
									Notifications
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
