import HeaderBack from "@/components/headerBack";
import ProjectCard from "@/components/projectCard";
import { useProjects } from "@/lib/ProjectsContext";
import { ImageBackground, ScrollView, View } from "react-native";

export default function Favorites() {
    const { projects } = useProjects();
    return (
        <ImageBackground
            source={require("../../../assets/images/background.png")}
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
                <HeaderBack title="FAVORITES" />
                <ScrollView
                    style={{
                        flex: 1,
                        marginTop: 20,
                    }}
                >
                    {projects.map((project, index) => {
                        if (project.favorite)
                            return (
                                <ProjectCard key={index} project={project} />
                            );
                    })}
                </ScrollView>
            </View>
        </ImageBackground>
    );
}
