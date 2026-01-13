import Ionicons from "@react-native-vector-icons/ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
    ImageBackground,
    KeyboardAvoidingView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function Create() {
    const router = useRouter();
    return (
        <ImageBackground
            source={require("../../assets/images/background.png")}
            style={{
                flex: 1,
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
                                router.back();
                            }}
                        >
                            <Ionicons
                                size={24}
                                name="chevron-back-outline"
                                color={"white"}
                            />
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
                            >
                                {/* <Image
                                source={require("../../assets/images/DIY(2).png")}
                                style={{
                                    flex: 1,
                                    width: "100%",
                                    borderRadius: 10,
                                }}
                                resizeMode="cover"
                            /> */}
                                <Ionicons
                                    name="add-outline"
                                    color={"grey"}
                                    size={32}
                                />
                                <Text
                                    style={{
                                        color: "grey",
                                        fontFamily: "Regular",
                                        fontSize: 12,
                                    }}
                                >
                                    Click to upload
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
                        <TextInput
                            style={{
                                fontFamily: "Regular",
                                borderBottomColor: "grey",
                                borderBottomWidth: 1,
                                borderStyle: "solid",
                                color: "white",
                            }}
                            placeholder="Materials to be used"
                            placeholderTextColor={"grey"}
                        />
                        <TouchableOpacity
                            style={{
                                backgroundColor: "#1f1f1f",
                                flex: 1,
                                height: 40,
                                marginTop: 20,
                                borderRadius: 20,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Ionicons
                                name="add-outline"
                                color={"grey"}
                                size={24}
                            />
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
                        <TextInput
                            style={{
                                fontFamily: "Regular",
                                borderBottomColor: "grey",
                                borderBottomWidth: 1,
                                borderStyle: "solid",
                                color: "white",
                            }}
                            placeholder="Step by step guide"
                            placeholderTextColor={"grey"}
                            multiline
                        />
                        <TouchableOpacity
                            style={{
                                backgroundColor: "#1f1f1f",
                                flex: 1,
                                height: 40,
                                marginTop: 20,
                                borderRadius: 20,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Ionicons
                                name="add-outline"
                                color={"grey"}
                                size={24}
                            />
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
                                borderBottomColor: "grey",
                                borderBottomWidth: 1,
                                borderStyle: "solid",
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    backgroundColor: "#1ED208",
                                    padding: 10,
                                    borderRadius: 10,
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
                                    backgroundColor: "#1ED208",
                                    padding: 10,
                                    borderRadius: 10,
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
                                    Plastic
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: "#1ED208",
                                    padding: 10,
                                    borderRadius: 10,
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
                        </View>
                    </View>
                    <TouchableOpacity>
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
    );
}
