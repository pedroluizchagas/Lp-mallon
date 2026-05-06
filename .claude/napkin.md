# Napkin Runbook

## Curation Rules
- Re-prioritize on every read.
- Keep recurring, high-value notes only.
- Max 10 items per category.
- Each item includes date + "Do instead".

## Execution & Validation (Highest Priority)

1. **[2026-05-05] Build requires pnpm install + correct next binary path**
   Do instead: run `echo "y" | pnpm install` at root first, then build using `/home/pedrochagas/Documentos/Projetos/lp-mallonline/node_modules/.pnpm/node_modules/.bin/next build` from the app directory (e.g. `apps/lp-entregadores`). `pnpm --filter <app> build` fails because local node_modules aren't linked until workspace install runs.

2. **[2026-05-05] `tsc --noEmit` type-check gives false errors in individual apps**
   Do instead: use `next build` for real validation. The TypeScript errors for `framer-motion`, `lucide-react`, `process`, etc. are language-server noise — they don't affect the actual build.

3. **[2026-05-05] `@mallevo/ui` needs `transpilePackages` in next.config.ts**
   Do instead: ensure `transpilePackages: ['@mallevo/ui', '@mallevo/brand', '@mallevo/config-tailwind']` is set in each app's `next.config.ts` when building standalone (not via turbo).

## Monorepo & Tooling

1. **[2026-05-05] Turbo is not installed locally — don't use `pnpm build` at root**
   Do instead: build individual apps directly using the next binary from pnpm virtual store, or wait for CI/Vercel to handle the turbo pipeline.

2. **[2026-05-05] Workspace package symlinks only appear after `pnpm install`**
   Do instead: after any package.json change or fresh clone, run `echo "y" | pnpm install` at repo root before attempting builds.

## Domain Behavior Guardrails

1. **[2026-05-05] Each lp-* app runs on a separate port: lp-entregadores=3002, others vary**
   Do instead: check `package.json` scripts for the specific `--port` flag before assuming a port.

2. **[2026-05-05] Phone mockup components in landing pages use CSS-only — no real screenshots**
   Do instead: build phone UI with Tailwind utility classes + Lucide icons; never use emojis in phone mockups.

## User Directives

1. **[2026-05-05] When building landing pages, match the actual mobile app screens exactly**
   Do instead: read all screen files in the mobile-courier app (tabs, auth, entrega) before writing mockups. Map each tab to real app functionality.
