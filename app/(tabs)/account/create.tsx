import { useAccount } from "@/lib/AccountContext"
import { insertData } from "@/supabase/database"
import { uploadImage } from "@/supabase/storage"
import Ionicons from "@react-native-vector-icons/ionicons"
import * as ImagePicker from "expo-image-picker"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"
import { useState } from "react"
import {
	Image,
	ImageBackground,
	KeyboardAvoidingView,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native"

export default function Create() {
	const { account } = useAccount()

	const [form, setForm] = useState({
		imageUri: "",
		title: "",
		description: "",
		materials: [""],
		instructions: [""],
		notes: "",
		mainMaterial: "",
		author: account?.name,
		youtubeURL: "",
	})

	const updateField = (key: string, value: string) => {
		setForm((prev) => ({
			...prev,
			[key]: value,
		}))
	}

	const updateMaterial = (index: number, value: string) => {
		setForm((prev) => {
			const updated = [...prev.materials]
			updated[index] = value

			return {
				...prev,
				materials: updated,
			}
		})
	}

	const addMaterial = () => {
		setForm((prev) => ({
			...prev,
			materials: [...prev.materials, ""],
		}))
	}

	const removeMaterial = (index: number) => {
		if (form.materials.length === 1) return
		setForm((prev) => ({
			...prev,
			materials: prev.materials.filter((_, i) => i !== index),
		}))
	}

	const updateInstruction = (index: number, value: string) => {
		setForm((prev) => {
			const updated = [...prev.instructions]
			updated[index] = value

			return {
				...prev,
				instructions: updated,
			}
		})
	}

	const addInstruction = () => {
		setForm((prev) => ({
			...prev,
			instructions: [...prev.instructions, ""],
		}))
	}

	const removeInstruction = (index: number) => {
		if (form.instructions.length === 1) return
		setForm((prev) => ({
			...prev,
			instructions: prev.instructions.filter((_, i) => i !== index),
		}))
	}

	// const resetForm = () => {
	// 	setForm({
	// 		imageUri: "",
	// 		title: "",
	// 		description: "",
	// 		materials: [""],
	// 		instructions: [""],
	// 		notes: "",
	// 		mainMaterial: "",
	// 		author: "",
	// 	})
	// }

	const router = useRouter()

	const requestPermission = async () => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

		if (status !== "granted") {
			alert("Permission to access gallery is required!")
			return false
		}
		return true
	}

	const pickImage = async () => {
		const hasPermission = await requestPermission()
		if (!hasPermission) return

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 1,
		})

		if (!result.canceled) {
			const selectedUri = result.assets[0].uri
			updateField("imageUri", selectedUri)
		}
	}

	return (
		<ImageBackground
			source={require("../../../assets/images/background.png")}
			style={{
				flex: 1,
				backgroundColor: "black",
			}}
			resizeMode="cover"
		>
			<KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
				<ScrollView
					style={{
						flex: 1,
					}}
				>
					<View
						style={{
							justifyContent: "space-between",
							flexDirection: "row",
							alignItems: "center",
							marginTop: 20,
							marginHorizontal: 20,
						}}
					>
						<TouchableOpacity
							style={{
								backgroundColor: "#1ED208",
								alignSelf: "flex-start",
								borderRadius: 10,
								padding: 10,
							}}
							onPress={() => {
								router.back()
							}}
						>
							<Ionicons size={24} name="chevron-back-outline" color={"white"} />
						</TouchableOpacity>
						<Text
							style={{
								color: "#6B6B6B",
								fontFamily: "Regular",
								fontSize: 12,
							}}
						>
							Create New Project
						</Text>
					</View>
					<View
						style={{
							marginTop: 20,
							marginHorizontal: 20,
						}}
					>
						<Text
							style={{
								color: "white",
								fontFamily: "Bold",
								fontSize: 12,
							}}
						>
							1. SEND A PICTURE
						</Text>
						<View
							style={{
								flexDirection: "row",
							}}
						>
							<TouchableOpacity
								style={{
									marginTop: 20,
									aspectRatio: 16 / 9,
									alignItems: "center",
									flex: 1,
									borderRadius: 10,
									shadowColor: "#ffffff",
									shadowOpacity: 0.4,
									shadowRadius: 15,
									elevation: 15,
									backgroundColor: "#1f1f1f",
									justifyContent: "center",
								}}
								onPress={pickImage}
							>
								{form.imageUri !== "" ? (
									<Image
										source={{ uri: form.imageUri }}
										style={{
											flex: 1,
											width: "100%",
											borderRadius: 10,
										}}
										resizeMode="cover"
									/>
								) : (
									<>
										<Ionicons name="add-outline" color={"grey"} size={32} />
										<Text
											style={{
												color: "grey",
												fontFamily: "Regular",
												fontSize: 12,
											}}
										>
											Click to upload
										</Text>
									</>
								)}
							</TouchableOpacity>
						</View>
					</View>
					<View
						style={{
							marginTop: 20,
							marginHorizontal: 20,
						}}
					>
						<Text
							style={{
								color: "white",
								fontFamily: "Bold",
								fontSize: 12,
							}}
						>
							2. TITLE
						</Text>
						<TextInput
							style={{
								fontFamily: "Regular",
								borderBottomColor: "grey",
								borderBottomWidth: 1,
								borderStyle: "solid",
								color: "white",
							}}
							placeholder="Title"
							placeholderTextColor={"grey"}
							value={form.title}
							onChangeText={(text) =>
								setForm((prev) => ({ ...prev, title: text }))
							}
						/>
					</View>
					<View
						style={{
							marginTop: 20,
							marginHorizontal: 20,
						}}
					>
						<Text
							style={{
								color: "white",
								fontFamily: "Bold",
								fontSize: 12,
							}}
						>
							3. SHORT DESCRIPTION
						</Text>
						<TextInput
							style={{
								fontFamily: "Regular",
								borderBottomColor: "grey",
								borderBottomWidth: 1,
								borderStyle: "solid",
								color: "white",
							}}
							placeholder="Short description about the project"
							placeholderTextColor={"grey"}
							value={form.description}
							onChangeText={(text) =>
								setForm((prev) => ({
									...prev,
									description: text,
								}))
							}
							multiline
						/>
					</View>
					<View
						style={{
							marginTop: 20,
							marginHorizontal: 20,
						}}
					>
						<Text
							style={{
								color: "white",
								fontFamily: "Bold",
								fontSize: 12,
							}}
						>
							4. MATERIALS
						</Text>
						{form.materials.map((material, index) => (
							<View
								key={index}
								style={{
									flexDirection: "row",
									gap: 20,
									alignItems: "center",
								}}
							>
								<TextInput
									style={{
										fontFamily: "Regular",
										borderBottomColor: "grey",
										borderBottomWidth: 1,
										borderStyle: "solid",
										color: "white",
										marginBottom: 20,
										flex: 1,
									}}
									placeholder="Materials to be used"
									placeholderTextColor={"grey"}
									value={material}
									onChangeText={(text) => updateMaterial(index, text)}
								/>
								<TouchableOpacity
									style={{
										backgroundColor: "#1f1f1f",
										width: 32,
										height: 32,
										justifyContent: "center",
										alignItems: "center",
										borderRadius: 10,
									}}
									onPress={() => {
										removeMaterial(index)
									}}
								>
									<Ionicons name="remove-outline" color={"grey"} size={24} />
								</TouchableOpacity>
							</View>
						))}

						<TouchableOpacity
							style={{
								backgroundColor: "#1f1f1f",
								flex: 1,
								height: 40,
								borderRadius: 20,
								alignItems: "center",
								justifyContent: "center",
							}}
							onPress={addMaterial}
						>
							<Ionicons name="add-outline" color={"grey"} size={24} />
						</TouchableOpacity>
					</View>
					<View
						style={{
							marginTop: 20,
							marginHorizontal: 20,
						}}
					>
						<Text
							style={{
								color: "white",
								fontFamily: "Bold",
								fontSize: 12,
							}}
						>
							5. INSTRUCTIONS
						</Text>
						{form.instructions.map((instruction, index) => (
							<View
								key={index}
								style={{
									flexDirection: "row",
									gap: 20,
									alignItems: "center",
								}}
							>
								<Text style={{ color: "grey" }}>{index + 1}.</Text>
								<TextInput
									style={{
										fontFamily: "Regular",
										borderBottomColor: "grey",
										borderBottomWidth: 1,
										borderStyle: "solid",
										color: "white",
										marginBottom: 20,
										flex: 1,
									}}
									placeholder={`Step by step guide`}
									placeholderTextColor={"grey"}
									value={instruction}
									onChangeText={(text) => updateInstruction(index, text)}
									multiline
								/>
								<TouchableOpacity
									style={{
										backgroundColor: "#1f1f1f",
										width: 32,
										height: 32,
										justifyContent: "center",
										alignItems: "center",
										borderRadius: 10,
									}}
									onPress={() => {
										removeInstruction(index)
									}}
								>
									<Ionicons name="remove-outline" color={"grey"} size={24} />
								</TouchableOpacity>
							</View>
						))}

						<TouchableOpacity
							style={{
								backgroundColor: "#1f1f1f",
								flex: 1,
								height: 40,
								borderRadius: 20,
								alignItems: "center",
								justifyContent: "center",
							}}
							onPress={addInstruction}
						>
							<Ionicons name="add-outline" color={"grey"} size={24} />
						</TouchableOpacity>
					</View>
					<View
						style={{
							marginTop: 20,
							marginHorizontal: 20,
						}}
					>
						<Text
							style={{
								color: "white",
								fontFamily: "Bold",
								fontSize: 12,
							}}
						>
							6. NOTES
						</Text>
						<TextInput
							style={{
								fontFamily: "Regular",
								borderBottomColor: "grey",
								borderBottomWidth: 1,
								borderStyle: "solid",
								color: "white",
							}}
							placeholder="Notes to be mindful of"
							placeholderTextColor={"grey"}
							value={form.notes}
							onChangeText={(text) =>
								setForm((prev) => ({ ...prev, notes: text }))
							}
							multiline
						/>
					</View>
					<View
						style={{
							marginTop: 20,
							marginHorizontal: 20,
						}}
					>
						<Text
							style={{
								color: "white",
								fontFamily: "Bold",
								fontSize: 12,
							}}
						>
							7. MAIN MATERIAL
						</Text>
						<View
							style={{
								flexDirection: "row",
								paddingVertical: 10,
								gap: 10,
								flexWrap: "wrap",
								justifyContent: "center",
							}}
						>
							<TouchableOpacity
								style={{
									backgroundColor:
										form.mainMaterial === "Paper" ? "#1ED208" : "grey",
									padding: 10,
									borderRadius: 10,
								}}
								onPress={() => {
									setForm((prev) => ({
										...prev,
										mainMaterial: "Paper",
									}))
								}}
							>
								<Text
									style={{
										color: "white",
										fontFamily: "Bold",
										textShadowColor: "rgba(0,0,0,0.6)",
										textShadowOffset: {
											width: 0,
											height: 1,
										},
										textShadowRadius: 3,
									}}
								>
									Paper
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={{
									backgroundColor:
										form.mainMaterial === "Plastic Wrapper"
											? "#1ED208"
											: "grey",
									padding: 10,
									borderRadius: 10,
								}}
								onPress={() => {
									setForm((prev) => ({
										...prev,
										mainMaterial: "Plastic Wrapper",
									}))
								}}
							>
								<Text
									style={{
										color: "white",
										fontFamily: "Bold",
										textShadowColor: "rgba(0,0,0,0.6)",
										textShadowOffset: {
											width: 0,
											height: 1,
										},
										textShadowRadius: 3,
									}}
								>
									Plastic Wrapper
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={{
									backgroundColor:
										form.mainMaterial === "Metal Can" ? "#1ED208" : "grey",
									padding: 10,
									borderRadius: 10,
								}}
								onPress={() => {
									setForm((prev) => ({
										...prev,
										mainMaterial: "Metal Can",
									}))
								}}
							>
								<Text
									style={{
										color: "white",
										fontFamily: "Bold",
										textShadowColor: "rgba(0,0,0,0.6)",
										textShadowOffset: {
											width: 0,
											height: 1,
										},
										textShadowRadius: 3,
									}}
								>
									Metal Can
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={{
									backgroundColor:
										form.mainMaterial === "Plastic Bag" ? "#1ED208" : "grey",
									padding: 10,
									borderRadius: 10,
								}}
								onPress={() => {
									setForm((prev) => ({
										...prev,
										mainMaterial: "Plastic Bag",
									}))
								}}
							>
								<Text
									style={{
										color: "white",
										fontFamily: "Bold",
										textShadowColor: "rgba(0,0,0,0.6)",
										textShadowOffset: {
											width: 0,
											height: 1,
										},
										textShadowRadius: 3,
									}}
								>
									Plastic Bag
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={{
									backgroundColor:
										form.mainMaterial === "Plastic Bottle" ? "#1ED208" : "grey",
									padding: 10,
									borderRadius: 10,
								}}
								onPress={() => {
									setForm((prev) => ({
										...prev,
										mainMaterial: "Plastic Bottle",
									}))
								}}
							>
								<Text
									style={{
										color: "white",
										fontFamily: "Bold",
										textShadowColor: "rgba(0,0,0,0.6)",
										textShadowOffset: {
											width: 0,
											height: 1,
										},
										textShadowRadius: 3,
									}}
								>
									Plastic Bottle
								</Text>
							</TouchableOpacity>
						</View>
					</View>
					<View
						style={{
							marginTop: 20,
							marginHorizontal: 20,
						}}
					>
						<Text
							style={{
								color: "white",
								fontFamily: "Bold",
								fontSize: 12,
							}}
						>
							8. YOUTUBE URL
						</Text>
						<TextInput
							style={{
								fontFamily: "Regular",
								borderBottomColor: "grey",
								borderBottomWidth: 1,
								borderStyle: "solid",
								color: "white",
							}}
							placeholder="Notes to be mindful of"
							placeholderTextColor={"grey"}
							value={form.youtubeURL}
							onChangeText={(text) =>
								setForm((prev) => ({ ...prev, youtubeURL: text }))
							}
							multiline
						/>
					</View>
					<TouchableOpacity
						onPress={async () => {
							console.log(form)
							const img = await uploadImage(
								"https://lestersollano-diy-yolo.hf.space/upload",
								form.imageUri,
							)
							await insertData("DIY Project", { ...form, imageUri: img.url })
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
								marginBottom: 300,
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
								PUBLISH
							</Text>
						</LinearGradient>
					</TouchableOpacity>
				</ScrollView>
			</KeyboardAvoidingView>
		</ImageBackground>
	)
}
