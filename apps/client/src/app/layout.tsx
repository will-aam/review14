import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Review14 | Avalie sua Experiência",
  description: "Dê sua opinião em segundos e ajude a aprimorar o atendimento.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20">
        <main className="mx-auto min-h-screen max-w-md flex flex-col bg-background">
          {children}
        </main>
      </body>
    </html>
  );
}
