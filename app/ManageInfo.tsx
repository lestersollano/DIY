import HeaderBack from "@/components/headerBack"
import { deleteData, fetchData, insertData } from "@/supabase/database"
import { PlusIcon, TrashIcon } from "lucide-react-native"
import React, { useEffect, useState } from "react"
import {
	FlatList,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native"

interface InfoItem {
	id: number
	title: string
	message: string
	duration: number
}

export default function ManageInfo() {
	const [infoList, setInfoList] = useState<InfoItem[]>([])
	const [message, setMessage] = useState("")
	const [description, setDescription] = useState("")
	const [duration, setDuration] = useState("")
	const [loading, setLoading] = useState(true)

	// Fetch data on mount
	useEffect(() => {
		loadInfo()
	}, [])

	const loadInfo = async () => {
		try {
			setLoading(true)
			const data = await fetchData("DIY Trivia Wheel")
			setInfoList(data || [])
		} catch (error) {
			console.error("Error loading info: ", error)
		} finally {
			setLoading(false)
		}
	}

	const handleAdd = async () => {
		if (!message.trim() || !description.trim()) {
			alert("Please fill in all fields")
			return
		}

		const data = {
			title: message,
			description: description,
			duration: parseInt(duration) || 5,
		}

		try {
			await insertData("DIY Trivia Wheel", data)
			setMessage("")
			setDescription("")
			setDuration("5")
			await loadInfo() // Refresh list
			alert("Info added successfully!")
		} catch (error) {
			console.error("Error: ", error)
		}
	}

	const handleDelete = async (id: number) => {
		try {
			await deleteData("DIY Trivia Wheel", id)
			await loadInfo() // Refresh list
		} catch (error) {
			console.error("Error deleting: ", error)
		}
	}

	const renderItem = ({ item }: { item: InfoItem }) => (
		<View style={styles.infoCard}>
			<View style={styles.textContainer}>
				<Text style={styles.infoMessage}>{item.title}</Text>
				<Text style={styles.infoDescription}>{item.message}</Text>
				<Text style={styles.infoDuration}>{item.duration}s</Text>
			</View>
			<TouchableOpacity
				onPress={() => handleDelete(item.id)}
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

				<TextInput
					style={styles.input}
					placeholder="Duration (seconds)"
					placeholderTextColor="#888"
					value={duration}
					onChangeText={setDuration}
					keyboardType="numeric"
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

			<FlatList
				data={infoList}
				keyExtractor={(item) => item.id.toString()}
				renderItem={renderItem}
				contentContainerStyle={styles.listContent}
				ListEmptyComponent={
					<Text style={styles.emptyText}>
						{loading ? "Loading..." : "No info items yet."}
					</Text>
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
	infoDuration: {
		color: "#1ED208",
		fontFamily: "Regular",
		fontSize: 11,
		marginTop: 4,
	},
	deleteButton: { padding: 8 },
	emptyText: {
		color: "#555",
		textAlign: "center",
		marginTop: 50,
		fontFamily: "Regular",
	},
})
