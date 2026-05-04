# Arquitetura do Projeto

## Contexto e Motivação

O projeto nasceu como uma única landing page servindo três públicos em rotas diferentes (`/consumidor`, `/lojista`, `/entregador`). Com a criação de subdomínios específicos para cada público, surgiu a necessidade de deployments independentes, o que exige apps separados no Vercel.

A migração é uma oportunidade de profissionalizar a arquitetura com um **monorepo estruturado**, compartilhando código entre os três apps sem duplicação.

---

## Estrutura do Monorepo

```
Lp-mallon/
├── apps/
│   ├── lp-consumidor/          # mallevo.com.br
│   ├── lp-parceiros/           # parceiros.mallevo.com.br
│   └── lp-entregadores/        # entregadores.mallevo.com.br
│
├── packages/
│   ├── ui/                     # @mallevo/ui — componentes compartilhados
│   ├── config-tailwind/        # @mallevo/config-tailwind — preset Tailwind
│   ├── config-typescript/      # @mallevo/config-typescript — tsconfig base
│   └── brand/                  # @mallevo/brand — tokens, cores, assets
│
├── docs/                       # Documentação do projeto
├── turbo.json                  # Pipeline de build (Turborepo)
├── pnpm-workspace.yaml         # Definição dos workspaces
└── package.json                # Root package (scripts globais)
```

---

## Apps

### `apps/lp-consumidor`

Landing page principal da plataforma, voltada ao usuário final que realiza pedidos.

- **Domínio:** `mallevo.com.br`
- **Tom:** dark mode, premium, dinâmico (animações agressivas)
- **Objetivo:** conversão para download do app / cadastro
- **Seções:** Hero, Marquee, ScrollText, ComoFunciona, Categorias, App, Depoimentos, CTA

### `apps/lp-parceiros`

Landing page para lojistas interessados em cadastrar seus estabelecimentos.

- **Domínio:** `parceiros.mallevo.com.br`
- **Tom:** light mode, profissional, focado em negócios
- **Objetivo:** conversão para cadastro de loja
- **Seções:** Hero, ComoFunciona, Diferenciais, Planos, FAQ, CTA

### `apps/lp-entregadores`

Landing page para pessoas interessadas em trabalhar como entregadores parceiros.

- **Domínio:** `entregadores.mallevo.com.br`
- **Tom:** energético, direto, focado em renda e liberdade
- **Objetivo:** conversão para cadastro de entregador
- **Seções:** Hero, Benefícios, ComoFunciona, Ganhos, FAQ, CTA

---

## Pacotes Compartilhados

### `packages/ui` — `@mallevo/ui`

Biblioteca de componentes React compartilhados entre os três apps.

**Componentes incluídos:**
- `Button` — 4 variantes (primary, secondary, outline, ghost)
- `Card` — com suporte a hover e highlight
- `Badge` — 4 variantes (lime, green, outline, dark)
- `AnimatedSection` — wrapper Framer Motion com `HeadingReveal`, `LabelReveal`, `StaggerItem`
- `Navbar` — barra de navegação responsiva com drawer mobile
- `Footer` — rodapé com links e redes sociais

### `packages/config-tailwind` — `@mallevo/config-tailwind`

Preset Tailwind CSS com todos os tokens visuais da marca:

- Paleta de cores customizada (lime, dark, surface, ink)
- Fontes (Plus Jakarta Sans, Inter)
- Animações customizadas (fade-in-up, marquee, float, pulse-slow)
- Breakpoints customizados (`xs: 375px`)

### `packages/config-typescript` — `@mallevo/config-typescript`

Configurações TypeScript base que os apps estendem:

- `tsconfig.base.json` — configuração padrão strict
- `tsconfig.nextjs.json` — extends base com ajustes Next.js

### `packages/brand` — `@mallevo/brand`

Tokens de design e assets centralizados:

- Constantes de cores (hexadecimais e CSS variables)
- Tipografia e escala de tamanhos
- URLs de assets (logos, ícones)
- Metadados de SEO por app (título, descrição, OG)

---

## Fluxo de Build (Turborepo)

```
turbo build
    │
    ├── packages/config-typescript  (sem deps)
    ├── packages/config-tailwind    (sem deps)
    ├── packages/brand              (sem deps)
    │
    └── packages/ui                 (depende dos configs)
            │
            ├── apps/lp-consumidor  (depende de ui + configs)
            ├── apps/lp-parceiros   (depende de ui + configs)
            └── apps/lp-entregadores (depende de ui + configs)
```

O Turborepo cacheia os builds intermediários: se `packages/ui` não mudou, os apps não recompilam o pacote.

---

## Decisões de Arquitetura

### Por que monorepo?

- **DRY:** componentes, tokens e configs existem em um único lugar
- **Consistência visual:** todos os apps consomem o mesmo `@mallevo/ui`
- **Refactoring seguro:** mudar um componente atualiza os 3 apps ao mesmo tempo
- **CI/CD otimizado:** Turborepo só reconstrói o que mudou

### Por que Next.js para landing pages?

- SSG (Static Site Generation) para máxima performance e SEO
- `export` estático opcional para deploy em CDN puro
- App Router facilita layouts por app
- Suporte nativo a image optimization e font optimization

### Por que 3 projetos Vercel separados?

- Cada subdomínio precisa de seu próprio projeto Vercel para custom domains
- Deployments independentes: atualizar a LP de parceiros não requer redeploy das outras
- Preview deployments por feature branch em cada app separadamente
- Analytics e métricas de conversão separadas por público

### Estratégia de renderização

Todas as páginas são renderizadas como **Static Site Generation (SSG)** com `output: 'export'` no `next.config.ts`. Isso garante:

- Tempo de carregamento < 1s (conteúdo servido direto da CDN Vercel)
- Score Lighthouse > 95
- Sem custo de servidor (apenas CDN)
- SEO máximo (HTML completo no primeiro byte)

---

## Diagrama de Domínios

```
mallevo.com.br
    └── Vercel Project: mallevo-lp-consumidor
            └── apps/lp-consumidor

parceiros.mallevo.com.br
    └── Vercel Project: mallevo-lp-parceiros
            └── apps/lp-parceiros

entregadores.mallevo.com.br
    └── Vercel Project: mallevo-lp-entregadores
            └── apps/lp-entregadores
```

---

## Convenções de Nomeação

| Caminho | Convenção |
|---------|-----------|
| Componentes | `PascalCase.tsx` |
| Hooks | `useNomeDoHook.ts` |
| Utilitários | `camelCase.ts` |
| CSS/Estilos | `kebab-case` (classes Tailwind) |
| Arquivos de configuração | `kebab-case.config.ts` |
| Diretórios | `kebab-case` |
