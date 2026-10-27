import type { Metadata } from "next";
import "@ui/styles/globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Painel do Lojista | Review14",
  description: "Gerencie sua reputação, capture leads e filtre avaliações para o Google.",
};

export default function TenantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased flex flex-col">
        <header className="border-b border-slate-200 bg-white sticky top-0 z-50 px-6 py-3.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-black text-primary tracking-tight">
              REVIEW<span className="text-amber-500">14</span>
            </Link>
            <nav className="hidden md:flex items-center gap-5 text-sm font-semibold text-slate-600">
              <Link href="/" className="hover:text-primary transition-colors">
                Dashboard & Feed
              </Link>
              <Link href="/leads" className="hover:text-primary transition-colors">
                Leads CRM
              </Link>
              <Link href="/form-builder" className="hover:text-primary transition-colors">
                Campos PRO
              </Link>
              <Link href="/qrcode" className="hover:text-primary transition-colors">
                QR Code
              </Link>
              <Link href="/settings" className="hover:text-primary transition-colors">
                Configurações & Plano
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2.5 py-1 rounded-full border border-amber-200">
              Plano PRO ⭐
            </span>
          </div>
        </header>
        <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8">
          {children}
        </main>
      </body>
    </html>
  );
}
