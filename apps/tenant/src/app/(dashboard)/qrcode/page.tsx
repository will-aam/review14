"use client";

import * as React from "react";
import QRCode from "qrcode";

interface ActiveQrPoint {
  id: string;
  name: string;
  type: "balcao" | "mesa" | "conta" | "delivery";
  slug: string;
  url: string;
  totalScans: number;
  reviewsCount: number;
  conversionRate: string;
  status: "active" | "inactive";
}

export default function QrCodeAndLinksPage() {
  const [selectedType, setSelectedType] = React.useState<"balcao" | "mesa" | "conta" | "delivery">("mesa");
  const [tableNumber, setTableNumber] = React.useState("14");
  const [attendantName, setAttendantName] = React.useState("Lucas");
  const [qrColor, setQrColor] = React.useState("#0F172A");
  const [qrDataUrl, setQrDataUrl] = React.useState<string>("");
  const [copiedLink, setCopiedLink] = React.useState(false);
  const [batchModalOpen, setBatchModalOpen] = React.useState(false);
  const [batchCount, setBatchCount] = React.useState("20");

  const baseUrl = "https://review14.app/r/cafe-aurora";

  // Build target URL dynamically
  const currentUrl = React.useMemo(() => {
    const params = new URLSearchParams();
    if (selectedType === "mesa" && tableNumber) {
      params.append("mesa", tableNumber);
    }
    if (selectedType === "conta") {
      params.append("origem", "conta");
    }
    if (selectedType === "delivery") {
      params.append("origem", "delivery");
    }
    if (attendantName.trim()) {
      params.append("garcom", attendantName.trim());
    }
    const query = params.toString();
    return query ? `${baseUrl}?${query}` : baseUrl;
  }, [selectedType, tableNumber, attendantName]);

  // Generate QR Code data URL
  React.useEffect(() => {
    QRCode.toDataURL(currentUrl, {
      width: 500,
      margin: 2,
      color: {
        dark: qrColor,
        light: "#FFFFFF",
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error("Error generating QR code:", err));
  }, [currentUrl, qrColor]);

  const activePoints: ActiveQrPoint[] = [
    {
      id: "pt_1",
      name: "Display do Balcão Principal",
      type: "balcao",
      slug: "balcao-principal",
      url: `${baseUrl}`,
      totalScans: 842,
      reviewsCount: 512,
      conversionRate: "60.8%",
      status: "active",
    },
    {
      id: "pt_2",
      name: "Salão Principal (Mesas 01 a 20)",
      type: "mesa",
      slug: "salao-mesas",
      url: `${baseUrl}?mesa=14`,
      totalScans: 620,
      reviewsCount: 438,
      conversionRate: "70.6%",
      status: "active",
    },
    {
      id: "pt_3",
      name: "Comanda & Fechamento de Conta",
      type: "conta",
      slug: "comanda-fechamento",
      url: `${baseUrl}?origem=conta`,
      totalScans: 318,
      reviewsCount: 198,
      conversionRate: "62.2%",
      status: "active",
    },
    {
      id: "pt_4",
      name: "Adesivo de Embalagem (Delivery)",
      type: "delivery",
      slug: "embalagem-delivery",
      url: `${baseUrl}?origem=delivery`,
      totalScans: 194,
      reviewsCount: 136,
      conversionRate: "70.1%",
      status: "active",
    },
  ];

  const handleCopy = (urlToCopy?: string) => {
    navigator.clipboard.writeText(urlToCopy || currentUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePrintTableTent = () => {
    window.print();
  };

  return (
    <div className="mx-auto flex max-w-[1440px] flex-col gap-6 p-6 md:p-8 select-none transition-colors duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 items-start sm:items-end justify-between w-full">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5">
            <h1 className="text-[24px] font-bold leading-[30px] tracking-tight text-[#0F172A] dark:text-[#F8FAFC] m-0">
              QR Codes &amp; Links de Coleta
            </h1>
            <span className="rounded-full bg-blue-100 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/50 px-2.5 py-0.5 text-[11px] font-semibold text-blue-700 dark:text-blue-300">
              4 pontos ativos
            </span>
          </div>
          <p className="text-[13px] leading-4 text-[#64748B] dark:text-[#94A3B8] m-0">
            Gere displays para mesas, balcões e comandas para capturar avaliações no momento da experiência.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={() => setBatchModalOpen(true)}
            className="flex items-center gap-1.5 rounded-lg border border-[#CBD5E1] dark:border-[#334155] bg-white dark:bg-[#111827] px-3.5 py-2 text-[13px] font-medium text-[#0F172A] dark:text-[#F8FAFC] hover:bg-slate-50 dark:hover:bg-[#1F2937] transition-colors cursor-pointer shadow-xs"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-500 dark:text-slate-400">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
            <span>Gerar Lote de Mesas (PDF)</span>
          </button>

          <button
            type="button"
            onClick={handlePrintTableTent}
            className="flex items-center gap-1.5 rounded-lg bg-[#2563EB] hover:bg-blue-700 px-4 py-2 text-[13px] font-semibold leading-4 text-white shadow-xs transition-colors cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
            <span>Imprimir Display de Mesa</span>
          </button>
        </div>
      </div>

      {/* Main 2 Columns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-start">
        {/* Left Column (5 cols): QR Code Studio & Customizer */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div className="flex flex-col gap-4 rounded-xl border border-[#E2E8F0] dark:border-[#1F2937] bg-white dark:bg-[#111827] p-5 shadow-xs transition-colors">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#1F2937] pb-3">
              <span className="text-[15px] font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                Customizador de QR Code
              </span>
              <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded">
                Ao vivo
              </span>
            </div>

            {/* Destination Type Select */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-slate-700 dark:text-slate-300">
                Ponto de Posicionamento:
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: "mesa", label: "Mesa do Salão" },
                  { id: "balcao", label: "Balcão / Recepção" },
                  { id: "conta", label: "Comanda / Conta" },
                  { id: "delivery", label: "Delivery / Embalagem" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedType(item.id as any)}
                    className={`rounded-lg border p-2 text-left transition-colors cursor-pointer ${
                      selectedType === item.id
                        ? "border-blue-600 bg-blue-50/70 text-blue-700 dark:border-blue-500 dark:bg-blue-950/50 dark:text-blue-300 font-semibold"
                        : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Parameter: Table number if mesa */}
            {selectedType === "mesa" && (
              <div className="flex items-center gap-3">
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-[12px] font-semibold text-slate-700 dark:text-slate-300">
                    Número da Mesa:
                  </label>
                  <input
                    type="text"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    placeholder="Ex: 14"
                    className="rounded-lg border border-[#CBD5E1] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#1F2937] p-2 text-xs text-[#0F172A] dark:text-[#F8FAFC] outline-none focus:border-blue-600"
                  />
                </div>

                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-[12px] font-semibold text-slate-700 dark:text-slate-300">
                    Atendente (Opcional):
                  </label>
                  <input
                    type="text"
                    value={attendantName}
                    onChange={(e) => setAttendantName(e.target.value)}
                    placeholder="Ex: Lucas"
                    className="rounded-lg border border-[#CBD5E1] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#1F2937] p-2 text-xs text-[#0F172A] dark:text-[#F8FAFC] outline-none focus:border-blue-600"
                  />
                </div>
              </div>
            )}

            {/* Color Selector */}
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Cor do QR Code:</span>
              <div className="flex items-center gap-2">
                {[
                  { color: "#0F172A", label: "Preto Clássico" },
                  { color: "#2563EB", label: "Azul Review14" },
                  { color: "#D97706", label: "Dourado Café" },
                ].map((c) => (
                  <button
                    key={c.color}
                    type="button"
                    onClick={() => setQrColor(c.color)}
                    style={{ backgroundColor: c.color }}
                    title={c.label}
                    className={`h-6 w-6 rounded-full border-2 transition-transform cursor-pointer ${
                      qrColor === c.color ? "scale-110 border-white ring-2 ring-blue-500" : "border-transparent"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Live QR Code Box */}
            <div className="flex flex-col items-center justify-center rounded-xl border border-slate-100 dark:border-[#1F2937] bg-[#F8FAFC] dark:bg-[#1F2937]/30 p-6 space-y-3">
              {qrDataUrl ? (
                <div className="relative p-3 bg-white rounded-2xl shadow-md border border-slate-200/80">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={qrDataUrl}
                    alt="QR Code Café Aurora"
                    className="w-48 h-48 rounded-xl object-contain"
                  />
                  {/* Center Star Badge Icon */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="h-9 w-9 rounded-full bg-white shadow-md flex items-center justify-center p-1 border border-slate-100">
                      <div className="h-full w-full rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold">
                        ★
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-48 h-48 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
              )}

              {/* URL preview */}
              <div className="flex items-center gap-2 w-full max-w-sm rounded-lg bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155] p-2 text-[11px] font-mono text-slate-600 dark:text-slate-300">
                <span className="truncate flex-1">{currentUrl}</span>
                <button
                  type="button"
                  onClick={() => handleCopy()}
                  className="shrink-0 text-blue-600 dark:text-blue-400 font-sans font-semibold hover:underline"
                >
                  {copiedLink ? "Copiado!" : "Copiar"}
                </button>
              </div>
            </div>

            {/* Actions for this QR */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              {qrDataUrl && (
                <a
                  href={qrDataUrl}
                  download={`qrcode-cafe-aurora-${selectedType}${selectedType === "mesa" ? `-mesa${tableNumber}` : ""}.png`}
                  className="flex items-center justify-center gap-1.5 rounded-lg border border-[#CBD5E1] dark:border-[#334155] bg-white dark:bg-[#111827] p-2 text-xs font-semibold text-[#0F172A] dark:text-[#F8FAFC] hover:bg-slate-50 dark:hover:bg-[#1F2937] transition-colors"
                >
                  <span>📥 Baixar PNG</span>
                </a>
              )}
              <button
                type="button"
                onClick={() => handleCopy()}
                className="flex items-center justify-center gap-1.5 rounded-lg bg-[#2563EB] text-white p-2 text-xs font-semibold hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
              >
                <span>{copiedLink ? "✓ Link Copiado" : "🔗 Copiar Link Direto"}</span>
              </button>
            </div>
          </div>

          {/* Table Tent Acrilic Display Preview */}
          <div className="flex flex-col gap-3 rounded-xl border border-[#E2E8F0] dark:border-[#1F2937] bg-white dark:bg-[#111827] p-5 shadow-xs transition-colors">
            <span className="text-[14px] font-bold text-[#0F172A] dark:text-[#F8FAFC]">
              Prévia do Display de Mesa (Acrílico)
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400 m-0">
              Modelo pronto para colocar nas mesas. Ao apontar o celular, a mesa é detectada automaticamente.
            </p>

            {/* Display Stand Mockup */}
            <div className="rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#1F2937]/40 p-6 flex flex-col items-center text-center space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-md bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                  ★
                </div>
                <span className="font-bold text-slate-900 dark:text-white text-sm">Café Aurora</span>
              </div>

              <div className="space-y-0.5">
                <div className="text-xs font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider">
                  Sua opinião vale muito
                </div>
                <div className="text-[13px] font-semibold text-slate-800 dark:text-slate-200">
                  Avalie nosso atendimento em 15 segundos
                </div>
              </div>

              {qrDataUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={qrDataUrl}
                  alt="QR Code Display"
                  className="w-32 h-32 rounded-xl bg-white p-2 shadow-sm border border-slate-200"
                />
              )}

              <div className="text-[10px] text-slate-500 dark:text-slate-400">
                Aponte a câmera do celular para avaliar • Mesa {tableNumber}
              </div>

              <div className="pt-1 text-[9px] text-slate-400 font-medium">
                Powered by Review14
              </div>
            </div>

            <button
              type="button"
              onClick={handlePrintTableTent}
              className="w-full flex items-center justify-center gap-1.5 rounded-lg border border-blue-200 dark:border-blue-900/50 bg-blue-50/70 dark:bg-blue-950/40 py-2 text-xs font-semibold text-blue-700 dark:text-blue-300 hover:bg-blue-100 transition-colors"
            >
              <span>🖨️ Imprimir Este Display em Folha A4</span>
            </button>
          </div>
        </div>

        {/* Right Column (7 cols): Active Points of Collection & Metrics */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          <div className="flex flex-col gap-4 rounded-xl border border-[#E2E8F0] dark:border-[#1F2937] bg-white dark:bg-[#111827] p-5 shadow-xs transition-colors">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#1F2937] pb-3">
              <div>
                <span className="text-[15px] font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                  Pontos de Coleta Cadastrados
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400 m-0">
                  Monitore quais QR codes e links geram maior conversão e avaliações.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleCopy()}
                className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                + Novo Link
              </button>
            </div>

            {/* List of Active Points */}
            <div className="space-y-3">
              {activePoints.map((pt) => (
                <div
                  key={pt.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-slate-200/80 dark:border-[#1F2937] bg-slate-50/50 dark:bg-[#1F2937]/30 hover:border-blue-300 dark:hover:border-blue-800 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 shrink-0 rounded-lg bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155] flex items-center justify-center text-blue-600 font-bold">
                      {pt.type === "mesa" ? "🪑" : pt.type === "balcao" ? "☕" : pt.type === "conta" ? "🧾" : "📦"}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                          {pt.name}
                        </span>
                        <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.2 rounded font-semibold">
                          Ativo
                        </span>
                      </div>
                      <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                        {pt.url}
                      </span>
                    </div>
                  </div>

                  {/* Metrics & Actions */}
                  <div className="flex items-center gap-4 self-end sm:self-auto">
                    <div className="text-right">
                      <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        {pt.reviewsCount} avaliações
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {pt.totalScans} scans ({pt.conversionRate})
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopy(pt.url)}
                      className="rounded-lg border border-slate-200 dark:border-[#334155] bg-white dark:bg-[#111827] p-2 hover:bg-slate-50 dark:hover:bg-[#1F2937] text-slate-600 dark:text-slate-300"
                      title="Copiar Link"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips / Strategic Insights Card */}
          <div className="rounded-xl border border-blue-200 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/20 p-5 space-y-2">
            <div className="flex items-center gap-2 font-bold text-blue-900 dark:text-blue-300 text-sm">
              <span>💡 Dica de Reputação: Aumente o Volume de Avaliações</span>
            </div>
            <p className="text-xs leading-5 text-blue-800 dark:text-blue-200/90 m-0">
              Estabelecimentos que colocam o display com QR Code em todas as mesas aumentam o volume de avaliações espontâneas em até <strong>14 vezes</strong> nos primeiros 30 dias. Clientes satisfeitos avaliam no Google Maps e clientes com ressalvas falam diretamente com sua ouvidoria sem manchar sua nota pública.
            </p>
          </div>
        </div>
      </div>

      {/* Batch Generation Modal */}
      {batchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={() => setBatchModalOpen(false)}
          />
          <div className="relative z-50 w-full max-w-md rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-[#1F2937]">
              <span className="text-base font-bold text-slate-900 dark:text-slate-100">
                Gerar Lote de QR Codes para Mesas
              </span>
              <button
                type="button"
                onClick={() => setBatchModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Gera um arquivo com QR codes numerados sequencialmente (ex: Mesa 1 até Mesa {batchCount}) prontos para impressão em acrílico.
            </p>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Quantidade total de mesas no salão:
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={batchCount}
                onChange={(e) => setBatchCount(e.target.value)}
                className="w-full rounded-lg border border-slate-300 dark:border-[#334155] bg-white dark:bg-[#1F2937] p-2.5 text-xs text-slate-900 dark:text-slate-100"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setBatchModalOpen(false)}
                className="rounded-lg px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  alert(`Gerando pacote PDF com os QR Codes das Mesas 1 até ${batchCount}...`);
                  setBatchModalOpen(false);
                }}
                className="rounded-lg bg-blue-600 hover:bg-blue-700 px-4 py-2 text-xs font-semibold text-white shadow-xs"
              >
                Baixar Lote Completo (PDF)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
