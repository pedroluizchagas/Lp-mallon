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
  title: 'Mallevo Entregadores — Ganhe dinheiro no seu tempo livre',
  description:
    'Seja um entregador parceiro Mallevo em Divinópolis, MG. Defina seus próprios horários, ganhe por entrega e receba semanalmente. Cadastre-se grátis.',
  keywords: [
    'entregador divinópolis',
    'trabalho entregador divinópolis',
    'renda extra divinópolis',
    'entregador mallevo',
    'ser entregador mg',
    'entrega moto divinópolis',
  ],
  openGraph: {
    title: 'Mallevo Entregadores — Ganhe dinheiro no seu tempo livre',
    description: 'Horários flexíveis, ganhos semanais e suporte completo em Divinópolis.',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mallevo Entregadores',
    description: 'Seja entregador parceiro em Divinópolis. Cadastre-se grátis.',
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
