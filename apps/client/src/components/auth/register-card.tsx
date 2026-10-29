"use client";

import * as React from "react";
import { Card } from "@ui/components/card";
import { Button } from "@ui/components/button";
import { Input } from "@ui/components/input";
import { Label } from "@ui/components/label";

interface RegisterCardProps {
  onBackToLogin: () => void;
  onSubmit?: (data: { name: string; email: string; password: string }) => void;
}

export function RegisterCard({ onBackToLogin, onSubmit }: RegisterCardProps) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const passwordsMatch =
    password.length >= 8 && confirmPassword.length > 0 && password === confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || password !== confirmPassword) return;
    setLoading(true);
    if (onSubmit) {
      onSubmit({ name, email, password });
    }
  };

  return (
    <div className="flex w-full flex-col gap-4">
      {/* Back button */}
      <div>
        <button
          type="button"
          onClick={onBackToLogin}
          className="inline-flex items-center text-[13px] font-semibold text-[#2563EB] hover:underline"
        >
          ← Voltar para login
        </button>
      </div>

      {/* Header */}
      <div className="flex flex-col items-center gap-1.5 text-center">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2563EB] shadow-[0_2px_4px_rgba(37,99,235,0.25)]">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <line x1="20" y1="8" x2="20" y2="14" />
            <line x1="23" y1="11" x2="17" y2="11" />
          </svg>
        </div>
        <h1 className="text-[20px] font-bold leading-6 text-[#0F172A]">
          Criar conta no Review14
        </h1>
        <p className="text-[13px] text-[#64748B]">
          Acompanhe seu histórico de avaliações
        </p>
      </div>

      {/* Card Form */}
      <Card className="border-[#E2E8F0] bg-white p-5 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.04)]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          {/* Full Name */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="register-name">Nome completo</Label>
            <Input
              id="register-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Mariana Silva"
              required
              className="h-11 border-[#CBD5E1]"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="register-email">E-mail</Label>
            <Input
              id="register-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="mariana@exemplo.com"
              required
              className="h-11 border-[#CBD5E1]"
            />
          </div>

          {/* Create Password */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <Label htmlFor="register-password">Criar senha</Label>
              <span className="text-[11px] text-[#64748B]">
                Mínimo 8 caracteres
              </span>
            </div>
            <div className="relative flex items-center">
              <Input
                id="register-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                minLength={8}
                className="h-11 border-[#CBD5E1] pr-10 tracking-[0.1em]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-[#64748B] hover:text-[#0F172A]"
                aria-label={showPassword ? "Ocultar senha" : "Ver senha"}
              >
                {showPassword ? (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="register-confirm-password">Confirmar senha</Label>
            <div className="relative flex items-center">
              <Input
                id="register-confirm-password"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                minLength={8}
                className="h-11 border-[#CBD5E1] pr-10 tracking-[0.1em]"
              />
              {passwordsMatch && (
                <div className="absolute right-3 flex items-center text-[#15803D]">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            size="lg"
            fullWidth
            className="mt-1 shadow-[0_4px_6px_-1px_rgba(37,99,235,0.25)] font-semibold"
          >
            {loading ? "Criando conta..." : "Criar minha conta"}
          </Button>

          {/* Legal Disclaimer */}
          <p className="text-center text-[11px] leading-relaxed text-[#64748B]">
            Ao se cadastrar, você concorda com os Termos de Uso e Política de
            Privacidade da Review14.
          </p>
        </form>
      </Card>

      {/* Footer link to login */}
      <div className="flex items-center justify-center gap-1 text-center">
        <span className="text-[13px] text-[#475569]">Já possui uma conta?</span>
        <button
          type="button"
          onClick={onBackToLogin}
          className="text-[13px] font-semibold text-[#2563EB] hover:underline"
        >
          Fazer login
        </button>
      </div>
    </div>
  );
}
