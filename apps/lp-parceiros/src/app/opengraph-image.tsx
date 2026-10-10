import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'

export const alt = 'Mallevo para lojistas — Sua loja, ao vivo no shopping. Comissão de 9,1% por pedido.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * A prévia de compartilhamento (WhatsApp, redes) é a marquise do balcão: o
 * zinco com o neon vazando e o statement do app do lojista.
 */
export default async function Image() {
  const raiz = process.cwd()
  const [medio, semi, semiItalico, logo] = await Promise.all([
    readFile(join(raiz, 'assets/og/PlusJakartaSans-Medium.woff')),
    readFile(join(raiz, 'assets/og/PlusJakartaSans-SemiBold.woff')),
    readFile(join(raiz, 'assets/og/PlusJakartaSans-SemiBoldItalic.woff')),
    readFile(join(raiz, 'public/images/logos/logoWhite.png')),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          backgroundColor: '#18181B',
          backgroundImage:
            'radial-gradient(circle at 92% -12%, rgba(193,241,72,0.28), rgba(193,241,72,0) 58%), radial-gradient(circle at -6% 118%, rgba(193,241,72,0.15), rgba(193,241,72,0) 52%)',
          color: '#FFFFFF',
          fontFamily: 'Jakarta',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse não usa next/image */}
          <img src={`data:image/png;base64,${logo.toString('base64')}`} width={252} height={40} alt="" />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: 2.6,
              color: '#D8FF3E',
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: 12, backgroundColor: '#D8FF3E' }} />
            PARA LOJISTAS
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 116, fontWeight: 600, lineHeight: 1.02, letterSpacing: -4.8 }}>
          <span>Sua loja,</span>
          <span style={{ fontStyle: 'italic', color: '#D8FF3E' }}>ao vivo no shopping.</span>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 28,
            fontWeight: 500,
            color: 'rgba(255,255,255,0.66)',
          }}
        >
          <span>Comissão de 9,1% por pedido</span>
          <span>parceiros.mallevo.com.br</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Jakarta', data: medio, weight: 500, style: 'normal' },
        { name: 'Jakarta', data: semi, weight: 600, style: 'normal' },
        { name: 'Jakarta', data: semiItalico, weight: 600, style: 'italic' },
      ],
    },
  )
}
