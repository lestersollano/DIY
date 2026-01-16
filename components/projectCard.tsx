import type { Project } from "@/interfaces/interfaces";
import { useProjects } from "@/lib/ProjectsContext";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { useRouter } from "expo-router";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";

export default function ProjectCard({ project }: { project: Project }) {
    const router = useRouter();
    const { updateProject } = useProjects();

    return (
        <TouchableOpacity
            style={{
                backgroundColor: "#1F1F1F",
                padding: 15,
                marginHorizontal: 20,
                borderRadius: 10,
                flexDirection: "row",
                marginBottom: 20,
            }}
            onPress={() => {
                console.log(project);
                router.push({
                    pathname: "/project",
                    params: { id: project.id },
                });
            }}
        >
            <Image
                source={{ uri: project.imageUri }}
                style={{
                    width: 100,
                    height: 100,
                    borderRadius: 10,
                    marginRight: 10,
                }}
                resizeMode="cover"
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
                            {project.title}
                        </Text>
                        <Text
                            style={{
                                color: "#5C5B5B",
                                fontFamily: "Bold",
                                fontSize: 8,
                            }}
                        >
                            by {project.author}
                        </Text>
                    </View>
                    <Pressable
                        onPress={(e) => {
                            e.stopPropagation();
                            console.log(project);
                            if (project.favorite === undefined) {
                                updateProject({
                                    ...project,
                                    favorite: true,
                                });
                                return;
                            }
                            updateProject({
                                ...project,
                                favorite: !project.favorite,
                            });
                        }}
                    >
                        <Ionicons
                            name="heart"
                            size={25}
                            color={project.favorite ? "#FF6B6B" : "#5C5C5C"}
                        />
                    </Pressable>
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
                    {project.description}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
