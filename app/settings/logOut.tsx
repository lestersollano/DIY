import HeaderBack from "@/components/headerBack"
import { useAccount } from "@/lib/AccountContext"
import { useRouter } from "expo-router"
import { ImageBackground, Text, TouchableOpacity, View } from "react-native"

export default function LogOut() {
	const { clearAccount } = useAccount()
	const router = useRouter()

	const handlePress = async () => {
		await clearAccount()
		router.replace("/createAccount")
	}
	return (
		<ImageBackground
			source={require("../../assets/images/background.png")}
			style={{
				flex: 1,
				backgroundColor: "black",
			}}
			resizeMode="cover"
		>
			<View
				style={{
					flex: 1,
				}}
			>
				<HeaderBack title="LOG OUT" />
				<View
					style={{
						padding: 20,
						flex: 1,
					}}
				>
					<Text
						style={{
							color: "white",
							fontFamily: "Bold",
							fontSize: 20,
							textAlign: "center",
							marginVertical: 20,
						}}
					>
						Are you sure you want to log out of your account?
					</Text>
					<View
						style={{
							flex: 1,
							justifyContent: "flex-end",
						}}
					>
						<TouchableOpacity
							style={{
								backgroundColor: "lime",
								padding: 20,
								borderRadius: 40,
							}}
							onPress={handlePress}
						>
							<Text
								style={{
									color: "white",
									fontFamily: "Bold",
									fontSize: 20,
									textAlign: "center",
								}}
							>
								YES
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</ImageBackground>
	)
}
