"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [googleLoading, setGoogleLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null);

  React.useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam === "auth_callback_failed") {
      setErrorMsg("Falha ao concluir autenticação via Google. Tente novamente.");
    } else if (errorParam) {
      setErrorMsg("Ocorreu um erro na autenticação. Verifique suas credenciais.");
    }
  }, [searchParams]);

  // Login com Google via Supabase OAuth (PKCE)
  const handleGoogleLogin = async () => {
    setErrorMsg(null);
    setGoogleLoading(true);

    try {
      const supabase = createClient();
      const redirectUrl = `${window.location.origin}/auth/callback`;

      const { data, error } = await supabase.auth.signInWithOAuth({
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
      setErrorMsg("Não foi possível iniciar o login com Google.");
      setGoogleLoading(false);
    }
  };

  // Login com Email e Senha via Supabase
  const handleEmailPasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        console.error("Supabase login error:", error);
        if (error.message.includes("Invalid login credentials")) {
          setErrorMsg("E-mail ou senha incorretos.");
        } else if (error.message.includes("Email not confirmed")) {
          setErrorMsg("E-mail ainda não confirmado. Verifique sua caixa de entrada.");
        } else {
          setErrorMsg(error.message || "Falha na autenticação.");
        }
        setLoading(false);
        return;
      }

      setSuccessMsg("Login realizado com sucesso! Redirecionando...");
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 500);
    } catch (err: any) {
      console.error("Unexpected error:", err);
      setErrorMsg("Ocorreu um erro inesperado no login.");
      setLoading(false);
    }
  };

  // Atalho de acesso rápido para testes (demonstração Café Aurora)
  const handleDemoLogin = () => {
    setEmail("gerencia@cafeaurora.com.br");
    setPassword("senha123456");
    setErrorMsg(null);
    setSuccessMsg("Credenciais preenchidas. Clique em Entrar no Painel.");
  };

  return (
    <div className="w-full max-w-[440px] rounded-2xl border border-[#E2E8F0] dark:border-[#1F2937] bg-white dark:bg-[#111827] p-8 shadow-xl space-y-6">
      {/* Brand Logo & Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#2563EB]">
            <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27 6.91-1.01L12 2z"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2.2"
              />
            </svg>
          </div>
          <span className="text-[22px] font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC]">
            Review<span className="text-[#2563EB] dark:text-blue-500">14</span>
          </span>
        </div>

        <h1 className="text-[20px] font-bold text-slate-900 dark:text-slate-100 pt-1">
          Painel do Estabelecimento
        </h1>
        <p className="text-[12px] text-slate-500 dark:text-slate-400">
          Acesse o dashboard de reputação, avaliações e QR codes da sua loja.
        </p>
      </div>

      {/* Feedback Alerts */}
      {errorMsg && (
        <div className="rounded-lg border border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/40 p-3 text-xs text-rose-700 dark:text-rose-300 flex items-start gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 mt-0.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="rounded-lg border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-950/40 p-3 text-xs text-emerald-700 dark:text-emerald-300 flex items-start gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 mt-0.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>{successMsg}</span>
        </div>
      )}

      {/* Google OAuth Button */}
      <div>
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={googleLoading || loading}
          className="w-full flex items-center justify-center gap-3 rounded-xl border border-[#CBD5E1] dark:border-[#334155] bg-white dark:bg-[#1F2937] p-3 text-[13px] font-semibold text-slate-700 dark:text-slate-100 shadow-xs hover:bg-slate-50 dark:hover:bg-[#283548] transition-colors cursor-pointer disabled:opacity-60"
        >
          {googleLoading ? (
            <svg className="animate-spin h-4 w-4 text-slate-500" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
          <span>Continuar com o Google</span>
        </button>
      </div>

      {/* Divider */}
      <div className="relative flex items-center justify-center">
        <div className="w-full border-t border-slate-200 dark:border-[#1F2937]" />
        <span className="absolute bg-white dark:bg-[#111827] px-3 text-[11px] uppercase tracking-wider text-slate-400">
          ou com e-mail
        </span>
      </div>

      {/* Email & Password Form */}
      <form onSubmit={handleEmailPasswordLogin} className="space-y-4">
        <div className="space-y-1">
          <label className="text-[12px] font-semibold text-slate-700 dark:text-slate-300">
            E-mail Comercial
          </label>
          <input
            type="email"
            placeholder="gerente@cafeaurora.com.br"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl border border-[#CBD5E1] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#1F2937] p-2.5 pl-3 text-xs text-[#0F172A] dark:text-[#F8FAFC] placeholder-slate-400 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-[12px] font-semibold text-slate-700 dark:text-slate-300">
              Senha de Acesso
            </label>
            <button
              type="button"
              onClick={() => alert("Instruções de recuperação foram enviadas para o seu e-mail cadastrado.")}
              className="text-[11px] font-medium text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            >
              Esqueceu a senha?
            </button>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-[#CBD5E1] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#1F2937] p-2.5 pl-3 pr-10 text-xs text-[#0F172A] dark:text-[#F8FAFC] placeholder-slate-400 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              title={showPassword ? "Ocultar senha" : "Ver senha"}
            >
              {showPassword ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || googleLoading}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] hover:bg-blue-700 p-3 text-[13px] font-semibold text-white shadow-md transition-colors cursor-pointer disabled:opacity-60"
        >
          {loading ? (
            <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          ) : (
            <span>Entrar no Painel</span>
          )}
        </button>
      </form>

      {/* Demo Fast Access Pill */}
      <div className="rounded-xl border border-blue-100 dark:border-blue-900/40 bg-blue-50/60 dark:bg-blue-950/20 p-3 text-center space-y-1">
        <span className="text-[11px] text-blue-700 dark:text-blue-300 font-medium block">
          Quer testar sem cadastrar agora?
        </span>
        <button
          type="button"
          onClick={handleDemoLogin}
          className="text-[12px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
        >
          Preencher com Loja Demonstração (Café Aurora)
        </button>
      </div>

      {/* Sign Up Link */}
      <p className="text-center text-[12px] text-slate-500 dark:text-slate-400">
        Ainda não cadastrou sua empresa?{" "}
        <Link href="/register" className="font-bold text-[#2563EB] dark:text-blue-400 hover:underline">
          Criar conta grátis
        </Link>
      </p>
    </div>
  );
}

export default function TenantLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F8FAFC] dark:bg-[#0B1220] transition-colors duration-200">
      <React.Suspense fallback={
        <div className="w-full max-w-[440px] rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] p-8 shadow-xl text-center text-xs text-slate-400">
          Carregando formulário de autenticação...
        </div>
      }>
        <LoginForm />
      </React.Suspense>
    </div>
  );
}
