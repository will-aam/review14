import type { Metadata } from "next";
import "@ui/styles/globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Super Admin | Review14",
  description: "Painel de controle do proprietário do SaaS Review14",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased">
        <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="text-lg font-black tracking-wider text-primary">
              REVIEW14 <span className="text-xs text-amber-400 font-semibold uppercase px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">Admin</span>
            </span>
            <nav className="flex items-center gap-4 text-sm font-medium text-slate-400">
              <Link href="/" className="hover:text-white transition-colors">
                Métricas & MRR
              </Link>
              <Link href="/tenants" className="hover:text-white transition-colors">
                Lojistas (Tenants)
              </Link>
            </nav>
          </div>
          <div className="text-xs text-slate-400">
            admin@review14.com
          </div>
        </header>
        <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8">
          {children}
        </main>
      </body>
    </html>
  );
}
