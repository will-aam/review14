import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://sohqgyizqddasvhgxhqa.supabase.co";
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvaHFneWl6cWRkYXN2aGd4aHFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA0NTk5MTQsImV4cCI6MjEwNjAzNTkxNH0.dSv3LxE_V9Q1a2jp9T6zb---w7kPKkXl1jCD3HdJxiY";

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
