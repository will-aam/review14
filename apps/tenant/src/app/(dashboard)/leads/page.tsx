"use client";

import * as React from "react";
import { Button } from "@ui/components/button";
import { Input } from "@ui/components/input";

export default function LeadsCrmPage() {
  const [search, setSearch] = React.useState("");

  const leads = [
    {
      id: "lead_1",
      name: "Mariana Costa",
      email: "mariana.costa@gmail.com",
      phone: "(11) 98112-3344",
      totalVisits: 4,
      lastVisited: "Ontem às 20:30",
      optIn: true,
    },
    {
      id: "lead_2",
      name: "Rodrigo Almeida",
      email: "rodrigo.almeida@hotmail.com",
      phone: "(11) 97223-9900",
      totalVisits: 1,
      lastVisited: "24/10/2026",
      optIn: true,
    },
    {
      id: "lead_3",
      name: "Camila Rodrigues",
      email: "camila.rodrigues@yahoo.com.br",
      phone: "(11) 99182-4411",
      totalVisits: 2,
      lastVisited: "20/10/2026",
      optIn: false,
    },
  ];

  const handleExportCsv = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Nome,E-mail,Telefone,Total de Visitas,Última Visita,OptIn Marketing"]
        .concat(
          leads.map(
            (l) =>
              `"${l.name}","${l.email}","${l.phone}",${l.totalVisits},"${l.lastVisited}",${l.optIn}`
          )
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "review14-leads.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            CRM de Clientes Capturados
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Cada cliente que se autentica para avaliar entra automaticamente na sua base de marketing.
          </p>
        </div>
        <Button variant="default" size="default" onClick={handleExportCsv} className="gap-2">
          📥 Exportar Base de E-mails (CSV)
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <Input
          placeholder="Buscar cliente por nome ou e-mail..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md bg-white"
        />
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <table className="w-full text-left text-sm text-slate-700">
          <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Cliente</th>
              <th className="px-6 py-4">E-mail</th>
              <th className="px-6 py-4">Visitas</th>
              <th className="px-6 py-4">Última Avaliação</th>
              <th className="px-6 py-4 text-center">Permite Marketing</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {leads.map((l) => (
              <tr key={l.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-900">{l.name}</td>
                <td className="px-6 py-4 text-slate-600">{l.email}</td>
                <td className="px-6 py-4">
                  <span className="bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-full text-xs">
                    {l.totalVisits}x visitou
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500 text-xs">{l.lastVisited}</td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      l.optIn
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {l.optIn ? "Sim (Opt-In)" : "Não"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
