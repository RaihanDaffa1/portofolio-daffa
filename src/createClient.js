import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://qqrhqiirwnrhjnulhvdf.supabase.co"
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxcmhxaWlyd25yaGpudWxodmRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwMzIzOTQsImV4cCI6MjA2MDYwODM5NH0.9_aT5npIH2vGGCElvniYrjHHeKa72KbhtXiyrLFr34c'
export const supabase = createClient(supabaseUrl, supabaseKey)  