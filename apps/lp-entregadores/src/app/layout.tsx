import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google'
import { SEO } from '@mallevo/brand'
import { SmoothScroll } from '@mallevo/ui'
import './globals.css'

// A voz da casa: Plus Jakarta Sans, com o itálico da linha acesa. Mono só
// para relógio e números.
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

const fontes = [jakarta, mono, inter].map((f) => f.variable).join(' ')

const DESCRICAO =
  'Entregue para as lojas do shopping digital de Divinópolis: fique online quando quiser, veja o valor de cada entrega antes de aceitar e leve o pedido até a porta. Cadastro gratuito, pelo app.'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://entregadores.mallevo.com.br'),
  title: 'Mallevo para entregadores — A cidade em rota, no seu horário',
  description: DESCRICAO,
  applicationName: 'Mallevo',
  keywords: [
    'Mallevo',
    'entregador Divinópolis',
    'trabalho de entregador Divinópolis',
    'entregas Divinópolis',
    'motoboy Divinópolis',
    'entregador de bicicleta Divinópolis',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Mallevo para entregadores — A cidade em rota, no seu horário.',
    description: DESCRICAO,
    url: '/',
    siteName: SEO.entregadores.siteName,
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mallevo para entregadores — A cidade em rota, no seu horário.',
    description: 'Sem escala nem horário mínimo, e o valor de cada entrega antes de aceitar. O shopping digital de Divinópolis.',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#18181B',
  colorScheme: 'dark light',
}

/**
 * A abertura (a rota acendendo) roda uma vez por sessão. Decidido antes do
 * primeiro paint (no <head>), para quem volta não ver a cortina piscar.
 */
const ABERTURA_INIT = `(function(){try{var k='mallevo-entregadores:abertura';if(sessionStorage.getItem(k)){document.documentElement.setAttribute('data-abertura','vista')}else{sessionStorage.setItem(k,'1')}}catch(e){}})();`

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
