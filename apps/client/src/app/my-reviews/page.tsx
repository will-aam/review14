"use client";

import * as React from "react";
import Link from "next/link";
import { StarRating } from "@ui/components/star-rating";
import { Button } from "@ui/components/button";

export default function MyReviewsPage() {
  const [reviews] = React.useState([
    {
      id: "1",
      storeName: "Bistrô Paris & Café",
      storeSlug: "bistro-paris",
      rating: 5,
      date: "25 de Outubro de 2026",
      comment: "A sobremesa de petit gâteau estava incrível! Atendimento impecável.",
    },
    {
      id: "2",
      storeName: "Barbearia Vintage Club",
      storeSlug: "barbearia-vintage",
      rating: 5,
      date: "12 de Outubro de 2026",
      comment: "Corte na tesoura impecável com café de cortesia.",
    },
  ]);

  return (
    <div className="flex-1 flex flex-col p-6 space-y-6">
      <div className="pt-4 space-y-1">
        <h1 className="text-2xl font-bold text-slate-900">
          Minhas Avaliações
        </h1>
        <p className="text-xs text-slate-500">
          Seu histórico de feedbacks e visitas em todos os estabelecimentos parceiros.
        </p>
      </div>

      <div className="space-y-4">
        {reviews.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-sm space-y-2"
          >
            <div className="flex items-center justify-between">
              <Link
                href={`/${item.storeSlug}`}
                className="text-sm font-bold text-slate-800 hover:text-primary transition-colors"
              >
                {item.storeName}
              </Link>
              <span className="text-[10px] text-slate-400">{item.date}</span>
            </div>
            <StarRating
              value={item.rating}
              readOnly
              size="sm"
              showLabel={false}
              className="items-start"
            />
            <p className="text-xs text-slate-600 italic">
              &ldquo;{item.comment}&rdquo;
            </p>
          </div>
        ))}
      </div>

      <div className="pt-6">
        <Button variant="outline" size="default" fullWidth asChild>
          <Link href="/">Escanear outro QR Code</Link>
        </Button>
      </div>
    </div>
  );
}
