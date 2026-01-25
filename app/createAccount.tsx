import HeaderBack from "@/components/headerBack"
import type { Account } from "@/interfaces/interfaces"
import { useAccount } from "@/lib/AccountContext"
import * as ImagePicker from "expo-image-picker"
import { useRouter } from "expo-router"
import { MailIcon, PlusIcon, UserIcon } from "lucide-react-native"
import { useState } from "react"
import {
	Image,
	ImageBackground,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native"

export default function CreateAccount() {
	const router = useRouter()
	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images"],
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		})

		if (!result.canceled) {
			// result.assets[0].uri contains the local path to the image
			setForm((prev) => ({
				...prev,
				avatarUri: result.assets[0].uri,
			}))
		}
	}

	const { setAccount } = useAccount()
	const [form, setForm] = useState<Account>({
		id: "",
		name: "",
		email: "",
		avatarUri: "",
		createdAt: Date.now(),
	})
	const [password, setPassword] = useState("")

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
				<HeaderBack title="CREATE ACCOUNT" />
				<View
					style={{
						padding: 20,
						flex: 1,
					}}
				>
					<View
						style={{
							alignItems: "center",
							marginTop: 20,
						}}
					>
						<TouchableOpacity
							style={{
								backgroundColor: "#2A2A2A",
								width: 100,
								height: 100,
								borderWidth: 1,
								borderStyle: "solid",
								borderColor: "#6B6B6B",
								marginBottom: 20,
								borderRadius: 50,
								justifyContent: "center",
								alignItems: "center",
							}}
							onPress={pickImage}
						>
							{form.avatarUri === "" ? (
								<PlusIcon color={"grey"} />
							) : (
								<Image
									source={{ uri: form.avatarUri }}
									style={{
										width: 98,
										height: 98,
										borderRadius: 50,
									}}
									resizeMode="cover"
								/>
							)}
						</TouchableOpacity>
					</View>
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
							value={form.name}
							onChangeText={(text) => {
								setForm((prev) => ({
									...prev,
									name: text,
								}))
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
							value={form.email}
							onChangeText={(text) => {
								setForm((prev) => ({
									...prev,
									email: text,
								}))
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
						<UserIcon color="grey" />
						<TextInput
							style={{
								fontFamily: "Bold",
								color: "grey",
								flex: 1,
							}}
							value={password}
							onChangeText={(text) => setPassword(text)}
						/>
					</View>
					<TouchableOpacity
						style={{
							alignItems: "center",
							justifyContent: "center",
							backgroundColor:
								form.avatarUri !== "" &&
								form.email !== "" &&
								form.name !== "" &&
								password.length >= 8
									? "#1ed208"
									: "#2a2a2a",
							padding: 10,
							borderRadius: 20,
						}}
						onPress={async () => {
							if (
								form.avatarUri !== "" &&
								form.email !== "" &&
								form.name !== "" &&
								password.length >= 8
							) {
								await setAccount(form, form.avatarUri)
								router.back()
							}
						}}
					>
						<Text
							style={{
								fontFamily: "Bold",
								color:
									form.avatarUri !== "" &&
									form.email !== "" &&
									form.name !== "" &&
									password.length >= 8
										? "white"
										: "grey",
							}}
						>
							CREATE
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ImageBackground>
	)
}
