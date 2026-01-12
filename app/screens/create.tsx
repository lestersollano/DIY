import { ImageBackground, View } from "react-native";

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
            ></View>
        </ImageBackground>
    );
}
