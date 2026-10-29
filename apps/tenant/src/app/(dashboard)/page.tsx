"use client";

import * as React from "react";

interface Review {
  id: string;
  customerName: string;
  initials: string;
  timeAgo: string;
  table: string;
  rating: number;
  comment: string;
  hasPhoto?: boolean;
  replied?: boolean;
  replyText?: string;
  tag?: string;
}

export default function TenantDashboardPage() {
  const [activeFilter, setActiveFilter] = React.useState<"all" | "5star" | "photos" | "unreplied">("all");
  const [dateRange, setDateRange] = React.useState("Últimos 30 dias");
  const [dateMenuOpen, setDateMenuOpen] = React.useState(false);
  const [replyingToId, setReplyingToId] = React.useState<string | null>(null);
  const [replyInput, setReplyInput] = React.useState("");

  const initialReviews: Review[] = [
    {
      id: "rev_1",
      customerName: "Mariana Santos",
      initials: "MS",
      timeAgo: "Há 15 minutos",
      table: "Mesa 14",
      rating: 5.0,
      comment: "O espresso duplo com grãos da Mantiqueira estava perfeito e o atendimento do Lucas foi sensacional!",
      hasPhoto: true,
      replied: false,
      tag: "espresso duplo",
    },
    {
      id: "rev_2",
      customerName: "Carlos Eduardo",
      initials: "CE",
      timeAgo: "Há 42 minutos",
      table: "Mesa 08",
      rating: 5.0,
      comment: "Melhor croissant de amêndoas da região. Ambiente agradável e música na altura certa para conversar.",
      hasPhoto: true,
      replied: true,
      replyText: "Muito obrigado, Carlos! Nossa fornada sai quentinha todas as manhãs. Volte sempre!",
      tag: "croissant",
    },
    {
      id: "rev_3",
      customerName: "Beatriz Lima",
      initials: "BL",
      timeAgo: "Há 2 horas",
      table: "Balcão",
      rating: 5.0,
      comment: "Atendimento gentil desde a entrada até a saída. O bolo de cenoura com calda quente é surreal.",
      hasPhoto: false,
      replied: false,
      tag: "atendimento gentil",
    },
    {
      id: "rev_4",
      customerName: "Rafael Rocha",
      initials: "RR",
      timeAgo: "Ontem às 18:30",
      table: "Mesa 03",
      rating: 4.0,
      comment: "Café excelente e bem tirado. Demorou apenas um pouquinho para trazerem o pedido, mas valeu a pena.",
      hasPhoto: false,
      replied: true,
      replyText: "Olá Rafael, agradecemos o feedback! Reforçamos o fluxo do balcão para seu próximo café ser ainda mais rápido.",
      tag: "espresso duplo",
    },
  ];

  const [reviewsList, setReviewsList] = React.useState<Review[]>(initialReviews);

  const handleSendReply = (reviewId: string) => {
    if (!replyInput.trim()) return;
    setReviewsList((prev) =>
      prev.map((r) =>
        r.id === reviewId ? { ...r, replied: true, replyText: replyInput.trim() } : r
      )
    );
    setReplyingToId(null);
    setReplyInput("");
  };

  const filteredReviews = reviewsList.filter((rev) => {
    if (activeFilter === "5star") return rev.rating === 5.0;
    if (activeFilter === "photos") return rev.hasPhoto;
    if (activeFilter === "unreplied") return !rev.replied;
    return true;
  });

  const handleExportReport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Cliente,Mesa,Horario,Nota,Comentario,Respondido"]
        .concat(
          reviewsList.map(
            (r) =>
              `"${r.customerName}","${r.table}","${r.timeAgo}",${r.rating},"${r.comment}",${r.replied ? "Sim" : "Nao"}`
          )
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `relatorio-avaliacoes-cafe-aurora.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mx-auto flex max-w-[1440px] flex-col gap-6 p-6 md:p-8 select-none transition-colors duration-200">
      {/* Title & Action Bar */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 items-start sm:items-end justify-between w-full">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-[24px] font-bold leading-[30px] tracking-tight text-[#0F172A] dark:text-[#F8FAFC] m-0">
              Desempenho &amp; Avaliações
            </h1>
            <div className="rounded-full bg-[#DCFCE7] dark:bg-emerald-950/50 border border-transparent dark:border-emerald-800/40 px-2 py-0.5">
              <span className="text-[11px] font-semibold leading-3.5 text-[#15803D] dark:text-emerald-400">
                ● 98.4% de satisfação
              </span>
            </div>
          </div>
          <p className="text-[13px] leading-4 text-[#64748B] dark:text-[#94A3B8] m-0">
            Monitoramento em tempo real das experiências dos clientes do Café Aurora
          </p>
        </div>

        {/* Date Selector & Export Button */}
        <div className="flex items-center gap-2.5 relative">
          {/* Date Selector Dropdown Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setDateMenuOpen((prev) => !prev)}
              className="flex items-center gap-2 rounded-lg border border-[#CBD5E1] dark:border-[#334155] bg-white dark:bg-[#111827] px-3.5 py-2 hover:bg-slate-50 dark:hover:bg-[#1F2937] transition-colors cursor-pointer text-[#0F172A] dark:text-[#F8FAFC]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-500 dark:text-slate-400" />
                <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" className="text-slate-500 dark:text-slate-400" />
                <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" className="text-slate-500 dark:text-slate-400" />
                <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" className="text-slate-500 dark:text-slate-400" />
              </svg>
              <span className="text-[13px] font-medium leading-4">
                {dateRange}
              </span>
              <svg width="12" height="12" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="shrink-0 text-slate-500 dark:text-slate-400">
                <polyline points="6 9 12 15 18 9" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>

            {dateMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg border border-slate-200 dark:border-[#334155] bg-white dark:bg-[#111827] shadow-xl z-50 py-1 text-xs">
                {["Últimos 7 dias", "Últimos 15 dias", "Últimos 30 dias", "Este mês", "Últimos 90 dias"].map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => {
                      setDateRange(range);
                      setDateMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 font-medium transition-colors ${
                      dateRange === range
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50/70 dark:bg-blue-950/40"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1F2937]"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Export Report Button */}
          <button
            type="button"
            onClick={handleExportReport}
            className="flex items-center gap-1.5 rounded-lg bg-[#2563EB] hover:bg-blue-700 px-4 py-2 text-[13px] font-semibold leading-4 text-white shadow-xs transition-colors cursor-pointer active:scale-[0.98]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" fill="none" stroke="#FFFFFF" strokeWidth="2" />
              <polyline points="7 10 12 15 17 10" fill="none" stroke="#FFFFFF" strokeWidth="2" />
              <line x1="12" y1="15" x2="12" y2="3" stroke="#FFFFFF" strokeWidth="2" />
            </svg>
            <span>Exportar Relatório</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {/* Card 1: Nota Média */}
        <div className="flex flex-col gap-2 rounded-xl border border-[#E2E8F0] dark:border-[#1F2937] bg-white dark:bg-[#111827] p-[18px] shadow-xs transition-colors duration-200">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-medium leading-4 text-[#64748B] dark:text-[#94A3B8]">
              Nota Média
            </span>
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#FFFBEB] dark:bg-amber-950/40">
              <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <polygon
                  points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                  fill="#F59E0B"
                  stroke="#F59E0B"
                />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-[26px] font-bold leading-8 text-[#0F172A] dark:text-[#F8FAFC]">
              4.85
            </span>
            <span className="text-[13px] leading-4 text-[#64748B] dark:text-[#94A3B8]">
              / 5.0
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="rounded bg-[#F0FDF4] dark:bg-emerald-950/40 px-1.5 py-0.5">
              <span className="text-[11px] font-semibold leading-3.5 text-[#15803D] dark:text-emerald-400">
                +0.3 pts
              </span>
            </div>
            <span className="text-[11px] leading-3.5 text-[#64748B] dark:text-[#94A3B8]">
              vs. mês anterior
            </span>
          </div>
        </div>

        {/* Card 2: Total de Avaliações */}
        <div className="flex flex-col gap-2 rounded-xl border border-[#E2E8F0] dark:border-[#1F2937] bg-white dark:bg-[#111827] p-[18px] shadow-xs transition-colors duration-200">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-medium leading-4 text-[#64748B] dark:text-[#94A3B8]">
              Total de Avaliações
            </span>
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#EFF6FF] dark:bg-blue-950/40">
              <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="none" stroke="#2563EB" strokeWidth="2" className="dark:stroke-blue-400" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-[26px] font-bold leading-8 text-[#0F172A] dark:text-[#F8FAFC]">
              1.284
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="rounded bg-[#F0FDF4] dark:bg-emerald-950/40 px-1.5 py-0.5">
              <span className="text-[11px] font-semibold leading-3.5 text-[#15803D] dark:text-emerald-400">
                +142 este mês
              </span>
            </div>
            <span className="text-[11px] leading-3.5 text-[#64748B] dark:text-[#94A3B8]">
              via QR Code
            </span>
          </div>
        </div>

        {/* Card 3: Taxa de Resposta */}
        <div className="flex flex-col gap-2 rounded-xl border border-[#E2E8F0] dark:border-[#1F2937] bg-white dark:bg-[#111827] p-[18px] shadow-xs transition-colors duration-200">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-medium leading-4 text-[#64748B] dark:text-[#94A3B8]">
              Taxa de Resposta
            </span>
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#F0FDF4] dark:bg-emerald-950/40">
              <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <polyline points="20 6 9 17 4 12" fill="none" stroke="#15803D" strokeWidth="2" className="dark:stroke-emerald-400" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-[26px] font-bold leading-8 text-[#0F172A] dark:text-[#F8FAFC]">
              96.2%
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold leading-3.5 text-[#15803D] dark:text-emerald-400">
              Tempo médio: 18 min
            </span>
          </div>
        </div>

        {/* Card 4: NPS (Net Promoter) */}
        <div className="flex flex-col gap-2 rounded-xl border border-[#E2E8F0] dark:border-[#1F2937] bg-white dark:bg-[#111827] p-[18px] shadow-xs transition-colors duration-200">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-medium leading-4 text-[#64748B] dark:text-[#94A3B8]">
              NPS (Net Promoter)
            </span>
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#EFF6FF] dark:bg-blue-950/40">
              <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <circle cx="12" cy="12" r="10" fill="none" stroke="#2563EB" strokeWidth="2" className="dark:stroke-blue-400" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" fill="none" stroke="#2563EB" strokeWidth="2" className="dark:stroke-blue-400" />
                <line x1="9" y1="9" x2="9.01" y2="9" stroke="#2563EB" strokeWidth="2" className="dark:stroke-blue-400" />
                <line x1="15" y1="9" x2="15.01" y2="9" stroke="#2563EB" strokeWidth="2" className="dark:stroke-blue-400" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-[26px] font-bold leading-8 text-[#2563EB] dark:text-blue-400">
              +88
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="rounded bg-[#DBEAFE] dark:bg-blue-950/60 px-1.5 py-0.5">
              <span className="text-[11px] font-semibold leading-3.5 text-[#1D4ED8] dark:text-blue-300">
                Zona de Excelência
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Section: Left (Distribution & Tags) & Right (Review Filter & Feed) */}
      <div className="flex flex-col lg:flex-row gap-5 items-start w-full">
        {/* Left Column: Distribuição das Notas & Termos mais elogiados */}
        <div className="flex flex-col gap-3.5 rounded-[14px] border border-[#E2E8F0] dark:border-[#1F2937] bg-white dark:bg-[#111827] p-5 shadow-xs w-full lg:w-[340px] shrink-0 transition-colors duration-200">
          <span className="text-[15px] font-semibold leading-[18px] text-[#0F172A] dark:text-[#F8FAFC]">
            Distribuição das Notas
          </span>

          <div className="flex flex-col gap-2">
            {/* 5 Stars */}
            <div className="flex items-center gap-2">
              <span className="w-6 shrink-0 text-[12px] font-semibold leading-4 text-[#0F172A] dark:text-[#F8FAFC]">
                5★
              </span>
              <div className="flex h-2 flex-1 rounded-full bg-[#F1F5F9] dark:bg-[#1F2937] overflow-hidden">
                <div className="h-full rounded-full bg-[#F59E0B]" style={{ width: "85%" }} />
              </div>
              <span className="w-11 shrink-0 text-right text-[12px] leading-4 text-[#64748B] dark:text-[#94A3B8]">
                1.092
              </span>
            </div>

            {/* 4 Stars */}
            <div className="flex items-center gap-2">
              <span className="w-6 shrink-0 text-[12px] font-semibold leading-4 text-[#0F172A] dark:text-[#F8FAFC]">
                4★
              </span>
              <div className="flex h-2 flex-1 rounded-full bg-[#F1F5F9] dark:bg-[#1F2937] overflow-hidden">
                <div className="h-full rounded-full bg-[#F59E0B]" style={{ width: "11%" }} />
              </div>
              <span className="w-11 shrink-0 text-right text-[12px] leading-4 text-[#64748B] dark:text-[#94A3B8]">
                140
              </span>
            </div>

            {/* 3 Stars */}
            <div className="flex items-center gap-2">
              <span className="w-6 shrink-0 text-[12px] font-semibold leading-4 text-[#0F172A] dark:text-[#F8FAFC]">
                3★
              </span>
              <div className="flex h-2 flex-1 rounded-full bg-[#F1F5F9] dark:bg-[#1F2937] overflow-hidden">
                <div className="h-full rounded-full bg-[#F59E0B]" style={{ width: "2.5%" }} />
              </div>
              <span className="w-11 shrink-0 text-right text-[12px] leading-4 text-[#64748B] dark:text-[#94A3B8]">
                32
              </span>
            </div>

            {/* 2 Stars */}
            <div className="flex items-center gap-2">
              <span className="w-6 shrink-0 text-[12px] font-semibold leading-4 text-[#0F172A] dark:text-[#F8FAFC]">
                2★
              </span>
              <div className="flex h-2 flex-1 rounded-full bg-[#F1F5F9] dark:bg-[#1F2937] overflow-hidden">
                <div className="h-full rounded-full bg-[#CBD5E1] dark:bg-[#475569]" style={{ width: "1%" }} />
              </div>
              <span className="w-11 shrink-0 text-right text-[12px] leading-4 text-[#64748B] dark:text-[#94A3B8]">
                12
              </span>
            </div>

            {/* 1 Star */}
            <div className="flex items-center gap-2">
              <span className="w-6 shrink-0 text-[12px] font-semibold leading-4 text-[#0F172A] dark:text-[#F8FAFC]">
                1★
              </span>
              <div className="flex h-2 flex-1 rounded-full bg-[#F1F5F9] dark:bg-[#1F2937] overflow-hidden">
                <div className="h-full rounded-full bg-[#DC2626]" style={{ width: "0.6%" }} />
              </div>
              <span className="w-11 shrink-0 text-right text-[12px] leading-4 text-[#64748B] dark:text-[#94A3B8]">
                8
              </span>
            </div>
          </div>

          {/* Praised Terms Section */}
          <div className="flex flex-col gap-1.5 border-t border-[#F1F5F9] dark:border-[#1F2937] pt-3">
            <span className="text-[12px] font-semibold leading-4 text-[#475569] dark:text-[#CBD5E1]">
              Termos mais elogiados
            </span>
            <div className="flex flex-wrap gap-1">
              {["espresso duplo", "croissant", "atendimento gentil"].map((tag) => (
                <div
                  key={tag}
                  className="rounded-md bg-[#EFF6FF] dark:bg-blue-950/40 border border-transparent dark:border-blue-900/30 px-2 py-0.5 text-[11px] font-medium leading-3.5 text-[#1D4ED8] dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors cursor-pointer"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Filter Bar & Review Cards */}
        <div className="flex flex-col gap-3.5 flex-1 w-full">
          {/* Filter Bar */}
          <div className="flex items-center justify-between flex-wrap gap-2 rounded-xl border border-[#E2E8F0] dark:border-[#1F2937] bg-white dark:bg-[#111827] px-4 py-3 shadow-xs transition-colors duration-200">
            <div className="flex items-center gap-2 flex-wrap">
              {/* All */}
              <button
                type="button"
                onClick={() => setActiveFilter("all")}
                className={`rounded-lg px-3 py-1.5 text-[12px] leading-4 font-semibold transition-colors cursor-pointer ${
                  activeFilter === "all"
                    ? "bg-[#2563EB] text-white"
                    : "border border-[#CBD5E1] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#1F2937] text-[#475569] dark:text-[#CBD5E1] hover:bg-slate-100 dark:hover:bg-[#283548]"
                }`}
              >
                Todas (1.284)
              </button>

              {/* 5 Stars */}
              <button
                type="button"
                onClick={() => setActiveFilter("5star")}
                className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-[12px] leading-4 font-medium transition-colors cursor-pointer ${
                  activeFilter === "5star"
                    ? "bg-[#2563EB] text-white"
                    : "border border-[#CBD5E1] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#1F2937] text-[#0F172A] dark:text-[#F8FAFC] hover:bg-slate-100 dark:hover:bg-[#283548]"
                }`}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                  <polygon
                    points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                    fill={activeFilter === "5star" ? "#FFFFFF" : "#F59E0B"}
                    stroke={activeFilter === "5star" ? "#FFFFFF" : "#F59E0B"}
                  />
                </svg>
                <span>5 Estrelas</span>
              </button>

              {/* With Photos */}
              <button
                type="button"
                onClick={() => setActiveFilter("photos")}
                className={`rounded-lg px-3 py-1.5 text-[12px] leading-4 font-medium transition-colors cursor-pointer ${
                  activeFilter === "photos"
                    ? "bg-[#2563EB] text-white"
                    : "border border-[#CBD5E1] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#1F2937] text-[#475569] dark:text-[#CBD5E1] hover:bg-slate-100 dark:hover:bg-[#283548]"
                }`}
              >
                Com Fotos (432)
              </button>

              {/* Unreplied */}
              <button
                type="button"
                onClick={() => setActiveFilter("unreplied")}
                className={`rounded-lg px-3 py-1.5 text-[12px] leading-4 font-medium transition-colors cursor-pointer ${
                  activeFilter === "unreplied"
                    ? "bg-[#2563EB] text-white"
                    : "border border-[#CBD5E1] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#1F2937] text-[#475569] dark:text-[#CBD5E1] hover:bg-slate-100 dark:hover:bg-[#283548]"
                }`}
              >
                Não respondidas (18)
              </button>
            </div>

            {/* Clear Button */}
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className="text-[12px] font-semibold leading-4 text-[#2563EB] dark:text-blue-400 hover:underline bg-transparent border-none cursor-pointer"
            >
              Limpar
            </button>
          </div>

          {/* Reviews List */}
          <div className="space-y-3.5">
            {filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="flex flex-col gap-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#1F2937] bg-white dark:bg-[#111827] p-4 shadow-xs hover:shadow-sm transition-all duration-200"
              >
                {/* Header: User Avatar, Name, Time/Table, and Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] dark:bg-blue-950/70 text-[13px] font-bold text-[#1D4ED8] dark:text-blue-300">
                      {rev.initials}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-semibold leading-4 text-[#0F172A] dark:text-[#F8FAFC]">
                        {rev.customerName}
                      </span>
                      <span className="text-[11px] leading-3.5 text-[#64748B] dark:text-[#94A3B8]">
                        {rev.timeAgo} • {rev.table}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                      <polygon
                        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                        fill="#F59E0B"
                        stroke="#F59E0B"
                      />
                    </svg>
                    <span className="text-[12px] font-bold leading-4 text-[#0F172A] dark:text-[#F8FAFC]">
                      {rev.rating.toFixed(1)}
                    </span>
                  </div>
                </div>

                {/* Review Comment */}
                <p className="text-[13px] leading-[18px] text-[#0F172A] dark:text-[#E2E8F0] m-0">
                  &ldquo;{rev.comment}&rdquo;
                </p>

                {/* If already replied, show the reply message */}
                {rev.replied && rev.replyText && (
                  <div className="rounded-lg border border-slate-200/80 dark:border-[#334155] bg-slate-50 dark:bg-[#1F2937]/50 p-3 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-100">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                      Resposta do Café Aurora:
                    </div>
                    <div className="text-slate-600 dark:text-slate-300">{rev.replyText}</div>
                  </div>
                )}

                {/* Reply Form or Reply Button */}
                {replyingToId === rev.id ? (
                  <div className="pt-2 space-y-2">
                    <textarea
                      rows={2}
                      placeholder={`Escreva uma resposta para ${rev.customerName}...`}
                      value={replyInput}
                      onChange={(e) => setReplyInput(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 dark:border-[#334155] bg-white dark:bg-[#1F2937] p-2.5 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-500"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setReplyingToId(null);
                          setReplyInput("");
                        }}
                        className="rounded-md px-3 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1F2937]"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSendReply(rev.id)}
                        className="rounded-md bg-blue-600 hover:bg-blue-700 px-3 py-1 text-xs font-semibold text-white shadow-xs"
                      >
                        Enviar Resposta
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setReplyingToId(rev.id);
                        setReplyInput(rev.replyText || "");
                      }}
                      className="rounded-md border border-[#DBEAFE] dark:border-blue-900/40 bg-[#EFF6FF] dark:bg-blue-950/40 px-3 py-1 text-[12px] font-semibold leading-4 text-[#2563EB] dark:text-blue-400 hover:bg-blue-100/70 dark:hover:bg-blue-900/40 transition-colors cursor-pointer"
                    >
                      {rev.replied ? "Editar Resposta" : "Responder"}
                    </button>
                  </div>
                )}
              </div>
            ))}

            {filteredReviews.length === 0 && (
              <div className="rounded-xl border border-slate-200 dark:border-[#334155] bg-white dark:bg-[#111827] p-8 text-center text-xs text-slate-500 dark:text-slate-400">
                Nenhuma avaliação encontrada para o filtro selecionado.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
