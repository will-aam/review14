"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { LogoBadge } from "@/components/auth/logo-badge";
import { LoginOptionsCard } from "@/components/auth/login-options-card";
import { EmailLoginCard } from "@/components/auth/email-login-card";
import { RegisterCard } from "@/components/auth/register-card";

type AuthMode = "options" | "email" | "register";

export default function StoreAuthPage() {
  const params = useParams();
  const router = useRouter();
  const slug = (params.slug as string) || "estabelecimento";

  const [mode, setMode] = React.useState<AuthMode>("options");

  // Formata o slug para exibição agradável (ex: "cafe-aurora" -> "Café Aurora")
  const destinationName = React.useMemo(() => {
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }, [slug]);

  const handleOAuth = (provider: "google" | "apple") => {
    // Redireciona via NextAuth mantendo o slug no callback
    router.push(`/api/auth/signin?callbackUrl=/${slug}/evaluate`);
  };

  const handleEmailSubmit = (data: { email: string; password: string }) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "review_auth",
        JSON.stringify({
          isAnonymous: false,
          email: data.email,
          name: data.email.split("@")[0],
          avatarUrl: `https://api.dicebear.com/7.x/identicon/svg?seed=${data.email}`,
        })
      );
    }
    router.push(`/${slug}/evaluate`);
  };

  const handleRegisterSubmit = (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "review_auth",
        JSON.stringify({
          isAnonymous: false,
          name: data.name,
          email: data.email,
          avatarUrl: `https://api.dicebear.com/7.x/identicon/svg?seed=${data.email}`,
        })
      );
    }
    router.push(`/${slug}/evaluate`);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F8FAFC] px-5 py-8 text-[#0F172A] antialiased">
      {/* Container Centralizado de 390px (Mobile Standard) */}
      <div className="mx-auto flex w-full max-w-[390px] flex-col items-center gap-6">
        {mode === "options" && (
          <>
            {/* Header com Logo e Badge de Destino */}
            <LogoBadge destination={destinationName} icon="star" />

            {/* Cartão com Opções de Login */}
            <LoginOptionsCard
              onSelectGoogle={() => handleOAuth("google")}
              onSelectApple={() => handleOAuth("apple")}
              onSelectEmail={() => setMode("email")}
              onGoToRegister={() => setMode("register")}
            />
          </>
        )}

        {mode === "email" && (
          <EmailLoginCard
            onBackToOptions={() => setMode("options")}
            onGoToRegister={() => setMode("register")}
            onSubmit={handleEmailSubmit}
          />
        )}

        {mode === "register" && (
          <RegisterCard
            onBackToLogin={() => setMode("options")}
            onSubmit={handleRegisterSubmit}
          />
        )}
      </div>
    </div>
  );
}
