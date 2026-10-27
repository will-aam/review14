"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@ui/components/button";
import { StarRating } from "@ui/components/star-rating";

interface ReviewResult {
  overallRating: number;
  comment?: string;
  isPromoter: boolean;
  googlePlaceId?: string;
}

export default function ThanksPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [result, setResult] = React.useState<ReviewResult>({
    overallRating: 5,
    isPromoter: true,
  });

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("review_result");
      if (stored) {
        try {
          setResult(JSON.parse(stored));
        } catch {
          // fallback
        }
      }
    }
  }, []);

  const handleGoogleRedirect = () => {
    const url = result.googlePlaceId
      ? `https://search.google.com/local/writereview?placeid=${result.googlePlaceId}`
      : "https://www.google.com/maps";
    window.open(url, "_blank");
  };

  return (
    <div className="flex-1 flex flex-col p-6 space-y-6">
      {/* Header com Ícone de Sucesso */}
      <div className="text-center pt-4 space-y-2">
        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
          <svg
            className="w-8 h-8"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">
          Obrigado pelo seu feedback!
        </h1>
        <p className="text-xs text-slate-500">
          Sua avaliação ajuda a manter nosso padrão de qualidade.
        </p>
      </div>

      {/* Regra de Triagem de Reputação do Review14 */}
      {result.isPromoter ? (
        <div className="p-5 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/80 rounded-3xl space-y-3.5 text-center shadow-sm animate-in fade-in">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-200/60 rounded-full text-xs font-bold text-amber-900">
            ⭐ Cliente Promotor 5 Estrelas
          </div>
          <h2 className="text-lg font-bold text-slate-900 leading-snug">
            Que tal compartilhar sua experiência com o mundo no Google?
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Seu comentário ajuda outras pessoas a descobrirem nosso espaço. Leva menos de 10 segundos!
          </p>
          <Button
            type="button"
            size="lg"
            fullWidth
            className="bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold gap-2 shadow-md shadow-blue-500/20"
            onClick={handleGoogleRedirect}
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
            </svg>
            Publicar Avaliação no Google
          </Button>
        </div>
      ) : (
        <div className="p-5 bg-slate-100 border border-slate-200 rounded-3xl space-y-2 text-center">
          <h2 className="text-base font-bold text-slate-800">
            Ouvidoria e Resolução Interna
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Lamentamos que sua experiência não tenha sido nota 10. Nosso gerente foi notificado e estamos revisando os apontamentos internamente.
          </p>
        </div>
      )}

      {/* Feed Social de Prova Viva do Estabelecimento */}
      <div className="pt-2 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">
            Feed de Clientes Recentes
          </h3>
          <span className="text-xs text-slate-400">Ao vivo</span>
        </div>

        <div className="space-y-3">
          {[
            {
              name: "Mariana Costa",
              rating: 5,
              time: "há 15 minutos",
              comment: "Comida impecável e atendimento super rápido! Voltarei sempre.",
            },
            {
              name: "Lucas Menezes",
              rating: 5,
              time: "há 1 hora",
              comment: "Ambiente muito aconchegante para um jantar a dois.",
            },
          ].map((feedItem, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-white border border-slate-100 rounded-2xl shadow-sm space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">
                  {feedItem.name}
                </span>
                <span className="text-[10px] text-slate-400">
                  {feedItem.time}
                </span>
              </div>
              <StarRating
                value={feedItem.rating}
                readOnly
                size="sm"
                showLabel={false}
              />
              <p className="text-xs text-slate-600">{feedItem.comment}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 text-center">
        <Button
          variant="outline"
          size="default"
          onClick={() => router.push(`/${slug}`)}
        >
          Voltar ao início
        </Button>
      </div>
    </div>
  );
}
