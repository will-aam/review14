"use client";

import * as React from "react";
import { Button } from "@ui/components/button";

export default function TenantsPage() {
  const [tenants, setTenants] = React.useState([
    {
      id: "comp_1",
      name: "Bistrô Paris & Café",
      slug: "bistro-paris",
      ownerEmail: "pierre@bistroparis.com.br",
      plan: "PRO",
      status: "ACTIVE",
      totalReviews: 842,
    },
    {
      id: "comp_2",
      name: "Barbearia Vintage Club",
      slug: "barbearia-vintage",
      ownerEmail: "marcos@vintageclub.com",
      plan: "BASIC",
      status: "ACTIVE",
      totalReviews: 320,
    },
    {
      id: "comp_3",
      name: "Clínica Sorriso Radiante",
      slug: "clinica-sorriso",
      ownerEmail: "dra.ana@sorrisoradiante.com.br",
      plan: "PRO",
      status: "PAST_DUE",
      totalReviews: 610,
    },
  ]);

  const toggleStatus = (id: string) => {
    setTenants((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "ACTIVE" ? "CANCELED" : "ACTIVE" }
          : t
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Gestão de Empresas (Tenants)</h1>
          <p className="text-sm text-slate-400">
            Controle de planos, volume de avaliações e ativação/bloqueio manual de contas.
          </p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-950/60 text-xs uppercase font-semibold text-slate-400 border-b border-slate-800">
            <tr>
              <th className="px-6 py-4">Empresa</th>
              <th className="px-6 py-4">Lojista</th>
              <th className="px-6 py-4">Plano</th>
              <th className="px-6 py-4">Avaliações</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {tenants.map((t) => (
              <tr key={t.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="px-6 py-4 font-bold text-white">
                  {t.name}
                  <span className="block text-xs font-mono text-slate-500">
                    /{t.slug}
                  </span>
                </td>
                <td className="px-6 py-4">{t.ownerEmail}</td>
                <td className="px-6 py-4">
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      t.plan === "PRO"
                        ? "bg-amber-400/10 text-amber-400 border border-amber-400/30"
                        : "bg-slate-800 text-slate-300"
                    }`}
                  >
                    {t.plan}
                  </span>
                </td>
                <td className="px-6 py-4 font-mono">{t.totalReviews}</td>
                <td className="px-6 py-4">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded ${
                      t.status === "ACTIVE"
                        ? "bg-emerald-400/10 text-emerald-400"
                        : "bg-rose-400/10 text-rose-400"
                    }`}
                  >
                    {t.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button
                    size="sm"
                    variant={t.status === "ACTIVE" ? "destructive" : "outline"}
                    onClick={() => toggleStatus(t.id)}
                  >
                    {t.status === "ACTIVE" ? "Bloquear" : "Ativar"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
