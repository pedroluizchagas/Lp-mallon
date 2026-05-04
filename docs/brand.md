# Brand & Design — Mallevo

Guia de identidade visual e tokens de design. Todos os valores aqui definidos são a fonte de verdade e devem ser usados via `@mallevo/brand` ou `@mallevo/config-tailwind`.

---

## Identidade da Marca

**Mallevo** é o shopping digital de Divinópolis, MG. O nome combina "Mall" (shopping) com o sufixo "-evo" (evolução). A marca posiciona a plataforma como uma evolução do comércio local — moderna, acessível e enraizada na cidade.

### Valores da Marca

- **Local com orgulho:** produto feito para e por Divinópolis
- **Simples e direto:** sem burocracia, sem taxas absurdas
- **Tecnologia acessível:** para qualquer lojista, qualquer entregador

---

## Paleta de Cores

### Cores Primárias

| Token | Hex | CSS Variable | Uso |
|-------|-----|-------------|-----|
| `lime` | `#c1f148` | `--color-lime` | CTA principal, destaques, ícones ativos |
| `lime-dark` | `#9dc93a` | `--color-lime-dark` | Hover do lime, estados pressionados |
| `lime-ink` | `#1a2a00` | `--color-lime-ink` | Texto sobre fundo lime |

### Cores de Fundo

| Token | Hex | CSS Variable | Uso |
|-------|-----|-------------|-----|
| `dark` | `#0B0F0D` | `--color-dark` | Background principal dark mode |
| `dark-2` | `#111714` | `--color-dark-2` | Background secundário dark mode |
| `surface` | `#f8f9f6` | `--color-surface` | Background light mode |
| `surface-alt` | `#f0f2ec` | `--color-surface-alt` | Cards e áreas alternadas em light mode |

### Cores de Texto

| Token | Hex | CSS Variable | Uso |
|-------|-----|-------------|-----|
| `ink` | `#0d1208` | `--color-ink` | Texto principal em light mode |
| `ink-2` | `#3d4a35` | `--color-ink-2` | Texto secundário / subtítulos |
| `ink-3` | `#6b7c60` | `--color-ink-3` | Texto terciário / captions / labels |

### Paleta de Acento

| Token | Hex | CSS Variable | Uso |
|-------|-----|-------------|-----|
| `accent` | `#2d5a27` | `--color-accent` | Links, estados de foco, destaques verdes |

### Uso por App

| App | Tema base | Cores predominantes |
|-----|-----------|-------------------|
| `lp-consumidor` | Dark mode | `dark`, `dark-2`, `lime`, branco |
| `lp-parceiros` | Light mode | `surface`, `ink`, `lime`, `accent` |
| `lp-entregadores` | Dark mode / Misto | `dark`, `lime`, gradientes |

---

## Tipografia

### Famílias

| Família | Uso | Fonte |
|---------|-----|-------|
| **Plus Jakarta Sans** | Headings, display, CTAs | Google Fonts (via `next/font`) |
| **Inter** | Corpo do texto, UI, labels | Google Fonts (via `next/font`) |

### Hierarquia (Tailwind classes)

| Nível | Classe Tailwind | Tamanho | Font | Peso |
|-------|----------------|---------|------|------|
| Display | `text-5xl md:text-7xl` | 48–72px | Jakarta | 700 |
| H1 | `text-4xl md:text-6xl` | 36–60px | Jakarta | 700 |
| H2 | `text-3xl md:text-5xl` | 30–48px | Jakarta | 700 |
| H3 | `text-2xl md:text-3xl` | 24–30px | Jakarta | 600 |
| H4 | `text-xl` | 20px | Jakarta | 600 |
| Body Large | `text-lg` | 18px | Inter | 400 |
| Body | `text-base` | 16px | Inter | 400 |
| Small | `text-sm` | 14px | Inter | 400 |
| Caption | `text-xs` | 12px | Inter | 400 |
| Label | `text-xs font-semibold uppercase tracking-widest` | 12px | Inter | 600 |

### Classes Utilitárias de Gradiente

```css
.text-gradient        /* Gradiente do brand (lime → verde) */
.text-gradient-lime   /* Apenas lime → lime-dark */
```

---

## Espaçamento e Grid

O projeto segue o sistema de 8px do Tailwind.

| Valor | px | Tailwind |
|-------|-----|----------|
| xs | 4px | `p-1` |
| sm | 8px | `p-2` |
| md | 16px | `p-4` |
| lg | 24px | `p-6` |
| xl | 32px | `p-8` |
| 2xl | 48px | `p-12` |
| 3xl | 64px | `p-16` |
| 4xl | 96px | `p-24` |

### Padding de seções

```tsx
// Padrão para seções de landing page
<section className="py-24 md:py-32 px-4 md:px-6">
```

### Container máximo

```tsx
<div className="max-w-6xl mx-auto">  {/* 1152px */}
<div className="max-w-5xl mx-auto">  {/* 1024px — conteúdo textual */}
```

---

## Bordas e Raios

| Uso | Tailwind |
|-----|----------|
| Botões pequenos | `rounded-lg` (8px) |
| Botões grandes | `rounded-xl` (12px) |
| Cards | `rounded-2xl` (16px) |
| Badges/chips | `rounded-full` |
| Inputs | `rounded-lg` (8px) |

---

## Sombras

| Uso | Tailwind |
|-----|----------|
| Cards em rest | `shadow-sm` |
| Cards em hover | `shadow-lg` |
| Navbar scrolled | `shadow-md` |
| Modais/Dropdowns | `shadow-2xl` |

---

## Animações

Todas as animações são definidas em `@mallevo/config-tailwind` como extensões do Tailwind.

| Nome | Efeito | Uso |
|------|--------|-----|
| `fade-in-up` | Fade + slide de baixo para cima | Elementos de entrada |
| `fade-in` | Apenas fade | Overlays, tooltips |
| `float` | Flutuação suave (loop) | Ícones, ilustrações decorativas |
| `pulse-slow` | Pulsação lenta (loop) | Indicadores de status, badges "ao vivo" |
| `marquee` | Scroll horizontal para esquerda | Logos, categorias |
| `marquee-reverse` | Scroll horizontal para direita | Segunda linha do marquee |

### Durações padrão (Framer Motion)

```ts
const transitions = {
  fast: { duration: 0.2, ease: 'easeOut' },
  normal: { duration: 0.4, ease: 'easeOut' },
  slow: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },  // expo out
  spring: { type: 'spring', stiffness: 300, damping: 30 },
}
```

---

## Logos e Assets

### Variantes do Logo

| Arquivo | Uso |
|---------|-----|
| `logoBlack.png` | Fundos claros |
| `logoGreen.png` | Versão com lime (preferida em dark) |
| `logoWhite.png` | Fundos escuros sem destaque verde |
| `iconMallevo.png` | Favicon e ícone de app |
| `icon.png` | Ícone simplificado |

### Localização

```
apps/[app]/public/images/logos/
apps/[app]/public/images/icons/
apps/[app]/public/images/hero/
```

### Tamanho padrão do logo na Navbar

```tsx
<Image src="/images/logos/logoGreen.png" width={120} height={32} alt="Mallevo" />
```

---

## Ícones

O projeto usa **Lucide React** para ícones de UI. Importe apenas os ícones necessários (tree-shaking automático):

```tsx
import { ArrowRight, Check, Star, MapPin } from 'lucide-react'
```

### Tamanhos padrão

| Contexto | Size prop |
|----------|-----------|
| Inline com texto | `size={16}` |
| Botões | `size={18}` |
| Cards/features | `size={24}` |
| Decorativos grandes | `size={32}` ou `size={40}` |

---

## Tom Visual por Público

### Consumidores (dark mode, premium)

- Background escuro `#0B0F0D`
- Texto branco e lima
- Cursor customizado
- Animações agressivas e cinematográficas
- Seções com ruído de fundo sutil
- Marquee de categorias

### Parceiros/Lojistas (light mode, profissional)

- Background claro `#f8f9f6`
- Texto escuro `#0d1208`
- Tabela de comparação com concorrentes
- Tabela de planos clara e objetiva
- Tom de autoridade e parceria de negócios

### Entregadores (energético, direto)

- Mix de dark e cores vibrantes
- Headlines fortes focadas em renda e liberdade
- Números grandes (ganhos, pedidos, cidades)
- CTA direto e sem fricção
- Tom motivacional e empoderador
