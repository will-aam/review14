"use client";

import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface LoginOptionsCardProps {
  onSelectGoogle?: () => void;
  onSelectApple?: () => void;
  onSelectEmail: () => void;
  onGoToRegister: () => void;
}

export function LoginOptionsCard({
  onSelectGoogle,
  onSelectApple,
  onSelectEmail,
  onGoToRegister,
}: LoginOptionsCardProps) {
  return (
    <Card className="w-full border-[#E2E8F0] bg-white p-2 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.04)] sm:p-4">
      <CardHeader className="text-center pb-5 pt-3">
        <CardTitle className="text-[20px] font-bold leading-6 text-[#0F172A]">
          Entre para continuar
        </CardTitle>
        <CardDescription className="text-[13px] leading-snug text-[#475569]">
          Acesse suas avaliações e acompanhe as experiências compartilhadas.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        {/* Google Button */}
        <Button
          type="button"
          variant="google"
          size="lg"
          fullWidth
          onClick={onSelectGoogle}
          className="gap-2.5 font-semibold"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              fill="#EA4335"
            />
          </svg>
          <span>Entrar com Google</span>
        </Button>

        {/* Apple Button */}
        <Button
          type="button"
          variant="apple"
          size="lg"
          fullWidth
          onClick={onSelectApple}
          className="gap-2.5 font-semibold"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0 fill-current"
          >
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 1.01-2.88-.97.04-2.16.65-2.84 1.45-.6.7-1.12 1.8-1.03 2.89 1.09.08 2.22-.56 2.86-1.46z" />
          </svg>
          <span>Entrar com Apple</span>
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-2 py-0.5">
          <div className="h-[1px] flex-1 bg-[#E2E8F0]" />
          <span className="text-[11px] font-medium text-[#64748B]">ou</span>
          <div className="h-[1px] flex-1 bg-[#E2E8F0]" />
        </div>

        {/* Email & Password Button */}
        <Button
          type="button"
          variant="outline"
          size="lg"
          fullWidth
          onClick={onSelectEmail}
          className="gap-2 bg-[#F8FAFC] border-[#CBD5E1] text-[#0F172A] font-semibold hover:bg-slate-100"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2563EB"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          <span>Entrar com e-mail e senha</span>
        </Button>

        {/* Footer Link */}
        <div className="flex items-center justify-center gap-1 pt-2 text-center">
          <span className="text-[13px] text-[#475569]">Não tem uma conta?</span>
          <button
            type="button"
            onClick={onGoToRegister}
            className="text-[13px] font-semibold text-[#2563EB] hover:underline"
          >
            Criar conta no Review14
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
