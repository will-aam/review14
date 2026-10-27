"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@ui/components/button";
import { Input } from "@ui/components/input";

export default function TenantRegisterPage() {
  const router = useRouter();

  const [cnpj, setCnpj] = React.useState("");
  const [legalName, setLegalName] = React.useState("");
  const [tradeName, setTradeName] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [slug, setSlug] = React.useState("");

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [fetchingCnpj, setFetchingCnpj] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Busca automática na Brasil API
  const handleCnpjBlur = async () => {
    const clean = cnpj.replace(/\D/g, "");
    if (clean.length !== 14) return;

    setFetchingCnpj(true);
    try {
      const res = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${clean}`);
      if (res.ok) {
        const data = await res.json();
        setLegalName(data.razao_social || "");
        setTradeName(data.nome_fantasia || data.razao_social || "");
        setCategory(data.cnae_fiscal_descricao || "Serviços");
        setCity(data.municipio || "");
        setState(data.uf || "");

        // Gera slug amigável sugerido
        const autoSlug = (data.nome_fantasia || data.razao_social || "loja")
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]/g, "-")
          .replace(/-+/g, "-")
          .replace(/^-|-$/g, "");
        setSlug(autoSlug);
      }
    } catch (e) {
      console.warn("Brasil API offline ou falha de rede:", e);
    } finally {
      setFetchingCnpj(false);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/");
    }, 800);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-6">
      <div className="w-full max-w-xl p-8 bg-white border border-slate-200 rounded-3xl shadow-sm space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold text-primary tracking-wider uppercase">
            Onboarding Automatizado
          </span>
          <h1 className="text-2xl font-bold text-slate-900">
            Cadastre seu Estabelecimento
          </h1>
          <p className="text-xs text-slate-500">
            Digite seu CNPJ e preencheremos os dados da sua empresa automaticamente via Brasil API.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">
                CNPJ (Preenchimento Mágico)
              </label>
              <Input
                placeholder="00.000.000/0000-00"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
                onBlur={handleCnpjBlur}
                required
              />
              {fetchingCnpj && (
                <span className="text-[10px] text-primary font-medium animate-pulse">
                  Buscando dados na Receita Federal...
                </span>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">
                Link do QR Code (Slug)
              </label>
              <div className="flex items-center">
                <span className="text-xs text-slate-400 bg-slate-100 px-2.5 py-3 rounded-l-lg border border-r-0 border-slate-200">
                  /
                </span>
                <Input
                  placeholder="sua-loja"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="rounded-l-none"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">
                Nome Fantasia
              </label>
              <Input
                placeholder="Ex: Bistrô Paris"
                value={tradeName}
                onChange={(e) => setTradeName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">
                Razão Social
              </label>
              <Input
                placeholder="Ex: Paris Comércio Ltda"
                value={legalName}
                onChange={(e) => setLegalName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700">Cidade</label>
              <Input
                placeholder="São Paulo"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">UF</label>
              <Input
                placeholder="SP"
                maxLength={2}
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
          </div>

          <div className="border-t border-slate-200 pt-3 space-y-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Credenciais de Acesso do Responsável
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                type="email"
                placeholder="seu-email@dominio.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Crie sua senha segura"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <Button type="submit" size="lg" fullWidth disabled={isSubmitting}>
            {isSubmitting ? "Cadastrando estabelecimento..." : "Criar Meu Estabelecimento"}
          </Button>
        </form>

        <p className="text-center text-xs text-slate-500">
          Já tem conta?{" "}
          <Link href="/login" className="text-primary font-bold hover:underline">
            Fazer login
          </Link>
        </p>
      </div>
    </div>
  );
}
