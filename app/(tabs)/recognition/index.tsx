/* eslint-disable @typescript-eslint/no-unused-vars */
import HeaderBack from "@/components/headerBack"
import axios from "axios"
import { CameraView, useCameraPermissions } from "expo-camera"
import { useRouter } from "expo-router"
import { Loader2Icon } from "lucide-react-native"
import { useEffect, useRef, useState } from "react"
import { Animated, Easing, Text, TouchableOpacity, View } from "react-native"

export default function Recognition() {
	const [permission, requestPermission] = useCameraPermissions()
	const cameraRef = useRef<any>(null)
	const [loading, setLoading] = useState(false)
	const [material, setMaterial] = useState("")
	const [recyclable, setRecyclable] = useState(false)
	const [photoURI, setPhotoURI] = useState("")
	const spinValue = useRef(new Animated.Value(0)).current
	const router = useRouter()

	useEffect(() => {
		// 2. Define the animation loop
		const startAnimation = () => {
			spinValue.setValue(0)
			Animated.timing(spinValue, {
				toValue: 1,
				duration: 1500, // Speed of rotation (1.5 seconds)
				easing: Easing.linear, // Smooth constant speed
				useNativeDriver: true, // Crucial for performance
			}).start(() => startAnimation()) // Loop it
		}

		startAnimation()
	}, [spinValue])

	// 3. Map the 0-1 value to 0-360 degrees
	const spin = spinValue.interpolate({
		inputRange: [0, 1],
		outputRange: ["0deg", "360deg"],
	})

	useEffect(() => {
		requestPermission()
	}, [])

	useEffect(() => {
		if (loading) {
			setMaterial("")
		}
	}, [loading])

	const takePicture = async () => {
		if (cameraRef.current) {
			// @ts-ignore
			console.log("took photo")
			const photo = await cameraRef.current.takePictureAsync({
				quality: 0.5,
			})
			console.log(photo.uri)
			setPhotoURI(photo.uri)
			return photo
		}
	}

	const updateMaterial = async (mat: string) => {
		console.log(mat)
		if (mat === "plastic-bottle") {
			setMaterial("PLASTIC BOTTLE")
		} else if (mat === "plastic-bag") {
			setMaterial("PLASTIC BAG")
		} else if (mat === "cardboard") {
			setMaterial("CARDBOARD")
		} else if (mat === "can") {
			setMaterial("METAL CAN")
		} else if (mat === "wrapper") {
			setMaterial("PLASTIC WRAPPER")
		}
	}

	const handlePicture = async () => {
		// 1. Get the photo object from expo-camera
		// Make sure your takePicture() returns the whole object (including uri)
		setLoading(true)
		const photo = await takePicture()

		// 2. Prepare the FormData (Matches your 'file: UploadFile' in Python)
		const formData: any = new FormData()
		formData.append("file", {
			uri: photo.uri,
			name: "image.jpg", // FastAPI needs a filename
			type: "image/jpeg",
		})

		try {
			console.log("Uploading to DIY-YOLO...")
			const response = await axios.post(
				"https://lestersollano-diy-yolo.hf.space/predict",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
					// IMPORTANT: Prevents Axios from trying to stringify the FormData
					transformRequest: (data) => data,
				},
			)

			// 3. This will now show your 'detections' array from the model
			if (response.data.detections[0].name) {
				console.log("Results:", response.data.detections[0].name)
				updateMaterial(response.data.detections[0].name)
				setRecyclable(true)
			} else {
				setRecyclable(false)
			}
		} catch (e: any) {
			setRecyclable(false)

			if (e.response) {
				// This will show you exactly what the server didn't like
				console.log("Server Error:", e.response.data)
			} else {
				console.log("Network/Axios Error:", e.message)
			}
		} finally {
			setLoading(false)
		}
	}

	const handleResults = () => {
		if (!recyclable) return
		router.push({
			pathname: "/results",
			params: {
				uri: photoURI,
				material: material,
			},
		})
	}

	return (
		<CameraView
			style={{
				flex: 1,
				backgroundColor: "black",
			}}
			facing="back"
			ref={cameraRef}
		>
			<View
				style={{
					flex: 1,
				}}
			>
				<HeaderBack title="RECOGNITION" />
				<View
					style={{
						flex: 1,
						justifyContent: "flex-end",
						alignItems: "center",
					}}
				>
					<TouchableOpacity
						style={{
							backgroundColor: "white",
							alignItems: "center",
							padding: 10,
							paddingHorizontal: 50,
							borderRadius: 100,
							marginBottom: 50,
							display: loading ? "none" : "flex",
						}}
						onPress={handleResults}
					>
						<Text
							style={{
								fontFamily: "Bold",
								fontSize: 20,
							}}
						>
							{recyclable ? "RECYCLABLE" : "NON-RECYCLABLE"}
						</Text>
						<Text
							style={{
								fontFamily: "Regular",
								display: recyclable ? "flex" : "none",
							}}
						>
							{material}
						</Text>
					</TouchableOpacity>
					<Animated.View
						style={{
							transform: [{ rotate: spin }],
							display: loading ? "flex" : "none",
							marginBottom: 50,
						}}
					>
						<Loader2Icon size={100} color="white" />
					</Animated.View>
					<TouchableOpacity
						style={{
							backgroundColor: "white",
							width: 100,
							height: 100,
							borderRadius: 50,
							marginBottom: 50,
							display: loading ? "none" : "flex",
						}}
						onPress={handlePicture}
					></TouchableOpacity>
				</View>
			</View>
		</CameraView>
	)
}
