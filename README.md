# Mallevo — Monorepo de Landing Pages

Monorepo pnpm + Turborepo com três landing pages independentes e pacotes compartilhados, cada app com deploy autônomo no Vercel.

## Apps

| App | Domínio | Porta dev |
|-----|---------|-----------|
| `lp-consumidor` | mallevo.com.br | 3000 |
| `lp-parceiros` | parceiros.mallevo.com.br | 3001 |
| `lp-entregadores` | entregadores.mallevo.com.br | 3002 |

## Pacotes compartilhados

| Pacote | Descrição |
|--------|-----------|
| `@mallevo/ui` | Componentes React reutilizáveis |
| `@mallevo/brand` | Tokens de marca (cores, fontes, logos) |
| `@mallevo/config-typescript` | Configuração base do TypeScript |
| `@mallevo/config-tailwind` | Configuração base do Tailwind CSS |

## Setup

```bash
# Instalar dependências
pnpm install

# Rodar todos os apps em modo dev
pnpm dev

# Rodar um app específico
pnpm dev:consumidor
pnpm dev:parceiros
pnpm dev:entregadores

# Build completo (todos os workspaces)
pnpm build

# Lint
pnpm lint
```

## Documentação

Veja [docs/README.md](./docs/README.md) para a documentação completa: arquitetura, deploy, guia de desenvolvimento e migração.
