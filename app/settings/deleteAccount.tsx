import HeaderBack from "@/components/headerBack"
import { useAccount } from "@/lib/AccountContext"
import { useRouter } from "expo-router"
import { ImageBackground, Text, TouchableOpacity, View } from "react-native"

export default function DeleteAccount() {
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
				<HeaderBack title="DELETE ACCOUNT" />
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
						Are you sure you want to delete your account?
					</Text>
					<Text
						style={{
							color: "grey",
							fontFamily: "Regular",
							textAlign: "center",
							lineHeight: 24,
							marginBottom: 20,
						}}
					>
						This action is permanent and will erase all your data. You will not
						be able to restore your account once deleted.
					</Text>
					<View
						style={{
							flex: 1,
							justifyContent: "flex-end",
						}}
					>
						<TouchableOpacity
							style={{
								backgroundColor: "red",
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
