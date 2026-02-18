import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { createContext, useContext, useEffect, useState } from "react"

const INFO_KEY = "@app_info_list"

export interface Info {
	id: string
	message: string
	description: string
	duration: number // New: stored in milliseconds or seconds
}

type InfoContextType = {
	infoList: Info[]
	loading: boolean
	// New: added duration parameter
	addNewInfo: (
		message: string,
		description: string,
		duration: number,
	) => Promise<void>
	deleteInfo: (id: string) => Promise<void>
}

const InfoContext = createContext<InfoContextType | null>(null)

export function InfoProvider({ children }: { children: React.ReactNode }) {
	const [infoList, setInfoList] = useState<Info[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		loadInfo()
	}, [])

	const loadInfo = async () => {
		try {
			const saved = await AsyncStorage.getItem(INFO_KEY)
			if (saved) setInfoList(JSON.parse(saved))
		} finally {
			setLoading(false)
		}
	}

	// Updated to accept duration
	const addNewInfo = async (
		message: string,
		description: string,
		duration: number,
	) => {
		const newEntry: Info = {
			id: Date.now().toString(),
			message,
			description,
			duration,
		}

		const updated = [newEntry, ...infoList]
		setInfoList(updated)
		await AsyncStorage.setItem(INFO_KEY, JSON.stringify(updated))
	}

	const deleteInfo = async (id: string) => {
		const updated = infoList.filter((item) => item.id !== id)
		setInfoList(updated)
		await AsyncStorage.setItem(INFO_KEY, JSON.stringify(updated))
	}

	return (
		<InfoContext.Provider value={{ infoList, loading, addNewInfo, deleteInfo }}>
			{children}
		</InfoContext.Provider>
	)
}

export const useInfo = () => {
	const ctx = useContext(InfoContext)
	if (!ctx) throw new Error("useInfo must be used inside InfoProvider")
	return ctx
}
