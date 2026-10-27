"use client";

import * as React from "react";
import { Button } from "@ui/components/button";
import { Input } from "@ui/components/input";

export default function TenantSettingsPage() {
  const [tradeName, setTradeName] = React.useState("Bistrô Paris & Café");
  const [googlePlaceId, setGooglePlaceId] = React.useState("ChIJN1t_tDeuEmsRUsoyG83frY4");
  const [minRating, setMinRating] = React.useState(4);
  const [loading, setLoading] = React.useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Configurações salvas com sucesso!");
    }, 600);
  };

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Configurações da Empresa & Assinatura
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Ajuste as regras de redirecionamento para o Google e gerencie seu plano de assinatura.
        </p>
      </div>

      {/* Seção 1: Triagem do Google Meu Negócio */}
      <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900">
            Regras de Proteção de Reputação no Google
          </h2>
          <p className="text-xs text-slate-500">
            Defina qual a nota mínima para convidar o cliente a avaliar no Google Maps.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">
              Nome Fantasia Exibido aos Clientes
            </label>
            <Input
              value={tradeName}
              onChange={(e) => setTradeName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">
              Google Place ID (Para Redirecionamento Direto)
            </label>
            <Input
              value={googlePlaceId}
              onChange={(e) => setGooglePlaceId(e.target.value)}
              placeholder="Ex: ChIJN1t_tDeuEmsRUsoyG83frY4"
            />
            <p className="text-[11px] text-slate-400">
              Obtido no Google Place Finder. Permite abrir a caixinha de avaliação do Google em 1 clique.
            </p>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">
              Nota Mínima para Convite ao Google ({minRating} Estrelas)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={3}
                max={5}
                step={1}
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
              <span className="font-bold text-sm bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
                {minRating}★
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Notas abaixo deste valor ficarão retidas na ouvidoria interna sem direcionamento ao Google.
            </p>
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Salvando..." : "Salvar Configurações"}
          </Button>
        </form>
      </div>

      {/* Seção 2: Plano e Faturamento Stripe */}
      <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-amber-400">
              Assinatura Recorrente
            </span>
            <h3 className="text-xl font-black mt-0.5">Plano PRO Ativo</h3>
          </div>
          <span className="text-sm font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full">
            Em dia (Stripe)
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed max-w-lg">
          Seu plano inclui criação ilimitada de subcategorias de estrelas, acordeons de feedback, captura de leads CRM e suporte prioritário.
        </p>

        <div className="pt-2 flex gap-3">
          <Button
            variant="outline"
            className="bg-transparent border-slate-600 text-white hover:bg-slate-700"
            onClick={() => alert("Redirecionando para o Portal de Faturamento do Stripe...")}
          >
            Gerenciar Cartão e Faturas (Portal Stripe)
          </Button>
        </div>
      </div>
    </div>
  );
}
