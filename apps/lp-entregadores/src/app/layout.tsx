import type { Metadata } from 'next'
import './globals.css'

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
    <html lang="pt-BR">
      <body className="font-inter antialiased">{children}</body>
    </html>
  )
}
