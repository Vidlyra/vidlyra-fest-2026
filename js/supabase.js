// ---------- Supabase client setup ----------
// Replace these with your actual project values.
// Find them in your Supabase dashboard: Project Settings > API
const SUPABASE_URL = "https://sfehwodlybnvrbotrtyc.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNmZWh3b2RseWJudnJib3RydHljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxMjM4NDMsImV4cCI6MjA5ODY5OTg0M30.UfW_ytOEdFi645m8vtu4aT3J5QXGzUSg4hFkquhcc10";

// Creates a single shared client, available to every page that
// loads this file (signup.js, login.js, etc.)
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
