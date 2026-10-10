import type { Metadata, Viewport } from 'next'
import {
  Anton,
  Archivo,
  Cormorant_Garamond,
  Inter,
  JetBrains_Mono,
  Manrope,
  Nunito,
  Plus_Jakarta_Sans,
} from 'next/font/google'
import { SEO } from '@mallevo/brand'
import { SmoothScroll } from '@mallevo/ui'
import './globals.css'

// A voz da casa (a mesma do app do lojista e do painel): Plus Jakarta Sans,
// com o itálico da linha acesa. Mono só para relógio, endereço e números.
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--ff-jakarta',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--ff-mono',
  display: 'swap',
  preload: false,
})

// O "sistema" das telas do app recriadas (o papel da SF/Roboto).
const inter = Inter({ subsets: ['latin'], variable: '--ff-inter', display: 'swap', preload: false })

// Vozes das vitrines: só aparecem abaixo da dobra (manifesto e provador) —
// carregam sob demanda, sem disputar o primeiro paint.
const archivo = Archivo({ subsets: ['latin'], variable: '--ff-archivo', display: 'swap', preload: false })
const anton = Anton({ subsets: ['latin'], weight: '400', variable: '--ff-anton', display: 'swap', preload: false })
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['600'],
  variable: '--ff-cormorant',
  display: 'swap',
  preload: false,
})
const manrope = Manrope({ subsets: ['latin'], variable: '--ff-manrope', display: 'swap', preload: false })
const nunito = Nunito({ subsets: ['latin'], variable: '--ff-nunito', display: 'swap', preload: false })

const fontes = [jakarta, mono, inter, archivo, anton, cormorant, manrope, nunito].map((f) => f.variable).join(' ')

const DESCRICAO =
  'Sua loja no shopping digital de Divinópolis: vitrine com a cara dela, endereço próprio na web, posts no Explorar e pedidos ao vivo no app e no painel. Comissão de 9,1% por pedido.'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://parceiros.mallevo.com.br'),
  title: 'Mallevo para lojistas — Sua loja, ao vivo no shopping de Divinópolis',
  description: DESCRICAO,
  applicationName: 'Mallevo',
  keywords: [
    'Mallevo',
    'vender online Divinópolis',
    'lojista Divinópolis',
    'delivery para lojas Divinópolis',
    'comissão para lojistas',
    'shopping digital Divinópolis',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Mallevo para lojistas — Sua loja, ao vivo no shopping.',
    description: DESCRICAO,
    url: '/',
    siteName: SEO.parceiros.siteName,
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mallevo para lojistas — Sua loja, ao vivo no shopping.',
    description: 'Vitrine própria, pedido ao vivo e comissão de 9,1%. O shopping digital de Divinópolis.',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#18181B',
  colorScheme: 'dark light',
}

/**
 * A porta de abertura sobe uma vez por sessão. Decidido antes do primeiro
 * paint (no <head>), para quem volta não ver a porta piscar.
 */
const ABERTURA_INIT = `(function(){try{var k='mallevo-parceiros:abertura';if(sessionStorage.getItem(k)){document.documentElement.setAttribute('data-abertura','vista')}else{sessionStorage.setItem(k,'1')}}catch(e){}})();`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={fontes} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: ABERTURA_INIT }} />
      </head>
      <body>
        <SmoothScroll anchorOffset={72}>{children}</SmoothScroll>
      </body>
    </html>
  )
}
