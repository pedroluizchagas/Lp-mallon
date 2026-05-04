import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mallevo para Consumidores — Peça do melhor de Divinópolis',
  description:
    'Restaurantes, mercados, farmácias e muito mais na palma da mão. Peça de lojas locais de Divinópolis, MG e acompanhe sua entrega em tempo real.',
  keywords: [
    'delivery divinópolis',
    'pedir comida divinópolis',
    'app delivery divinópolis',
    'mallevo consumidor',
    'restaurantes divinópolis',
    'mercado delivery divinópolis',
  ],
  openGraph: {
    title: 'Mallevo — O delivery que Divinópolis merecia',
    description:
      'Restaurantes, mercados e farmácias locais na palma da mão. Rastreamento em tempo real.',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mallevo — O delivery que Divinópolis merecia',
    description: 'Lojas locais de Divinópolis na palma da mão.',
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
