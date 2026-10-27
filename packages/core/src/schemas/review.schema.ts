import { z } from "zod";

export const reviewMediaInputSchema = z.object({
  url: z.string().url("URL do arquivo inválida"),
  fileKey: z.string().min(1, "Chave do arquivo R2 obrigatória"),
  type: z.enum(["IMAGE", "VIDEO"]).default("IMAGE"),
  sizeBytes: z.number().int().positive().optional(),
});

export const customAnswerInputSchema = z.object({
  customFieldId: z.string().min(1, "ID do campo customizado é obrigatório"),
  ratingValue: z.number().int().min(1).max(5).optional(),
  textValue: z.string().optional(),
  selectedItems: z.array(z.string()).optional(),
});

export const createReviewSchema = z.object({
  companyId: z.string().min(1, "ID da empresa é obrigatório"),
  overallRating: z
    .number({ required_error: "A nota geral de 1 a 5 estrelas é obrigatória" })
    .int("A nota deve ser um número inteiro")
    .min(1, "A nota mínima é 1 estrela")
    .max(5, "A nota máxima é 5 estrelas"),
  comment: z.string().max(2000, "O comentário não pode exceder 2000 caracteres").optional(),
  
  // Identificação do Cliente
  isAnonymous: z.boolean().default(false),
  anonymousName: z.string().optional(),
  anonymousAvatar: z.string().optional(),
  userId: z.string().optional(),
  
  // Mídias (Fotos/Vídeos do R2)
  media: z.array(reviewMediaInputSchema).max(6, "Máximo de 6 mídias").optional().default([]),
  
  // Respostas aos campos PRO adicionais
  customAnswers: z.array(customAnswerInputSchema).optional().default([]),
});

export const replyReviewSchema = z.object({
  reviewId: z.string().min(1, "ID da avaliação é obrigatório"),
  merchantReply: z
    .string({ required_error: "A resposta do lojista não pode ser vazia" })
    .min(2, "A resposta deve ter no mínimo 2 caracteres")
    .max(2000, "A resposta deve ter no máximo 2000 caracteres"),
});

export type ReviewMediaInput = z.infer<typeof reviewMediaInputSchema>;
export type CustomAnswerInput = z.infer<typeof customAnswerInputSchema>;
export type CreateReviewInput = z.infer<typeof createReviewSchema>;
export type ReplyReviewInput = z.infer<typeof replyReviewSchema>;
