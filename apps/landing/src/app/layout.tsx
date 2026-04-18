import type { Metadata } from 'next'
import { Sora, Inter } from 'next/font/google'
import './globals.css'

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-sora',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mallevo — O shopping digital de Divinópolis',
  description:
    'Plataforma de delivery e marketplace para lojistas de Divinópolis, MG. Venda online com comissão fixa de R$1,00 por pedido. Sem percentual sobre suas vendas.',
  keywords: [
    'delivery divinópolis',
    'marketplace divinópolis',
    'loja online divinópolis',
    'mallevo',
    'delivery mg',
    'vender online divinópolis',
  ],
  openGraph: {
    title: 'Mallevo — O shopping digital de Divinópolis',
    description:
      'Venda mais, pague menos. Comissão fixa de R$1,00 por pedido. Plataforma de delivery regional para lojistas de Divinópolis, MG.',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mallevo — O shopping digital de Divinópolis',
    description: 'Venda mais, pague menos. Comissão fixa de R$1,00 por pedido.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${sora.variable} ${inter.variable}`}>
      <body className="font-inter antialiased">{children}</body>
    </html>
  )
}
