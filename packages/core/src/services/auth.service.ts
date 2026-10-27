import { prisma } from "../db/client";
import { AuthProvider, Role, User } from "@prisma/client";
import crypto from "crypto";

export interface UpsertGlobalUserInput {
  email: string;
  name: string;
  avatarUrl?: string | null;
  authProvider: AuthProvider;
  providerId?: string | null;
}

export class AuthService {
  /**
   * Garante a criação ou reaproveitamento da Conta Global do usuário
   * Sem duplicar o registro entre diferentes estabelecimentos visitados
   */
  static async upsertGlobalUser(data: UpsertGlobalUserInput): Promise<User> {
    const emailNormalized = data.email.toLowerCase().trim();

    const user = await prisma.user.upsert({
      where: { email: emailNormalized },
      update: {
        name: data.name,
        avatarUrl: data.avatarUrl ?? undefined,
        authProvider: data.authProvider,
        providerId: data.providerId ?? undefined,
      },
      create: {
        email: emailNormalized,
        name: data.name,
        avatarUrl: data.avatarUrl,
        authProvider: data.authProvider,
        providerId: data.providerId,
        role: Role.CUSTOMER,
      },
    });

    return user;
  }

  /**
   * Gera um código numérico OTP de 6 dígitos e salva para expiração em 15 minutos
   */
  static async generateOtpCode(email: string): Promise<string> {
    const emailNormalized = email.toLowerCase().trim();
    // Gera código numérico de 6 dígitos seguro
    const code = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos

    // Invalida códigos anteriores não usados deste e-mail
    await prisma.verificationCode.updateMany({
      where: { email: emailNormalized, used: false },
      data: { used: true },
    });

    await prisma.verificationCode.create({
      data: {
        email: emailNormalized,
        code,
        expiresAt,
      },
    });

    return code;
  }

  /**
   * Valida o código OTP informado pelo cliente
   */
  static async verifyOtpCode(email: string, code: string): Promise<boolean> {
    const emailNormalized = email.toLowerCase().trim();

    const record = await prisma.verificationCode.findFirst({
      where: {
        email: emailNormalized,
        code: code.trim(),
        used: false,
        expiresAt: {
          gt: new Date(),
        },
      },
      orderBy: { createdAt: "desc" },
    });

    if (!record) {
      return false;
    }

    // Marca como utilizado
    await prisma.verificationCode.update({
      where: { id: record.id },
      data: { used: true },
    });

    return true;
  }
}
