import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const cookieStore = cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://sohqgyizqddasvhgxhqa.supabase.co";
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvaHFneWl6cWRkYXN2aGd4aHFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA0NTk5MTQsImV4cCI6MjEwNjAzNTkxNH0.dSv3LxE_V9Q1a2jp9T6zb---w7kPKkXl1jCD3HdJxiY";

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Handled
        }
      },
    },
  });

  await supabase.auth.signOut();

  revalidatePath("/", "layout");
  return NextResponse.redirect(new URL("/login", request.url), {
    status: 302,
  });
}

export async function GET(request: NextRequest) {
  return POST(request);
}
