"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { LogoBadge } from "@/components/auth/logo-badge";
import { LoginOptionsCard } from "@/components/auth/login-options-card";
import { EmailLoginCard } from "@/components/auth/email-login-card";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [isEmailView, setIsEmailView] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const handleOAuth = async (provider: "google" | "apple") => {
    setErrorMsg(null);
    if (provider === "google") {
      try {
        const supabase = createClient();
        const redirectUrl = `${window.location.origin}/auth/callback?next=/my-reviews`;

        const { error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: redirectUrl,
            queryParams: {
              access_type: "offline",
              prompt: "consent",
            },
          },
        });

        if (error) {
          setErrorMsg(error.message || "Erro ao conectar com Google.");
        }
      } catch (err: any) {
        console.error("Erro no login Google:", err);
        setErrorMsg("Não foi possível conectar com o Google.");
      }
    } else {
      alert("Autenticação com Apple em desenvolvimento.");
    }
  };

  const handleEmailSubmit = async (data: { email: string; password: string }) => {
    setErrorMsg(null);
    try {
      const supabase = createClient();
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email.trim(),
        password: data.password,
      });

      if (error) {
        setErrorMsg(error.message || "Falha na autenticação.");
        return;
      }

      router.push("/my-reviews");
      router.refresh();
    } catch (err: any) {
      console.error("Erro no login:", err);
      setErrorMsg("Ocorreu um erro no login.");
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F8FAFC] px-5 py-8 text-[#0F172A] antialiased">
      <div className="mx-auto flex w-full max-w-[390px] flex-col items-center gap-6">
        {errorMsg && (
          <div className="w-full p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-red-700 text-center">
            {errorMsg}
          </div>
        )}

        {!isEmailView ? (
          <>
            <LogoBadge icon="star" />
            <LoginOptionsCard
              onSelectGoogle={() => handleOAuth("google")}
              onSelectApple={() => handleOAuth("apple")}
              onSelectEmail={() => setIsEmailView(true)}
              onGoToRegister={() => router.push("/register")}
            />
          </>
        ) : (
          <EmailLoginCard
            onBackToOptions={() => setIsEmailView(false)}
            onGoToRegister={() => router.push("/register")}
            onSubmit={handleEmailSubmit}
          />
        )}
      </div>
    </div>
  );
}
