import { prisma } from "../db/client";
import { Company, PlanTier } from "@prisma/client";
import { CreateCompanyInput, UpdateCompanySettingsInput } from "../schemas/company.schema";

export class TenantService {
  /**
   * Busca a empresa pelo slug para a tela de avaliação do cliente
   */
  static async getCompanyBySlug(slug: string) {
    return prisma.company.findUnique({
      where: { slug },
      include: {
        customFields: {
          where: { isActive: true },
          orderBy: { order: "asc" },
        },
      },
    });
  }

  /**
   * Verifica se a empresa está no plano PRO ativo
   */
  static async isProTier(companyId: string): Promise<boolean> {
    const company = await prisma.company.findUnique({
      where: { id: companyId },
      select: { planTier: true, subscriptionStatus: true },
    });

    if (!company) return false;
    return (
      company.planTier === PlanTier.PRO &&
      (company.subscriptionStatus === "ACTIVE" ||
        company.subscriptionStatus === "TRIALING")
    );
  }

  /**
   * Criação de nova empresa no onboarding
   */
  static async createCompany(
    ownerId: string,
    data: CreateCompanyInput
  ): Promise<Company> {
    return prisma.company.create({
      data: {
        ...data,
        ownerId,
      },
    });
  }

  /**
   * Atualização das configurações pelo lojista
   */
  static async updateSettings(
    companyId: string,
    data: UpdateCompanySettingsInput
  ): Promise<Company> {
    return prisma.company.update({
      where: { id: companyId },
      data,
    });
  }
}
