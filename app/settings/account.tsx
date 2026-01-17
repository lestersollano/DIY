import HeaderBack from "@/components/headerBack"
import { Account as AccountType } from "@/interfaces/interfaces"
import { useAccount } from "@/lib/AccountContext"
import * as ImagePicker from "expo-image-picker"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"
import { PlusIcon } from "lucide-react-native"
import React, { useEffect, useState } from "react"
import {
	Image,
	ImageBackground,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native"

function Account() {
	const router = useRouter()
	const { account, setAccount, updateAccount, clearAccount } = useAccount()
	const [acc, setAcc] = useState<AccountType>({
		id: "user",
		name: "",
		email: "",
		createdAt: Date.now(),
	})

	const pickAvatar = async () => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

		if (status !== "granted") {
			alert("Permission required to select images")
			return
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			quality: 0.8,
			allowsEditing: true,
			aspect: [1, 1],
		})

		if (!result.canceled) {
			const uri = result.assets[0].uri

			// Update local preview immediately
			setAcc((prev) => ({
				...prev,
				avatarUri: uri,
			}))
		}
	}

	useEffect(() => {
		if (account) {
			setAcc(account)
		}
	}, [account])

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
				<HeaderBack title="ACCOUNT SETTINGS" />
				<View
					style={{
						flex: 1,
						alignItems: "center",
						gap: 20,
					}}
				>
					<TouchableOpacity onPress={pickAvatar}>
						{acc.avatarUri ? (
							<Image
								source={{ uri: acc.avatarUri }}
								style={{
									width: 200,
									height: 200,
									borderRadius: 100,
									marginTop: 40,
								}}
								resizeMode="contain"
							/>
						) : (
							<View
								style={{
									backgroundColor: "#1f1f1f",
									width: 200,
									height: 200,
									borderRadius: 100,
									marginTop: 40,
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<PlusIcon color={"grey"} />
								<Text
									style={{
										fontFamily: "Regular",
										color: "grey",
									}}
								>
									Select Image
								</Text>
							</View>
						)}
					</TouchableOpacity>
					<TextInput
						value={acc.name}
						onChangeText={(text) => {
							setAcc((prev) => ({
								...prev,
								name: text,
							}))
							console.log(acc.avatarUri)
						}}
						placeholder="Name"
						placeholderTextColor="grey"
						style={{
							fontFamily: "Bold",
							color: "white",
							fontSize: 24,
						}}
					/>
					<TextInput
						value={acc.email}
						onChangeText={(text) => {
							setAcc((prev) => ({
								...prev,
								email: text,
							}))
							console.log(text)
						}}
						placeholder="Name"
						placeholderTextColor="grey"
						style={{
							fontFamily: "Regular",
							color: "white",
						}}
					/>
				</View>
				<TouchableOpacity
					onPress={async () => {
						if (!account) {
							await setAccount(acc, acc.avatarUri)
						} else {
							await updateAccount(
								{
									name: acc.name,
									email: acc.email,
								},
								acc.avatarUri // temp image URI
							)
						}
						router.back()
					}}
				>
					<LinearGradient
						colors={["#1ED208", "#50E2CD"]}
						start={{ x: 0.14644661, y: 0.14644661 }}
						end={{ x: 0.85355339, y: 0.85355339 }}
						style={{
							marginHorizontal: 20,
							paddingVertical: 20,
							borderRadius: 40,
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "center",
							marginTop: 40,
						}}
					>
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
							SAVE
						</Text>
					</LinearGradient>
				</TouchableOpacity>
			</View>
		</ImageBackground>
	)
}

export default Account
