# Napkin Runbook

## Curation Rules
- Re-prioritize on every read.
- Keep recurring, high-value notes only.
- Max 10 items per category.
- Each item includes date + "Do instead".

## Execution & Validation (Highest Priority)

1. **[2026-10-10] Validação real de um app = tsc + lint + next build, todos a partir da pasta do app**
   Do instead: `cd apps/<app> && ./node_modules/.bin/tsc --noEmit && ./node_modules/.bin/next lint && ./node_modules/.bin/next build` (os binários existem em cada app depois do `pnpm install`). Em 2026-10-10 os três passaram limpos na lp-consumidor — erro de tsc agora é erro de verdade, não ruído. Mexeu em `packages/ui`? Rode `next build` também em lp-parceiros e lp-entregadores (o barrel é importado pelas três).

2. **[2026-10-10] Nunca rodar `next build` com o `next dev` da mesma app ligado (os dois escrevem a mesma `.next`)**
   Do instead: `fuser -k 3000/tcp` antes do build; depois `rm -rf .next && next build && next start --port 3000`. Derrubar servidor sempre por porta, nunca por `pkill -f` com trecho da própria linha.

3. **[2026-10-10] Verificação visual = Playwright do repo Mall-online, scripts no scratchpad**
   Do instead: `createRequire('/home/pedrochagas/Documentos/Projetos/Mall-online/node_modules/.pnpm/playwright@1.63.0/node_modules/playwright/package.json')` + `require('./index.js')`; rolar com `window.scrollTo` em passos (dispara IntersectionObserver/useScroll) e esperar ~1,2s antes do screenshot; folhas de contato montadas numa página HTML e capturadas pelo próprio Playwright (não há PIL/ImageMagick). Testar também `reducedMotion: 'reduce'` no contexto — foi assim que apareceu o erro de hidratação.

4. **[2026-10-10] Lighthouse local: `npx -y lighthouse@12.6.1` com `CHROME_PATH=~/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome`**
   Do instead: rodar contra `next start` (nunca dev), 2–3 vezes — o mobile local oscila ±15 pontos. Para LCP/TBT reais, medir com Playwright + CDP (`Emulation.setCPUThrottlingRate 4` + `Network.emulateNetworkConditions`) e PerformanceObserver de `largest-contentful-paint`/`longtask`; o Lantern infla o LCP de texto com webfont.

## Monorepo & Tooling

1. **[2026-05-05] Turbo is not installed locally — don't use `pnpm build` at root**
   Do instead: build individual apps directly (item 1 acima), or wait for CI/Vercel to handle the turbo pipeline.

2. **[2026-10-10] `pnpm add/remove` reordena as chaves do package.json**
   Do instead: depois do comando, devolver a ordem original das chaves (o lockfile não depende dela) e conferir com `pnpm install --frozen-lockfile --offline` ("Already up to date" = lockfile consistente para a CI).

3. **[2026-10-10] lp-consumidor usa Tailwind v4 CSS-first (`@theme` no globals.css), sem preset nem tailwind.config**
   Do instead: token novo vai no `@theme` da própria app; o preset `@mallevo/config-tailwind` continua só nas outras duas. `@source "../../../../packages/ui/src"` garante as classes do pacote compartilhado. Nome de variável do next/font não pode colidir com `--font-*` do tema (`--ff-*` para as fontes, `--font-*` para o tema).

4. **[2026-05-05] Workspace package symlinks only appear after `pnpm install`**
   Do instead: after any package.json change or fresh clone, run `echo "y" | pnpm install` at repo root before attempting builds.

5. **[2026-05-05] `@mallevo/ui` precisa de `transpilePackages` no next.config.ts de cada app**
   Do instead: `transpilePackages: ['@mallevo/ui', '@mallevo/brand', …]` em toda app que importe os pacotes do workspace (as três já têm).

## Domain Behavior Guardrails

1. **[2026-10-10] Armadilhas de motion (todas aconteceram na lp-consumidor)**
   Do instead: (a) whileInView/IntersectionObserver em elemento escondido por `overflow:hidden`+translate nunca dispara — observe o pai; (b) animação CSS `fill-mode: both` terminando em transform/filter anula o `style` do framer no mesmo nó — wrappers separados; (c) `filter: blur(0)` residual isola `backdrop-filter` dos filhos — terminar em `none`; (d) `useReducedMotion` do framer muda a árvore no 1º render do cliente → erro de hidratação — usar `useSafeReducedMotion` do `@mallevo/ui`; (e) `line-clamp` zera o min-height de item flex e o texto some quando falta altura; (f) `cqw` no próprio contêiner resolve contra a viewport — o recorte mora num filho.

2. **[2026-10-10] Tipografia e performance**
   Do instead: Plus Jakarta Sans tem espaço estreito (~0,18em) → `word-spacing: 0.07em` no body; réplicas do app usam `font-sistema` = Inter primeiro (pilha `-apple-system…Roboto` custava ~35% a mais de layout no Linux, onde roda o PageSpeed); título do hero entra de opacidade 0,01 (não 0) para ser o LCP; logo PNG com `unoptimized` (o otimizador somava a conversão AVIF ao LCP); seções abaixo da dobra em `<Suspense>` para a hidratação virar tarefas curtas.

3. **[2026-10-10] Telas do app na landing = réplicas em código, fiéis ao Mall-online**
   Do instead: medidas em pontos do app (390×844) dentro de `components/app/Celular` (escala por `--k`); ícones = `components/marca/ConsumerIcon` (porte 1:1 do app — nada de Lucide nem emoji); conteúdo de `src/app/dados/shopping.ts` (lojas, posts e textos do mock do consumer, peles de `store-theme/presets.ts`). Sem nota, contagem de lojas ou depoimento inventado.

4. **[2026-05-05] Each lp-* app runs on a separate port: lp-consumidor=3000, lp-parceiros=3001, lp-entregadores=3002**
   Do instead: check `package.json` scripts for the specific `--port` flag before assuming a port.

## User Directives

1. **[2026-10-10] Referência de movimento das landings = arpeggio.framer.website; cores e marca = as do produto (Mall-online)**
   Do instead: cortina, títulos revelados, texto que acende com a rolagem, cards empilhados, viradas escuro→claro com borda curva, relógio ao vivo — via primitivos de `@mallevo/ui` (motion). "Nossa landing page" = lp-consumidor (mallevo.com.br).

2. **[2026-05-05] When building landing pages, match the actual mobile app screens exactly**
   Do instead: read the screen files of the real app (mobile-consumer, mobile-courier, mobile-partner) and its docs/system-design before writing mockups. Map each section to real app functionality.
