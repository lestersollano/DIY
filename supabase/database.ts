import supabase from "./supabase"

export const fetchData = async (table: string) => {
	const { data, error } = await supabase.from(table).select("*")

	if (error) {
		throw new Error(error.message)
	}

	return data
}

export const insertData = async (table: string, values: object) => {
	const { data, error } = await supabase.from(table).insert(values)

	if (error) {
		throw new Error(error.message)
	}

	return data
}

export const updateData = async (table: string, values: object, id: number) => {
	const { data, error } = await supabase.from(table).update(values).eq("id", id)

	if (error) {
		throw new Error(error.message)
	}

	return data
}

export const deleteData = async (table: string, id: number) => {
	const { data, error } = await supabase.from(table).delete().eq("id", id)

	if (error) {
		throw new Error(error.message)
	}

	return data
}
