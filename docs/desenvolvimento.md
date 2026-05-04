# Guia de Desenvolvimento

## Pré-requisitos

| Ferramenta | Versão mínima | Verificar |
|------------|---------------|-----------|
| Node.js | 20.x | `node -v` |
| pnpm | 9.x | `pnpm -v` |
| Git | qualquer | `git -v` |

Instale o pnpm globalmente caso não tenha:

```bash
npm install -g pnpm@9
```

---

## Setup Inicial

```bash
# 1. Clone o repositório
git clone https://github.com/pedroluizchagas/lp-mallon.git
cd lp-mallon

# 2. Instale todas as dependências (todos os workspaces)
pnpm install

# 3. Build dos pacotes compartilhados (necessário na primeira vez)
pnpm build:packages
```

---

## Rodando em Desenvolvimento

Cada app roda em uma porta diferente para que todos possam ser iniciados simultaneamente.

| App | Porta | URL local |
|-----|-------|-----------|
| `lp-consumidor` | 3000 | http://localhost:3000 |
| `lp-parceiros` | 3001 | http://localhost:3001 |
| `lp-entregadores` | 3002 | http://localhost:3002 |

### Rodar todos de uma vez

```bash
pnpm dev
```

### Rodar apenas um app

```bash
pnpm dev:consumidor
pnpm dev:parceiros
pnpm dev:entregadores
```

### Rodar apenas os pacotes compartilhados em watch mode

```bash
pnpm dev:packages
```

---

## Scripts Disponíveis

### Root (executados na raiz do projeto)

```bash
# Desenvolvimento
pnpm dev                    # Todos os apps em paralelo
pnpm dev:consumidor         # Apenas lp-consumidor
pnpm dev:parceiros          # Apenas lp-parceiros
pnpm dev:entregadores       # Apenas lp-entregadores
pnpm dev:packages           # Pacotes em watch mode

# Build
pnpm build                  # Build completo (pacotes + apps)
pnpm build:packages         # Apenas pacotes compartilhados
pnpm build:consumidor       # Apenas lp-consumidor
pnpm build:parceiros        # Apenas lp-parceiros
pnpm build:entregadores     # Apenas lp-entregadores

# Qualidade
pnpm lint                   # ESLint em todos os workspaces
pnpm lint:fix               # ESLint com auto-fix
pnpm type-check             # TypeScript sem emit em todos os workspaces

# Limpeza
pnpm clean                  # Remove todos os .next e dist
```

### Por workspace (executados dentro de cada pasta)

```bash
# Dentro de apps/lp-consumidor (ou qualquer app)
pnpm dev           # next dev
pnpm build         # next build
pnpm start         # next start
pnpm lint          # next lint

# Dentro de packages/ui
pnpm build         # tsc --build
pnpm dev           # tsc --watch
```

---

## Estrutura de um App

```
apps/lp-consumidor/
├── public/
│   └── images/             # Imagens estáticas do app
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Layout raiz com metadados SEO
│   │   ├── page.tsx        # Página principal
│   │   └── globals.css     # Estilos globais + variáveis CSS
│   ├── components/
│   │   └── sections/       # Seções específicas deste app
│   └── lib/
│       └── utils.ts        # Utilitários locais
├── next.config.ts
├── tailwind.config.ts      # Extends @mallevo/config-tailwind
├── tsconfig.json           # Extends @mallevo/config-typescript
└── package.json
```

---

## Estrutura de um Pacote

```
packages/ui/
├── src/
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── index.ts        # Re-exports
│   └── index.ts            # Entry point principal
├── tsconfig.json
└── package.json
```

---

## Criando um Novo Componente Compartilhado

Componentes que são usados em mais de um app devem ficar em `packages/ui`.

```bash
# 1. Crie o arquivo do componente
touch packages/ui/src/components/MeuComponente.tsx

# 2. Exporte no index do diretório
# Em packages/ui/src/components/index.ts
export { MeuComponente } from './MeuComponente'

# 3. Garanta que está no entry point principal
# Em packages/ui/src/index.ts
export * from './components'

# 4. Rebuild o pacote
pnpm --filter @mallevo/ui build

# 5. Use no app
# import { MeuComponente } from '@mallevo/ui'
```

---

## Criando uma Nova Seção em um App

Seções específicas de um app ficam dentro de `apps/[app]/src/components/sections/`.

```tsx
// apps/lp-parceiros/src/components/sections/NovaSec.tsx
'use client'

import { AnimatedSection } from '@mallevo/ui'

export function NovaSec() {
  return (
    <section className="py-24 bg-surface">
      <AnimatedSection>
        <h2>Nova Seção</h2>
      </AnimatedSection>
    </section>
  )
}
```

---

## Variáveis de Ambiente

Cada app tem seu próprio arquivo `.env.local` (não commitado).

```bash
# apps/lp-consumidor/.env.local
NEXT_PUBLIC_APP_URL=https://app.mallevo.com.br
NEXT_PUBLIC_SITE_URL=https://mallevo.com.br

# apps/lp-parceiros/.env.local
NEXT_PUBLIC_APP_URL=https://app.mallevo.com.br
NEXT_PUBLIC_SITE_URL=https://parceiros.mallevo.com.br
NEXT_PUBLIC_CADASTRO_URL=https://app.mallevo.com.br/cadastro

# apps/lp-entregadores/.env.local
NEXT_PUBLIC_APP_URL=https://app.mallevo.com.br
NEXT_PUBLIC_SITE_URL=https://entregadores.mallevo.com.br
NEXT_PUBLIC_CADASTRO_URL=https://app.mallevo.com.br/entregador/cadastro
```

Copie os exemplos para iniciar:

```bash
cp apps/lp-consumidor/.env.example apps/lp-consumidor/.env.local
cp apps/lp-parceiros/.env.example apps/lp-parceiros/.env.local
cp apps/lp-entregadores/.env.example apps/lp-entregadores/.env.local
```

---

## Fluxo de Trabalho com Git

### Branches

```
main                          # Produção (protegida)
└── develop                   # Integração
    ├── feat/[app]-[feature]  # Features
    ├── fix/[app]-[bug]       # Correções
    └── chore/[tarefa]        # Manutenção
```

### Exemplos de branches

```bash
git checkout -b feat/parceiros-secao-planos
git checkout -b fix/consumidor-hero-mobile
git checkout -b chore/atualizar-dependencias
```

### Commits

Use commits semânticos:

```bash
git commit -m "feat(parceiros): adiciona seção de planos com toggle anual/mensal"
git commit -m "fix(ui): corrige alinhamento do Button no mobile"
git commit -m "chore: atualiza tailwindcss para 4.1"
git commit -m "docs: adiciona guia de desenvolvimento"
```

### Prefixos

| Prefixo | Quando usar |
|---------|-------------|
| `feat` | Nova funcionalidade |
| `fix` | Correção de bug |
| `chore` | Manutenção, deps, configs |
| `docs` | Apenas documentação |
| `refactor` | Refatoração sem mudança funcional |
| `style` | Ajustes de estilo/CSS |
| `perf` | Melhoria de performance |

---

## Adicionando Dependências

### Para um app específico

```bash
pnpm --filter lp-consumidor add framer-motion
pnpm --filter lp-parceiros add some-package
```

### Para um pacote compartilhado

```bash
pnpm --filter @mallevo/ui add clsx
```

### Para todos (dependência de dev na raiz)

```bash
pnpm add -D -w prettier
```

---

## Linting e Formatação

O projeto usa ESLint com config do Next.js. Execute antes de commitar:

```bash
pnpm lint       # Verifica
pnpm lint:fix   # Auto-corrige o que for possível
```

Para verificação de tipos:

```bash
pnpm type-check
```

---

## Performance e Boas Práticas

### Imagens

Use sempre o componente `Image` do Next.js:

```tsx
import Image from 'next/image'

<Image
  src="/images/hero/bg-hero.png"
  alt="Descrição acessível"
  width={1200}
  height={600}
  priority  // Apenas para imagens above-the-fold
/>
```

### Fontes

As fontes já estão configuradas no layout raiz de cada app via `next/font`. Não importe fontes manualmente via `<link>`.

### Animações

Use `AnimatedSection` do `@mallevo/ui` para animações de entrada. Evite criar novas instâncias de `motion.div` fora do pacote de UI sem necessidade.

### Client vs Server Components

- Por padrão, todos os componentes são **Server Components** (sem `'use client'`)
- Adicione `'use client'` apenas quando usar: hooks, event handlers, estado local, animações Framer Motion
- Mantenha a diretiva o mais "abaixo" possível na árvore de componentes
