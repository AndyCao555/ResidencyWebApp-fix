// Initialize Supabase client
const supabaseUrl = 'https://cfbtmqogipvhoxtorwvv.supabase.co' // supabase url and key
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmYnRtcW9naXB2aG94dG9yd3Z2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4Mjc2MTgsImV4cCI6MjA2MzQwMzYxOH0.sVYtT6LG3nuy_W5O_2QRLX_msIWlHf_az7kVtLoRlMs'
const { createClient } = supabase // creates a supabase client
const supabaseClient = createClient(supabaseUrl, supabaseKey) // creates a supabase client

// Export the supabase client for use in other files and makes it available to the window object
window.supabase = supabaseClient 