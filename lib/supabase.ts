import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mqvuqmysklmkjtarmods.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xdnVxbXlza2xta2p0YXJtb2RzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxNzU1MjksImV4cCI6MjA4Mzc1MTUyOX0.f1hm3vdXHLx3m5-Eya6N7v2XuPow3otgtO_Mwr1vMOs'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)