import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

export default function HeaderBack({ title }: { title: string }) {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    return (
        <LinearGradient
            colors={["#1ED208", "#50E2CD"]}
            start={{ x: 0.14644661, y: 0.14644661 }}
            end={{ x: 0.85355339, y: 0.85355339 }}
            style={{
                borderRadius: 10,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                height: 100,
                paddingTop: 20,
                // iOS shadow
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 0 }, // no angle, evenly around
                shadowOpacity: 0.1,
                shadowRadius: 10,

                // Android shadow
                elevation: 5,
            }}
        >
            <TouchableOpacity
                style={{
                    backgroundColor: "white",
                    padding: 10,
                    borderRadius: 20,
                    marginLeft: 20,

                    // iOS shadow
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 0 }, // no angle, evenly around
                    shadowOpacity: 0.1,
                    shadowRadius: 10,

                    // Android shadow
                    elevation: 5,
                }}
                onPress={handleBack}
            >
                <ChevronLeft color={"#1ED208"} />
            </TouchableOpacity>
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
                {title}
            </Text>
            <View
                style={{
                    width: 64,
                }}
            ></View>
        </LinearGradient>
    );
}
