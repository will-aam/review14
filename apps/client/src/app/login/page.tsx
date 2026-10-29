"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { LogoBadge } from "@/components/auth/logo-badge";
import { LoginOptionsCard } from "@/components/auth/login-options-card";
import { EmailLoginCard } from "@/components/auth/email-login-card";

export default function LoginPage() {
  const router = useRouter();
  const [isEmailView, setIsEmailView] = React.useState(false);

  const handleOAuth = (provider: "google" | "apple") => {
    router.push(`/api/auth/signin?callbackUrl=/my-reviews`);
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
    router.push("/my-reviews");
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F8FAFC] px-5 py-8 text-[#0F172A] antialiased">
      <div className="mx-auto flex w-full max-w-[390px] flex-col items-center gap-6">
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
