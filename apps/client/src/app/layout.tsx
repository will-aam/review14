import type { Metadata } from "next";
import "@ui/styles/globals.css";

export const metadata: Metadata = {
  title: "Avalie sua Experiência | Review14",
  description: "Dê sua opinião em segundos e ajude a aprimorar o atendimento.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-primary/20">
        <main className="mx-auto max-w-md min-h-screen flex flex-col bg-white shadow-xl">
          {children}
        </main>
      </body>
    </html>
  );
}
