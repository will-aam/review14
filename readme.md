Abaixo está a documentação executiva ("Sobre o Sistema") estruturada em três formatos: uma visão comercial (ideal para Landing Page ou apresentação para clientes), o detalhamento das frentes de atuação e o resumo técnico de produto (ideal para o seu `README.md` ou documentação de arquitetura).

---

### 1. O que é o Sistema (Visão Geral e Comercial)

> **"Mais do que coletar estrelas: uma plataforma inteligente que protege a reputação do estabelecimento no Google, transforma clientes anônimos em leads de marketing e entrega inteligência de dados em tempo real."**

O sistema é uma plataforma SaaS B2B2C de **Gestão de Reputação, Triagem de Feedbacks e Captura de Leads (CRM)** voltada para estabelecimentos físicos e prestadores de serviço (restaurantes, clínicas, salões, lojas).

Enquanto plataformas tradicionais apenas expõem notas publicamente, o nosso sistema atua como uma **camada estratégica intermediária**. Através de um QR Code no estabelecimento, ele captura a experiência do cliente com zero fricção, retém os dados de contato para campanhas futuras, filtra avaliações negativas para resolução interna (ouvidoria) e direciona os clientes promotores (4 e 5 estrelas) para impulsionar a nota pública da empresa no Google Meu Negócio. Tudo isso somado a um feed próprio no estilo rede social que funciona como prova social viva do negócio.

---

### 2. Os 3 Pilares do Ecossistema (Como Funciona)

#### 📱 1. Frente do Cliente Final (Coleta Mobile-First e Feed Social)

Desenhada para ter **atrito zero** no momento em que o cliente lê o QR Code na mesa ou balcão:

* **Autenticação Inteligente de 1 Clique:** Oferece login nativo via **Apple** (ideal para usuários de iPhone com Face ID), **Google**, **Código por E-mail (OTP)** ou **Modo Anônimo** (com gerador automático de codinome e avatar minimalista para quem não quer se identificar).
* **Conta Global Unificada:** O cliente faz login apenas uma vez na vida. Se ele visitar 10 estabelecimentos diferentes que usam o sistema, seu perfil é reaproveitado automaticamente sem duplicar cadastros, permitindo que ele acesse uma aba de *"Minhas Avaliações"* com todo o seu histórico.
* **Experiência de Avaliação:** Obrigatório apenas dar de 1 a 5 estrelas gerais. Opcionalmente, o cliente envia fotos/vídeos, texto e responde a critérios dinâmicos do local.
* **Triagem e Feed Público:** Após avaliar, clientes satisfeitos são convidados a publicar no Google, enquanto todos têm acesso a um **Feed Social** (estilo Instagram/Facebook) com as fotos e relatos dos clientes daquele estabelecimento.

#### 📊 2. Frente do Lojista (Painel B2B, CRM e Inteligência)

O centro de controle que justifica a assinatura mensal recorrente do dono do estabelecimento:

* **Onboarding Automatizado:** Cadastro rápido onde o lojista digita apenas o CNPJ e o sistema preenche toda a ficha cadastral e endereço automaticamente (via Brasil API).
* **Crescimento de Base (CRM Automatizado):** Cada cliente que se autentica para avaliar entra automaticamente na lista de contatos da loja (com nome, e-mail e métricas de visitas), criando uma máquina de leads para envio de promoções, cupons de aniversário e campanhas de retorno.
* **Ouvidoria e Proteção de Marca:** Avaliações baixas ficam retidas no painel interno para que o dono contate o cliente e resolva o problema antes que vire uma reclamação pública na internet.
* **Construtor de Formulários (Motor de Upsell):** No plano de entrada, o lojista recebe a avaliação padrão (5 estrelas + comentário). Ao fazer upgrade para o **Plano PRO**, ele desbloqueia a criação ilimitada de subcategorias de estrelas (ex: *Comida, Atendimento, Ambiente*), perguntas de múltipla escolha e acordeons expansíveis.

#### 🛡️ 3. Frente do Super Admin (Gestão do SaaS)

O painel enxuto e direto para o proprietário da plataforma gerenciar o império:

* **Monitoramento Financeiro:** Visão consolidada do faturamento recorrente (MRR), status de assinaturas, upgrades de planos e inadimplência integrados via Stripe.
* **Gestão de Inquilinos (Tenants):** Controle de todas as empresas cadastradas, volume de uso do banco de dados/mídia e chaves de ativação ou bloqueio manual de contas.

---

### 3. Ficha Técnica e Arquitetura (`README.md`)

Se você quiser colocar essa descrição na raiz do seu repositório para orientar o desenvolvimento e a IA do seu editor, use este resumo técnico:

* **Modelo de Negócio:** SaaS Multitenant B2B com cobrança recorrente (Tier Básico de entrada + Tier PRO com *upsell* por customização de formulários e CRM).
* **Arquitetura de Código:** Monorepo gerenciado com `pnpm`, dividido em 3 aplicações Next.js (`apps/admin`, `apps/tenant`, `apps/client`), um pacote central de domínio compilado com `tsup` (`packages/core`) e uma biblioteca visual compartilhada na raiz (`/ui`).
* **Stack Principal:** Next.js (App Router), React, TypeScript, Tailwind CSS, shadcn/ui e validação estrita de contratos com Zod.
* **Banco de Dados e ORM:** PostgreSQL Serverless (Neon DB) modelado via Prisma ORM.
* **Infraestrutura e Integrações:** Hospedagem na Vercel, armazenamento de fotos e vídeos de avaliações em nuvem via Cloudflare R2 (com *Presigned URLs*), faturamento automatizado via Stripe Webhooks e enriquecimento cadastral via Brasil API.

Qual nome você pensa em dar para a plataforma para já deixarmos os títulos e o `package.json` personalizados?