import HeaderBack from "@/components/headerBack"
import { useAccount } from "@/lib/AccountContext"
import { useRouter } from "expo-router"
import { MailIcon } from "lucide-react-native"
import { useEffect, useState } from "react"
import {
	ImageBackground,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native"

export default function Email() {
	const router = useRouter()

	const { account, updateAccount } = useAccount()
	const [email, setEmail] = useState("")

	useEffect(() => {
		if (account) setEmail(account.email)
	}, [account])

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
							marginBottom: 10,
						}}
					>
						<MailIcon color="grey" />
						<TextInput
							style={{
								fontFamily: "Bold",
								color: "grey",
								flex: 1,
							}}
							value={email}
							onChangeText={(text) => {
								setEmail(text)
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
								email.includes("@") && email.includes(".com")
									? "#1ed208"
									: "#2a2a2a",
							padding: 10,
							borderRadius: 20,
						}}
						onPress={async () => {
							if (email.includes("@") && email.includes(".com")) {
								await updateAccount({ email: email })
								router.back()
							}
						}}
					>
						<Text
							style={{
								fontFamily: "Bold",
								color:
									email.includes("@") && email.includes(".com")
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
