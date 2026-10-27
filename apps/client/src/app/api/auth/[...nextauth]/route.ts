import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import { AuthService } from "@saas/core";
import { AuthProvider } from "@prisma/client";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID || "",
      clientSecret: process.env.APPLE_PRIVATE_KEY || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) return false;

      // Sincroniza e reaproveita a Conta Global do Usuário no banco
      const provider =
        account?.provider === "apple"
          ? AuthProvider.APPLE
          : AuthProvider.GOOGLE;

      await AuthService.upsertGlobalUser({
        email: user.email,
        name: user.name || user.email.split("@")[0],
        avatarUrl: user.image,
        authProvider: provider,
        providerId: account?.providerAccountId,
      });

      return true;
    },
    async redirect({ url, baseUrl }) {
      // Preserva rotas dinâmicas como /[slug]/evaluate
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  pages: {
    signIn: "/",
  },
});

export { handler as GET, handler as POST };
