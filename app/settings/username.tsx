import HeaderBack from "@/components/headerBack"
import { useAccount } from "@/lib/AccountContext"
import { getUser } from "@/supabase/auth"
import { fetchData, updateData } from "@/supabase/database"
import { useRouter } from "expo-router"
import { UserIcon } from "lucide-react-native"
import { useEffect, useState } from "react"
import {
	ImageBackground,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native"

export default function Username() {
	const router = useRouter()

	const { account, updateAccount } = useAccount()
	const [username, setUsername] = useState("")

	useEffect(() => {
		if (account) setUsername(account.name)
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
				<HeaderBack title="USERNAME" />
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
						Username
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
						<UserIcon color="grey" />
						<TextInput
							style={{
								fontFamily: "Bold",
								color: "grey",
								flex: 1,
							}}
							value={username}
							onChangeText={(text) => {
								setUsername(text)
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
						Please only use numbers, letters, underscore _, or periods.
					</Text>
					<TouchableOpacity
						style={{
							alignItems: "center",
							justifyContent: "center",
							backgroundColor: username !== "" ? "#1ed208" : "#2a2a2a",
							padding: 10,
							borderRadius: 20,
						}}
						onPress={async () => {
							if (username !== "") {
								//@ts-ignore
								const { email } = await getUser()
								const data = await fetchData("DIY Account Information")
								const id = data.find((item) => item.email == email).id
								await updateData(
									"DIY Account Information",
									{ username: username },
									id,
								)
								await updateAccount({ name: username })
								router.back()
							}
						}}
					>
						<Text
							style={{
								fontFamily: "Bold",
								color: username !== "" ? "white" : "grey",
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
