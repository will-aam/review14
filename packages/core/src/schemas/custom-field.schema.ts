import { z } from "zod";

export const fieldTypeEnum = z.enum([
  "RATING_5",
  "SINGLE_SELECT",
  "MULTI_SELECT",
  "TEXT",
]);

export const createCustomFieldSchema = z.object({
  companyId: z.string().min(1, "ID da empresa é obrigatório"),
  label: z
    .string({ required_error: "O rótulo do campo é obrigatório" })
    .min(2, "Rótulo deve ter ao menos 2 caracteres")
    .max(100, "Rótulo deve ter no máximo 100 caracteres"),
  description: z.string().max(255).optional(),
  fieldType: fieldTypeEnum.default("RATING_5"),
  options: z.array(z.string().min(1)).optional(),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

export const updateCustomFieldSchema = createCustomFieldSchema
  .omit({ companyId: true })
  .partial();

export type CreateCustomFieldInput = z.infer<typeof createCustomFieldSchema>;
export type UpdateCustomFieldInput = z.infer<typeof updateCustomFieldSchema>;
