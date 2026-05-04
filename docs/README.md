# Mallevo — Documentação do Projeto

Repositório monorepo das landing pages da plataforma Mallevo (Divinópolis, MG).

## Índice de Documentação

| Documento | Descrição |
|-----------|-----------|
| [Arquitetura](./arquitetura.md) | Visão geral da estrutura do monorepo, decisões técnicas e fluxo de dados |
| [Desenvolvimento](./desenvolvimento.md) | Guia de setup local, scripts, convenções de código e fluxo de trabalho |
| [Deploy](./deploy.md) | Configuração dos 3 projetos Vercel, subdomínios e variáveis de ambiente |
| [Migração](./migracao.md) | Plano passo a passo para migrar do projeto único para 3 apps separados |
| [Componentes Compartilhados](./componentes-compartilhados.md) | Documentação do pacote `@mallevo/ui` e tokens de design |
| [Brand & Design](./brand.md) | Paleta de cores, tipografia, assets e guidelines visuais |

---

## Visão Geral do Projeto

Mallevo é o shopping digital de Divinópolis. A plataforma conecta três públicos distintos, cada um com sua própria landing page e subdomínio:

| Público | Domínio | App |
|---------|---------|-----|
| Consumidores | `mallevo.com.br` | `apps/lp-consumidor` |
| Parceiros (lojistas) | `parceiros.mallevo.com.br` | `apps/lp-parceiros` |
| Entregadores | `entregadores.mallevo.com.br` | `apps/lp-entregadores` |

## Stack Tecnológica

- **Framework:** Next.js 15 (App Router)
- **Runtime:** React 19
- **Linguagem:** TypeScript 5 (strict mode)
- **Estilos:** Tailwind CSS 4
- **Animações:** Framer Motion 11
- **Gerenciador de pacotes:** pnpm 9 (workspaces)
- **Build:** Turborepo
- **Deploy:** Vercel (3 projetos separados)

## Links Rápidos

- Plataforma: [app.mallevo.com.br](https://app.mallevo.com.br)
- Cadastro lojista: [app.mallevo.com.br/cadastro](https://app.mallevo.com.br/cadastro)
- Cadastro entregador: [app.mallevo.com.br/entregador/cadastro](https://app.mallevo.com.br/entregador/cadastro)
