import HeaderBack from "@/components/headerBack"
import { Info, useInfo } from "@/lib/InfoContext"
import { PlusIcon, TrashIcon } from "lucide-react-native"
import React, { useState } from "react"
import {
	Alert,
	FlatList,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native"

export default function ManageInfo() {
	const { infoList, addNewInfo, deleteInfo } = useInfo()

	// Local state for the input form
	const [message, setMessage] = useState("")
	const [description, setDescription] = useState("")
	const [duration, setDuration] = useState("5")

	const handleAdd = async () => {
		if (!message.trim() || !description.trim()) {
			Alert.alert("Error", "Please fill in both fields")
			return
		}

		// Convert duration string to a number (seconds to milliseconds)
		const durationNum = parseInt(duration)
		if (isNaN(durationNum) || durationNum <= 0) {
			Alert.alert("Error", "Please enter a valid number for duration")
			return
		}

		// Note: We'll pass duration to addNewInfo once we update the context
		await addNewInfo(message, description, durationNum)

		setMessage("")
		setDescription("")
		setDuration("5") // Reset to default
	}

	const renderItem = ({ item }: { item: Info }) => (
		<View style={styles.infoCard}>
			<View style={styles.textContainer}>
				<Text style={styles.infoMessage}>{item.message}</Text>
				<Text style={styles.infoDescription}>{item.description}</Text>
			</View>
			<TouchableOpacity
				onPress={() => deleteInfo(item.id)}
				style={styles.deleteButton}
			>
				<TrashIcon color="#ff4444" size={20} />
			</TouchableOpacity>
		</View>
	)

	return (
		<View style={styles.container}>
			<HeaderBack title="Manage Info" />

			<View style={styles.form}>
				<TextInput
					style={styles.input}
					placeholder="Message Title"
					placeholderTextColor="#888"
					value={message}
					onChangeText={setMessage}
				/>

				{/* New Duration Input */}
				<TextInput
					style={styles.input}
					placeholder="Duration (seconds)"
					placeholderTextColor="#888"
					value={duration}
					onChangeText={setDuration}
					keyboardType="numeric" // Shows numeric keypad
				/>

				<TextInput
					style={[styles.input, styles.textArea]}
					placeholder="Description"
					placeholderTextColor="#888"
					value={description}
					onChangeText={setDescription}
					multiline
				/>

				<TouchableOpacity style={styles.addButton} onPress={handleAdd}>
					<PlusIcon color="white" size={20} />
					<Text style={styles.addButtonText}>Add Info</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.divider} />

			{/* List of Info */}
			<FlatList
				data={infoList}
				keyExtractor={(item) => item.id}
				renderItem={renderItem}
				contentContainerStyle={styles.listContent}
				ListEmptyComponent={
					<Text style={styles.emptyText}>No info items yet.</Text>
				}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#000" },
	form: {
		padding: 20,
		backgroundColor: "#111",
		borderBottomWidth: 1,
		borderBottomColor: "#333",
	},
	input: {
		backgroundColor: "#222",
		color: "white",
		padding: 12,
		borderRadius: 8,
		marginBottom: 10,
		fontFamily: "Regular",
	},
	textArea: { height: 80, textAlignVertical: "top" },
	addButton: {
		flexDirection: "row",
		backgroundColor: "#1ED208",
		padding: 15,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
		gap: 8,
	},
	addButtonText: { color: "white", fontFamily: "Bold", fontSize: 16 },
	divider: { height: 10, backgroundColor: "#000" },
	listContent: { padding: 20, paddingBottom: 40 },
	infoCard: {
		flexDirection: "row",
		backgroundColor: "#1f1f1f",
		padding: 15,
		borderRadius: 10,
		marginBottom: 12,
		alignItems: "center",
	},
	textContainer: { flex: 1 },
	infoMessage: {
		color: "white",
		fontFamily: "Bold",
		fontSize: 14,
		marginBottom: 4,
	},
	infoDescription: { color: "#aaa", fontFamily: "Regular", fontSize: 12 },
	deleteButton: { padding: 8 },
	emptyText: {
		color: "#555",
		textAlign: "center",
		marginTop: 50,
		fontFamily: "Regular",
	},
})
