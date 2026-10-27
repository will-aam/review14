import { prisma } from "../db/client";
import { CustomerLead } from "@prisma/client";

export class LeadService {
  /**
   * Vincula o cliente avaliador ao CRM da empresa visitada
   * Se já existia, atualiza a última visita e incrementa total de reviews
   */
  static async linkCustomerToCompany(
    companyId: string,
    userId: string,
    marketingOptIn = true
  ): Promise<CustomerLead> {
    const existingLead = await prisma.customerLead.findUnique({
      where: {
        companyId_userId: {
          companyId,
          userId,
        },
      },
    });

    if (existingLead) {
      return prisma.customerLead.update({
        where: { id: existingLead.id },
        data: {
          totalReviews: { increment: 1 },
          lastVisitedAt: new Date(),
          marketingOptIn: marketingOptIn || existingLead.marketingOptIn,
        },
      });
    }

    return prisma.customerLead.create({
      data: {
        companyId,
        userId,
        marketingOptIn,
        totalReviews: 1,
        lastVisitedAt: new Date(),
      },
    });
  }

  /**
   * Retorna os leads do lojista com dados dos usuários
   */
  static async getCompanyLeads(companyId: string, search?: string) {
    return prisma.customerLead.findMany({
      where: {
        companyId,
        ...(search
          ? {
              user: {
                OR: [
                  { name: { contains: search, mode: "insensitive" } },
                  { email: { contains: search, mode: "insensitive" } },
                ],
              },
            }
          : {}),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
            city: true,
            state: true,
            createdAt: true,
          },
        },
      },
      orderBy: { lastVisitedAt: "desc" },
    });
  }
}
