"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@ui/components/button";
import { Input } from "@ui/components/input";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulação do login seguro
    setTimeout(() => {
      setLoading(false);
      router.push("/");
    }, 600);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-sm p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-xl font-bold text-white">Acesso Super Admin</h1>
          <p className="text-xs text-slate-400">
            Digite suas credenciais de proprietário do SaaS
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="email"
            placeholder="admin@review14.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600"
          />
          <Input
            type="password"
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600"
          />
          <Button type="submit" size="lg" fullWidth disabled={loading}>
            {loading ? "Entrando..." : "Acessar Painel"}
          </Button>
        </form>
      </div>
    </div>
  );
}
