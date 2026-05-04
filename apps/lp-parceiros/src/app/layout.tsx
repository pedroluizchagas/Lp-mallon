import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mallevo Parceiros — Venda online em Divinópolis',
  description:
    'Coloque sua loja no shopping digital de Divinópolis. Comissão fixa de R$1,00 por pedido. Sem percentual sobre vendas. Cadastre-se grátis.',
  keywords: [
    'lojista divinópolis',
    'vender online divinópolis',
    'cadastrar loja mallevo',
    'marketplace divinópolis',
    'delivery para lojistas',
    'comissão fixa delivery',
  ],
  openGraph: {
    title: 'Mallevo Parceiros — Venda online em Divinópolis',
    description: 'Comissão fixa de R$1,00 por pedido. Sem percentual sobre suas vendas.',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mallevo Parceiros',
    description: 'Venda mais, pague menos. Comissão fixa de R$1,00 por pedido.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${jakarta.variable} ${inter.variable}`}>
      <body className="font-inter antialiased">{children}</body>
    </html>
  )
}
