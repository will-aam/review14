import { PrismaClient, Role, PlanTier, SubscriptionStatus, FieldType, AuthProvider } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed do banco de dados Review14...");

  // 1. Criação do Super Admin (Dono do SaaS)
  const superAdminPassword = await bcrypt.hash("SuperAdmin@2026", 10);
  const superAdmin = await prisma.user.upsert({
    where: { email: "admin@review14.com" },
    update: {},
    create: {
      email: "admin@review14.com",
      name: "Super Admin",
      role: Role.SUPER_ADMIN,
      authProvider: AuthProvider.CREDENTIALS,
      passwordHash: superAdminPassword,
    },
  });
  console.log(`✅ Super Admin configurado: ${superAdmin.email}`);

  // 2. Criação de um Lojista Demo (Tenant)
  const tenantPassword = await bcrypt.hash("Lojista@2026", 10);
  const tenantUser = await prisma.user.upsert({
    where: { email: "contato@bistroparis.com.br" },
    update: {},
    create: {
      email: "contato@bistroparis.com.br",
      name: "Chef Pierre",
      role: Role.TENANT,
      authProvider: AuthProvider.CREDENTIALS,
      passwordHash: tenantPassword,
    },
  });

  // 3. Criação da Empresa Demo vinculada ao Lojista (Plano PRO)
  const demoCompany = await prisma.company.upsert({
    where: { slug: "bistro-paris" },
    update: {},
    create: {
      slug: "bistro-paris",
      cnpj: "12345678000199",
      legalName: "Bistro Paris Gastronomia Ltda",
      tradeName: "Bistrô Paris & Café",
      category: "Restaurante",
      phone: "(11) 98765-4321",
      city: "São Paulo",
      state: "SP",
      neighborhood: "Jardins",
      street: "Rua Oscar Freire",
      number: "1200",
      zipCode: "01426-000",
      minRatingForGoogle: 4,
      googlePlaceId: "ChIJN1t_tDeuEmsRUsoyG83frY4",
      planTier: PlanTier.PRO,
      subscriptionStatus: SubscriptionStatus.ACTIVE,
      ownerId: tenantUser.id,
    },
  });
  console.log(`✅ Empresa Demo criada: ${demoCompany.tradeName} (/${demoCompany.slug})`);

  // 4. Criação dos Campos Dinâmicos (Upsell do Plano PRO)
  const customFieldsData = [
    {
      companyId: demoCompany.id,
      label: "Qualidade da Comida",
      description: "Sabor, temperatura e apresentação dos pratos",
      fieldType: FieldType.RATING_5,
      order: 1,
    },
    {
      companyId: demoCompany.id,
      label: "Agilidade no Atendimento",
      description: "Cortesia da equipe e tempo de espera",
      fieldType: FieldType.RATING_5,
      order: 2,
    },
    {
      companyId: demoCompany.id,
      label: "Como foi a sua experiência?",
      description: "Tipo de consumo",
      fieldType: FieldType.SINGLE_SELECT,
      options: ["Almoço no Local", "Jantar no Local", "Retirada no Balcão", "Delivery"],
      order: 3,
    },
    {
      companyId: demoCompany.id,
      label: "Destaques do Estabelecimento",
      description: "Marque os pontos fortes observados",
      fieldType: FieldType.MULTI_SELECT,
      options: [
        "Música ambiente agradável",
        "Opções vegetarianas/veganas",
        "Espaço para crianças",
        "Wi-Fi de alta velocidade",
        "Estacionamento fácil",
      ],
      order: 4,
    },
  ];

  for (const field of customFieldsData) {
    await prisma.customField.create({
      data: field,
    });
  }
  console.log("✅ 4 Campos customizados PRO adicionados à empresa demo.");

  console.log("🎉 Seed finalizado com sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro durante o seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
