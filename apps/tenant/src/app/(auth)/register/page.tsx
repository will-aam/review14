"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const [googleLoading, setGoogleLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  // Cadastro com Google via Supabase OAuth (PKCE) direcionando para o Onboarding
  const handleGoogleSignUp = async () => {
    setErrorMsg(null);
    setGoogleLoading(true);

    try {
      const supabase = createClient();
      // Ao autenticar pela primeira vez com o Google, o next leva ao onboarding do estabelecimento!
      const redirectUrl = `${window.location.origin}/auth/callback?next=/onboarding`;

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) {
        console.error("Google OAuth error:", error);
        if (error.message.includes("provider is not enabled") || error.message.includes("Unsupported provider")) {
          setErrorMsg(
            "O login com Google precisa ser ativado no seu painel do Supabase (Authentication > Providers > Google) adicionando o Client ID e Client Secret."
          );
        } else {
          setErrorMsg(error.message || "Erro ao conectar com Google.");
        }
        setGoogleLoading(false);
      }
    } catch (err: any) {
      console.error("Unexpected error:", err);
      setErrorMsg("Não foi possível iniciar o cadastro com Google.");
      setGoogleLoading(false);
    }
  };

  // Cadastro com E-mail e Senha
  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (password.length < 6) {
      setErrorMsg("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          data: {
            name: name.trim(),
            role: "TENANT",
          },
        },
      });

      if (error) {
        console.error("Supabase signUp error:", error);
        if (error.message.includes("already registered") || error.message.includes("unique constraint")) {
          setErrorMsg("Este e-mail já está cadastrado. Tente fazer login.");
        } else {
          setErrorMsg(error.message || "Falha ao criar conta.");
        }
        setLoading(false);
        return;
      }

      // Redireciona para o onboarding da loja
      router.push("/onboarding");
      router.refresh();
    } catch (err: any) {
      console.error("Unexpected error:", err);
      setErrorMsg("Ocorreu um erro inesperado no cadastro.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F17] flex flex-col items-center justify-center p-4 sm:p-6 transition-colors duration-200">
      <div className="w-full max-w-md bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1F2937] rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-[#2563EB] text-white shadow-md shadow-blue-500/20 mb-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27 6.91-1.01L12 2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Crie sua Conta no Review<span className="text-blue-600">14</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Passo 1 de 2: Cadastre sua conta para gerenciar seu estabelecimento.
          </p>
        </div>

        {/* Mensagens de Erro */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs font-medium text-red-700 dark:text-red-300 flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {errorMsg}
          </div>
        )}

        {/* Cadastro com Google */}
        <button
          type="button"
          onClick={handleGoogleSignUp}
          disabled={googleLoading || loading}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#1E293B] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-semibold transition-all shadow-sm disabled:opacity-50 cursor-pointer"
        >
          {googleLoading ? (
            <svg className="animate-spin h-5 w-5 text-slate-500" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                fill="#EA4335"
              />
            </svg>
          )}
          <span>Cadastrar com o Google</span>
        </button>

        {/* Separador */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
          <span className="bg-white dark:bg-[#111827] px-3 text-[11px] uppercase tracking-wider font-semibold text-slate-400 select-none">
            ou crie com e-mail
          </span>
        </div>

        {/* Formulário com E-mail */}
        <form onSubmit={handleEmailSignUp} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Seu Nome Completo
            </label>
            <input
              type="text"
              placeholder="Ex: Carlos Silva"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#1E293B] text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              E-mail de Acesso
            </label>
            <input
              type="email"
              placeholder="seu-email@dominio.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#1E293B] text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Crie uma Senha
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#1E293B] text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 font-medium pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs"
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full py-3 px-4 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs tracking-wide shadow-md shadow-blue-500/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Criando Conta...</span>
              </>
            ) : (
              <>
                <span>Avançar para Dados da Loja</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Rodapé com link para Login */}
        <p className="text-center text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
          Já tem uma conta de lojista?{" "}
          <Link href="/login" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
