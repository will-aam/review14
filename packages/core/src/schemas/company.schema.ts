import { z } from "zod";

export const cnpjRegex = /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/;

export const createCompanySchema = z.object({
  cnpj: z
    .string({ required_error: "CNPJ é obrigatório" })
    .transform((val) => val.replace(/\D/g, ""))
    .refine((val) => val.length === 14, "CNPJ deve conter 14 dígitos"),
  slug: z
    .string({ required_error: "Slug é obrigatório" })
    .min(3, "Slug deve ter no mínimo 3 caracteres")
    .regex(/^[a-z0-9-]+$/, "Slug deve conter apenas letras minúsculas, números e hífens"),
  legalName: z.string().min(2, "Razão Social é obrigatória"),
  tradeName: z.string().min(2, "Nome Fantasia é obrigatório"),
  category: z.string().min(2, "Categoria é obrigatória"),
  phone: z.string().optional(),
  zipCode: z.string().optional(),
  street: z.string().optional(),
  number: z.string().optional(),
  complement: z.string().optional(),
  neighborhood: z.string().optional(),
  city: z.string().optional(),
  state: z.string().length(2, "UF deve ter 2 caracteres").optional(),
});

export const updateCompanySettingsSchema = z.object({
  tradeName: z.string().min(2, "Nome Fantasia é obrigatório").optional(),
  phone: z.string().optional(),
  logoUrl: z.string().url("URL de logo inválida").nullable().optional(),
  googlePlaceId: z.string().nullable().optional(),
  minRatingForGoogle: z.number().int().min(1).max(5).default(4),
  zipCode: z.string().optional(),
  street: z.string().optional(),
  number: z.string().optional(),
  complement: z.string().optional(),
  neighborhood: z.string().optional(),
  city: z.string().optional(),
  state: z.string().length(2).optional(),
});

export type CreateCompanyInput = z.infer<typeof createCompanySchema>;
export type UpdateCompanySettingsInput = z.infer<typeof updateCompanySettingsSchema>;
