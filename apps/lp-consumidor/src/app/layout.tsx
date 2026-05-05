import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import { SEO, URLS } from '@mallevo/brand'
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
  title: SEO.consumidor.title,
  description: SEO.consumidor.description,
  keywords: [
    'delivery divinópolis',
    'pedir comida divinópolis',
    'app delivery divinópolis',
    'mallevo consumidor',
    'restaurantes divinópolis',
    'mercado delivery divinópolis',
  ],
  openGraph: {
    title: SEO.consumidor.title,
    description: SEO.consumidor.description,
    url: URLS.CONSUMIDOR_URL,
    siteName: SEO.consumidor.siteName,
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO.consumidor.title,
    description: SEO.consumidor.description,
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
