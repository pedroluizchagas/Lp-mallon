# 30 — Prompt: Landing Page da Mallora

### Plataforma Delivery Divinópolis

*Versão 1.0 — 09/04/2026*

-----

## CONTEXTO DO PROJETO

Você está trabalhando no **Mallora**, uma plataforma regional de delivery e marketplace
multi-tenant com sede em Divinópolis, MG. O projeto é um monorepo gerenciado com
**pnpm workspaces + Turborepo** com a seguinte estrutura de apps:

```
apps/
  web/              ← Dashboard do Lojista (Next.js 14 — já existe)
  admin/            ← Painel Super Admin (Next.js 14 — já existe)
  mobile-consumer/  ← App Consumidor (Expo SDK 54 — já existe)
  mobile-courier/   ← App Entregador (Expo SDK 54 — já existe)
  landing/          ← Landing Page (Next.js 15 — CRIAR AGORA)
```

-----

## TAREFA

Criar a landing page da Mallora como um **novo app Next.js 15** no monorepo,
em `apps/landing/`, com foco em converter **lojistas locais** de Divinópolis
a se cadastrarem na plataforma.

A landing page também deve apresentar a plataforma para **consumidores** (baixar o app)
e **entregadores** (se cadastrar como entregador).

-----

## IDENTIDADE VISUAL

### Nome e Slogan
- **Nome:** Mallora
- **Tagline principal:** "O shopping digital de Divinópolis."
- **Tagline para lojistas:** "Venda online sem pagar comissão absurda."
- **Tagline para entregadores:** "Ganhe dinheiro no seu tempo."

### Paleta de Cores — "Verde Minas"
```css
--verde-profundo: #1A4D3A    /* Primária: headers, botões principais, navbar */
--verde-medio: #4CAF82       /* Accent: badges, ícones, destaques positivos */
--ambar: #F5A623             /* CTA: botões de conversão, alertas, destaques */
--creme: #FFF8ED             /* Background geral da página */
--creme-escuro: #FDF0DC      /* Background de seções alternadas */
--texto-escuro: #1A1A1A      /* Textos principais */
--texto-medio: #4A4A4A       /* Textos secundários */
--texto-claro: #717171       /* Textos de apoio, labels */
--branco: #FFFFFF            /* Superfícies de cards */
```

### Tipografia
- **Fonte de título:** `Sora` (Google Fonts) — peso 600 e 700
- **Fonte de corpo:** `Inter` (Google Fonts) — peso 400 e 500
- **Tamanhos:**
  - H1: 3.5rem (56px) desktop / 2.25rem (36px) mobile
  - H2: 2.25rem (36px) desktop / 1.75rem (28px) mobile
  - H3: 1.5rem (24px)
  - Body: 1rem (16px)
  - Small: 0.875rem (14px)

### Logo (SVG inline — provisório)
Usar texto "Mallora" estilizado com:
- "Mall" em --verde-profundo, peso 700
- "ora" em --ambar, peso 700
- Fonte: Sora

-----

## STACK TÉCNICO DO APP LANDING

```json
{
  "framework": "Next.js 15 (App Router)",
  "react": "19",
  "typescript": "5 (strict)",
  "estilo": "Tailwind CSS 4",
  "animacoes": "Framer Motion 11",
  "icones": "Lucide React",
  "formularios": "React Hook Form 7 + Zod 3",
  "fontes": "next/font (Google Fonts — Sora + Inter)",
  "imagens": "next/image",
  "analytics": "Vercel Analytics (opcional)",
  "deploy": "Vercel"
}
```

-----

## ESTRUTURA DE ARQUIVOS A CRIAR

```
apps/landing/
├── package.json
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── public/
│   ├── mockup-app-consumidor.png    (placeholder — usar div colorida)
│   ├── mockup-dashboard.png         (placeholder — usar div colorida)
│   ├── mockup-app-entregador.png    (placeholder — usar div colorida)
│   └── favicon.ico
└── src/
    ├── app/
    │   ├── layout.tsx               (RootLayout com fontes e metadata)
    │   ├── page.tsx                 (Landing page principal)
    │   ├── globals.css              (Tailwind + variáveis CSS)
    │   └── robots.ts                (SEO)
    └── components/
        ├── layout/
        │   ├── Navbar.tsx           (Header fixo com CTA)
        │   └── Footer.tsx           (Links e info de contato)
        ├── sections/
        │   ├── Hero.tsx             (Seção principal)
        │   ├── ComoFunciona.tsx     (3 passos simples)
        │   ├── DiferenciaisLojista.tsx  (vs iFood/Rappi)
        │   ├── Planos.tsx           (Cards de preço)
        │   ├── ParaConsumidores.tsx (Download do app)
        │   ├── ParaEntregadores.tsx (Cadastro entregador)
        │   ├── Depoimentos.tsx      (Social proof)
        │   ├── Faq.tsx              (Perguntas frequentes)
        │   └── CtaFinal.tsx         (CTA final para lojistas)
        └── ui/
            ├── Button.tsx           (Variantes: primary, secondary, outline)
            ├── Badge.tsx            (Tag colorida)
            ├── Card.tsx             (Container com sombra)
            └── AnimatedSection.tsx  (Wrapper com fade-in ao scroll)
```

-----

## SEÇÕES DA LANDING PAGE (em ordem)

### 1. NAVBAR (fixo no topo)
- Background: --verde-profundo com blur ao scrollar
- Logo "Mallora" à esquerda (SVG inline provisório)
- Links: "Como funciona" | "Planos" | "Para Entregadores" | "FAQ"
- CTA à direita: botão âmbar "Cadastrar minha loja →"
- Mobile: menu hamburguer com drawer lateral
- Scroll suave para as seções (anchor links)

---

### 2. HERO — SEÇÃO PRINCIPAL
**Público:** Lojista

**Layout:** 2 colunas no desktop (texto esquerda, imagem direita)

**Conteúdo:**
```
Badge: "🟢 Divinópolis, MG — Já disponível"

H1:
"Venda mais.
 Pague menos.
 Cresça de verdade."

Subtítulo:
"A Mallora é o shopping digital de Divinópolis. Coloque sua loja online
 com comissão fixa de R$1,00 por pedido — sem percentual sobre suas vendas."

CTAs:
[Botão âmbar grande] "Cadastrar minha loja grátis →"
[Link texto] "Ver como funciona ↓"

Métricas sociais (linha horizontal abaixo dos CTAs):
⭐ Sem comissão percentual
⚡ Repasse em 7 dias
📱 App para seus clientes
🛵 Entregadores disponíveis
```

**Imagem/Mockup direita:**
- Div com gradiente --verde-profundo → --verde-medio
- Mockup estilizado do dashboard (div colorida se não tiver imagem)
- Borda arredondada, sombra grande
- Badge flutuante: "Novo pedido! R$58,90 🔔"

**Animação:** Texto entra com fade-in + slide-up (Framer Motion)

---

### 3. COMO FUNCIONA — 3 PASSOS SIMPLES
**Público:** Lojista

**Layout:** 3 colunas horizontais com numeração grande

**Título:** "Comece a vender em 3 passos"

**Passos:**
```
1️⃣ Cadastre sua loja
   Preencha os dados da sua loja, fotos e horários em minutos.
   Sem burocracia, sem contrato longo.
   Ícone: Store (Lucide)

2️⃣ Monte seu cardápio
   Adicione seus produtos, preços e categorias.
   Fotos bonitas vendem mais — nossa plataforma facilita o upload.
   Ícone: PackagePlus (Lucide)

3️⃣ Receba pedidos e ganhe
   Seus clientes pedem pelo app, você confirma no dashboard,
   o entregador coleta. O dinheiro cai em D+7.
   Ícone: TrendingUp (Lucide)
```

**Visual:** Cards com borda --verde-medio, número em --ambar grande, linha conectora entre cards

---

### 4. DIFERENCIAIS — POR QUE A MALLORA?
**Público:** Lojista

**Título:** "Chega de pagar percentual para o iFood"
**Subtítulo:** "Enquanto você paga 12-30% por pedido nos grandes apps, aqui é R$1,00 fixo. Sempre."

**Layout:** Tabela comparativa + lista de benefícios

**Tabela comparativa:**
```
                    iFood / Rappi      Mallora
Comissão:           12–30% por pedido  R$1,00 fixo ✅
Mensalidade:        Cobranças extras   Fixa e transparente ✅
Repasse:            D+30               D+7 (ou D+2) ✅
Seus dados:         Propriedade deles  São seus ✅
Suporte:            Robô               Pessoa real ✅
Foco:               Nacional           Sua cidade ✅
```

**Cards de benefício (abaixo da tabela, 2x2 no desktop):**
```
💰 Comissão fixa de R$1,00
   Não importa se o pedido é de R$20 ou R$200,
   a comissão é sempre R$1,00. Previsível e justo.

📊 Dashboard completo incluso
   Gestão de produtos, pedidos, financeiro e estoque
   incluídos na assinatura. Sem custo extra.

⚡ Receba em 7 dias
   Repasse automático todo D+7. Precisa antes?
   Antecipe para D+2 por apenas R$0,75 por pedido.

🏘️ Feito para Divinópolis
   Suporte próximo, entregadores locais e
   foco total na nossa cidade.
```

---

### 5. PLANOS — PREÇOS
**Público:** Lojista

**Título:** "Planos que cabem no seu bolso"
**Subtítulo:** "Sem surpresas. Cancele quando quiser."

**Nota de destaque (banner âmbar):**
"✨ Todos os planos incluem 14 dias grátis para testar"

**Cards de planos (3 colunas, o "Profissional" em destaque):**

```
BÁSICO
R$97/mês
"Para começar com o pé direito"
✅ 1 loja
✅ Até 30 produtos
✅ Dashboard de pedidos
✅ Financeiro básico
✅ 1 entregador próprio
✅ Notificações push
❌ Controle de estoque
❌ Relatórios avançados
[Começar grátis]


PROFISSIONAL ← MAIS POPULAR (badge âmbar)
R$147/mês
"Para quem quer crescer"
✅ Até 3 lojas
✅ Até 100 produtos
✅ Dashboard completo
✅ Financeiro com gráficos
✅ 5 entregadores próprios
✅ Controle de estoque
✅ Relatórios completos
✅ Antecipação de repasse
[Começar grátis] ← botão --verde-profundo


PREMIUM
R$247/mês
"Para operações maiores"
✅ Lojas ilimitadas
✅ Produtos ilimitados
✅ Tudo do Profissional
✅ Entregadores ilimitados
✅ Relatórios com export CSV
✅ Prioridade no suporte
✅ Acesso antecipado a novidades
[Falar com time de vendas]
```

**Abaixo dos cards:**
"Não tem certeza qual plano escolher? [Fale com a gente →]"
"Todos os planos incluem comissão de R$1,00 por pedido entregue com pagamento online."

---

### 6. PARA CONSUMIDORES
**Público:** Consumidor final

**Layout:** 2 colunas (esquerda: texto + badges de store, direita: mockup do app)

**Background:** Seção com fundo --verde-profundo (texto branco)

**Conteúdo:**
```
Eyebrow: "Para quem mora em Divinópolis"

H2: "Seus pedidos favoritos,
     na palma da mão."

Subtítulo:
"Restaurantes, mercadinhos, farmácias, pet shops e muito mais.
 Acompanhe sua entrega em tempo real no mapa."

Recursos (ícones):
📍 Rastreamento em tempo real
💳 Pague com cartão ou PIX
⭐ Avalie sua experiência
💬 Fale direto com a loja

CTA: "Baixar o app" (com ícones de App Store e Google Play — links placeholder)
```

**Mockup do app:** Div estilizada como tela de celular com gradiente Verde Minas

---

### 7. PARA ENTREGADORES
**Público:** Entregador autônomo

**Layout:** Fundo --creme-escuro, 2 colunas (imagem esquerda, texto direita)

**Conteúdo:**
```
Eyebrow: "Trabalho flexível em Divinópolis"

H2: "Seja seu próprio chefe.
     Entregue quando quiser."

Subtítulo:
"Cadastre-se como entregador autônomo, escolha seus horários
 e receba pelo que entregar. Repasse direto na sua conta em D+1."

Benefícios (lista com ícones):
🕐 Você decide quando trabalhar
💰 Receba por entrega (D+1 automático)
🗺️ Aceite ou recuse pedidos
🛵 Use qualquer veículo
📱 App dedicado para entregadores
✅ Sem vínculo empregatício

CTA:
[Botão âmbar] "Quero ser entregador →"
Link para formulário de cadastro (deep link para o app ou Google Form)
```

---

### 8. DEPOIMENTOS (SOCIAL PROOF)
**Público:** Lojistas / Entregadores / Consumidores

**Layout:** Grid 3 colunas no desktop, carrossel no mobile

**Nota:** Usar depoimentos fictícios realistas (marcar como ilustrativos com asterisco)

**Depoimentos:**
```
⭐⭐⭐⭐⭐
"Antes pagava 28% para o iFood. Aqui pago R$1,00 por pedido.
 Em um mês, economizei mais de R$2.000 em comissões."
— Marcos A., Pizzaria da Vila, Divinópolis*

⭐⭐⭐⭐⭐
"O dashboard é muito mais fácil do que parece. Em menos de uma hora
 já estava com meu cardápio todo cadastrado e pronto para receber pedidos."
— Fernanda C., Marmitas da Fê, Divinópolis*

⭐⭐⭐⭐⭐
"Trabalho quando quero, recebo na minha conta no dia seguinte.
 É o melhor bico que já tive."
— Ricardo M., Entregador autônomo, Divinópolis*
```

**Rodapé:** *Depoimentos ilustrativos baseados em casos de uso reais.

---

### 9. FAQ — PERGUNTAS FREQUENTES
**Layout:** Accordion (uma pergunta abre por vez), fundo branco

**Título:** "Tem alguma dúvida?"

**Perguntas:**
```
❓ Quanto custa cadastrar minha loja?
R: Você escolhe entre os planos Básico (R$97/mês), Profissional (R$147/mês)
   ou Premium (R$247/mês). Todos incluem 14 dias de trial grátis.

❓ Como funciona a comissão de R$1,00?
R: Para cada pedido entregue com pagamento online (cartão ou PIX),
   a plataforma retém R$1,00 de comissão. Pedidos pagos na entrega
   (dinheiro ou maquininha) não têm comissão no MVP.

❓ Quando recebo o dinheiro das vendas?
R: O repasse é automático em D+7 (7 dias após a entrega confirmada).
   Se precisar antes, pode solicitar antecipação para D+2 por R$0,75 por pedido.

❓ A Mallora tem entregadores disponíveis?
R: Sim! A plataforma tem um pool de entregadores autônomos cadastrados.
   Você também pode cadastrar seus próprios entregadores em qualquer plano.

❓ Posso cancelar quando quiser?
R: Sim. Sem multa e sem burocracia. Cancele pelo próprio dashboard.

❓ Como os clientes fazem pedidos?
R: Através do app Mallora disponível para Android e iOS.
   O cliente descobre sua loja, faz o pedido e paga no app.

❓ Preciso de maquininha ou conta bancária específica?
R: Para receber os repasses, você vai conectar sua conta via Stripe Express
   (processo simples, guiado pela plataforma). Aceitamos contas PJ e PF.

❓ A Mallora funciona para que tipos de estabelecimento?
R: Qualquer negócio que vende produtos com entrega: restaurantes,
   lanchonetes, marmitarias, mercadinhos, farmácias, pet shops, floriculturas,
   cosméticos, papelarias e muito mais.
```

---

### 10. CTA FINAL
**Público:** Lojista

**Layout:** Seção centralizada com fundo --verde-profundo, texto branco

**Conteúdo:**
```
H2:
"Pronto para colocar sua
 loja no digital?"

Subtítulo:
"Junte-se aos lojistas de Divinópolis que já vendem pela Mallora.
 Comece grátis por 14 dias — sem cartão de crédito."

CTA principal:
[Botão âmbar grande] "Cadastrar minha loja agora →"

Abaixo do botão:
"✓ 14 dias grátis  ✓ Sem cartão  ✓ Cancele quando quiser"
```

---

### 11. FOOTER
**Conteúdo:**
```
Coluna 1 — Logo e descrição:
Logo "Mallora"
"O shopping digital de Divinópolis, MG."
Links de redes sociais (Instagram, WhatsApp — placeholder)

Coluna 2 — Para Lojistas:
- Como funciona
- Planos e preços
- Cadastrar minha loja

Coluna 3 — Para você:
- Baixar o app (consumidor)
- Seja um entregador
- FAQ

Coluna 4 — Contato:
- contato@mallora.com.br (placeholder)
- WhatsApp: (37) 99999-9999 (placeholder)
- Divinópolis, MG

Linha inferior:
"© 2026 Mallora. Todos os direitos reservados."
[Termos de uso] [Política de privacidade]
```

-----

## CONFIGURAÇÃO DO PACKAGE.JSON

```json
{
  "name": "landing",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --port 3002",
    "build": "next build",
    "start": "next start --port 3002",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.438.0",
    "react-hook-form": "^7.51.0",
    "zod": "^3.23.0",
    "@hookform/resolvers": "^3.3.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.3.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "typescript": "^5",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/postcss": "^4.0.0",
    "eslint": "^9",
    "eslint-config-next": "15.1.0"
  }
}
```

-----

## TAILWIND CONFIG (tailwind.config.ts)

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'verde-profundo': '#1A4D3A',
        'verde-medio': '#4CAF82',
        'ambar': '#F5A623',
        'creme': '#FFF8ED',
        'creme-escuro': '#FDF0DC',
      },
      fontFamily: {
        sora: ['var(--font-sora)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
```

-----

## GLOBALS.CSS

```css
@import "tailwindcss";

:root {
  --verde-profundo: #1A4D3A;
  --verde-medio: #4CAF82;
  --ambar: #F5A623;
  --creme: #FFF8ED;
  --creme-escuro: #FDF0DC;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--creme);
  color: #1A1A1A;
  font-family: var(--font-inter), sans-serif;
}

h1, h2, h3, h4 {
  font-family: var(--font-sora), sans-serif;
}
```

-----

## METADATA SEO (layout.tsx)

```typescript
export const metadata: Metadata = {
  title: 'Mallora — O shopping digital de Divinópolis',
  description: 'Plataforma de delivery e marketplace para lojistas de Divinópolis, MG. Venda online com comissão fixa de R$1,00 por pedido. Sem percentual sobre suas vendas.',
  keywords: ['delivery divinópolis', 'marketplace divinópolis', 'loja online divinópolis', 'mallora'],
  openGraph: {
    title: 'Mallora — O shopping digital de Divinópolis',
    description: 'Venda mais, pague menos. Comissão fixa de R$1,00 por pedido.',
    locale: 'pt_BR',
    type: 'website',
  },
}
```

-----

## CRITÉRIOS DE ACEITE

### Funcional
- [ ] Navbar fica fixa ao scrollar com backdrop-blur ativo
- [ ] Links da navbar fazem scroll suave até a seção correspondente
- [ ] Accordion do FAQ abre/fecha corretamente (uma seção por vez)
- [ ] Tabela comparativa renderiza corretamente em mobile (scroll horizontal)
- [ ] Cards de planos: o "Profissional" tem destaque visual claro
- [ ] Todas as seções têm animação de fade-in ao entrar no viewport (Framer Motion ou Intersection Observer)
- [ ] Botões CTA âmbar levam para `/entrar` ou URL de cadastro (configurável por env)

### Responsividade
- [ ] Mobile (320px–767px): layout em coluna única, texto ajustado
- [ ] Tablet (768px–1023px): transição entre mobile e desktop
- [ ] Desktop (1024px+): layout completo com colunas lado a lado
- [ ] Navbar tem menu hamburguer funcional no mobile
- [ ] Seção de planos usa scroll horizontal no mobile se necessário

### Performance
- [ ] Nota Lighthouse Performance ≥ 90
- [ ] `next/image` usado para todas as imagens
- [ ] Fontes carregadas com `next/font`
- [ ] Nenhum layout shift (CLS = 0)

### Visual
- [ ] Paleta "Verde Minas" aplicada consistentemente
- [ ] Hover states em todos os botões e links interativos
- [ ] Espaçamento consistente entre seções (py-20 desktop, py-12 mobile)
- [ ] Sombras suaves nos cards (shadow-md)

### SEO e Acessibilidade
- [ ] Metadata correta (title, description, OG tags)
- [ ] Hierarquia de headings correta (h1 único, h2 por seção)
- [ ] Imagens com alt text descritivo
- [ ] Contraste de cores aprovado (WCAG AA)
- [ ] `robots.ts` configurado

-----

## REFERÊNCIA DE LINKS DOS CTAs

Todos os botões "Cadastrar minha loja" devem redirecionar para:
```
https://app.mallora.com.br/cadastro
(ou process.env.NEXT_PUBLIC_APP_URL + '/cadastro')
```

Botão "Quero ser entregador" deve redirecionar para:
```
https://app.mallora.com.br/entregador/cadastro
(ou process.env.NEXT_PUBLIC_APP_URL + '/entregador/cadastro')
```

Botões de app store são links placeholder por enquanto:
```
App Store: #
Google Play: #
```

-----

## OBSERVAÇÕES IMPORTANTES

1. **Não usar** shadcn/ui neste app — é uma landing page simples, componentes
   serão construídos do zero com Tailwind para manter o bundle leve.

2. **Imagens mockup:** se não houver assets, usar divs coloridas estilizadas
   com gradiente Verde Minas simulando telas de celular/dashboard.

3. **Framer Motion:** usar apenas `motion.div` com `initial`, `whileInView`
   e `transition` — evitar animações complexas que prejudiquem performance.

4. **Formulário de contato:** não implementar backend de email no MVP —
   o CTA principal é o link para o app de cadastro.

5. **Internacionalização:** apenas PT-BR por enquanto.

6. **Adicionar ao turbo.json:** incluir o novo app `landing` no pipeline
   do Turborepo após criá-lo.

-----

## COMANDO PARA INICIAR

Após criar todos os arquivos:
```bash
cd apps/landing
pnpm dev
# Acessa em http://localhost:3002
```

Ou via raiz do monorepo (após configurar turbo.json):
```bash
pnpm dev:landing
```

-----

*Arquivo 30 de 30 — Série completa de documentação*
*Índice Mestre disponível no arquivo 00*
