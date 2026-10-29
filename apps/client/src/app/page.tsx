"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogoBadge } from "@/components/auth/logo-badge";
import { Card, CardContent } from "@ui/components/card";
import { Button } from "@ui/components/button";
import { Badge } from "@ui/components/badge";

export default function HomePage() {
  const router = useRouter();

  const screens = [
    {
      title: "1. Login no Estabelecimento",
      desc: "Tela de entrada com Google, Apple e E-mail",
      href: "/cafe-aurora",
      badge: "ZD-0 / 14F-0",
      color: "border-[#BFDBFE] bg-[#EFF6FF] text-[#1D4ED8]",
    },
    {
      title: "2. Cadastro de Cliente",
      desc: "Criação de conta com validação de senha",
      href: "/register",
      badge: "15K-0",
      color: "border-[#BBF7D0] bg-[#F0FDF4] text-[#15803D]",
    },
    {
      title: "3. Avaliação da Experiência",
      desc: "5 estrelas, fotos, comentários e perguntas",
      href: "/cafe-aurora/evaluate",
      badge: "PR-0",
      color: "border-[#FDE68A] bg-[#FEF3C7] text-[#B45309]",
    },
    {
      title: "4. Agradecimento",
      desc: "Sucesso pós-avaliação e convite Google",
      href: "/cafe-aurora/thanks",
      badge: "130-0",
      color: "border-[#DDD6FE] bg-[#F5F3FF] text-[#6D28D9]",
    },
    {
      title: "5. Feed do Estabelecimento",
      desc: "Avaliações públicas com abas e fotos",
      href: "/cafe-aurora/feed",
      badge: "10P-0",
      color: "border-[#C7D2FE] bg-[#EEF2FF] text-[#4338CA]",
    },
    {
      title: "6. Minhas Avaliações",
      desc: "Histórico pessoal de feedbacks do usuário",
      href: "/my-reviews",
      badge: "Portal",
      color: "border-[#E2E8F0] bg-[#F8FAFC] text-[#475569]",
    },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F8FAFC] px-5 py-8 text-[#0F172A] antialiased">
      <div className="mx-auto flex w-full max-w-[390px] flex-col items-center gap-6">
        {/* Header com Logotipo */}
        <LogoBadge icon="star" />

        <div className="flex flex-col items-center text-center gap-1.5">
          <h1 className="text-[20px] font-bold text-[#0F172A]">
            Portal do Cliente &amp; Avaliações
          </h1>
          <p className="text-[13px] text-[#64748B]">
            Componentes construídos com shadcn/ui e Tailwind CSS:
          </p>
        </div>

        {/* Botão de Atalho Rápido para o Café Aurora */}
        <Button
          type="button"
          size="lg"
          fullWidth
          onClick={() => router.push("/cafe-aurora")}
          className="gap-2 shadow-[0_4px_6px_-1px_rgba(37,99,235,0.25)] font-semibold"
        >
          <span>Iniciar Fluxo do Cliente (Café Aurora)</span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Button>

        {/* Lista de Telas Criadas */}
        <div className="flex w-full flex-col gap-2.5">
          <span className="text-[12px] font-bold uppercase tracking-wider text-[#64748B]">
            Telas do Design System (Paper)
          </span>

          {screens.map((item, idx) => (
            <Link key={idx} href={item.href} className="w-full">
              <Card className="p-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition hover:border-[#2563EB] hover:shadow-md active:scale-[0.99]">
                <CardContent className="flex items-center justify-between p-0">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[14px] font-semibold text-[#0F172A]">
                      {item.title}
                    </span>
                    <span className="text-[12px] text-[#64748B]">
                      {item.desc}
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-[10px] font-bold ${item.color}`}
                  >
                    {item.badge}
                  </Badge>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
