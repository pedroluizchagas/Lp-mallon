# Componentes Compartilhados — `@mallevo/ui`

Documentação da biblioteca de componentes React compartilhada entre os 3 apps.

## Instalação (interna ao monorepo)

Os componentes já estão disponíveis via workspace. No `package.json` de cada app:

```json
{
  "dependencies": {
    "@mallevo/ui": "workspace:*"
  }
}
```

---

## Componentes de UI

### `Button`

Botão polimórfico com 4 variantes visuais.

```tsx
import { Button } from '@mallevo/ui'

// Variantes
<Button variant="primary">Começar agora</Button>
<Button variant="secondary">Saiba mais</Button>
<Button variant="outline">Ver planos</Button>
<Button variant="ghost">Cancelar</Button>

// Com ícone
<Button variant="primary" icon={<ArrowRight />}>
  Cadastrar loja
</Button>

// Como link (renderiza <a>)
<Button variant="primary" href="https://app.mallevo.com.br/cadastro">
  Acessar plataforma
</Button>

// Tamanhos
<Button size="sm">Pequeno</Button>
<Button size="md">Médio (padrão)</Button>
<Button size="lg">Grande</Button>
```

**Props:**

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'primary'` | Estilo visual |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamanho |
| `href` | `string` | — | Renderiza como `<a>` se fornecido |
| `icon` | `ReactNode` | — | Ícone exibido à direita do texto |
| `disabled` | `boolean` | `false` | Estado desabilitado |
| `className` | `string` | — | Classes extras via `cn()` |

---

### `Card`

Container com estilo de cartão, suporte a hover e destaque.

```tsx
import { Card } from '@mallevo/ui'

// Básico
<Card>
  <p>Conteúdo do cartão</p>
</Card>

// Com hover interativo
<Card hover>
  <h3>Plano Pro</h3>
  <p>R$1,00 por pedido</p>
</Card>

// Destacado (borda colorida)
<Card highlight>
  <h3>Mais popular</h3>
</Card>
```

**Props:**

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `hover` | `boolean` | `false` | Adiciona efeito hover com elevação |
| `highlight` | `boolean` | `false` | Destaca com borda na cor primária |
| `className` | `string` | — | Classes extras |
| `children` | `ReactNode` | — | Conteúdo interno |

---

### `Badge`

Etiqueta/tag com 4 variantes de cor.

```tsx
import { Badge } from '@mallevo/ui'

<Badge variant="lime">Novo</Badge>
<Badge variant="green">Disponível</Badge>
<Badge variant="outline">Beta</Badge>
<Badge variant="dark">Em breve</Badge>
```

**Props:**

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `variant` | `'lime' \| 'green' \| 'outline' \| 'dark'` | `'lime'` | Cor do badge |
| `className` | `string` | — | Classes extras |
| `children` | `ReactNode` | — | Texto/conteúdo |

---

### `AnimatedSection`

Wrapper de animação com Framer Motion para animações de entrada na viewport.

```tsx
import { AnimatedSection, HeadingReveal, LabelReveal, StaggerItem } from '@mallevo/ui'

// Seção animada completa
<AnimatedSection>
  <LabelReveal>Categoria</LabelReveal>
  <HeadingReveal>Título da Seção</HeadingReveal>
  <StaggerItem>Parágrafo que aparece depois do título</StaggerItem>
  <StaggerItem delay={0.2}>Segundo item com delay</StaggerItem>
</AnimatedSection>
```

**Subcomponentes:**

| Componente | Animação | Uso |
|------------|----------|-----|
| `AnimatedSection` | Container com `whileInView` | Envolve um bloco de conteúdo |
| `HeadingReveal` | Clip-path reveal de baixo para cima | Títulos `<h2>` / `<h3>` |
| `LabelReveal` | Fade + slide | Labels/categorias acima do título |
| `StaggerItem` | Fade-in com delay configurável | Parágrafos, botões, listas |

**Props do `AnimatedSection`:**

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `once` | `boolean` | `true` | Anima apenas na primeira vez |
| `threshold` | `number` | `0.2` | Porcentagem visível para disparar |
| `className` | `string` | — | Classes extras |

**Props do `StaggerItem`:**

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `delay` | `number` | `0` | Delay adicional em segundos |
| `className` | `string` | — | Classes extras |

---

## Componentes de Layout

### `Navbar`

Barra de navegação fixa com suporte a drawer mobile.

```tsx
import { Navbar } from '@mallevo/ui'

<Navbar
  logo="/images/logos/logoGreen.png"
  links={[
    { label: 'Como funciona', href: '#como-funciona' },
    { label: 'Planos', href: '#planos' },
    { label: 'FAQ', href: '#faq' },
  ]}
  cta={{ label: 'Cadastrar loja', href: 'https://app.mallevo.com.br/cadastro' }}
/>
```

**Props:**

| Prop | Tipo | Descrição |
|------|------|-----------|
| `logo` | `string` | Caminho para a imagem do logo |
| `links` | `{ label: string; href: string }[]` | Links de navegação |
| `cta` | `{ label: string; href: string }` | Botão CTA no header |
| `theme` | `'light' \| 'dark'` | Tema da navbar |

---

### `Footer`

Rodapé com 4 colunas: sobre, links, redes sociais e copyright.

```tsx
import { Footer } from '@mallevo/ui'

<Footer
  logo="/images/logos/logoWhite.png"
  description="O shopping digital de Divinópolis, MG."
  columns={[
    {
      title: 'Plataforma',
      links: [
        { label: 'Para consumidores', href: 'https://mallevo.com.br' },
        { label: 'Para parceiros', href: 'https://parceiros.mallevo.com.br' },
        { label: 'Para entregadores', href: 'https://entregadores.mallevo.com.br' },
      ],
    },
  ]}
  socials={{
    instagram: 'https://instagram.com/mallevo',
    whatsapp: 'https://wa.me/5537...',
  }}
/>
```

---

## Movimento

Primitivos de animação no estilo das landing pages Framer (rolagem com inércia, títulos revelados, texto que acende com a rolagem, pilha de cards). As curvas são as do app (`EASE.entrada` = `cubic-bezier(0.16, 1, 0.3, 1)`). Todos respeitam `prefers-reduced-motion`.

| Export | O que faz |
|--------|-----------|
| `SmoothScroll` / `useLenis()` | Rolagem com inércia (Lenis) na página inteira + `MotionConfig reducedMotion="user"`. Vai no `layout.tsx`; `anchorOffset` = altura do cabeçalho fixo |
| `RevealLines` | Cada linha do título sobe de dentro da própria máscara, em cascata |
| `ScrollWords` | O texto acende palavra a palavra conforme a rolagem |
| `BlurIn` | Bloco entra desfocado e assenta nítido |
| `Parallax` | Conteúdo atravessa a tela em velocidade própria |
| `Counter` | Número de odômetro (cada dígito é uma fita 0–9) |
| `Magnetic` | Elemento atraído pelo cursor (só mouse) |
| `StackedCards` | Cards fixos que se empilham com a rolagem; os de trás encolhem e escurecem |
| `useSafeReducedMotion()` | `prefers-reduced-motion` só depois de montar — use no lugar do `useReducedMotion` do framer quando a preferência mudar a ÁRVORE (evita erro de hidratação) |
| `EASE`, `DURATION` | Curvas e durações da casa |

```tsx
// layout.tsx
import { SmoothScroll } from '@mallevo/ui'

<body>
  <SmoothScroll anchorOffset={72}>{children}</SmoothScroll>
</body>

// seção
import { RevealLines, BlurIn, StackedCards } from '@mallevo/ui'

<RevealLines as="h2" lines={['Cada loja', <em key="a">com a sua cara.</em>]} />
<BlurIn delay={0.1}><p>…</p></BlurIn>
<StackedCards cardClassName="rounded-[40px]">{cards}</StackedCards>
```

**Armadilhas conhecidas:**

- `IntersectionObserver` desconta o recorte do pai: um elemento escondido por `overflow: hidden` + `translateY` nunca "entra na tela". Por isso o `RevealLines` observa o bloco, não a linha.
- Animação CSS com `fill-mode: both` que termina em `transform`/`filter` prende o valor final e anula o `style` do framer no mesmo elemento — separe em wrappers (um com a animação CSS, outro com o motion value).
- `filter: blur(0)` residual isola o `backdrop-filter` dos filhos: termine animações de desfoque em `filter: none` (o `BlurIn` faz isso com `transitionEnd`).

---

## Utilitários

### `cn()`

Função utilitária para mesclar classes Tailwind de forma segura:

```ts
import { cn } from '@mallevo/ui'

// Uso básico
<div className={cn('base-class', conditionalClass && 'extra-class')} />

// Com variantes
<div className={cn('px-4', size === 'lg' && 'py-6', className)} />
```

Internamente usa `clsx` + `tailwind-merge` para resolver conflitos de classes.

---

## Adicionando Novos Componentes ao Pacote

### 1. Crie o arquivo do componente

```tsx
// packages/ui/src/components/Tooltip.tsx
'use client'

import { cn } from '../lib/utils'

interface TooltipProps {
  content: string
  children: React.ReactNode
  className?: string
}

export function Tooltip({ content, children, className }: TooltipProps) {
  return (
    <div className={cn('relative group', className)}>
      {children}
      <span className="absolute bottom-full mb-2 hidden group-hover:block bg-dark text-white text-xs px-2 py-1 rounded">
        {content}
      </span>
    </div>
  )
}
```

### 2. Exporte no barrel

```ts
// packages/ui/src/components/index.ts
export { Tooltip } from './Tooltip'
```

### 3. Rebuild o pacote

```bash
pnpm --filter @mallevo/ui build
```

### 4. Use no app

```tsx
import { Tooltip } from '@mallevo/ui'
```

---

## Princípios de Design dos Componentes

1. **Acessibilidade primeiro:** use elementos semânticos (`<button>`, `<nav>`, `<footer>`), atributos ARIA onde necessário
2. **Zero estilos inline:** toda estilização via classes Tailwind
3. **Props explícitas:** sem spreads de props `{...rest}` sem motivo claro
4. **Composição sobre configuração:** prefira componentes menores que se combinam a componentes grandes com muitas props
5. **`className` sempre aceito:** todo componente recebe `className?: string` para customização pontual
6. **Server Components por padrão:** adicione `'use client'` apenas quando necessário (interatividade, hooks, animações)
