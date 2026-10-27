// ==========================================
// @saas/core - Barrel Export
// ==========================================

// 1. Banco de Dados e Prisma Client
export * from "./db/client";

// 2. Schemas de Validação (Zod)
export * from "./schemas/auth.schema";
export * from "./schemas/company.schema";
export * from "./schemas/review.schema";
export * from "./schemas/custom-field.schema";

// 3. Regras de Negócio e Serviços
export * from "./services/auth.service";
export * from "./services/review.service";
export * from "./services/lead.service";
export * from "./services/tenant.service";

// 4. Integrações Externas
export * from "./integrations/stripe";
export * from "./integrations/r2";
export * from "./integrations/brasil-api";
export * from "./integrations/mail";
