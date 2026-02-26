import HeaderBack from "@/components/headerBack"
import { getUser, resetPassword } from "@/supabase/auth"
import { useRouter } from "expo-router"
import { useState } from "react"
import {
	Alert,
	ImageBackground,
	Text,
	TouchableOpacity,
	View,
} from "react-native"

export default function Password() {
	const router = useRouter()

	const [password, setPassword] = useState("")
	const [newPassword, setNewPassword] = useState("")

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
				<HeaderBack title="EMAIL" />
				<View
					style={{
						padding: 20,
						flex: 1,
					}}
				>
					<Text
						style={{
							fontFamily: "Bold",
							color: "white",
							fontSize: 24,
							textAlign: "center",
							marginVertical: 10,
						}}
					>
						Reset your Password
					</Text>
					<Text
						style={{
							fontFamily: "Regular",
							color: "grey",
							textAlign: "center",
							marginBottom: 20,
						}}
					>
						You can reset your password by pressing the button below. We will
						send you an email to continue the process.
					</Text>
					<TouchableOpacity
						style={{
							alignItems: "center",
							justifyContent: "center",
							backgroundColor: "#1ed208",
							padding: 10,
							borderRadius: 20,
						}}
						onPress={async () => {
							const data = await getUser()
							// @ts-ignore
							await resetPassword(data?.email)
							Alert.prompt(
								"Email sent!",
								"Please check your inbox in " + data?.email,
							)
						}}
					>
						<Text
							style={{
								fontFamily: "Bold",
								color: "white",
							}}
						>
							Reset Password
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ImageBackground>
	)
}
