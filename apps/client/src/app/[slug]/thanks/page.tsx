"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ReviewResult {
  overallRating: number;
  comment?: string;
  storeName?: string;
  isPromoter?: boolean;
  googlePlaceId?: string;
}

export default function ThanksPage() {
  const params = useParams();
  const router = useRouter();
  const slug = (params.slug as string) || "estabelecimento";

  const [result, setResult] = React.useState<ReviewResult>({
    overallRating: 5,
    comment: "O espresso duplo com grãos da Mantiqueira estava perfeito e o atendimento do Lucas foi sensacional!",
    storeName: "Café Aurora",
    isPromoter: true,
  });

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("review_result");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setResult((prev) => ({ ...prev, ...parsed }));
        } catch {
          // fallback padrão
        }
      }
    }
  }, []);

  const storeDisplayName = React.useMemo(() => {
    if (result.storeName) return result.storeName;
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }, [result.storeName, slug]);

  const handleGoogleRedirect = () => {
    const url = result.googlePlaceId
      ? `https://search.google.com/local/writereview?placeid=${result.googlePlaceId}`
      : "https://www.google.com/maps";
    window.open(url, "_blank");
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F8FAFC] text-[#0F172A] antialiased">
      <div className="mx-auto flex w-full max-w-[390px] flex-col items-center justify-center px-5 py-12">
        {/* Cartão Principal de Agradecimento usando shadcn/ui Card */}
        <Card className="w-full border-[#E2E8F0] bg-white p-5 text-center shadow-[0_4px_6px_-1px_rgba(0,0,0,0.04)]">
          <CardContent className="flex flex-col items-center gap-5 p-0">
            {/* Ícone de Sucesso Redondo */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-[#BBF7D0] bg-[#F0FDF4]">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#15803D"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            {/* Textos de Agradecimento */}
            <div className="flex flex-col gap-2">
              <h1 className="text-[20px] font-bold leading-snug text-[#0F172A]">
                Obrigado pela sua avaliação!
              </h1>
              <p className="text-[13px] leading-relaxed text-[#475569]">
                Sua opinião é importante e ajuda outras pessoas a conhecerem as experiências do{" "}
                <span className="font-bold text-[#0F172A]">{storeDisplayName}</span>.
              </p>
            </div>

            {/* Resumo da Avaliação Enviada */}
            <div className="flex w-full flex-col items-center gap-1.5 rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-3">
              <div className="flex items-center gap-1.5">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill={star <= result.overallRating ? "#F59E0B" : "none"}
                      stroke={star <= result.overallRating ? "#F59E0B" : "#CBD5E1"}
                      strokeWidth="1.5"
                      className="shrink-0"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <span className="text-[13px] font-bold text-[#0F172A]">
                  {result.overallRating.toFixed(1)}
                </span>
              </div>

              {result.comment && (
                <p className="line-clamp-2 text-[12px] italic text-[#64748B]">
                  "{result.comment}"
                </p>
              )}
            </div>

            {/* Opcional: Convite Google para Clientes Satisfeitos (Promotores) */}
            {result.isPromoter && (
              <div className="flex w-full flex-col items-center gap-2 rounded-[12px] border border-[#DBEAFE] bg-[#EFF6FF] p-3 text-center">
                <span className="text-[12px] font-semibold text-[#1D4ED8]">
                  ⭐ Que tal compartilhar também no Google?
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="default"
                  fullWidth
                  onClick={handleGoogleRedirect}
                  className="gap-2 bg-white border-[#CBD5E1] text-[13px] font-semibold"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24">
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
                  Postar no Google Avaliações
                </Button>
              </div>
            )}

            {/* Ações Primária e Secundária */}
            <div className="flex w-full flex-col gap-2.5">
              <Button
                type="button"
                size="lg"
                fullWidth
                onClick={() => router.push(`/${slug}/feed`)}
                className="font-semibold shadow-[0_4px_6px_-1px_rgba(37,99,235,0.25)]"
              >
                Ver avaliações
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="default"
                fullWidth
                onClick={() => router.push(`/${slug}/evaluate`)}
                className="text-[13px] font-medium text-[#475569] hover:text-[#0F172A]"
              >
                Fazer outra avaliação
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
