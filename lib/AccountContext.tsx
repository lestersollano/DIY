import type { Account } from "@/interfaces/interfaces"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Directory, File, Paths } from "expo-file-system"
import { createContext, useContext, useEffect, useState } from "react"

const ACCOUNT_KEY = "@my_account"

type AccountContextType = {
	account: Account | null
	loading: boolean

	setAccount: (account: Account, tempAvatarUri?: string) => Promise<Account>
	updateAccount: (
		updates: Partial<Account>,
		tempAvatarUri?: string
	) => Promise<Account>
	clearAccount: () => Promise<void>
}

const AccountContext = createContext<AccountContextType | null>(null)

export function AccountProvider({ children }: { children: React.ReactNode }) {
	const [account, setAccountState] = useState<Account | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		loadAccount()
	}, [])

	const loadAccount = async () => {
		try {
			const saved = await AsyncStorage.getItem(ACCOUNT_KEY)
			if (saved) setAccountState(JSON.parse(saved))
		} finally {
			setLoading(false)
		}
	}

	/** Ensure avatars directory exists */
	const getAvatarDir = () => {
		const dir = new Directory(Paths.document, "avatars")
		if (!dir.exists) dir.create()
		return dir
	}

	const saveAvatar = async (tempUri: string) => {
		const dir = getAvatarDir()
		const file = new File(dir, `avatar_${Date.now()}.jpg`)
		await new File(tempUri).copy(file)
		return file.uri
	}

	const deleteAvatar = async (uri?: string) => {
		if (!uri) return
		try {
			const file = new File(uri)
			if (file.exists) file.delete()
		} catch (e) {
			console.warn("Failed to delete avatar", e)
		}
	}

	const setAccount = async (newAccount: Account, tempAvatarUri?: string) => {
		let avatarUri = newAccount.avatarUri

		if (tempAvatarUri) {
			avatarUri = await saveAvatar(tempAvatarUri)
		}

		const accountToSave: Account = {
			...newAccount,
			avatarUri,
			createdAt: newAccount.createdAt || Date.now(),
		}

		await AsyncStorage.setItem(ACCOUNT_KEY, JSON.stringify(accountToSave))
		setAccountState(accountToSave)

		return accountToSave
	}

	const updateAccount = async (
		updates: Partial<Account>,
		tempAvatarUri?: string
	) => {
		if (!account) throw new Error("No account to update")

		let avatarUri = account.avatarUri

		// Replace avatar if new temp image is provided
		if (tempAvatarUri) {
			await deleteAvatar(account.avatarUri)
			avatarUri = await saveAvatar(tempAvatarUri)
		}

		const updated: Account = {
			...account,
			...updates,
			avatarUri,
		}

		await AsyncStorage.setItem(ACCOUNT_KEY, JSON.stringify(updated))
		setAccountState(updated)

		return updated
	}

	const clearAccount = async () => {
		await deleteAvatar(account?.avatarUri)
		await AsyncStorage.removeItem(ACCOUNT_KEY)
		setAccountState(null)
	}

	return (
		<AccountContext.Provider
			value={{
				account,
				loading,
				setAccount,
				updateAccount,
				clearAccount,
			}}
		>
			{children}
		</AccountContext.Provider>
	)
}

export const useAccount = () => {
	const ctx = useContext(AccountContext)
	if (!ctx) throw new Error("useAccount must be used inside AccountProvider")
	return ctx
}
