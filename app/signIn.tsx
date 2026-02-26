import HeaderBack from "@/components/headerBack"
import { useAccount } from "@/lib/AccountContext"
import { signIn } from "@/supabase/auth"
import { fetchData } from "@/supabase/database"
import { useRouter } from "expo-router"
import { LockIcon, MailIcon } from "lucide-react-native"
import { useState } from "react"
import {
	ImageBackground,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native"

export default function SignIn() {
	const router = useRouter()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const { setAccount } = useAccount()

	return (
		<ImageBackground
			source={require("../assets/images/background.png")}
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
				<HeaderBack title="SIGN IN" />
				<View
					style={{
						padding: 20,
						flex: 1,
					}}
				>
					<Text
						style={{
							fontFamily: "Bold",
							color: "grey",
							marginBottom: 10,
						}}
					>
						Email
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
							marginBottom: 20,
						}}
					>
						<MailIcon color="grey" />
						<TextInput
							style={{
								fontFamily: "Bold",
								color: "grey",
								flex: 1,
							}}
							placeholder="Enter your email"
							placeholderTextColor="#666"
							value={email}
							onChangeText={(text) => setEmail(text)}
							keyboardType="email-address"
							autoCapitalize="none"
						/>
					</View>
					<Text
						style={{
							fontFamily: "Bold",
							color: "grey",
							marginBottom: 10,
						}}
					>
						Password
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
							marginBottom: 40,
						}}
					>
						<LockIcon color="grey" />
						<TextInput
							style={{
								fontFamily: "Bold",
								color: "grey",
								flex: 1,
							}}
							placeholder="Enter your password"
							placeholderTextColor="#666"
							value={password}
							onChangeText={(text) => setPassword(text)}
							secureTextEntry
						/>
					</View>
					<TouchableOpacity
						style={{
							alignItems: "center",
							justifyContent: "center",
							backgroundColor:
								email !== "" && password.length >= 8 ? "#1ed208" : "#2a2a2a",
							padding: 10,
							borderRadius: 20,
						}}
						onPress={async () => {
							if (email !== "" && password.length >= 8) {
								await signIn(email, password)

								const accounts = await fetchData("DIY Account Information")
								console.log(accounts)

								// await signOut()

								const user = await signIn(
									"lestermatthewsollano@gmail.com",
									"admin123",
								)
								const emaila = user.user.email
								const account = accounts.find((a) => a.email === emaila)
								const avatarURL = account.profileURL

								console.log(avatarURL)

								await setAccount(
									{
										id: account.id + "",
										name: account.username,
										// @ts-ignore
										email: emaila,
										avatarUri: account.profileURL,
									},
									account.avatarURL,
								)

								router.back()
							}
						}}
					>
						<Text
							style={{
								fontFamily: "Bold",
								color: email !== "" && password.length >= 8 ? "white" : "grey",
							}}
						>
							SIGN IN
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ImageBackground>
	)
}
