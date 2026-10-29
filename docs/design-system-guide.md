# Guia de Arquitetura: Design System Híbrido (Review14)

Este documento define as diretrizes e padrões para o gerenciamento de componentes de interface no monorepo **Review14**.

---

## 🏛️ A Estrutura Híbrida

O projeto adota uma arquitetura híbrida dividida em duas camadas claras:

```text
review14/
├── ui/                              👉 CAMADA GLOBAL (Design System Primitivo)
│   ├── components/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── lib/
│   │   └── utils.ts                👉 Função cn() (clsx + tailwind-merge)
│   └── styles/
│       └── globals.css             👉 Variáveis CSS e tokens de cor
│
├── apps/
│   ├── client/src/components/       👉 CAMADA LOCAL (Componentes de Negócio do Cliente)
│   │   └── auth/
│   │       ├── email-login-card.tsx
│   │       ├── login-options-card.tsx
│   │       └── register-card.tsx
│   │
│   ├── tenant/src/components/       👉 CAMADA LOCAL (Componentes de Negócio do Lojista)
│   │   └── dashboard/
│   │       ├── metrics-card.tsx
│   │       └── qr-code-modal.tsx
│   │
│   └── admin/src/components/        👉 CAMADA LOCAL (Componentes de Negócio do Admin)
│       └── tenants/
│           └── subscriptions-table.tsx
```

---

## 📌 Regra de Decisão: Onde salvar um componente?

| Tipo de Componente | Onde fica? | Exemplos |
| :--- | :--- | :--- |
| **Primitivo / Bloco Base** (Sem regras de negócio, genérico, reutilizável em qualquer app) | **Global:** `ui/components/` | `Button`, `Input`, `Card`, `Badge`, `Avatar`, `Dialog`, `Tabs`, `Separator`, `Accordion`, `Textarea` |
| **Específico de Negócio** (Depende de regras da tela, tipos de domínio específicos ou público daquele app) | **Local do App:** `apps/{app}/src/components/` | `LoginOptionsCard`, `ReviewEvaluationForm`, `TenantMetricsChart`, `StoreSettingsDialog` |

---

## 💻 Como importar nos seus apps (`client`, `tenant`, `admin`)

Para importar qualquer componente global do Design System:

```tsx
// Exemplo em qualquer página ou componente de apps/client, apps/tenant ou apps/admin:
import { Button } from "@ui/components/button";
import { Card, CardHeader, CardTitle, CardContent } from "@ui/components/card";
import { Input } from "@ui/components/input";
import { Badge } from "@ui/components/badge";
```

Para importar componentes locais daquele próprio app:

```tsx
// Exemplo em apps/client:
import { LoginOptionsCard } from "@/components/auth/login-options-card";
```

---

## 🛠️ Como adicionar novos componentes do shadcn/ui

Todos os projetos do monorepo (`apps/client`, `apps/tenant`, `apps/admin`) estão configurados com o arquivo `components.json` apontando os aliases para `@ui/components`.

Para instalar um novo componente do shadcn (ex: `dialog` ou `dropdown-menu`):

1. Abra o terminal na raiz ou dentro da pasta do app (ex: `apps/client`):
   ```bash
   cd apps/client
   pnpm dlx shadcn@latest add dialog
   ```
2. O CLI automaticamente salvará o componente direto na pasta global:
   `ui/components/dialog.tsx`
3. O componente já fica imediatamente disponível para **todos os 3 apps** (`client`, `tenant`, `admin`) via:
   ```tsx
   import { Dialog, DialogTrigger, DialogContent } from "@ui/components/dialog";
   ```

---

## 🎨 Cores e Estilos Globais
* Todas as variáveis de tema (cores primárias, secundárias, background, raios de borda) são centralizadas em `ui/styles/globals.css`.
* Cada `tailwind.config.ts` dos apps já observa os arquivos em `../../ui/**/*.{ts,tsx}` para incluir as classes necessárias no bundle final.
