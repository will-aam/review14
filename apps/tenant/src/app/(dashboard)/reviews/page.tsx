"use client";

import * as React from "react";

interface ReviewItem {
  id: string;
  customerName: string;
  initials: string;
  timeAgo: string;
  table: string;
  rating: number;
  comment: string;
  hasPhoto?: boolean;
  photoUrl?: string;
  isPromoter: boolean; // true = 4-5 stars (Google), false = 1-3 stars (Retained)
  phone?: string;
  replied?: boolean;
  replyText?: string;
  replyDate?: string;
  tags?: string[];
}

export default function ReviewsPage() {
  const [search, setSearch] = React.useState("");
  const [activeTab, setActiveTab] = React.useState<"all" | "5star" | "4star" | "retained" | "photos" | "unreplied">("all");
  const [sortBy, setSortBy] = React.useState<"recent" | "highest" | "lowest">("recent");
  const [replyingId, setReplyingId] = React.useState<string | null>(null);
  const [replyInput, setReplyInput] = React.useState("");
  const [copiedReviewId, setCopiedReviewId] = React.useState<string | null>(null);

  const initialReviews: ReviewItem[] = [
    {
      id: "rev_1",
      customerName: "Mariana Santos",
      initials: "MS",
      timeAgo: "Há 15 minutos",
      table: "Mesa 14",
      rating: 5.0,
      comment: "O espresso duplo com grãos da Mantiqueira estava perfeito e o atendimento do Lucas foi sensacional! O melhor café de São Paulo.",
      hasPhoto: true,
      photoUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&auto=format&fit=crop&q=80",
      isPromoter: true,
      phone: "(11) 98765-4321",
      replied: false,
      tags: ["espresso duplo", "atendimento gentil"],
    },
    {
      id: "rev_2",
      customerName: "Carlos Eduardo",
      initials: "CE",
      timeAgo: "Há 42 minutos",
      table: "Mesa 08",
      rating: 5.0,
      comment: "Melhor croissant de amêndoas da região. Ambiente super agradável e música na altura certa para conversar ou trabalhar.",
      hasPhoto: true,
      photoUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&auto=format&fit=crop&q=80",
      isPromoter: true,
      phone: "(11) 99123-4567",
      replied: true,
      replyText: "Muito obrigado, Carlos! Nossa fornada sai quentinha todas as manhãs às 8h e 15h. Esperamos te ver em breve!",
      replyDate: "Há 30 minutos",
      tags: ["croissant", "ambiente"],
    },
    {
      id: "rev_3",
      customerName: "Felipe Mendes",
      initials: "FM",
      timeAgo: "Hoje às 14:15",
      table: "Mesa 05",
      rating: 2.0,
      comment: "O bolo estava gostoso, mas o café demorou mais de 25 minutos para chegar e a água com gás veio em temperatura ambiente.",
      hasPhoto: false,
      isPromoter: false,
      phone: "(11) 97788-9900",
      replied: true,
      replyText: "Olá Felipe, pedimos sinceras desculpas pelo atraso fora do nosso padrão. Identificamos o gargalo no turno da tarde e já adicionamos uma cortesia especial vinculada ao seu WhatsApp para seu próximo café por nossa conta!",
      replyDate: "Hoje às 15:00",
      tags: ["tempo de espera"],
    },
    {
      id: "rev_4",
      customerName: "Beatriz Lima",
      initials: "BL",
      timeAgo: "Há 2 horas",
      table: "Balcão",
      rating: 5.0,
      comment: "Atendimento gentil desde a entrada até a saída. O bolo de cenoura com calda quente de chocolate belga é surreal.",
      hasPhoto: false,
      isPromoter: true,
      phone: "(11) 98112-2233",
      replied: false,
      tags: ["atendimento gentil", "sobremesa"],
    },
    {
      id: "rev_5",
      customerName: "Rodrigo Almeida",
      initials: "RA",
      timeAgo: "Ontem às 19:20",
      table: "Mesa 02",
      rating: 4.0,
      comment: "Torta de maçã excelente e espresso equilibrado. O espaço externo estava um pouco barulhento por causa do trânsito, mas dentro é impecável.",
      hasPhoto: false,
      isPromoter: true,
      phone: "(11) 97654-3210",
      replied: false,
      tags: ["espresso duplo"],
    },
    {
      id: "rev_6",
      customerName: "Ana Paula Queiroz",
      initials: "AQ",
      timeAgo: "Ontem às 16:45",
      table: "Takeaway",
      rating: 3.0,
      comment: "Gosto muito do café de vocês, porém a embalagem para viagem abriu na bolsa e derramou um pouco. Sugiro vedar melhor o copo.",
      hasPhoto: false,
      isPromoter: false,
      phone: "(11) 99345-6789",
      replied: false,
      tags: ["embalagem"],
    },
  ];

  const [reviews, setReviews] = React.useState<ReviewItem[]>(initialReviews);

  const handleSendReply = (reviewId: string) => {
    if (!replyInput.trim()) return;
    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId
          ? {
              ...r,
              replied: true,
              replyText: replyInput.trim(),
              replyDate: "Agora mesmo",
            }
          : r
      )
    );
    setReplyingId(null);
    setReplyInput("");
  };

  const handleAiSuggest = (review: ReviewItem) => {
    if (review.rating >= 4) {
      setReplyInput(
        `Olá ${review.customerName.split(" ")[0]}! Que alegria ler seu feedback tão carinhoso sobre nosso ${review.tags?.[0] || "atendimento"}. Toda a equipe do Café Aurora agradece imensamente e já estamos te esperando para o próximo café!`
      );
    } else {
      setReplyInput(
        `Olá ${review.customerName.split(" ")[0]}, lamentamos profundamente por não termos superado suas expectativas desta vez. Já repassamos seu apontamento para a gerência e queremos te receber novamente com uma experiência perfeita!`
      );
    }
  };

  const handleCopyReviewLink = (id: string) => {
    navigator.clipboard.writeText(`https://review14.app/r/cafe-aurora/${id}`);
    setCopiedReviewId(id);
    setTimeout(() => setCopiedReviewId(null), 2000);
  };

  const handleExportCsv = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["ID,Cliente,Mesa,Nota,Status Triagem,Data,Comentario,Respondido,Telefone"]
        .concat(
          reviews.map(
            (r) =>
              `"${r.id}","${r.customerName}","${r.table}",${r.rating},"${r.isPromoter ? "Triado para Google" : "Retido na Ouvidoria"}","${r.timeAgo}","${r.comment.replace(/"/g, '""')}","${r.replied ? "Sim" : "Nao"}","${r.phone || ""}"`
          )
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "avaliacoes-cafe-aurora.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtering
  const filtered = reviews.filter((r) => {
    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = r.customerName.toLowerCase().includes(q);
      const matchComment = r.comment.toLowerCase().includes(q);
      const matchTable = r.table.toLowerCase().includes(q);
      const matchTag = r.tags?.some((t) => t.toLowerCase().includes(q));
      if (!matchName && !matchComment && !matchTable && !matchTag) return false;
    }

    // Tabs
    if (activeTab === "5star") return r.rating === 5;
    if (activeTab === "4star") return r.rating === 4;
    if (activeTab === "retained") return !r.isPromoter;
    if (activeTab === "photos") return r.hasPhoto;
    if (activeTab === "unreplied") return !r.replied;
    return true;
  });

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "highest") return b.rating - a.rating;
    if (sortBy === "lowest") return a.rating - b.rating;
    return 0; // Default recent order
  });

  return (
    <div className="mx-auto flex max-w-[1440px] flex-col gap-6 p-6 md:p-8 select-none transition-colors duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 items-start sm:items-end justify-between w-full">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5">
            <h1 className="text-[24px] font-bold leading-[30px] tracking-tight text-[#0F172A] dark:text-[#F8FAFC] m-0">
              Gestão de Avaliações &amp; Ouvidoria
            </h1>
            <span className="rounded-full bg-blue-100 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/50 px-2.5 py-0.5 text-[11px] font-semibold text-blue-700 dark:text-blue-300">
              1.284 registros
            </span>
          </div>
          <p className="text-[13px] leading-4 text-[#64748B] dark:text-[#94A3B8] m-0">
            Acompanhe em tempo real cada avaliação, triagem para o Google Maps e contatos de clientes.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 rounded-lg border border-[#CBD5E1] dark:border-[#334155] bg-white dark:bg-[#111827] px-3.5 py-2 text-[13px] font-medium text-[#0F172A] dark:text-[#F8FAFC] hover:bg-slate-50 dark:hover:bg-[#1F2937] transition-colors cursor-pointer shadow-xs"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-500 dark:text-slate-400">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Exportar Planilha (CSV)</span>
          </button>
        </div>
      </div>

      {/* 4 Mini KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {/* Total */}
        <div className="flex flex-col gap-1 rounded-xl border border-[#E2E8F0] dark:border-[#1F2937] bg-white dark:bg-[#111827] p-4 shadow-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
            Total de Avaliações
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-[24px] font-bold text-[#0F172A] dark:text-[#F8FAFC]">1.284</span>
            <span className="text-[11px] text-[#15803D] dark:text-emerald-400 font-semibold">+142 este mês</span>
          </div>
        </div>

        {/* Triado para Google */}
        <div className="flex flex-col gap-1 rounded-xl border border-[#E2E8F0] dark:border-[#1F2937] bg-white dark:bg-[#111827] p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
              Triadas para o Google
            </span>
            <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950/60 text-[#15803D] dark:text-emerald-300 font-bold px-1.5 py-0.2 rounded">
              92.0%
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[24px] font-bold text-emerald-600 dark:text-emerald-400">1.182</span>
            <span className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">4 e 5 Estrelas</span>
          </div>
        </div>

        {/* Retido na Ouvidoria */}
        <div className="flex flex-col gap-1 rounded-xl border border-[#E2E8F0] dark:border-[#1F2937] bg-white dark:bg-[#111827] p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
              Retidos na Ouvidoria
            </span>
            <span className="text-[10px] bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold px-1.5 py-0.2 rounded">
              8.0%
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[24px] font-bold text-amber-600 dark:text-amber-400">102</span>
            <span className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">Protegidos do Google</span>
          </div>
        </div>

        {/* Aguardando Resposta */}
        <div className="flex flex-col gap-1 rounded-xl border border-[#E2E8F0] dark:border-[#1F2937] bg-white dark:bg-[#111827] p-4 shadow-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
            Aguardando Resposta
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-[24px] font-bold text-[#2563EB] dark:text-blue-400">18</span>
            <span className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">Média: 18 min</span>
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 rounded-xl border border-[#E2E8F0] dark:border-[#1F2937] bg-white dark:bg-[#111827] p-3.5 shadow-xs transition-colors">
        {/* Search Input */}
        <div className="flex items-center gap-2 rounded-lg border border-[#CBD5E1] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#1F2937] px-3 py-1.5 w-full md:w-80">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Buscar por cliente, mesa ou palavra..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-[13px] leading-4 text-[#0F172A] dark:text-[#F8FAFC] placeholder-slate-400 outline-none"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`rounded-lg px-2.5 py-1.5 text-[12px] font-semibold transition-colors cursor-pointer ${
              activeTab === "all"
                ? "bg-[#2563EB] text-white"
                : "text-[#475569] dark:text-[#CBD5E1] hover:bg-slate-100 dark:hover:bg-[#1F2937]"
            }`}
          >
            Todas ({reviews.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("5star")}
            className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition-colors cursor-pointer ${
              activeTab === "5star"
                ? "bg-[#2563EB] text-white"
                : "text-[#475569] dark:text-[#CBD5E1] hover:bg-slate-100 dark:hover:bg-[#1F2937]"
            }`}
          >
            <span>5 Estrelas</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("4star")}
            className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition-colors cursor-pointer ${
              activeTab === "4star"
                ? "bg-[#2563EB] text-white"
                : "text-[#475569] dark:text-[#CBD5E1] hover:bg-slate-100 dark:hover:bg-[#1F2937]"
            }`}
          >
            <span>4 Estrelas</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("retained")}
            className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition-colors cursor-pointer ${
              activeTab === "retained"
                ? "bg-amber-600 text-white"
                : "text-amber-700 dark:text-amber-400 bg-amber-50/70 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/40"
            }`}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>Ouvidoria Retida (&lt;4★)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("photos")}
            className={`rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition-colors cursor-pointer ${
              activeTab === "photos"
                ? "bg-[#2563EB] text-white"
                : "text-[#475569] dark:text-[#CBD5E1] hover:bg-slate-100 dark:hover:bg-[#1F2937]"
            }`}
          >
            Com Fotos
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("unreplied")}
            className={`rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition-colors cursor-pointer ${
              activeTab === "unreplied"
                ? "bg-[#2563EB] text-white"
                : "text-[#475569] dark:text-[#CBD5E1] hover:bg-slate-100 dark:hover:bg-[#1F2937]"
            }`}
          >
            Não respondidas
          </button>
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 self-end md:self-auto">
          <span>Ordenar:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="rounded-md border border-[#CBD5E1] dark:border-[#334155] bg-white dark:bg-[#111827] px-2 py-1 text-xs text-[#0F172A] dark:text-[#F8FAFC] outline-none cursor-pointer"
          >
            <option value="recent">Mais Recentes</option>
            <option value="highest">Maior Nota</option>
            <option value="lowest">Menor Nota</option>
          </select>
        </div>
      </div>

      {/* Reviews Feed List */}
      <div className="space-y-4">
        {sorted.map((rev) => (
          <div
            key={rev.id}
            className={`flex flex-col gap-3 rounded-xl border p-5 shadow-xs transition-all duration-200 ${
              !rev.isPromoter
                ? "border-amber-200/90 dark:border-amber-900/50 bg-amber-50/20 dark:bg-amber-950/10"
                : "border-[#E2E8F0] dark:border-[#1F2937] bg-white dark:bg-[#111827]"
            }`}
          >
            {/* Header: Customer Info + Rating + Routing Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[13px] font-bold ${
                    !rev.isPromoter
                      ? "bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200"
                      : "bg-[#DBEAFE] dark:bg-blue-950/70 text-[#1D4ED8] dark:text-blue-300"
                  }`}
                >
                  {rev.initials}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                      {rev.customerName}
                    </span>
                    <span className="rounded bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-300 font-semibold px-1.5 py-0.2">
                      Verificado
                    </span>
                  </div>
                  <span className="text-[12px] text-[#64748B] dark:text-[#94A3B8]">
                    {rev.timeAgo} • {rev.table} {rev.phone && `• Tel: ${rev.phone}`}
                  </span>
                </div>
              </div>

              {/* Rating + Routing status */}
              <div className="flex items-center gap-2.5 flex-wrap">
                {/* Star visual */}
                <div className="flex items-center gap-1 rounded-md bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-900/40 px-2 py-0.5">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <span className="text-[12px] font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                    {rev.rating.toFixed(1)}
                  </span>
                </div>

                {/* Routing Badge */}
                {rev.isPromoter ? (
                  <div className="flex items-center gap-1.5 rounded-full bg-emerald-100/90 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/40 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800 dark:text-emerald-300">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Triado p/ Google Maps</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 rounded-full bg-amber-100/90 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/40 px-2.5 py-0.5 text-[11px] font-semibold text-amber-800 dark:text-amber-300">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span>Retido na Ouvidoria (Privado)</span>
                  </div>
                )}
              </div>
            </div>

            {/* Comment Body */}
            <p className="text-[13px] leading-[20px] text-[#0F172A] dark:text-[#E2E8F0] m-0">
              &ldquo;{rev.comment}&rdquo;
            </p>

            {/* Photo Attachment if present */}
            {rev.hasPhoto && rev.photoUrl && (
              <div className="mt-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={rev.photoUrl}
                  alt={`Foto enviada por ${rev.customerName}`}
                  className="h-28 w-36 object-cover rounded-lg border border-slate-200 dark:border-slate-800 shadow-xs hover:scale-105 transition-transform cursor-pointer"
                />
              </div>
            )}

            {/* Tags */}
            {rev.tags && rev.tags.length > 0 && (
              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                {rev.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-[#EFF6FF] dark:bg-blue-950/40 text-[11px] font-medium text-[#1D4ED8] dark:text-blue-300 px-2 py-0.5 border border-blue-100 dark:border-blue-900/40"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Existing Reply Display */}
            {rev.replied && rev.replyText && (
              <div className="mt-1 rounded-lg border border-slate-200/90 dark:border-[#334155] bg-slate-50 dark:bg-[#1F2937]/50 p-3.5 text-xs space-y-1">
                <div className="flex items-center justify-between font-semibold text-slate-800 dark:text-slate-100">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                    <span>Resposta do Café Aurora:</span>
                  </div>
                  {rev.replyDate && (
                    <span className="text-[11px] font-normal text-slate-400">{rev.replyDate}</span>
                  )}
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[12px] leading-5 m-0">
                  {rev.replyText}
                </p>
              </div>
            )}

            {/* Interactive Reply Area or Action Bar */}
            {replyingId === rev.id ? (
              <div className="mt-2 space-y-2.5 rounded-lg border border-blue-200 dark:border-blue-900/50 bg-blue-50/40 dark:bg-blue-950/20 p-3.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    Escreva a resposta oficial para {rev.customerName}:
                  </span>
                  <button
                    type="button"
                    onClick={() => handleAiSuggest(rev)}
                    className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    ✨ Sugerir com IA
                  </button>
                </div>

                <textarea
                  rows={3}
                  placeholder="Escreva sua resposta cordial e personalizada..."
                  value={replyInput}
                  onChange={(e) => setReplyInput(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 dark:border-[#334155] bg-white dark:bg-[#111827] p-2.5 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />

                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setReplyingId(null);
                      setReplyInput("");
                    }}
                    className="rounded-md px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-[#1F2937]"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSendReply(rev.id)}
                    className="rounded-md bg-blue-600 hover:bg-blue-700 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs"
                  >
                    Salvar e Enviar Resposta
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-[#1F2937] text-xs">
                <div className="flex items-center gap-3">
                  {rev.phone && (
                    <a
                      href={`https://wa.me/55${rev.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Olá ${rev.customerName}, aqui é da gerência do Café Aurora! Agradecemos pelo seu feedback recente.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
                    >
                      <span>💬 Chamar no WhatsApp</span>
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => handleCopyReviewLink(rev.id)}
                    className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                  >
                    {copiedReviewId === rev.id ? "✓ Link copiado" : "Compartilhar avaliação"}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setReplyingId(rev.id);
                    setReplyInput(rev.replyText || "");
                  }}
                  className="rounded-md border border-[#DBEAFE] dark:border-blue-900/40 bg-[#EFF6FF] dark:bg-blue-950/40 px-3 py-1 text-[12px] font-semibold text-[#2563EB] dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors cursor-pointer"
                >
                  {rev.replied ? "Editar Resposta" : "Responder ao Cliente"}
                </button>
              </div>
            )}
          </div>
        ))}

        {sorted.length === 0 && (
          <div className="rounded-xl border border-slate-200 dark:border-[#334155] bg-white dark:bg-[#111827] p-12 text-center text-slate-500 dark:text-slate-400 text-xs">
            Nenhuma avaliação encontrada com os filtros selecionados.
          </div>
        )}
      </div>
    </div>
  );
}
