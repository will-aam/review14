"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { generateSlug } from "@/lib/slug";

const CATEGORIES = [
  { id: "cafeteria", label: "Cafeteria & Padaria", icon: "☕" },
  { id: "restaurante", label: "Restaurante & Bistrô", icon: "🍽️" },
  { id: "bar", label: "Bar & Noturno", icon: "🍸" },
  { id: "saude", label: "Saúde & Consultório", icon: "🩺" },
  { id: "beleza", label: "Beleza & Estética", icon: "✂️" },
  { id: "varejo", label: "Varejo & Comércio", icon: "🛍️" },
  { id: "outro", label: "Outros Serviços", icon: "🏢" },
];

export default function OnboardingPage() {
  const router = useRouter();

  // Dados do formulário
  const [tradeName, setTradeName] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState(CATEGORIES[0].label);
  const [phone, setPhone] = React.useState("");
  const [slug, setSlug] = React.useState("");

  // CNPJ opcional (Cenário B)
  const [hasCnpj, setHasCnpj] = React.useState(false);
  const [cnpj, setCnpj] = React.useState("");
  const [legalName, setLegalName] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [fetchingCnpj, setFetchingCnpj] = React.useState(false);
  const [cnpjSuccess, setCnpjSuccess] = React.useState(false);

  // Estados de submissão e autenticação
  const [loading, setLoading] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState<string | null>(null);
  const [userName, setUserName] = React.useState<string | null>(null);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null);

  // Carrega o usuário autenticado do Supabase
  React.useEffect(() => {
    async function loadUser() {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          setUserEmail(user.email || null);
          const metaName =
            user.user_metadata?.name ||
            user.user_metadata?.full_name ||
            (user.email ? user.email.split("@")[0] : null);
          setUserName(metaName);
        }
      } catch (e) {
        console.warn("Usuário anônimo ou sessão local:", e);
      }
    }
    loadUser();
  }, []);

  // Atualiza o Slug 100% automático quando o lojista digita o Nome Fantasia
  const handleTradeNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTradeName(value);
    const autoSlug = generateSlug(value);
    setSlug(autoSlug);
  };

  // Máscara para WhatsApp
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, "");
    if (v.length > 11) v = v.substring(0, 11);
    if (v.length > 10) {
      v = v.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else if (v.length > 5) {
      v = v.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else if (v.length > 2) {
      v = v.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
    }
    setPhone(v);
  };

  // Máscara para CNPJ
  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, "");
    if (v.length > 14) v = v.substring(0, 14);
    if (v.length > 12) {
      v = v.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
    } else if (v.length > 8) {
      v = v.replace(/^(\d{2})(\d{3})(\d{3})(\d{0,4})/, "$1.$2.$3/$4");
    } else if (v.length > 5) {
      v = v.replace(/^(\d{2})(\d{3})(\d{0,3})/, "$1.$2.$3");
    } else if (v.length > 2) {
      v = v.replace(/^(\d{2})(\d{0,3})/, "$1.$2");
    }
    setCnpj(v);
  };

  // Busca na Brasil API se o lojista optar por preencher CNPJ
  const handleCnpjBlur = async () => {
    const clean = cnpj.replace(/\D/g, "");
    if (clean.length !== 14) return;

    setFetchingCnpj(true);
    setCnpjSuccess(false);

    try {
      const res = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${clean}`);
      if (res.ok) {
        const data = await res.json();
        const foundLegal = data.razao_social || "";
        const foundTrade = data.nome_fantasia || data.razao_social || "";

        setLegalName(foundLegal);
        if (!tradeName && foundTrade) {
          setTradeName(foundTrade);
          setSlug(generateSlug(foundTrade));
        }
        setCity(data.municipio || "");
        setState(data.uf || "");
        setCnpjSuccess(true);
      }
    } catch (err) {
      console.warn("Falha na busca da Brasil API:", err);
    } finally {
      setFetchingCnpj(false);
    }
  };

  // Finalizar Onboarding
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!tradeName.trim()) {
      setErrorMsg("Por favor, informe o Nome Fantasia do seu estabelecimento.");
      return;
    }

    setLoading(true);

    try {
      const finalSlug = slug || generateSlug(tradeName) || "minha-loja";
      const finalLegalName = legalName.trim() || tradeName.trim();

      const companyData = {
        tradeName: tradeName.trim(),
        legalName: finalLegalName,
        slug: finalSlug,
        category: selectedCategory,
        phone: phone.trim() || null,
        cnpj: hasCnpj && cnpj.trim() ? cnpj.replace(/\D/g, "") : null,
        city: city.trim() || null,
        state: state.trim() || null,
        planTier: "PRO",
        subscriptionStatus: "TRIALING",
      };

      // Salva dados locais da empresa ativa para uso na Dashboard
      if (typeof window !== "undefined") {
        localStorage.setItem("review14_current_company", JSON.stringify(companyData));
      }

      setSuccessMsg("Estabelecimento configurado com sucesso! Redirecionando...");
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 700);
    } catch (err: any) {
      console.error("Erro ao salvar estabelecimento:", err);
      setErrorMsg("Ocorreu um erro ao salvar o estabelecimento. Tente novamente.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F17] flex flex-col items-center justify-center p-4 sm:p-6 transition-colors duration-200">
      <div className="w-full max-w-2xl bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1F2937] rounded-2xl shadow-xl p-6 sm:p-10 space-y-8">
        {/* Header com Progresso */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2563EB] text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27 6.91-1.01L12 2z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                Review<span className="text-blue-600">14</span>
              </span>
            </div>
            <span className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-950/60 px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/50">
              Passo 2 de 2 • Configuração da Loja
            </span>
          </div>

          <div className="pt-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Cadastre seu Estabelecimento
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {userName ? (
                <>Olá, <strong className="text-slate-800 dark:text-slate-200">{userName}</strong>! </>
              ) : null}
              Configure a sua loja para começar o seu teste grátis de 14 dias no Plano Pro. Sem cartão de crédito.
            </p>
          </div>
        </div>

        {/* Mensagens de Feedback */}
        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs font-medium text-red-700 dark:text-red-300 flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-xs font-medium text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {successMsg}
          </div>
        )}

        {/* Formulário Principal */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 1. Nome Fantasia */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span>Nome Fantasia do Estabelecimento *</span>
              <span className="text-[11px] font-normal lowercase text-slate-400">como os clientes conhecem</span>
            </label>
            <input
              type="text"
              placeholder="Ex: Café Aurora Gourmet"
              value={tradeName}
              onChange={handleTradeNameChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#1E293B] text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 font-medium"
            />
          </div>

          {/* 2. Slug Automático (A sua sugestão brilhante!) */}
          <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                <span className="text-xs font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider">
                  Link Público do seu QR Code
                </span>
              </div>
              <span className="rounded-full bg-emerald-100 dark:bg-emerald-950/70 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                Gerado Automaticamente
              </span>
            </div>
            <div className="flex items-center bg-white dark:bg-[#111827] rounded-lg px-3 py-2 border border-blue-200 dark:border-blue-900 font-mono text-xs sm:text-sm text-slate-700 dark:text-slate-300 overflow-x-auto">
              <span className="text-slate-400 dark:text-slate-500 select-none">review14.com/loja/</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">
                {slug || "seu-estabelecimento"}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              O sistema gera o link automaticamente a partir do nome da sua loja para ser embutido nos seus QR Codes de mesa e balcão.
            </p>
          </div>

          {/* 3. Categoria do Negócio (Seleção Visual) */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Segmento / Categoria *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.label;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.label)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-medium transition-all text-left ${
                      isSelected
                        ? "bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/20"
                        : "bg-white dark:bg-[#1E293B] border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600"
                    }`}
                  >
                    <span className="text-base">{cat.icon}</span>
                    <span className="truncate">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. WhatsApp Comercial */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span>WhatsApp Comercial do Estabelecimento</span>
              <span className="text-[11px] font-normal text-slate-400">opcional</span>
            </label>
            <input
              type="text"
              placeholder="(11) 98765-4321"
              value={phone}
              onChange={handlePhoneChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#1E293B] text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 font-medium"
            />
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Utilizado para notificações e suporte quando um cliente acionar a ouvidoria interna.
            </p>
          </div>

          {/* 5. CNPJ Opcional (Cenário B) */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 p-4 space-y-3">
            <div className="flex items-center justify-between cursor-pointer" onClick={() => setHasCnpj(!hasCnpj)}>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="hasCnpjCheck"
                  checked={hasCnpj}
                  onChange={(e) => setHasCnpj(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="hasCnpjCheck" className="text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer">
                  Possuo CNPJ e quero preencher automaticamente via Receita Federal
                </label>
              </div>
              <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                {hasCnpj ? "Ocultar" : "Preencher CNPJ"}
              </span>
            </div>

            {hasCnpj && (
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-3 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase">
                    CNPJ da Empresa
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="00.000.000/0000-00"
                      value={cnpj}
                      onChange={handleCnpjChange}
                      onBlur={handleCnpjBlur}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#1E293B] text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    {fetchingCnpj && (
                      <span className="absolute right-3 top-3 text-[10px] text-blue-600 dark:text-blue-400 font-semibold animate-pulse">
                        Consultando Receita...
                      </span>
                    )}
                  </div>
                  {cnpjSuccess && (
                    <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      ✓ Dados fiscais importados com sucesso!
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                      Razão Social
                    </label>
                    <input
                      type="text"
                      placeholder="Razão Social Ltda"
                      value={legalName}
                      onChange={(e) => setLegalName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#1E293B] text-slate-800 dark:text-slate-200 text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2 space-y-1">
                      <label className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                        Cidade
                      </label>
                      <input
                        type="text"
                        placeholder="São Paulo"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#1E293B] text-slate-800 dark:text-slate-200 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                        UF
                      </label>
                      <input
                        type="text"
                        placeholder="SP"
                        maxLength={2}
                        value={state}
                        onChange={(e) => setState(e.target.value.toUpperCase())}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#1E293B] text-slate-800 dark:text-slate-200 text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 6. Informação do Google Maps */}
          <div className="p-3.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 flex items-start gap-3">
            <span className="text-xl">📍</span>
            <div className="space-y-0.5">
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Integração com Google Maps
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Totalmente opcional. Você poderá conectar sua ficha do Google Maps e o endereço completo a qualquer momento na aba <strong>Configurações</strong> do seu painel.
              </p>
            </div>
          </div>

          {/* Botão de Conclusão */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-500/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Configurando seu Estabelecimento...</span>
              </>
            ) : (
              <>
                <span>Criar Meu Estabelecimento e Abrir Painel</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
