import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'

export const alt = 'Mallevo para entregadores — A cidade em rota, no seu horário. Você vê o valor antes de aceitar.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** O traço da abertura (loja → casa), no quadro de 520 × 220. */
const ROTA = 'M 40 190 C 110 190, 120 120, 200 120 S 300 150, 340 90 S 430 30, 480 30'

/**
 * A prévia de compartilhamento (WhatsApp, redes) é a marquise da rua: o
 * zinco com o neon vazando, a rota da abertura e o statement.
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
          position: 'relative',
        }}
      >
        {/* No canto, ao lado de "no seu horário." — sem passar por trás do título. */}
        <svg
          width="330"
          height="140"
          viewBox="0 0 520 220"
          fill="none"
          style={{ position: 'absolute', right: 72, top: 322 }}
        >
          <path d={ROTA} stroke="#D8FF3E" strokeOpacity="0.14" strokeWidth="18" strokeLinecap="round" />
          <path d={ROTA} stroke="#D8FF3E" strokeWidth="4" strokeLinecap="round" />
          <circle cx="40" cy="190" r="13" fill="#18181B" stroke="#D8FF3E" strokeWidth="3" />
          <circle cx="40" cy="190" r="4.5" fill="#D8FF3E" />
          <circle cx="480" cy="30" r="14" fill="#FFFFFF" />
          <path d="M473.5 31 l6.5 -6 l6.5 6 v6.5 h-13 z" fill="#111216" />
        </svg>

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
            PARA ENTREGADORES
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 112, fontWeight: 600, lineHeight: 1.02, letterSpacing: -4.6 }}>
          <span>A cidade em rota,</span>
          <span style={{ fontStyle: 'italic', color: '#D8FF3E' }}>no seu horário.</span>
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
          <span>O valor de cada entrega antes de aceitar</span>
          <span>entregadores.mallevo.com.br</span>
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
