import Ionicons from "@react-native-vector-icons/ionicons"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"
import {
	Image,
	ImageBackground,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native"

export default function Project() {
	const router = useRouter()

	const materials = [""]

	const note =
		"Always be careful when using scissors or cutters. Ask for adult help if needed. You can make your piggy bank more creative by adding stickers, glitter, or ribbons. This activity doesn't just help reduce plastic waste, it also teaches responsibility and the joy of saving money!"

	const instructions = ["Clean the bottle", "Paint it pink"]
	return (
		<ImageBackground
			source={require("../../assets/images/background.png")}
			style={{
				flex: 1,
			}}
			resizeMode="cover"
		>
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
						Ric Magbitang
					</Text>
				</View>
				<View
					style={{
						flexDirection: "row",
					}}
				>
					<View
						style={{
							marginTop: 20,
							marginHorizontal: 20,
							aspectRatio: 16 / 9,
							alignItems: "center",
							flex: 1,
							borderRadius: 10,

							shadowColor: "#ffffff",
							shadowOpacity: 0.4,
							shadowRadius: 15,
							elevation: 20,
						}}
					>
						<Image
							source={require("../../assets/images/DIY(2).png")}
							style={{
								flex: 1,
								width: "100%",
								borderRadius: 10,
							}}
							resizeMode="cover"
						/>
					</View>
				</View>
				<LinearGradient
					colors={["#1ED208", "#50E2CD"]}
					start={{ x: 0.14644661, y: 0.14644661 }}
					end={{ x: 0.85355339, y: 0.85355339 }}
					style={{
						margin: 20,
						padding: 10,
						borderRadius: 10,
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<View
						style={{
							flex: 1,
						}}
					>
						<Text
							style={{
								color: "white",
								fontFamily: "Bold",
								textShadowColor: "rgba(0,0,0,0.6)",
								textShadowOffset: { width: 0, height: 1 },
								textShadowRadius: 3,
								textAlign: "center",
							}}
						>
							DIY Piggy Bank from Recycled Plastic Bottle
						</Text>
					</View>
				</LinearGradient>
				<Text
					style={{
						color: "white",
						fontFamily: "Regular",
						fontSize: 12,
						textAlign: "center",
						marginHorizontal: 20,
					}}
				>
					This fun and creative project turns an old plastic bottle into a cute
					and useful piggy bank! Instead of throwing away plastic bottles, you
					can give them a new purpose by transforming them into an adorable pink
					pig where you can save your spare coins. It’s a great way to practice
					recycling, creativity, and money-saving habits at the same time.
					Perfect for students who love crafts and want to help protect the
					environment while learning the value of saving!
				</Text>
				<View
					style={{
						marginTop: 20,
						padding: 20,
						backgroundColor: "#1f1f1f",
						marginHorizontal: 20,
						borderRadius: 10,
					}}
				>
					<Text
						style={{
							color: "white",
							fontFamily: "Bold",
							fontSize: 12,
						}}
					>
						Materials Needed:
					</Text>
					{materials.map((material, index) => (
						<Text
							key={index}
							style={{
								color: "white",
								fontFamily: "Regular",
								fontSize: 12,
								marginTop: 20,
							}}
						>
							‣ {material}
						</Text>
					))}
				</View>
				<View
					style={{
						marginTop: 20,
						padding: 20,
						backgroundColor: "#1f1f1f",
						marginHorizontal: 20,
						borderRadius: 10,
					}}
				>
					<Text
						style={{
							color: "white",
							fontFamily: "Bold",
							fontSize: 12,
						}}
					>
						Note:
					</Text>
					<Text
						style={{
							color: "white",
							fontFamily: "Regular",
							fontSize: 12,
							marginTop: 20,
							textAlign: "justify",
						}}
					>
						{note}
					</Text>
				</View>
				<View
					style={{
						marginTop: 20,
						padding: 20,
						backgroundColor: "#1f1f1f",
						marginHorizontal: 20,
						borderRadius: 10,
					}}
				>
					<Text
						style={{
							color: "white",
							fontFamily: "Bold",
							fontSize: 12,
						}}
					>
						Instructions:
					</Text>
					<Text
						style={{
							color: "white",
							fontFamily: "Regular",
							fontSize: 12,
							marginTop: 20,
							textAlign: "justify",
						}}
					>
						{note}
					</Text>
				</View>
				<View
					style={{
						marginTop: 20,
						padding: 20,
						backgroundColor: "#1f1f1f",
						marginHorizontal: 20,
						borderRadius: 10,
						marginBottom: "50%",
					}}
				>
					<Text
						style={{
							color: "white",
							fontFamily: "Bold",
							fontSize: 12,
						}}
					>
						Instructions:
					</Text>
					{instructions.map((inst, index) => (
						<Text
							key={index}
							style={{
								color: "white",
								fontFamily: "Regular",
								fontSize: 12,
								marginTop: 20,
							}}
						>
							‣ {inst}
						</Text>
					))}
				</View>
			</ScrollView>
		</ImageBackground>
	)
}
