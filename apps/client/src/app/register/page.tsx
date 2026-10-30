"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { RegisterCard } from "@/components/auth/register-card";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const handleRegisterSubmit = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    setErrorMsg(null);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email: data.email.trim(),
        password: data.password,
        options: {
          data: {
            name: data.name.trim(),
            role: "CUSTOMER",
          },
        },
      });

      if (error) {
        setErrorMsg(error.message || "Falha ao criar conta.");
        return;
      }

      router.push("/my-reviews");
      router.refresh();
    } catch (err: any) {
      console.error("Erro no cadastro:", err);
      setErrorMsg("Ocorreu um erro no cadastro.");
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

        <RegisterCard
          onBackToLogin={() => router.push("/login")}
          onSubmit={handleRegisterSubmit}
        />
      </div>
    </div>
  );
}
