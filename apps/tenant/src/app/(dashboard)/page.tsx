"use client";

import * as React from "react";
import { StarRating } from "@ui/components/star-rating";
import { Button } from "@ui/components/button";

export default function TenantDashboardPage() {
  const [reviews, setReviews] = React.useState([
    {
      id: "rev_1",
      customerName: "Camila Rodrigues",
      rating: 5,
      date: "Hoje às 19:40",
      comment: "A comida estava sensacional! O risoto de camarão é o melhor da cidade.",
      isPromoter: true,
      googleShared: true,
      merchantReply: null,
    },
    {
      id: "rev_2",
      customerName: "Felipe Mendes",
      rating: 2,
      date: "Ontem às 21:15",
      comment: "A comida demorou mais de 45 minutos para chegar e a bebida estava quente.",
      isPromoter: false,
      googleShared: false,
      merchantReply: "Olá Felipe, pedimos sinceras desculpas pelo atraso. Entramos em contato via e-mail com uma cortesia especial para compensar.",
    },
  ]);

  const [replyText, setReplyText] = React.useState("");
  const [selectedReviewId, setSelectedReviewId] = React.useState<string | null>(null);

  const handleSendReply = (reviewId: string) => {
    if (!replyText) return;
    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId ? { ...r, merchantReply: replyText } : r
      )
    );
    setSelectedReviewId(null);
    setReplyText("");
  };

  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Dashboard de Reputação & Inteligência
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Monitoramento em tempo real de avaliações, triagem do Google e ouvidoria interna.
        </p>
      </div>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase">
            Nota Média Geral
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">4.8</span>
            <span className="text-xs text-amber-500 font-bold">★★★★★</span>
          </div>
          <p className="text-xs text-slate-500">Baseado em 842 avaliações</p>
        </div>

        <div className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase">
            Promotores (Google)
          </span>
          <div className="text-3xl font-black text-emerald-600">92%</div>
          <p className="text-xs text-slate-500">774 clientes satisfeitos (4-5★)</p>
        </div>

        <div className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase">
            Ouvidoria Retida (&lt; 4★)
          </span>
          <div className="text-3xl font-black text-rose-500">8%</div>
          <p className="text-xs text-slate-500">68 feedbacks retidos internamente</p>
        </div>

        <div className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase">
            Leads Capturados (CRM)
          </span>
          <div className="text-3xl font-black text-primary">618</div>
          <p className="text-xs text-slate-500">Contatos de clientes para marketing</p>
        </div>
      </div>

      {/* Feed Interno com Resposta do Lojista */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          Feed Interno de Avaliações
        </h2>

        <div className="space-y-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className={`p-6 bg-white border rounded-2xl space-y-3 transition-all ${
                !rev.isPromoter ? "border-rose-200 bg-rose-50/20" : "border-slate-200"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700 text-sm">
                    {rev.customerName[0]}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {rev.customerName}
                    </h3>
                    <span className="text-xs text-slate-400">{rev.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <StarRating value={rev.rating} readOnly size="sm" showLabel={false} />
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      rev.isPromoter
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-rose-100 text-rose-700"
                    }`}
                  >
                    {rev.isPromoter ? "Triado p/ Google" : "Retido na Ouvidoria"}
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-700">{rev.comment}</p>

              {rev.merchantReply ? (
                <div className="p-3.5 bg-slate-100/80 rounded-xl text-xs space-y-1 border border-slate-200">
                  <span className="font-bold text-slate-800">
                    Sua resposta enviada ao cliente:
                  </span>
                  <p className="text-slate-600">{rev.merchantReply}</p>
                </div>
              ) : (
                <div>
                  {selectedReviewId === rev.id ? (
                    <div className="space-y-2 pt-2">
                      <textarea
                        rows={2}
                        placeholder="Escreva uma resposta para o cliente..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleSendReply(rev.id)}
                        >
                          Salvar Resposta
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setSelectedReviewId(null)}
                        >
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedReviewId(rev.id)}
                    >
                      Responder ao Cliente
                    </Button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
