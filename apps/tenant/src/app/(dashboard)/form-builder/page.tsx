"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@ui/components/button";
import { Input } from "@ui/components/input";
import { Select } from "@ui/components/select";

export default function FormBuilderPage() {
  // Simulação de verificação de PlanTier:
  const isPro = true; // No BASIC, isso seria false para demonstrar o upsell

  const [fields, setFields] = React.useState([
    {
      id: "f_1",
      label: "Qualidade da Comida e Bebida",
      fieldType: "RATING_5",
      description: "Subcategoria de estrelas",
    },
    {
      id: "f_2",
      label: "Agilidade no Atendimento",
      fieldType: "RATING_5",
      description: "Subcategoria de estrelas",
    },
    {
      id: "f_3",
      label: "Tipo de Consumo",
      fieldType: "SINGLE_SELECT",
      description: "No local, retirada ou entrega",
    },
  ]);

  const [newLabel, setNewLabel] = React.useState("");
  const [newType, setNewType] = React.useState("RATING_5");

  const handleAddField = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel) return;
    setFields((prev) => [
      ...prev,
      {
        id: `f_${Date.now()}`,
        label: newLabel,
        fieldType: newType,
        description: "Campo customizado PRO",
      },
    ]);
    setNewLabel("");
  };

  if (!isPro) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center space-y-5">
        <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center text-2xl font-bold">
          ⭐
        </div>
        <h1 className="text-2xl font-bold text-slate-900">
          Recurso Exclusivo do Plano PRO
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          No plano Básico, sua loja conta com a avaliação essencial (5 estrelas gerais + comentário).
          Ao migrar para o **Plano PRO**, você desbloqueia criação ilimitada de subcategorias de estrelas, perguntas prontas e acordeons expansíveis.
        </p>
        <Button size="lg" className="bg-amber-500 hover:bg-amber-600 font-bold" asChild>
          <Link href="/settings">Fazer Upgrade para o PRO agora</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full mb-2">
          ⭐ Recurso PRO Ativo
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Construtor de Formulário Customizado
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Crie critérios específicos de avaliação (ex: Comida, Atendimento, Limpeza) que aparecem para os clientes após a nota geral.
        </p>
      </div>

      {/* Formulário para Novo Campo */}
      <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-800">
          Adicionar Novo Campo de Avaliação
        </h2>

        <form onSubmit={handleAddField} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2">
            <Input
              placeholder="Ex: Nível de Barulho, Sobremesas, Tempo de Espera..."
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              required
            />
          </div>
          <div>
            <Select
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
            >
              <option value="RATING_5">Subcategoria 5 Estrelas</option>
              <option value="SINGLE_SELECT">Pergunta de Escolha Única</option>
              <option value="MULTI_SELECT">Acordeon de Múltipla Escolha</option>
              <option value="TEXT">Pergunta Aberta (Texto)</option>
            </Select>
          </div>
          <div className="sm:col-span-3">
            <Button type="submit" size="default">
              + Inserir Critério no Formulário
            </Button>
          </div>
        </form>
      </div>

      {/* Lista de Campos Configurados */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
          Critérios Ativos na sua Página de Avaliação
        </h3>
        <div className="space-y-2">
          {fields.map((f, i) => (
            <div
              key={f.id}
              className="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between shadow-2xs"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 font-bold text-xs flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{f.label}</h4>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {f.fieldType === "RATING_5"
                      ? "Classificação de 1 a 5 estrelas"
                      : "Seleção de opções"}
                  </span>
                </div>
              </div>

              <Button
                size="sm"
                variant="ghost"
                className="text-rose-600 hover:bg-rose-50"
                onClick={() => setFields((prev) => prev.filter((item) => item.id !== f.id))}
              >
                Remover
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
