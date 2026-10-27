import { prisma } from "../db/client";
import { CreateReviewInput, ReplyReviewInput } from "../schemas/review.schema";
import { LeadService } from "./lead.service";

export interface ReviewTriageResult {
  reviewId: string;
  overallRating: number;
  redirectToGoogle: boolean;
  googleReviewUrl: string | null;
  message: string;
}

export class ReviewService {
  /**
   * Submete a avaliação e realiza a triagem inteligente:
   * >= 4 estrelas: direciona para o Google Meu Negócio
   * < 4 estrelas: retém internamente para ouvidoria e contato preventivo
   */
  static async submitReview(input: CreateReviewInput): Promise<ReviewTriageResult> {
    const company = await prisma.company.findUnique({
      where: { id: input.companyId },
    });

    if (!company) {
      throw new Error("Empresa não encontrada");
    }

    const minRating = company.minRatingForGoogle ?? 4;
    const isPromoter = input.overallRating >= minRating;

    // Transação para persistir a avaliação, mídias e respostas customizadas
    const createdReview = await prisma.$transaction(async (tx) => {
      const review = await tx.review.create({
        data: {
          overallRating: input.overallRating,
          comment: input.comment,
          isAnonymous: input.isAnonymous,
          anonymousName: input.isAnonymous ? input.anonymousName : null,
          anonymousAvatar: input.isAnonymous ? input.anonymousAvatar : null,
          userId: input.userId ?? null,
          companyId: input.companyId,
          isPublic: isPromoter, // Avaliações promotoras vão pro feed público
        },
      });

      // Salva mídias enviadas (R2)
      if (input.media && input.media.length > 0) {
        await tx.reviewMedia.createMany({
          data: input.media.map((m) => ({
            reviewId: review.id,
            url: m.url,
            fileKey: m.fileKey,
            type: m.type,
            sizeBytes: m.sizeBytes,
          })),
        });
      }

      // Salva respostas dinâmicas PRO
      if (input.customAnswers && input.customAnswers.length > 0) {
        await tx.customAnswer.createMany({
          data: input.customAnswers.map((a) => ({
            reviewId: review.id,
            customFieldId: a.customFieldId,
            ratingValue: a.ratingValue,
            textValue: a.textValue,
            selectedItems: a.selectedItems ?? undefined,
          })),
        });
      }

      return review;
    });

    // Se o cliente estiver autenticado, alimenta o CRM automaticamente
    if (input.userId) {
      await LeadService.linkCustomerToCompany(input.companyId, input.userId);
    }

    let googleReviewUrl: string | null = null;
    if (isPromoter && company.googlePlaceId) {
      googleReviewUrl = `https://search.google.com/local/writereview?placeid=${company.googlePlaceId}`;
    }

    return {
      reviewId: createdReview.id,
      overallRating: input.overallRating,
      redirectToGoogle: isPromoter,
      googleReviewUrl,
      message: isPromoter
        ? "Ficamos muito felizes que sua experiência foi incrível! Que tal compartilhar no Google?"
        : "Agradecemos seu feedback sincero. Nosso time já foi notificado e trabalhará para resolver qualquer ponto pendente.",
    };
  }

  /**
   * Feed social público da loja (estilo Instagram)
   */
  static async getPublicFeed(companyId: string, limit = 20) {
    return prisma.review.findMany({
      where: {
        companyId,
        isPublic: true,
      },
      include: {
        media: true,
        user: {
          select: {
            name: true,
            avatarUrl: true,
          },
        },
        customAnswers: {
          include: {
            customField: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  }

  /**
   * Histórico de avaliações do cliente final
   */
  static async getCustomerReviews(userId: string) {
    return prisma.review.findMany({
      where: { userId },
      include: {
        company: {
          select: {
            tradeName: true,
            slug: true,
            logoUrl: true,
            city: true,
            state: true,
          },
        },
        media: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  /**
   * Resposta do lojista a uma avaliação (ouvidoria)
   */
  static async replyReview(input: ReplyReviewInput) {
    return prisma.review.update({
      where: { id: input.reviewId },
      data: {
        merchantReply: input.merchantReply,
        repliedAt: new Date(),
      },
    });
  }
}
