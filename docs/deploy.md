# Guia de Deploy

## Visão Geral

O projeto usa **3 projetos Vercel separados**, cada um com seu próprio domínio customizado. Todos os projetos apontam para o mesmo repositório GitHub, mas com comandos de build distintos.

```
Repositório GitHub: pedroluizchagas/lp-mallon
    │
    ├── Vercel Project: mallevo-lp-consumidor
    │       └── Build: pnpm --filter lp-consumidor build
    │       └── Domínio: mallevo.com.br
    │
    ├── Vercel Project: mallevo-lp-parceiros
    │       └── Build: pnpm --filter lp-parceiros build
    │       └── Domínio: parceiros.mallevo.com.br
    │
    └── Vercel Project: mallevo-lp-entregadores
            └── Build: pnpm --filter lp-entregadores build
            └── Domínio: entregadores.mallevo.com.br
```

---

## Criando os Projetos no Vercel

### Projeto 1 — LP Consumidor

1. Acesse [vercel.com/new](https://vercel.com/new) e importe o repositório `pedroluizchagas/lp-mallon`
2. Configure o projeto:
   - **Project Name:** `mallevo-lp-consumidor`
   - **Framework Preset:** Next.js
   - **Root Directory:** *(deixar em branco — é o root do repo)*
3. Em **Build & Output Settings**, expanda e configure:
   - **Build Command:** `pnpm --filter lp-consumidor build`
   - **Output Directory:** `apps/lp-consumidor/.next`
   - **Install Command:** `pnpm install --frozen-lockfile=false`
4. Adicione as **Environment Variables** (ver seção abaixo)
5. Clique em **Deploy**

### Projeto 2 — LP Parceiros

1. Acesse [vercel.com/new](https://vercel.com/new) e importe o **mesmo repositório**
2. Configure o projeto:
   - **Project Name:** `mallevo-lp-parceiros`
   - **Framework Preset:** Next.js
   - **Root Directory:** *(deixar em branco)*
3. **Build & Output Settings:**
   - **Build Command:** `pnpm --filter lp-parceiros build`
   - **Output Directory:** `apps/lp-parceiros/.next`
   - **Install Command:** `pnpm install --frozen-lockfile=false`
4. Adicione as **Environment Variables**
5. Clique em **Deploy**

### Projeto 3 — LP Entregadores

1. Acesse [vercel.com/new](https://vercel.com/new) e importe o **mesmo repositório**
2. Configure o projeto:
   - **Project Name:** `mallevo-lp-entregadores`
   - **Framework Preset:** Next.js
   - **Root Directory:** *(deixar em branco)*
3. **Build & Output Settings:**
   - **Build Command:** `pnpm --filter lp-entregadores build`
   - **Output Directory:** `apps/lp-entregadores/.next`
   - **Install Command:** `pnpm install --frozen-lockfile=false`
4. Adicione as **Environment Variables**
5. Clique em **Deploy**

---

## Configuração de Domínios

### Adicionando domínios customizados

Em cada projeto Vercel, vá em **Settings → Domains** e adicione:

| Projeto | Domínio principal | Redirect |
|---------|------------------|---------|
| `mallevo-lp-consumidor` | `mallevo.com.br` | `www.mallevo.com.br → mallevo.com.br` |
| `mallevo-lp-parceiros` | `parceiros.mallevo.com.br` | — |
| `mallevo-lp-entregadores` | `entregadores.mallevo.com.br` | — |

### Configuração DNS

Adicione os registros abaixo no painel do seu registrador de domínio:

```
# LP Consumidor (domínio raiz)
Type: A
Name: @
Value: 76.76.21.21   (IP do Vercel)

Type: CNAME
Name: www
Value: cname.vercel-dns.com

# LP Parceiros (subdomínio)
Type: CNAME
Name: parceiros
Value: cname.vercel-dns.com

# LP Entregadores (subdomínio)
Type: CNAME
Name: entregadores
Value: cname.vercel-dns.com
```

> **Nota:** O IP do Vercel pode variar. Use sempre o valor indicado no painel do Vercel após adicionar o domínio, pois eles fornecem os registros exatos para seu projeto.

---

## Variáveis de Ambiente por Projeto

Configure estas variáveis em **Settings → Environment Variables** de cada projeto Vercel. Marque todos os ambientes: Production, Preview e Development.

### `mallevo-lp-consumidor`

```env
NEXT_PUBLIC_SITE_URL=https://mallevo.com.br
NEXT_PUBLIC_APP_URL=https://app.mallevo.com.br
NEXT_PUBLIC_PARCEIROS_URL=https://parceiros.mallevo.com.br
NEXT_PUBLIC_ENTREGADORES_URL=https://entregadores.mallevo.com.br
```

### `mallevo-lp-parceiros`

```env
NEXT_PUBLIC_SITE_URL=https://parceiros.mallevo.com.br
NEXT_PUBLIC_APP_URL=https://app.mallevo.com.br
NEXT_PUBLIC_CADASTRO_URL=https://app.mallevo.com.br/cadastro
NEXT_PUBLIC_CONSUMIDOR_URL=https://mallevo.com.br
NEXT_PUBLIC_ENTREGADORES_URL=https://entregadores.mallevo.com.br
```

### `mallevo-lp-entregadores`

```env
NEXT_PUBLIC_SITE_URL=https://entregadores.mallevo.com.br
NEXT_PUBLIC_APP_URL=https://app.mallevo.com.br
NEXT_PUBLIC_CADASTRO_URL=https://app.mallevo.com.br/entregador/cadastro
NEXT_PUBLIC_CONSUMIDOR_URL=https://mallevo.com.br
NEXT_PUBLIC_PARCEIROS_URL=https://parceiros.mallevo.com.br
```

---

## `vercel.json` por App

Cada app tem seu próprio `vercel.json` que configura headers de segurança e cache.

### `apps/lp-consumidor/vercel.json`

```json
{
  "framework": "nextjs",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    },
    {
      "source": "/images/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

O mesmo padrão se aplica para `lp-parceiros` e `lp-entregadores`.

---

## Fluxo de Deploy Automático

Com o Vercel conectado ao GitHub, os deploys acontecem automaticamente:

```
Push para main
    └── Vercel detecta mudança
        ├── Reconstrói apenas projetos afetados (via Ignored Build Step)
        ├── Roda pnpm install + build do app específico
        └── Publica na produção

Push para qualquer branch
    └── Vercel cria Preview Deployment
        └── URL única: [branch]-mallevo-lp-consumidor.vercel.app
```

### Ignored Build Step (otimização)

Para que cada projeto Vercel só faça build quando arquivos relevantes mudam, configure o **Ignored Build Step** em **Settings → Git**:

#### Para `mallevo-lp-consumidor`:
```bash
#!/bin/bash
# Só reconstrói se mudou apps/lp-consumidor ou packages/
git diff HEAD^ HEAD --quiet -- apps/lp-consumidor/ packages/ && exit 0 || exit 1
```

#### Para `mallevo-lp-parceiros`:
```bash
#!/bin/bash
git diff HEAD^ HEAD --quiet -- apps/lp-parceiros/ packages/ && exit 0 || exit 1
```

#### Para `mallevo-lp-entregadores`:
```bash
#!/bin/bash
git diff HEAD^ HEAD --quiet -- apps/lp-entregadores/ packages/ && exit 0 || exit 1
```

> Configure em **Project Settings → Git → Ignored Build Step** no painel Vercel.

---

## Checklist de Deploy

### Antes do primeiro deploy

- [ ] Projeto criado no Vercel com nome correto
- [ ] Build command configurado corretamente
- [ ] Output directory configurado
- [ ] Variáveis de ambiente adicionadas
- [ ] Deploy inicial bem-sucedido (URL `.vercel.app` funcionando)

### Configuração de domínio

- [ ] Domínio adicionado no Vercel
- [ ] Registros DNS configurados no registrador
- [ ] Propagação DNS concluída (pode levar até 24h)
- [ ] HTTPS funcionando (automático via Vercel)
- [ ] Redirect www → root configurado (para consumidor)

### Pós-deploy

- [ ] Verificar que a página abre corretamente
- [ ] Testar todos os links e CTAs
- [ ] Verificar metadados SEO (title, description, OG)
- [ ] Testar no mobile (Chrome DevTools)
- [ ] Checar console por erros JavaScript
- [ ] Rodar Lighthouse e verificar score > 90

---

## Deploy Manual (emergência)

Se precisar fazer um deploy manualmente sem push ao GitHub:

```bash
# Instale o Vercel CLI
npm i -g vercel

# Deploy do lp-consumidor
cd apps/lp-consumidor
vercel --prod

# Deploy do lp-parceiros
cd apps/lp-parceiros
vercel --prod

# Deploy do lp-entregadores
cd apps/lp-entregadores
vercel --prod
```

---

## Rollback

Para reverter um deploy problemático:

1. Acesse o projeto no Vercel
2. Vá em **Deployments**
3. Encontre o último deploy estável
4. Clique em **...** → **Promote to Production**

O rollback é instantâneo (troca o alias de produção sem rebuild).
