"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { RegisterCard } from "@/components/auth/register-card";

export default function RegisterPage() {
  const router = useRouter();

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
    router.push("/my-reviews");
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F8FAFC] px-5 py-8 text-[#0F172A] antialiased">
      <div className="mx-auto flex w-full max-w-[390px] flex-col items-center gap-6">
        <RegisterCard
          onBackToLogin={() => router.push("/login")}
          onSubmit={handleRegisterSubmit}
        />
      </div>
    </div>
  );
}
