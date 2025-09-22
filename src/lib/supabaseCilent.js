import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dmrsndcznjzuyodohclc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtcnNuZGN6bmp6dXlvZG9oY2xjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0NTc0MzksImV4cCI6MjA3NDAzMzQzOX0.Xx72iK4hZrCixWQwroEpboDi2yKLIA5m2tcinalhr3Q'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
