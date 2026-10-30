import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const cookieStore = cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tacrpktefuolrgsnbkej.supabase.co";
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhY3Jwa3RlZnVvbHJnc25ia2VqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMzMDMzOTksImV4cCI6MjEwODg3OTM5OX0.NKp80mNetlhuOblqLZh5iNQzOso4mqXftSCGzAF9Kq0";

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
