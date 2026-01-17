import HeaderBack from "@/components/headerBack"
import { ImageBackground, ScrollView, View } from "react-native"

export default function History() {
	return (
		<ImageBackground
			source={require("../../../assets/images/background.png")}
			style={{ flex: 1 }}
			resizeMode="cover"
		>
			<View
				style={{
					flex: 1,
				}}
			>
				<HeaderBack title="HISTORY" />
				<ScrollView
					style={{
						flex: 1,
					}}
				>
					{/* TODO: project cards based on history */}
				</ScrollView>
			</View>
		</ImageBackground>
	)
}
