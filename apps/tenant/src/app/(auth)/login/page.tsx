"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@ui/components/button";
import { Input } from "@ui/components/input";

export default function TenantLoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/");
    }, 600);
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white border border-slate-200 rounded-3xl shadow-sm space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-slate-900">
            Acesso do Lojista
          </h1>
          <p className="text-xs text-slate-500">
            Acompanhe suas avaliações, triagem do Google e base de clientes.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="seu-email@empresa.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Sua senha secreta"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" size="lg" fullWidth disabled={loading}>
            {loading ? "Entrando..." : "Entrar no Painel"}
          </Button>
        </form>

        <p className="text-center text-xs text-slate-500">
          Ainda não cadastrou sua loja?{" "}
          <Link href="/register" className="text-primary font-bold hover:underline">
            Criar conta grátis
          </Link>
        </p>
      </div>
    </div>
  );
}
