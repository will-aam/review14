import { z } from "zod";

export const requestOtpSchema = z.object({
  email: z
    .string({ required_error: "E-mail é obrigatório" })
    .email("Formato de e-mail inválido")
    .toLowerCase()
    .trim(),
});

export const verifyOtpSchema = z.object({
  email: z
    .string({ required_error: "E-mail é obrigatório" })
    .email("Formato de e-mail inválido")
    .toLowerCase()
    .trim(),
  code: z
    .string({ required_error: "Código de verificação é obrigatório" })
    .length(6, "O código deve conter exatamente 6 dígitos")
    .regex(/^\d+$/, "O código deve ser estritamente numérico"),
  name: z.string().min(2, "Nome deve ter no mínimo 2 caracteres").optional(),
});

export const loginCredentialsSchema = z.object({
  email: z
    .string({ required_error: "E-mail é obrigatório" })
    .email("Formato de e-mail inválido")
    .toLowerCase()
    .trim(),
  password: z
    .string({ required_error: "Senha é obrigatória" })
    .min(6, "A senha deve conter no mínimo 6 caracteres"),
});

export const anonymousCustomerSchema = z.object({
  anonymousName: z.string().min(2, "O codinome deve conter ao menos 2 caracteres"),
  anonymousAvatar: z.string().url().or(z.string().min(1)),
});

export type RequestOtpInput = z.infer<typeof requestOtpSchema>;
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;
export type LoginCredentialsInput = z.infer<typeof loginCredentialsSchema>;
export type AnonymousCustomerInput = z.infer<typeof anonymousCustomerSchema>;
