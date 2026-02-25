import AsyncStorage from "@react-native-async-storage/async-storage"
import { createClient } from "@supabase/supabase-js"

const SUPABASE_URL = "https://ihhqnydambawblkagiou.supabase.co"
const SUPABASE_ANON_KEY =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloaHFueWRhbWJhd2Jsa2FnaW91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyMzE5NDUsImV4cCI6MjA4NjgwNzk0NX0.nLJiTEWyRAdrsN01FTcOvaf1qsnlBZJ6wXE6EaENz8c"

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
	auth: {
		storage: AsyncStorage,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
	},
})

export default supabase
