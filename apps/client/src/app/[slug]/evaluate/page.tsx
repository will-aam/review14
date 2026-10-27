"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@ui/components/button";
import { StarRating } from "@ui/components/star-rating";
import { MediaUploader, UploadedMediaItem } from "@ui/components/media-uploader";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@ui/components/accordion";

interface AuthProfile {
  isAnonymous: boolean;
  name?: string;
  email?: string;
  avatarUrl?: string;
}

export default function EvaluatePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [profile, setProfile] = React.useState<AuthProfile>({
    isAnonymous: true,
    name: "Visitante Anônimo",
    avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=Visitor",
  });

  const [overallRating, setOverallRating] = React.useState(0);
  const [comment, setComment] = React.useState("");
  const [mediaList, setMediaList] = React.useState<UploadedMediaItem[]>([]);
  const [subRatings, setSubRatings] = React.useState<Record<string, number>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("review_auth");
      if (saved) {
        try {
          setProfile(JSON.parse(saved));
        } catch {
          // ignore
        }
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (overallRating === 0) {
      alert("Por favor, selecione ao menos uma estrela geral!");
      return;
    }

    setIsSubmitting(true);

    try {
      // Regra de Triagem inteligente do Review14:
      // Se nota >= 4 -> qualifica para redirecionar ao Google Meu Negócio
      const isPromoter = overallRating >= 4;

      // Armazena resultado na sessão para a tela de agradecimento
      if (typeof window !== "undefined") {
        sessionStorage.setItem(
          "review_result",
          JSON.stringify({
            overallRating,
            comment,
            isPromoter,
            googlePlaceId: "ChIJN1t_tDeuEmsRUsoyG83frY4", // Exemplo retornado da API
          })
        );
      }

      router.push(`/${slug}/thanks`);
    } catch (err) {
      console.error("Erro ao enviar avaliação:", err);
      alert("Houve uma falha ao enviar. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col p-6 space-y-6">
      {/* Perfil do Avaliador */}
      <div className="flex items-center justify-between p-3.5 bg-slate-100 rounded-2xl">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profile.avatarUrl}
            alt="Avatar"
            className="w-10 h-10 rounded-full bg-white border border-slate-200"
          />
          <div>
            <p className="text-sm font-bold text-slate-800 leading-tight">
              {profile.name}
            </p>
            <p className="text-[11px] text-slate-500 font-medium">
              {profile.isAnonymous ? "Modo Anônimo" : profile.email}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => router.push(`/${slug}`)}
          className="text-xs text-primary font-semibold hover:underline"
        >
          Trocar
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. Nota Geral Obrigatória (5 Estrelas) */}
        <div className="p-6 bg-amber-50/50 border border-amber-200/60 rounded-3xl text-center space-y-2">
          <h2 className="text-base font-bold text-slate-900">
            Como foi sua experiência geral?
          </h2>
          <StarRating
            value={overallRating}
            onChange={(r) => setOverallRating(r)}
            size="xl"
            showLabel
          />
        </div>

        {/* 2. Comentário em Texto */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Deixe seu comentário (Opcional)
          </label>
          <textarea
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Conte os detalhes do que você mais gostou ou o que podemos melhorar..."
            className="w-full p-3.5 text-sm rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        {/* 3. Mídia (Fotos e Vídeos para Cloudflare R2) */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Fotos e Vídeos da Visita
          </label>
          <MediaUploader
            value={mediaList}
            onChange={(items) => setMediaList(items)}
          />
        </div>

        {/* 4. Perguntas Dinâmicas do Plano PRO (Upsell) */}
        <div className="space-y-2 pt-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Avaliação detalhada
          </label>
          <Accordion type="multiple" defaultValue={["comida", "atendimento"]}>
            <AccordionItem value="comida">
              <AccordionTrigger>Qualidade dos Pratos e Bebidas</AccordionTrigger>
              <AccordionContent>
                <div className="py-2">
                  <StarRating
                    value={subRatings["comida"] || 0}
                    onChange={(val) =>
                      setSubRatings((prev) => ({ ...prev, comida: val }))
                    }
                    size="md"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="atendimento">
              <AccordionTrigger>Agilidade e Simpatia da Equipe</AccordionTrigger>
              <AccordionContent>
                <div className="py-2">
                  <StarRating
                    value={subRatings["atendimento"] || 0}
                    onChange={(val) =>
                      setSubRatings((prev) => ({ ...prev, atendimento: val }))
                    }
                    size="md"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Botão de Envio */}
        <Button
          type="submit"
          size="lg"
          fullWidth
          disabled={isSubmitting || overallRating === 0}
          className="font-bold text-base shadow-lg shadow-primary/20"
        >
          {isSubmitting ? "Enviando avaliação..." : "Enviar Minha Avaliação"}
        </Button>
      </form>
    </div>
  );
}
