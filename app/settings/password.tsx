import HeaderBack from "@/components/headerBack"
import { useRouter } from "expo-router"
import { LockIcon, LockOpenIcon } from "lucide-react-native"
import { useState } from "react"
import {
	ImageBackground,
	Text,
	TextInput,
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
						Update your Password
					</Text>
					<Text
						style={{
							fontFamily: "Regular",
							color: "grey",
							textAlign: "center",
							marginBottom: 20,
						}}
					>
						Please enter your existing password and your new password.
					</Text>
					<Text
						style={{
							fontFamily: "Bold",
							color: "grey",
							marginBottom: 10,
						}}
					>
						Current Password
					</Text>
					<View
						style={{
							flexDirection: "row",
							padding: 10,
							alignItems: "center",
							gap: 20,
							borderRadius: 10,
							backgroundColor: "#2A2A2A",
							borderWidth: 1,
							borderStyle: "solid",
							borderColor: "#6B6B6B",
							marginBottom: 10,
						}}
					>
						<LockOpenIcon color="grey" />
						<TextInput
							style={{
								fontFamily: "Bold",
								color: "grey",
								flex: 1,
							}}
							value={password}
							onChangeText={(text) => {
								setPassword(text)
							}}
						/>
					</View>
					<Text
						style={{
							fontFamily: "Bold",
							color: "grey",
							marginBottom: 10,
						}}
					>
						New Password
					</Text>
					<View
						style={{
							flexDirection: "row",
							padding: 10,
							alignItems: "center",
							gap: 20,
							borderRadius: 10,
							backgroundColor: "#2A2A2A",
							borderWidth: 1,
							borderStyle: "solid",
							borderColor: "#6B6B6B",
							marginBottom: 10,
						}}
					>
						<LockIcon color="grey" />
						<TextInput
							style={{
								fontFamily: "Bold",
								color: "grey",
								flex: 1,
							}}
							value={newPassword}
							onChangeText={(text) => {
								setNewPassword(text)
							}}
						/>
					</View>
					<Text
						style={{
							color: "grey",
							fontFamily: "Regular",
							marginBottom: 10,
						}}
					>
						{" "}
					</Text>
					<TouchableOpacity
						style={{
							alignItems: "center",
							justifyContent: "center",
							backgroundColor:
								password.length >= 8 && newPassword.length >= 8
									? "#1ed208"
									: "#2a2a2a",
							padding: 10,
							borderRadius: 20,
						}}
						onPress={async () => {
							if (password.length >= 8 && newPassword.length >= 8) {
								router.back()
							}
						}}
					>
						<Text
							style={{
								fontFamily: "Bold",
								color:
									password.length >= 8 && newPassword.length >= 8
										? "white"
										: "grey",
							}}
						>
							SAVE
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ImageBackground>
	)
}
