"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@ui/components/button";
import { Input } from "@ui/components/input";

export default function StoreAuthPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [email, setEmail] = React.useState("");
  const [showEmailInput, setShowEmailInput] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // Gerador de codinome e avatar para o Modo Anônimo
  const handleAnonymous = () => {
    const adjectives = ["Feliz", "Misterioso", "Zen", "Gourmet", "Amigável", "Criativo"];
    const animals = ["Panda", "Coruja", "Raposa", "Leão", "Koala", "Falcão"];
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
    const randomName = `${randomAnimal} ${randomAdjective}`;
    const avatarUrl = `https://api.dicebear.com/7.x/bottts/svg?seed=${randomName}`;

    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "review_auth",
        JSON.stringify({
          isAnonymous: true,
          name: randomName,
          avatarUrl,
        })
      );
    }
    router.push(`/${slug}/evaluate`);
  };

  const handleOAuth = (provider: "google" | "apple") => {
    // Redireciona via NextAuth mantendo o slug no callback
    router.push(`/api/auth/signin?callbackUrl=/${slug}/evaluate`);
  };

  const handleEmailOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "review_auth",
        JSON.stringify({
          isAnonymous: false,
          email,
          name: email.split("@")[0],
          avatarUrl: `https://api.dicebear.com/7.x/identicon/svg?seed=${email}`,
        })
      );
    }
    router.push(`/${slug}/evaluate`);
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6">
      {/* Header do Estabelecimento */}
      <div className="text-center pt-8 space-y-3">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-sm">
          <svg
            className="w-10 h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 capitalize">
          {slug?.replace("-", " ") || "Estabelecimento"}
        </h1>
        <p className="text-sm text-slate-500 max-w-xs mx-auto">
          Sua opinião é fundamental para melhorarmos sempre. Como deseja se identificar?
        </p>
      </div>

      {/* 4 Opções de Autenticação */}
      <div className="space-y-3.5 my-auto py-8">
        {/* 1. Google OAuth */}
        <Button
          type="button"
          variant="google"
          size="lg"
          fullWidth
          className="gap-3 font-semibold"
          onClick={() => handleOAuth("google")}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          Continuar com Google
        </Button>

        {/* 2. Apple OAuth */}
        <Button
          type="button"
          variant="apple"
          size="lg"
          fullWidth
          className="gap-3 font-semibold"
          onClick={() => handleOAuth("apple")}
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 170 170">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.08-7.7-7.91-12.03-14.49-6.3-9.55-11.41-20.73-15.34-33.54-3.92-12.82-5.89-24.96-5.89-36.43 0-14.24 3.63-26.24 10.88-36 7.25-9.76 16.5-14.75 27.75-14.99 4.35 0 9.27 1.13 14.75 3.38 5.48 2.25 9.49 3.44 12.03 3.56 2.01 0 6.07-1.24 12.18-3.72 6.1-2.48 11.23-3.6 15.39-3.37 11.39.67 20.71 5.34 27.97 14.02-9.9 6.03-14.75 14.43-14.54 25.21.2 9.57 3.96 17.57 11.28 24.01 3.56 3.19 7.6 5.56 12.11 7.12-1.96 5.8-4.22 11.66-6.78 17.58zm-30.82-108.9c0-6.84 2.45-13.19 7.35-19.04 4.9-5.86 11.02-9.55 18.36-11.07.24 1.34.36 2.47.36 3.39 0 6.72-2.58 13.25-7.74 19.59-5.16 6.34-11.34 10.05-18.54 11.13-.24-1.34-.36-2.47-.36-4z" />
          </svg>
          Continuar com Apple
        </Button>

        {/* 3. Código OTP por E-mail */}
        {!showEmailInput ? (
          <Button
            type="button"
            variant="outline"
            size="lg"
            fullWidth
            className="font-semibold text-slate-700 hover:text-slate-900"
            onClick={() => setShowEmailInput(true)}
          >
            Entrar com E-mail (Código OTP)
          </Button>
        ) : (
          <form onSubmit={handleEmailOtp} className="space-y-2 pt-1 animate-in fade-in">
            <Input
              type="email"
              placeholder="Digite seu e-mail..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
            <Button type="submit" size="default" fullWidth disabled={loading}>
              {loading ? "Enviando..." : "Prosseguir com este E-mail"}
            </Button>
          </form>
        )}

        {/* Divisor */}
        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-slate-400 font-medium">Ou sem identificação</span>
          </div>
        </div>

        {/* 4. Modo Anônimo (Zero Fricção) */}
        <Button
          type="button"
          variant="ghost"
          size="lg"
          fullWidth
          className="border border-dashed border-slate-300 hover:border-slate-400 text-slate-600 font-semibold"
          onClick={handleAnonymous}
        >
          🎭 Avaliar como Anônimo
        </Button>
      </div>

      {/* Footer / Termos */}
      <footer className="text-center text-xs text-slate-400 pb-2">
        Protegido pela plataforma Review14. Seus dados nunca são compartilhados sem consentimento.
      </footer>
    </div>
  );
}
