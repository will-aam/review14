"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ReviewItem {
  id: string;
  authorName: string;
  authorInitials: string;
  avatarBg: string;
  verified: boolean;
  timeAndPlace: string;
  rating: number;
  text: string;
  photos?: string[];
  storeName?: string;
  isMyReview?: boolean;
}

export default function StoreFeedPage() {
  const params = useParams();
  const router = useRouter();
  const slug = (params.slug as string) || "cafe-aurora";

  const [activeTab, setActiveTab] = React.useState<string>("store");

  const storeName = React.useMemo(() => {
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }, [slug]);

  const storeInitials = React.useMemo(() => {
    return storeName
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }, [storeName]);

  const reviews: ReviewItem[] = [
    {
      id: "1",
      authorName: "Mariana Santos",
      authorInitials: "MS",
      avatarBg: "bg-[#DBEAFE] text-[#1D4ED8]",
      verified: true,
      timeAndPlace: "Hoje, 14:20 • Mesa 14",
      rating: 5,
      text: "Experiência impecável! O café espresso duplo estava com a crema perfeita e o croissant de amêndoas super crocante.",
      photos: [
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=200&auto=format&fit=crop&q=80",
      ],
      isMyReview: true,
      storeName: storeName,
    },
    {
      id: "2",
      authorName: "Rodrigo Albuquerque",
      authorInitials: "RA",
      avatarBg: "bg-[#EFF6FF] text-[#1D4ED8]",
      verified: true,
      timeAndPlace: "Ontem, 16:45 • Balcão",
      rating: 5,
      text: "Melhor café especial da região dos Jardins. O ambiente é silencioso o bastante para ler enquanto degusto o V60.",
      isMyReview: false,
      storeName: storeName,
    },
    {
      id: "3",
      authorName: "Camila Duarte",
      authorInitials: "CD",
      avatarBg: "bg-[#FEF3C7] text-[#B45309]",
      verified: true,
      timeAndPlace: "25 de Outubro • Varanda",
      rating: 5,
      text: "Atendimento acolhedor, opções vegetarianas muito bem elaboradas e wi-fi excelente para trabalhar.",
      isMyReview: false,
      storeName: storeName,
    },
  ];

  const displayedReviews =
    activeTab === "store"
      ? reviews
      : reviews.filter((r) => r.isMyReview);

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F8FAFC] text-[#0F172A] antialiased">
      <div className="mx-auto flex w-full max-w-[390px] flex-col gap-3.5 px-4 py-6">
        {/* Cartão de Cabeçalho do Estabelecimento usando shadcn Card */}
        <Card className="rounded-[14px] border-[#E2E8F0] bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <CardContent className="flex flex-col gap-3 p-0">
            {/* Top Row: Voltar & Badge Feed Público */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => router.push(`/${slug}/evaluate`)}
                className="text-[12px] font-semibold text-[#2563EB] hover:underline"
              >
                ← Nova Avaliação
              </button>
              <Badge variant="brand">FEED PÚBLICO</Badge>
            </div>

            {/* Identidade da Loja */}
            <div className="flex items-center gap-2.5">
              <Avatar className="h-[42px] w-[42px] rounded-[10px]">
                <AvatarFallback className="rounded-[10px] bg-[#DBEAFE] font-bold text-[15px] text-[#1D4ED8]">
                  {storeInitials || "CA"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <h1 className="text-[16px] font-bold text-[#0F172A]">
                    {storeName}
                  </h1>
                  <Badge variant="success" className="px-1.5 py-0 text-[10px]">
                    Verificado
                  </Badge>
                </div>
                <span className="text-[12px] text-[#64748B]">
                  Cafeteria &amp; Bistrô • Jardins, SP
                </span>
              </div>
            </div>

            {/* Segmented Control / Tabs usando shadcn Tabs */}
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="w-full">
                <TabsTrigger value="store" className="flex-1 gap-1.5">
                  <span>Esta loja</span>
                  <span className="rounded-full bg-[#EFF6FF] px-1.5 py-0.5 text-[10px] font-semibold text-[#2563EB]">
                    {reviews.length}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="my" className="flex-1">
                  Minhas avaliações
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        {/* Lista de Avaliações */}
        <div className="flex flex-col gap-3">
          {displayedReviews.map((item) => (
            <Card
              key={item.id}
              className="rounded-[14px] border-[#E2E8F0] bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
            >
              <CardContent className="flex flex-col gap-2.5 p-0">
                {/* Header do Autor */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-[34px] w-[34px]">
                      <AvatarFallback className={item.avatarBg}>
                        {item.authorInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        <span className="text-[13px] font-semibold text-[#0F172A]">
                          {item.authorName}
                        </span>
                        {item.verified && (
                          <span className="text-[10px] font-bold text-[#15803D]">
                            ✓
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-[#64748B]">
                        {item.timeAndPlace}
                      </span>
                    </div>
                  </div>

                  {/* Estrelas */}
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill={star <= item.rating ? "#F59E0B" : "none"}
                        stroke={star <= item.rating ? "#F59E0B" : "#CBD5E1"}
                        strokeWidth="1.5"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                </div>

                {/* Texto do Feedback */}
                <p className="text-[13px] leading-relaxed text-[#0F172A]">
                  "{item.text}"
                </p>

                {/* Fotos Anexadas */}
                {item.photos && item.photos.length > 0 && (
                  <div className="flex gap-2 pt-0.5">
                    {item.photos.map((photoUrl, pIdx) => (
                      <div
                        key={pIdx}
                        className="h-[60px] w-[60px] shrink-0 overflow-hidden rounded-[8px] border border-[#CBD5E1] bg-slate-100"
                      >
                        <img
                          src={photoUrl}
                          alt="Foto da visita"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {displayedReviews.length === 0 && (
            <Card className="rounded-[14px] border-dashed border-[#CBD5E1] bg-white p-8 text-center shadow-none">
              <CardContent className="flex flex-col items-center justify-center gap-2 p-0">
                <span className="text-[14px] font-semibold text-[#0F172A]">
                  Nenhuma avaliação encontrada
                </span>
                <p className="text-[12px] text-[#64748B]">
                  Você ainda não publicou nenhuma avaliação para este local.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
