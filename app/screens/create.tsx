import Ionicons from "@react-native-vector-icons/ionicons";
import { Image, ImageBackground, View } from "react-native";

export default function Create() {
    return (
        <ImageBackground
            source={require("../../assets/images/background.png")}
            style={{
                flex: 1,
            }}
            resizeMode="cover"
        >
            <View
                style={{
                    flex: 1,
                }}
            >
                <View
                    style={{
                        backgroundColor: "#1ED208",
                        alignSelf: "flex-start",
                        marginTop: 20,
                        marginLeft: 20,
                        borderRadius: 10,
                        padding: 10,
                    }}
                >
                    <Ionicons
                        size={24}
                        name="chevron-back-outline"
                        color={"white"}
                    />
                </View>
                <View
                    style={{
                        marginTop: 20,
                        marginHorizontal: 20,
                        alignItems: "center",
                    }}
                >
                    <Image
                        source={require("../../assets/images/DIY(2).png")}
                        style={{
                            width: "300",
                            height: "200",
                            borderRadius: 10,
                        }}
                    />
                </View>
            </View>
        </ImageBackground>
    );
}
