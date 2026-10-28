# 🏛️ Documentação de Arquitetura & Conformidade Técnica - Review14

> **Status:** Aprovado e em conformidade com os padrões oficiais do Next.js (App Router), Vercel Monorepos, Prisma ORM e Tailwind CSS.

---

## 📑 Índice
1. [Visão Geral da Arquitetura](#1-visão-geral-da-arquitetura)
2. [Conformidade com os Padrões Oficiais do Next.js](#2-conformidade-com-os-padrões-oficiais-do-nextjs)
3. [Tabela de Auditoria e Links de Documentação Oficial](#3-tabela-de-auditoria-e-links-de-documentação-oficial)
4. [Estratégia Monorepo e a Pasta `/ui` na Raiz](#4-estratégia-monorepo-e-a-pasta-ui-na-raiz)
5. [Camada de Banco de Dados: Prisma + Neon Serverless](#5-camada-de-banco-de-dados-prisma--neon-serverless)
6. [Motor de Regras de Negócio (`@saas/core`)](#6-motor-de-regras-de-negócio-saascore)
7. [Guia de Execução e Scripts](#7-guia-de-execução-e-scripts)

---

## 1. Visão Geral da Arquitetura

O **Review14** é um ecossistema SaaS B2B2C de gestão de reputação, triagem de avaliações e captura de leads estruturado como um **Monorepo gerenciado via `pnpm`**.

```text
review14/
├── apps/
│   ├── client/           # [Porta 3000] App Mobile-First via QR Code para o Cliente Final
│   ├── admin/            # [Porta 3001] Painel Executivo do Super Admin (Dono do SaaS)
│   └── tenant/           # [Porta 3002] Painel B2B do Lojista (CRM, Feed e Ouvidoria)
├── packages/
│   └── core/             # [@saas/core] Pacote de Domínio, Banco de Dados, Zod e Integrações
└── ui/                   # Biblioteca visual compartilhada com shadcn/ui e Tailwind CSS
```

---

## 2. Conformidade com os Padrões Oficiais do Next.js

A arquitetura das 3 aplicações (`apps/*`) foi projetada em total alinhamento com as diretrizes do **Next.js App Router**:

### A. File-System Routing Moderno
* **Route Groups `(auth)` e `(dashboard)` (em `apps/tenant`):** Padrão oficial para isolar layouts e fluxos (autenticação pública vs painel restrito) sem criar prefixos indesejados nas URLs.
* **Rotas Dinâmicas Parametrizadas (`[slug]`):** Utilizadas em `apps/client/src/app/[slug]` para criar contextos isolados e seguros por estabelecimento comercial (`app.com/bistro-paris`).
* **Rotas Aninhadas (`[slug]/evaluate` e `[slug]/thanks`):** Garantem que a jornada de avaliação do cliente siga um funil previsível mantendo o identificador da loja.
* **Catch-all Routes (`api/auth/[...nextauth]`):** Padrão canônico do NextAuth / Auth.js para capturar todos os sub-endpoints de provedores OAuth (Google e Apple).

### B. Route Handlers (`route.ts`)
* Substituem os antigos endpoints de `pages/api`.
* Utilizam os padrões da Web API moderna (`Request` e `NextResponse`).
* Implementados em:
  * `apps/client/src/app/api/upload/route.ts`: Geração de presigned URLs para upload direto no Cloudflare R2.
  * `apps/tenant/src/app/api/webhooks/stripe/route.ts`: Endpoint seguro para ingestão e verificação de assinaturas de webhooks do Stripe.

### C. Server Components vs. Client Components
* **Server Components por Padrão:** Layouts base e componentes sem estado local rodam no servidor, entregando HTML estático imediato e maximizando o índice First Contentful Paint (FCP).
* **`"use client"` Pontual:** Aplicado estritamente nas folhas da árvore que manipulam DOM, estados (`useState`), efeitos (`useEffect`) e APIs do navegador (`navigator.clipboard`, `sessionStorage`).

---

## 3. Tabela de Auditoria e Links de Documentação Oficial

Para fins de revisão de conformidade arquitetural, compare as implementações com os links da documentação oficial:

| Padrão Arquitetural | Documentação Oficial | Arquivo Implementado no Projeto |
| :--- | :--- | :--- |
| **Route Groups `(auth)` / `(dashboard)`** | [Next.js Route Groups Docs](https://nextjs.org/docs/app/building-your-application/routing/route-groups) | `apps/tenant/src/app/(auth)/register/page.tsx`<br>`apps/tenant/src/app/(dashboard)/page.tsx` |
| **Dynamic Routes `[slug]`** | [Next.js Dynamic Routes Docs](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes) | `apps/client/src/app/[slug]/page.tsx`<br>`apps/client/src/app/[slug]/evaluate/page.tsx` |
| **Catch-all Routes `[...nextauth]`** | [Next.js Dynamic Segments Docs](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#catch-all-segments) | `apps/client/src/app/api/auth/[...nextauth]/route.ts` |
| **Route Handlers (`route.ts`)** | [Next.js Route Handlers Docs](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) | `apps/client/src/app/api/upload/route.ts`<br>`apps/tenant/src/app/api/webhooks/stripe/route.ts` |
| **Metadata API** | [Next.js Metadata Docs](https://nextjs.org/docs/app/building-your-application/optimizing/metadata) | `apps/client/src/app/layout.tsx`<br>`apps/tenant/src/app/layout.tsx`<br>`apps/admin/src/app/layout.tsx` |
| **`transpilePackages`** | [Next.js transpilePackages Docs](https://nextjs.org/docs/app/api-reference/next-config-js/transpilePackages) | `apps/client/next.config.mjs`<br>`apps/tenant/next.config.mjs`<br>`apps/admin/next.config.mjs` |
| **TypeScript Path Aliases (`@ui/*`)** | [Next.js Module Path Aliases](https://nextjs.org/docs/app/building-your-application/configuring/absolute-imports-and-module-aliases) | `apps/client/tsconfig.json`<br>`tsconfig.base.json` |
| **Tailwind Monorepo Content Scanning** | [Tailwind CSS Content Config Docs](https://tailwindcss.com/docs/content-configuration#configuring-source-paths) | `apps/client/tailwind.config.ts`<br>`apps/tenant/tailwind.config.ts`<br>`apps/admin/tailwind.config.ts` |
| **Singleton Global do Prisma** | [Prisma Docs - Next.js Best Practices](https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices) | `packages/core/src/db/client.ts` |
| **Neon Serverless WebSocket Adapter** | [Neon Docs - Prisma Serverless Driver](https://neon.tech/docs/guides/prisma) | `packages/core/src/db/client.ts`<br>`packages/core/prisma/schema.prisma` |

---

## 4. Estratégia Monorepo e a Pasta `/ui` na Raiz

O projeto adota uma biblioteca compartilhada de UI na raiz (`/ui`) **sem `package.json` próprio**, conforme requisito de design:

### Como funciona o vínculo sem pacote:
1. **Compilador TypeScript (`tsconfig.json`):**
   ```json
   "paths": {
     "@/*": ["./src/*"],
     "@ui/*": ["../../ui/*"]
   }
   ```
2. **Bundler do Next.js (`next.config.mjs`):**
   ```javascript
   experimental: {
     externalDir: true // Permite ao Webpack/Turbopack compilar arquivos da raiz externa
   }
   ```
3. **Purga do Tailwind (`tailwind.config.ts`):**
   ```typescript
   content: [
     "./src/**/*.{js,ts,jsx,tsx,mdx}",
     "../../ui/**/*.{ts,tsx}" // Escaneia classes utilitárias dos componentes compartilhados
   ]
   ```

### Vantagens Práticas:
* **HMR (Hot Module Replacement) Instantâneo:** Alterações visuais em componentes (`star-rating.tsx`, `button.tsx`) refletem em milissegundos nos 3 apps simultaneamente sem build prévio.
* **Zero Overhead de Versionamento:** Elimina a necessidade de publicar ou compilar pacotes intermediários via tsup para o design system.

---

## 5. Camada de Banco de Dados: Prisma + Neon Serverless

Configurada em `packages/core/src/db/client.ts`:

1. **Prevenção de Esgotamento de Conexões (Fast Refresh):**
   Durante o desenvolvimento, o Next.js recarrega módulos continuamente. O padrão `globalThis.prisma = prisma` reaproveita a mesma conexão ativa, impedindo erros `FATAL: remaining connection slots are reserved`.
2. **Neon Driver Adapter com WebSockets:**
   Usa `@neondatabase/serverless` e `@prisma/adapter-neon` para conectar ao PostgreSQL via WebSockets com pooling integrado (`pgbouncer=true`), ideal para execução em infraestruturas Edge/Serverless na Vercel.

---

## 6. Motor de Regras de Negócio (`@saas/core`)

O core encapsula regras puras desacopladas da camada de apresentação:

* **Triagem Inteligente (`ReviewService.submitReview`):**
  * Se `overallRating >= company.minRatingForGoogle` (padrão 4):
    * `redirectToGoogle = true`
    * Gera deep-link direto para a caixa de avaliação do Google Meu Negócio: `https://search.google.com/local/writereview?placeid={googlePlaceId}`
    * `isPublic = true` (entra no feed social da loja).
  * Se `overallRating < 4`:
    * `redirectToGoogle = false`
    * `isPublic = false` (retido internamente para a ouvidoria do lojista resolver antes de virar reclamação pública).
* **CRM de Leads Automático (`LeadService.linkCustomerToCompany`):**
  * Vincula o usuário autenticado à tabela `CustomerLead` da loja sem duplicar a conta global.
  * Incrementa visitas e atualiza data de última presença.
* **Autopreenchimento Cadastral (`BrasilApiService.fetchCompanyByCNPJ`):**
  * Busca dados em 1 clique na Receita Federal via Brasil API no onboarding do lojista.
* **Upload Seguro Cloudflare R2 (`R2Service.createPresignedUploadUrl`):**
  * Gera URLs pré-assinadas com expiração temporária para envio direto do navegador ao bucket S3.
* **Monetização e Planos (`StripeService`):**
  * Gerencia assinaturas recorrentes nos tiers `BASIC` e `PRO`, provisionamento automático via webhook e Portal de Cobrança.

---

## 7. Guia de Execução e Scripts

### Instalação de dependências
```bash
pnpm install
```

### Banco de Dados (Prisma)
```bash
pnpm db:generate   # Gera os tipos do Prisma Client
pnpm db:push       # Aplica o schema ao banco Neon
pnpm db:seed       # Popula Super Admin, Lojista Demo e Campos PRO
```

### Inicialização dos Apps em Desenvolvimento
* **Todos os apps em paralelo:**
  ```bash
  pnpm dev
  ```
* **Cliente Final (Mobile QR Code - Porta 3000):**
  ```bash
  pnpm dev:client
  ```
* **Super Admin (Painel Geral - Porta 3001):**
  ```bash
  pnpm dev:admin
  ```
* **Painel do Lojista (B2B - Porta 3002):**
  ```bash
  pnpm dev:tenant
  ```
