import { HeartIcon } from "lucide-react-native"
import { Image, Text, View } from "react-native"

export default function ProjectCard() {
	return (
		<View
			style={{
				backgroundColor: "#1F1F1F",
				padding: 15,
				marginHorizontal: 20,
				borderRadius: 10,
				flexDirection: "row",
				marginBottom: 20,
			}}
		>
			<Image
				source={require("../assets/images/DIY(2).png")}
				style={{
					width: 100,
					height: 100,
					borderRadius: 10,
					marginRight: 10,
				}}
				resizeMode="contain"
			/>
			<View
				style={{
					flex: 1,
				}}
			>
				<View
					style={{
						justifyContent: "space-between",
						flexDirection: "row",
						marginBottom: 10,
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
								fontSize: 12,
							}}
						>
							DIY Tin Can Organizers
						</Text>
						<Text
							style={{
								color: "#5C5B5B",
								fontFamily: "Bold",
								fontSize: 8,
							}}
						>
							By Ric Magbitang
						</Text>
					</View>
					<HeartIcon color={"#5C5C5C"} />
				</View>
				<Text
					style={{
						color: "white",
						fontFamily: "Regular",
						fontSize: 8,
						flexWrap: "wrap",
					}}
					numberOfLines={4}
					ellipsizeMode="tail"
				>
					Turn simple tin cans into cute and useful organizers using burlap,
					lace, buttons, ribbon, and recycled paper for a fun and eco-friendly
					craft project.
				</Text>
			</View>
		</View>
	)
}
