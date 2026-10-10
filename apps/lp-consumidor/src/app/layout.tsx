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

// A voz da casa (a mesma do app e do painel web): Plus Jakarta Sans,
// com o itálico da linha acesa. Mono só para relógio e rótulos técnicos.
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

// Vozes das lojas: só aparecem dentro das vitrines, abaixo da dobra —
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
const inter = Inter({ subsets: ['latin'], variable: '--ff-inter', display: 'swap', preload: false })

const fontes = [jakarta, mono, archivo, anton, cormorant, manrope, nunito, inter].map((f) => f.variable).join(' ')

const DESCRICAO =
  'Restaurantes, moda, farmácias, pet, mercado e serviços de Divinópolis num app só — cada loja com a sua vitrine, novidades ao vivo e o pedido acompanhado do balcão até a sua porta.'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mallevo.com.br'),
  title: SEO.consumidor.title,
  description: DESCRICAO,
  applicationName: 'Mallevo',
  keywords: [
    'Mallevo',
    'shopping digital Divinópolis',
    'delivery Divinópolis',
    'lojas de Divinópolis',
    'comércio local Divinópolis',
    'pedir comida Divinópolis',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Mallevo — A cidade inteira, na sua mão.',
    description: DESCRICAO,
    url: '/',
    siteName: SEO.consumidor.siteName,
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mallevo — A cidade inteira, na sua mão.',
    description: 'O shopping digital de Divinópolis.',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#18181B',
  colorScheme: 'dark light',
}

/**
 * A cortina de abertura roda uma vez por sessão. Decidido antes do primeiro
 * paint (no <head>), para quem volta não ver o véu piscar.
 */
const ABERTURA_INIT = `(function(){try{var k='mallevo:abertura';if(sessionStorage.getItem(k)){document.documentElement.setAttribute('data-abertura','vista')}else{sessionStorage.setItem(k,'1')}}catch(e){}})();`

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
