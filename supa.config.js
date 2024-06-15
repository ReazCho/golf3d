
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient('https://ebmxnvuelqkkwzrwwbbr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVibXhudnVlbHFra3d6cnd3YmJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU5NDY3MjMsImV4cCI6MjAzMTUyMjcyM30.IeohZbf5pu1Baf1F0PQeoCgiRisFNVbkH4I7wHNYUbs')

export { supabase }