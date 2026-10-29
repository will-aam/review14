"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function MyReviewsPage() {
  const reviews = [
    {
      id: "1",
      storeName: "Café Aurora",
      storeSlug: "cafe-aurora",
      rating: 5,
      date: "Hoje, 14:20 • Mesa 14",
      comment:
        "Experiência impecável! O café espresso duplo estava com a crema perfeita e o croissant de amêndoas super crocante.",
      photos: [
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=200&auto=format&fit=crop&q=80",
      ],
    },
    {
      id: "2",
      storeName: "Bistrô Paris & Café",
      storeSlug: "bistro-paris",
      rating: 5,
      date: "25 de Outubro • Jantar",
      comment: "A sobremesa de petit gâteau estava incrível! Atendimento impecável.",
    },
    {
      id: "3",
      storeName: "Barbearia Vintage Club",
      storeSlug: "barbearia-vintage",
      rating: 5,
      date: "12 de Outubro • Balcão",
      comment: "Corte na tesoura impecável com café de cortesia.",
    },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F8FAFC] text-[#0F172A] antialiased">
      <div className="mx-auto flex w-full max-w-[390px] flex-col gap-3.5 px-4 py-6">
        {/* Header do Perfil do Cliente */}
        <Card className="rounded-[14px] border-[#E2E8F0] bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <CardContent className="flex flex-col gap-3 p-0">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-semibold text-[#64748B]">
                Histórico do Cliente
              </span>
              <Badge variant="brand">
                {reviews.length} AVALIAÇÕES
              </Badge>
            </div>

            <div className="flex items-center gap-3">
              <Avatar className="h-11 w-11">
                <AvatarFallback className="bg-[#DBEAFE] text-[14px] font-bold text-[#1D4ED8]">
                  MS
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <h1 className="text-[16px] font-bold text-[#0F172A]">
                  Mariana Santos
                </h1>
                <span className="text-[12px] text-[#64748B]">
                  Membro desde Outubro 2026
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Avaliações Feitas pelo Cliente */}
        <div className="flex flex-col gap-3">
          {reviews.map((item) => (
            <Card
              key={item.id}
              className="rounded-[14px] border-[#E2E8F0] bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
            >
              <CardContent className="flex flex-col gap-2.5 p-0">
                <div className="flex items-center justify-between">
                  <Link
                    href={`/${item.storeSlug}/feed`}
                    className="text-[14px] font-bold text-[#0F172A] hover:text-[#2563EB] transition"
                  >
                    {item.storeName}
                  </Link>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill={star <= item.rating ? "#F59E0B" : "none"}
                        stroke={star <= item.rating ? "#F59E0B" : "#CBD5E1"}
                        strokeWidth="1.5"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                </div>

                <span className="text-[11px] text-[#64748B]">{item.date}</span>

                <p className="text-[13px] leading-relaxed text-[#0F172A]">
                  "{item.comment}"
                </p>

                {item.photos && item.photos.length > 0 && (
                  <div className="flex gap-2 pt-0.5">
                    {item.photos.map((photoUrl, pIdx) => (
                      <div
                        key={pIdx}
                        className="h-[60px] w-[60px] shrink-0 overflow-hidden rounded-[8px] border border-[#CBD5E1] bg-slate-100"
                      >
                        <img
                          src={photoUrl}
                          alt="Foto da visita"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
