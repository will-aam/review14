import Link from "next/link";
import { Button } from "@ui/components/button";

export default function AdminDashboardPage() {
  const metrics = {
    mrr: "R$ 48.920,00",
    growth: "+18,4%",
    activeTenants: 164,
    proSubscribers: 112,
    basicSubscribers: 52,
    totalReviewsCaptured: 34820,
    googleRedirectsCount: 29400,
    dbStatus: "Healthy (Neon Serverless US-East)",
    dbLatency: "24ms",
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Painel Executivo Super Admin
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Visão consolidada de receita recorrente, status de infraestrutura e performance de clientes.
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/tenants">Gerenciar Empresas Cadastradas</Link>
        </Button>
      </div>

      {/* Grid de Métricas Principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Receita Mensal Recorrente (MRR)
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-white">{metrics.mrr}</span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
              {metrics.growth}
            </span>
          </div>
          <p className="text-xs text-slate-500">Stripe Billing integrado</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Lojistas Ativos (Tenants)
          </span>
          <div className="text-2xl font-black text-white">
            {metrics.activeTenants}
          </div>
          <p className="text-xs text-slate-500">
            {metrics.proSubscribers} PRO / {metrics.basicSubscribers} Básico
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Avaliações Triadas
          </span>
          <div className="text-2xl font-black text-white">
            {metrics.totalReviewsCaptured.toLocaleString("pt-BR")}
          </div>
          <p className="text-xs text-slate-500">
            {metrics.googleRedirectsCount.toLocaleString("pt-BR")} direcionadas ao Google
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Banco de Dados Neon
          </span>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm font-bold text-emerald-400">Operacional</span>
          </div>
          <p className="text-xs text-slate-500">Latência: {metrics.dbLatency}</p>
        </div>
      </div>
    </div>
  );
}
