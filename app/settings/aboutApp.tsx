import HeaderBack from "@/components/headerBack"
import { ImageBackground, ScrollView, Text, View } from "react-native"

export default function AboutApp() {
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
				<HeaderBack title="ABOUT APPLICATION" />
				<ScrollView
					style={{
						padding: 20,
						flex: 1,
					}}
				>
					<Text
						style={{
							color: "white",
							fontFamily: "Bold",
							fontSize: 20,
							textAlign: "left",
							marginVertical: 20,
						}}
					>
						WHAT IS DO-IT-YOURSELF APPLICATION?
					</Text>
					<Text
						style={{
							color: "grey",
							fontFamily: "Regular",
							textAlign: "justify",
							lineHeight: 24,
							marginBottom: 20,
						}}
					>
						A Do-It-Yourself (DIY) app is a digital tool that helps users learn,
						create, or solve problems on their own without direct professional
						assistance. It promotes independence, creativity, and practical
						learning by guiding users step by step through tasks using
						technology.
					</Text>
					<Text
						style={{
							color: "grey",
							fontFamily: "Regular",
							textAlign: "justify",
							lineHeight: 24,
						}}
					>
						In this application, the DIY concept is applied to recycling. The
						app helps users identify waste materials, understand their
						recyclability, and discover creative ways to reuse them for school
						and daily activities.
					</Text>
					<Text
						style={{
							color: "white",
							fontFamily: "Bold",
							fontSize: 20,
							textAlign: "left",
							marginTop: 40,
							marginBottom: 20,
						}}
					>
						ABOUT APPLICATION
					</Text>
					<Text
						style={{
							color: "grey",
							fontFamily: "Regular",
							textAlign: "justify",
							lineHeight: 24,
							marginBottom: 20,
						}}
					>
						This application was developed as part of the research study
						“Evaluating the Effectiveness of the Do-It-Yourself Application on
						ICTHS Students’ Awareness and Engagement towards Recycling Waste
						Materials.” It is designed to support students in properly
						identifying, sorting, and recycling waste materials, specifically
						plastic, paper, and glass.
					</Text>
					<Text
						style={{
							color: "grey",
							fontFamily: "Regular",
							textAlign: "justify",
							lineHeight: 24,
						}}
					>
						By using image recognition technology, the app provides real-time
						feedback when users scan waste items. It helps reduce errors in
						waste segregation and encourages responsible recycling behavior.
					</Text>
				</ScrollView>
			</View>
		</ImageBackground>
	)
}
