"use client";

import * as React from "react";
import QRCode from "qrcode";
import { Button } from "@ui/components/button";

export default function QrCodePage() {
  const slug = "bistro-paris";
  const clientBaseUrl =
    typeof window !== "undefined"
      ? `${window.location.protocol}//${window.location.hostname}:3000`
      : "http://localhost:3000";
  const fullEvaluationUrl = `${clientBaseUrl}/${slug}`;

  const [qrDataUrl, setQrDataUrl] = React.useState<string>("");
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    QRCode.toDataURL(fullEvaluationUrl, {
      width: 400,
      margin: 2,
      color: {
        dark: "#0f172a",
        light: "#ffffff",
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error(err));
  }, [fullEvaluationUrl]);

  const handleCopy = () => {
    navigator.clipboard.writeText(fullEvaluationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 text-center py-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          QR Code do seu Estabelecimento
        </h1>
        <p className="text-xs text-slate-500">
          Imprima e posicione nas mesas, balcões ou comanda para que os clientes avaliem em 1 clique.
        </p>
      </div>

      <div className="p-8 bg-white border border-slate-200 rounded-3xl shadow-sm inline-block space-y-4">
        {qrDataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={qrDataUrl}
            alt="QR Code da Loja"
            className="w-64 h-64 mx-auto rounded-2xl border border-slate-100 shadow-inner"
          />
        ) : (
          <div className="w-64 h-64 bg-slate-100 rounded-2xl animate-pulse" />
        )}

        <div className="space-y-1">
          <p className="text-xs font-mono text-slate-500 bg-slate-50 py-1.5 px-3 rounded-lg border border-slate-200 inline-block">
            {fullEvaluationUrl}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        {qrDataUrl && (
          <Button asChild size="lg" className="w-full sm:w-auto font-bold gap-2">
            <a href={qrDataUrl} download={`qrcode-${slug}.png`}>
              📥 Baixar Imagem do QR Code (PNG)
            </a>
          </Button>
        )}
        <Button
          variant="outline"
          size="lg"
          onClick={handleCopy}
          className="w-full sm:w-auto"
        >
          {copied ? "Link Copiado!" : "Copiar Link Direto"}
        </Button>
      </div>
    </div>
  );
}
