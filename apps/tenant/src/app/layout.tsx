import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Review14 | Dashboard do Estabelecimento",
  description: "Monitoramento em tempo real das experiências dos clientes do Café Aurora, métricas de avaliação e NPS.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1220] text-slate-900 dark:text-slate-100 antialiased font-sans transition-colors duration-200">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
