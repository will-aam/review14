import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tacrpktefuolrgsnbkej.supabase.co";
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhY3Jwa3RlZnVvbHJnc25ia2VqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMzMDMzOTksImV4cCI6MjEwODg3OTM5OX0.NKp80mNetlhuOblqLZh5iNQzOso4mqXftSCGzAF9Kq0";

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
