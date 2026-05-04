# Plano de Migração

Guia passo a passo para migrar do projeto único (`apps/landing`) para o monorepo com 3 apps separados.

## Resumo da Migração

```
ANTES                          DEPOIS
─────────────────────────      ─────────────────────────────────────
apps/                          apps/
  landing/                       lp-consumidor/
    src/app/consumidor/            (conteúdo migrado)
    src/app/lojista/             lp-parceiros/
    src/components/                (conteúdo migrado)
    src/components/consumidor/   lp-entregadores/
                                   (novo app criado)

                               packages/
                                 ui/           (componentes extraídos)
                                 config-tailwind/
                                 config-typescript/
                                 brand/
```

---

## Fase 0 — Preparação (1-2h)

### 0.1 Criar a branch de migração

```bash
git checkout -b feat/monorepo-migration
```

### 0.2 Instalar Turborepo

```bash
pnpm add -D -w turbo
```

### 0.3 Criar `turbo.json` na raiz

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {},
    "type-check": {}
  }
}
```

### 0.4 Atualizar `pnpm-workspace.yaml`

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

---

## Fase 1 — Criar Pacotes Compartilhados (2-3h)

### 1.1 Pacote de configuração TypeScript

```bash
mkdir -p packages/config-typescript
```

**`packages/config-typescript/package.json`:**
```json
{
  "name": "@mallevo/config-typescript",
  "version": "0.0.1",
  "private": true,
  "files": ["tsconfig.base.json", "tsconfig.nextjs.json"]
}
```

**`packages/config-typescript/tsconfig.base.json`:**
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true
  },
  "exclude": ["node_modules"]
}
```

**`packages/config-typescript/tsconfig.nextjs.json`:**
```json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "plugins": [{ "name": "next" }]
  }
}
```

### 1.2 Pacote de configuração Tailwind

```bash
mkdir -p packages/config-tailwind
```

**`packages/config-tailwind/package.json`:**
```json
{
  "name": "@mallevo/config-tailwind",
  "version": "0.0.1",
  "private": true,
  "main": "./index.ts",
  "files": ["index.ts"]
}
```

**`packages/config-tailwind/index.ts`:**
Extrair o conteúdo do `tailwind.config.ts` atual do `apps/landing` e transformar em preset exportável.

### 1.3 Pacote de brand/tokens

```bash
mkdir -p packages/brand/src
```

**`packages/brand/package.json`:**
```json
{
  "name": "@mallevo/brand",
  "version": "0.0.1",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts"
}
```

Criar `packages/brand/src/index.ts` com:
- Cores em hex e CSS variable
- URLs de assets (logos)
- Metadados SEO por app
- URLs de cadastro (app.mallevo.com.br/...)

### 1.4 Pacote de UI compartilhada

```bash
mkdir -p packages/ui/src/components
```

**`packages/ui/package.json`:**
```json
{
  "name": "@mallevo/ui",
  "version": "0.0.1",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "peerDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "dependencies": {
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.438.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.3.0"
  }
}
```

Mover para `packages/ui/src/components/`:
- `Button.tsx` (de `apps/landing/src/components/ui/`)
- `Card.tsx`
- `Badge.tsx`
- `AnimatedSection.tsx`
- `Navbar.tsx` (de `apps/landing/src/components/layout/`)
- `Footer.tsx`
- `utils.ts` → `packages/ui/src/lib/utils.ts`

---

## Fase 2 — Criar os Novos Apps (3-4h)

### 2.1 App `lp-consumidor`

```bash
# Copiar o app atual como base
cp -r apps/landing apps/lp-consumidor

# Renomear no package.json
# "name": "lp-consumidor"
```

**Ajustes necessários:**

1. Mover conteúdo de `src/app/consumidor/` para `src/app/`
2. Remover `src/app/lojista/` (não pertence a este app)
3. Mover `src/components/consumidor/` para `src/components/sections/`
4. Substituir imports locais de `ui/`, `layout/` por `@mallevo/ui`
5. Atualizar `tsconfig.json` para extends `@mallevo/config-typescript`
6. Atualizar `tailwind.config.ts` para usar preset `@mallevo/config-tailwind`
7. Atualizar `package.json` para adicionar `@mallevo/ui` como dependência
8. Atualizar metadados SEO no `layout.tsx`
9. Criar `.env.example` com as variáveis necessárias
10. Criar `vercel.json` com headers de segurança

### 2.2 App `lp-parceiros`

```bash
mkdir -p apps/lp-parceiros/src/app
mkdir -p apps/lp-parceiros/src/components/sections
mkdir -p apps/lp-parceiros/public/images
```

**Estrutura base:**

1. Criar `package.json` com `"name": "lp-parceiros"`
2. Criar `next.config.ts`, `tsconfig.json`, `tailwind.config.ts`
3. Criar `src/app/layout.tsx` com metadados SEO para parceiros
4. Migrar `src/app/lojista/page.tsx` → `src/app/page.tsx`
5. Migrar seções de lojista: `Hero`, `ComoFunciona`, `DiferenciaisLojista`, `Planos`, `Depoimentos`, `Faq`, `CtaFinal`
6. Importar componentes compartilhados de `@mallevo/ui`
7. Criar `.env.example` e `vercel.json`

### 2.3 App `lp-entregadores`

```bash
mkdir -p apps/lp-entregadores/src/app
mkdir -p apps/lp-entregadores/src/components/sections
mkdir -p apps/lp-entregadores/public/images
```

**Conteúdo a criar (app novo):**

1. Criar `package.json`, `next.config.ts`, `tsconfig.json`, `tailwind.config.ts`
2. Criar `src/app/layout.tsx` com metadados SEO para entregadores
3. Criar seções específicas:
   - `EntregadorHero` — headline focada em renda e liberdade
   - `EntregadorBeneficios` — card grid com benefícios
   - `EntregadorComoFunciona` — 3 passos simples
   - `EntregadorGanhos` — simulador de ganhos ou tabela
   - `EntregadorFaq` — perguntas frequentes
   - `EntregadorCta` — CTA final para cadastro
4. Criar `.env.example` e `vercel.json`

---

## Fase 3 — Atualizar Root Package (30min)

### 3.1 Atualizar `package.json` raiz

```json
{
  "scripts": {
    "dev": "turbo dev",
    "dev:consumidor": "turbo dev --filter=lp-consumidor",
    "dev:parceiros": "turbo dev --filter=lp-parceiros",
    "dev:entregadores": "turbo dev --filter=lp-entregadores",
    "dev:packages": "turbo dev --filter=./packages/*",
    "build": "turbo build",
    "build:consumidor": "turbo build --filter=lp-consumidor",
    "build:parceiros": "turbo build --filter=lp-parceiros",
    "build:entregadores": "turbo build --filter=lp-entregadores",
    "build:packages": "turbo build --filter=./packages/*",
    "lint": "turbo lint",
    "type-check": "turbo type-check",
    "clean": "turbo clean && rm -rf node_modules"
  }
}
```

### 3.2 Remover o `vercel.json` raiz atual

O arquivo raiz `vercel.json` que aponta para `apps/landing` deve ser removido. Cada app terá seu próprio `vercel.json`.

---

## Fase 4 — Testes e Validação (1-2h)

### 4.1 Testar build local

```bash
# Build de todos os pacotes
pnpm build:packages

# Build de cada app
pnpm build:consumidor
pnpm build:parceiros
pnpm build:entregadores
```

### 4.2 Testar em desenvolvimento

```bash
# Rodar todos os apps
pnpm dev

# Verificar:
# http://localhost:3000 → consumidor
# http://localhost:3001 → parceiros
# http://localhost:3002 → entregadores
```

### 4.3 Checklist de validação

- [ ] Todos os 3 apps fazem build sem erros TypeScript
- [ ] Nenhum import quebrado (sem módulos não encontrados)
- [ ] Assets (imagens, logos) carregam corretamente em cada app
- [ ] Animações Framer Motion funcionando
- [ ] Mobile responsivo (375px)
- [ ] Links de CTA apontam para URLs corretas via env vars
- [ ] Metadados SEO corretos por app (title, description, OG)
- [ ] Nenhuma referência ao app antigo (`apps/landing`)

---

## Fase 5 — Deploy e DNS (1h)

1. Fazer push da branch de migração
2. Criar os 3 projetos no Vercel (ver [deploy.md](./deploy.md))
3. Validar que cada URL `.vercel.app` funciona
4. Configurar os domínios customizados
5. Aguardar propagação DNS
6. Testar os domínios finais

---

## Fase 6 — Limpeza Final (30min)

Após validar tudo em produção:

```bash
# Remover o app antigo
rm -rf apps/landing

# Commit de limpeza
git commit -m "chore: remove apps/landing após migração completa"
```

---

## Riscos e Mitigações

| Risco | Mitigação |
|-------|-----------|
| SEO: URLs antigas indexed | Manter redirect 301 de `/consumidor` → `mallevo.com.br` |
| Quebra de links externos | Auditar backlinks antes de remover rotas antigas |
| Componentes com coupling implícito | Testar build de cada app isoladamente antes do merge |
| Perda de analytics histórico | Configurar novo projeto GA/Vercel Analytics antes do cutover |
| DNS downtime | Fazer cutover DNS fora do horário de pico |

---

## Estimativa de Tempo Total

| Fase | Estimativa |
|------|-----------|
| 0 — Preparação | 1-2h |
| 1 — Pacotes compartilhados | 2-3h |
| 2 — Novos apps | 3-4h |
| 3 — Root package | 30min |
| 4 — Testes | 1-2h |
| 5 — Deploy e DNS | 1h |
| 6 — Limpeza | 30min |
| **Total** | **~10-13h** |
