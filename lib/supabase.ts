import { createClient } from '@supabase/supabase-js'
// import { Database } from './database.types'

// Create a single supabase client for interacting with your database
const supabaseUrl:string = process.env.EXPO_PUBLIC_SUPABASE_URL     || ''  
const supabaseKey: string = process.env.EXPO_PUBLIC_SUPABASE_KEY     || ''  
export const supabase = createClient(supabaseUrl, supabaseKey)
// console.log("supabase", supabase)
