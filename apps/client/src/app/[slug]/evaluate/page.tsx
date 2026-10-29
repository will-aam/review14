"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@ui/components/button";
import { Badge } from "@ui/components/badge";
import { Textarea } from "@ui/components/textarea";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@ui/components/accordion";

export default function EvaluatePage() {
  const params = useParams();
  const router = useRouter();
  const slug = (params.slug as string) || "estabelecimento";

  const storeName = React.useMemo(() => {
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }, [slug]);

  // Form states
  const [rating, setRating] = React.useState<number>(5);
  const [hoverRating, setHoverRating] = React.useState<number>(0);
  const [comment, setComment] = React.useState<string>(
    "O espresso duplo com grãos da Mantiqueira estava perfeito e o atendimento do Lucas foi sensacional!"
  );
  const [photos, setPhotos] = React.useState<string[]>([
    "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=300&auto=format&fit=crop&q=80",
  ]);

  // Questions
  const [diningOption, setDiningOption] = React.useState<string>("Refeição no local");
  const [mealType, setMealType] = React.useState<string>("Brunch");
  const [spentRange, setSpentRange] = React.useState<string>("R$ 20–40");
  const [highlights, setHighlights] = React.useState<string[]>([
    "Café de especialidade",
    "Ambiente agradável",
  ]);

  // Accordion details
  const [vegetarianText, setVegetarianText] = React.useState<string>(
    "Possui ótimo cardápio de toasts vegetarianos com cogumelos e várias opções com leite de aveia."
  );
  const [dietaryText, setDietaryText] = React.useState<string>("");
  const [parkingText, setParkingText] = React.useState<string>("");

  const toggleHighlight = (item: string) => {
    setHighlights((prev) =>
      prev.includes(item) ? prev.filter((h) => h !== item) : [...prev, item]
    );
  };

  const handleAddPhoto = () => {
    const samplePhotos = [
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=300&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&auto=format&fit=crop&q=80",
    ];
    if (photos.length < 5) {
      setPhotos([...photos, samplePhotos[photos.length % samplePhotos.length]]);
    }
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const getRatingLabel = (val: number) => {
    switch (val) {
      case 5:
        return "Excelente experiência!";
      case 4:
        return "Muito bom!";
      case 3:
        return "Experiência razoável";
      case 2:
        return "Abaixo do esperado";
      case 1:
        return "Experiência ruim";
      default:
        return "Selecione uma nota";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Por favor, selecione uma nota antes de prosseguir.");
      return;
    }

    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "review_result",
        JSON.stringify({
          overallRating: rating,
          comment,
          storeName,
          isPromoter: rating >= 4,
          diningOption,
          mealType,
          spentRange,
          highlights,
          photosCount: photos.length,
          vegetarianText,
          dietaryText,
          parkingText,
        })
      );
    }

    router.push(`/${slug}/thanks`);
  };

  const displayRating = hoverRating || rating;

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F8FAFC] text-[#0F172A] antialiased">
      <div className="mx-auto flex w-full max-w-[390px] flex-col gap-3.5 px-5 py-6">
        {/* Header com Identidade do Estabelecimento */}
        <div className="flex flex-col items-center gap-3.5 pt-2 text-center">
          <div className="flex flex-col items-center gap-2">
            {/* Ícone do Estabelecimento */}
            <div className="flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-[18px] border-[1.5px] border-[#E2E8F0] bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
              <svg
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2563EB"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
              >
                <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                <line x1="6" y1="1" x2="6" y2="4" />
                <line x1="10" y1="1" x2="10" y2="4" />
                <line x1="14" y1="1" x2="14" y2="4" />
              </svg>
            </div>

            {/* Nome com Badge de Verificado */}
            <div className="flex items-center gap-1.5">
              <h1 className="text-[22px] font-bold tracking-tight text-[#0F172A]">
                {storeName}
              </h1>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="#2563EB"
                stroke="#2563EB"
                className="shrink-0"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>

            <div className="text-[13px] text-[#64748B]">
              Cafeteria Artesanal &amp; Bistrô • Jardins, SP
            </div>
          </div>

          <div className="flex flex-col gap-1 pt-1">
            <h2 className="text-[18px] font-semibold text-[#0F172A]">
              Como foi sua experiência?
            </h2>
            <p className="max-w-[320px] text-[14px] leading-relaxed text-[#475569]">
              Sua opinião sincera ajuda o {storeName} a melhorar e auxilia futuros clientes.
            </p>
          </div>
        </div>

        {/* Formulário de Avaliação */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 pt-1">
          {/* Cartão de Seleção de Estrelas */}
          <div className="flex flex-col items-center gap-2 rounded-[14px] border border-[#E2E8F0] bg-white px-3 py-4.5 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="flex h-12 w-12 shrink-0 items-center justify-center transition-transform hover:scale-110 active:scale-95"
                  aria-label={`${star} estrelas`}
                >
                  <svg
                    width="38"
                    height="38"
                    viewBox="0 0 24 24"
                    fill={star <= displayRating ? "#F59E0B" : "none"}
                    stroke={star <= displayRating ? "#F59E0B" : "#CBD5E1"}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5 pt-1">
              <span className="text-[15px] font-bold text-[#0F172A]">
                {displayRating.toFixed(1)}
              </span>
              <Badge variant="success">
                {getRatingLabel(displayRating)}
              </Badge>
            </div>
          </div>

          {/* Campo de Comentário */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="comment-input"
                className="text-[14px] font-semibold text-[#0F172A]"
              >
                Conte como foi sua experiência
              </label>
              <span className="text-[12px] text-[#64748B]">Opcional</span>
            </div>
            <div className="flex min-h-[96px] flex-col justify-between rounded-[10px] border-[1.5px] border-[#CBD5E1] bg-white p-3 shadow-sm transition focus-within:border-[#2563EB] focus-within:ring-1 focus-within:ring-[#2563EB]">
              <Textarea
                id="comment-input"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value.slice(0, 500))}
                placeholder="Conte sobre o atendimento, sabor, ambiente ou tempo de espera..."
                className="min-h-[60px] border-none p-0 text-[15px] shadow-none focus-visible:ring-0 placeholder:text-slate-400"
              />
              <div className="flex justify-end pt-2 text-[11px] text-[#94A3B8]">
                {comment.length} / 500
              </div>
            </div>
          </div>

          {/* Fotos da Visita */}
          <div className="flex flex-col gap-2">
            <span className="text-[14px] font-semibold text-[#0F172A]">
              Fotos da visita
            </span>
            <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
              {/* Botão de Adicionar */}
              <button
                type="button"
                onClick={handleAddPhoto}
                className="flex h-20 w-20 shrink-0 flex-col items-center justify-center gap-1 rounded-[10px] border-[1.5px] border-dashed border-[#3B82F6] bg-[#EFF6FF] text-[#2563EB] transition hover:bg-blue-100/70"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                <span className="text-[11px] font-semibold">Adicionar</span>
              </button>

              {/* Thumbnails Adicionadas */}
              {photos.map((src, idx) => (
                <div
                  key={idx}
                  className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-[#E2E8F0] bg-slate-100 shadow-sm"
                >
                  <img
                    src={src}
                    alt={`Foto ${idx + 1}`}
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(idx)}
                    className="absolute right-1 top-1 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#DC2626] text-white shadow-sm hover:scale-105"
                    aria-label="Remover foto"
                  >
                    <svg
                      width="8"
                      height="8"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Seção de Perguntas do Estabelecimento */}
          <div className="flex flex-col gap-4 pt-1">
            {/* Divisor com Selo Centralizado */}
            <div className="flex items-center gap-2">
              <div className="h-[1px] flex-1 bg-[#E2E8F0]" />
              <Badge variant="brand" className="gap-1.5 py-1">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="2.5"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span className="text-[11px] font-bold tracking-wide">
                  PERGUNTAS DO ESTABELECIMENTO
                </span>
              </Badge>
              <div className="h-[1px] flex-1 bg-[#E2E8F0]" />
            </div>

            {/* Pergunta 1: Local / Retirada / Entrega */}
            <div className="flex flex-col gap-2 rounded-[12px] border border-[#E2E8F0] bg-white p-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <span className="text-[14px] font-semibold text-[#0F172A]">
                Você comeu no local, retirou ou pediu para entregar?
              </span>
              <div className="flex flex-wrap gap-2 pt-0.5">
                {["Refeição no local", "Para viagem", "Entrega"].map((option) => {
                  const isSelected = diningOption === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setDiningOption(option)}
                      className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] transition ${
                        isSelected
                          ? "border-[1.5px] border-[#2563EB] bg-[#EFF6FF] font-semibold text-[#1D4ED8]"
                          : "border border-[#E2E8F0] bg-[#F8FAFC] font-medium text-[#475569] hover:bg-slate-100"
                      }`}
                    >
                      {isSelected && (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#2563EB"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pergunta 2: O que você pediu? */}
            <div className="flex flex-col gap-2 rounded-[12px] border border-[#E2E8F0] bg-white p-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <span className="text-[14px] font-semibold text-[#0F172A]">
                O que você pediu?
              </span>
              <div className="flex flex-wrap gap-2 pt-0.5">
                {["Café da manhã", "Brunch", "Almoço", "Jantar", "Outro"].map((meal) => {
                  const isSelected = mealType === meal;
                  return (
                    <button
                      key={meal}
                      type="button"
                      onClick={() => setMealType(meal)}
                      className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] transition ${
                        isSelected
                          ? "border-[1.5px] border-[#2563EB] bg-[#EFF6FF] font-semibold text-[#1D4ED8]"
                          : "border border-[#E2E8F0] bg-[#F8FAFC] font-medium text-[#475569] hover:bg-slate-100"
                      }`}
                    >
                      {isSelected && (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#2563EB"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                      {meal}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pergunta 3: Gasto por pessoa */}
            <div className="flex flex-col gap-2 rounded-[12px] border border-[#E2E8F0] bg-white p-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <span className="text-[14px] font-semibold text-[#0F172A]">
                Quanto você gastou por pessoa?
              </span>
              <div className="flex flex-wrap gap-2 pt-0.5">
                {["R$ 1–20", "R$ 20–40", "R$ 40–60", "R$ 60–80", "R$ 80–120", "+R$ 120"].map(
                  (range) => {
                    const isSelected = spentRange === range;
                    return (
                      <button
                        key={range}
                        type="button"
                        onClick={() => setSpentRange(range)}
                        className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] transition ${
                          isSelected
                            ? "border-[1.5px] border-[#2563EB] bg-[#EFF6FF] font-semibold text-[#1D4ED8]"
                            : "border border-[#E2E8F0] bg-[#F8FAFC] font-medium text-[#475569] hover:bg-slate-100"
                        }`}
                      >
                        {isSelected && (
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#2563EB"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                        {range}
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            {/* Pergunta 4: Destaques da visita */}
            <div className="flex flex-col gap-2 rounded-[12px] border border-[#E2E8F0] bg-white p-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <span className="text-[14px] font-semibold text-[#0F172A]">
                O que mais se destacou na sua visita?
              </span>
              <div className="flex flex-wrap gap-2 pt-0.5">
                {[
                  "Café de especialidade",
                  "Atendimento acolhedor",
                  "Ambiente agradável",
                  "Wi-Fi rápido",
                  "Música boa",
                ].map((item) => {
                  const isSelected = highlights.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleHighlight(item)}
                      className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] transition ${
                        isSelected
                          ? "border-[1.5px] border-[#2563EB] bg-[#EFF6FF] font-semibold text-[#1D4ED8]"
                          : "border border-[#E2E8F0] bg-[#F8FAFC] font-medium text-[#475569] hover:bg-slate-100"
                      }`}
                    >
                      {isSelected && (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#2563EB"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Accordions de Detalhes Extras via shadcn/ui */}
            <div className="flex flex-col gap-2.5 pt-1">
              <span className="text-[14px] font-bold text-[#0F172A]">
                Adicione mais detalhes para ajudar as pessoas
              </span>

              <Accordion
                type="multiple"
                defaultValue={["vegetarian", "dietary"]}
                className="flex flex-col gap-2.5"
              >
                {/* Accordion 1: Opções vegetarianas */}
                <AccordionItem value="vegetarian">
                  <AccordionTrigger className="hover:no-underline py-0">
                    <span>Opções vegetarianas</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="rounded-[8px] border border-[#E2E8F0] bg-[#F8FAFC] p-2.5">
                      <Textarea
                        rows={2}
                        value={vegetarianText}
                        onChange={(e) => setVegetarianText(e.target.value)}
                        placeholder="Conte sobre os pratos vegetarianos disponíveis..."
                        className="border-none bg-transparent p-0 text-[14px] shadow-none focus-visible:ring-0 placeholder:text-slate-400"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Accordion 2: Restrições alimentares */}
                <AccordionItem value="dietary">
                  <AccordionTrigger className="hover:no-underline py-0">
                    <span>Restrições alimentares</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="rounded-[8px] border border-dashed border-[#CBD5E1] bg-white p-2.5">
                      <Textarea
                        rows={2}
                        value={dietaryText}
                        onChange={(e) => setDietaryText(e.target.value)}
                        placeholder="Conte sobre as opções para pessoas com restrições alimentares (sem glúten, sem lactose)..."
                        className="border-none bg-transparent p-0 text-[14px] shadow-none focus-visible:ring-0 placeholder:text-slate-400"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Accordion 3: Estacionamento */}
                <AccordionItem value="parking">
                  <AccordionTrigger className="hover:no-underline py-0">
                    <span>Estacionamento</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="rounded-[8px] border border-dashed border-[#CBD5E1] bg-white p-2.5">
                      <Textarea
                        rows={2}
                        value={parkingText}
                        onChange={(e) => setParkingText(e.target.value)}
                        placeholder="Como foi estacionar? Tem manobrista, convênio ou vagas na rua?"
                        className="border-none bg-transparent p-0 text-[14px] shadow-none focus-visible:ring-0 placeholder:text-slate-400"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* Botão de Enviar e Proteção Review14 */}
          <div className="flex flex-col gap-2.5 pt-2">
            <Button
              type="submit"
              size="lg"
              fullWidth
              className="gap-2 shadow-[0_4px_6px_-1px_rgba(37,99,235,0.25)] font-semibold text-[16px]"
            >
              <span>Enviar avaliação</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Button>

            <div className="flex items-center justify-center gap-1.5 text-center text-[#64748B]">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span className="text-[11px]">
                Sua avaliação é protegida e moderada pela Review14
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
