import { useId } from 'react'
import { cn } from '@mallevo/ui'

const W = 100
const H = 130
const ORIGEM = { x: 20, y: 110 }
const DESTINO = { x: 76, y: 64 }
const MEIO = { x: 46, y: 86 }
const ROTA = `M ${ORIGEM.x} ${ORIGEM.y} C 28 100, 38 94, ${MEIO.x} ${MEIO.y} C 56 80, 66 72, ${DESTINO.x} ${DESTINO.y}`

const RUA = 'rgba(255,255,255,0.07)'
const RUA_SUAVE = 'rgba(255,255,255,0.045)'
const RUA_FINA = 'rgba(255,255,255,0.035)'

/**
 * O mapa ilustrado dos cartões do app do entregador
 * (components/RotaIlustrada.tsx): malha de ruas que esmaece para a
 * esquerda, a rota acesa da loja à casa e, quando o entregador está online,
 * o radar no destino. `desenhar` faz o traço correr de ponta a ponta (só
 * na landing).
 */
export function RotaIlustrada({
  radar = false,
  desenhar = false,
  className,
}: {
  radar?: boolean
  desenhar?: boolean
  className?: string
}) {
  const id = useId().replace(/:/g, '')
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className={cn('h-full w-full', className)} aria-hidden>
      <defs>
        <linearGradient id={`alfa-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="0.22" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="0.55" stopColor="#FFFFFF" stopOpacity="0.65" />
          <stop offset="0.85" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="1" />
        </linearGradient>
        <mask id={`esmaece-${id}`} maskUnits="userSpaceOnUse" x={0} y={0} width={W} height={H}>
          <rect x={0} y={0} width={W} height={H} fill={`url(#alfa-${id})`} />
        </mask>
        <radialGradient id={`brilho-${id}`} cx={MEIO.x} cy={MEIO.y} r="58" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#D8FF3E" stopOpacity="0.18" />
          <stop offset="0.7" stopColor="#D8FF3E" stopOpacity="0.04" />
          <stop offset="1" stopColor="#D8FF3E" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id={`rota-${id}`}
          x1={ORIGEM.x}
          y1={ORIGEM.y}
          x2={DESTINO.x}
          y2={DESTINO.y}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#C8F22E" stopOpacity="0.9" />
          <stop offset="1" stopColor="#D8FF3E" stopOpacity="1" />
        </linearGradient>
        <radialGradient id={`radar-${id}`} cx={DESTINO.x} cy={DESTINO.y} r="8" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#D8FF3E" stopOpacity="0.55" />
          <stop offset="0.6" stopColor="#D8FF3E" stopOpacity="0.18" />
          <stop offset="1" stopColor="#D8FF3E" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g mask={`url(#esmaece-${id})`}>
        <rect x={0} y={0} width={W} height={H} fill={`url(#brilho-${id})`} />

        <g fill="none" strokeLinecap="square">
          <path d="M -6 14 L 110 14" stroke={RUA} strokeWidth={1.4} />
          <path d="M -6 46 L 110 46" stroke={RUA} strokeWidth={1.4} />
          <path d="M -6 84 L 110 84" stroke={RUA} strokeWidth={1.4} />
          <path d="M -6 118 L 110 118" stroke={RUA} strokeWidth={1.4} />
          <path d="M 18 -6 L 18 136" stroke={RUA} strokeWidth={1.2} />
          <path d="M 50 -6 L 50 136" stroke={RUA} strokeWidth={1.2} />
          <path d="M 84 -6 L 84 136" stroke={RUA} strokeWidth={1.2} />
          <path d="M -6 28 L 110 28" stroke={RUA_SUAVE} strokeWidth={0.8} />
          <path d="M -6 60 L 110 60" stroke={RUA_SUAVE} strokeWidth={0.8} />
          <path d="M -6 72 L 110 72" stroke={RUA_SUAVE} strokeWidth={0.8} />
          <path d="M -6 100 L 110 100" stroke={RUA_SUAVE} strokeWidth={0.8} />
          <path d="M 32 -6 L 32 136" stroke={RUA_SUAVE} strokeWidth={0.7} />
          <path d="M 66 -6 L 66 136" stroke={RUA_SUAVE} strokeWidth={0.7} />
          <path d="M 96 -6 L 96 136" stroke={RUA_SUAVE} strokeWidth={0.7} />
          <path d="M -6 4 L 70 136" stroke={RUA_FINA} strokeWidth={0.7} />
          <path d="M 24 18 L 24 26" stroke={RUA_FINA} strokeWidth={0.5} />
          <path d="M 58 50 L 58 58" stroke={RUA_FINA} strokeWidth={0.5} />
          <path d="M 90 88 L 90 98" stroke={RUA_FINA} strokeWidth={0.5} />
          <path d="M 38 104 L 38 116" stroke={RUA_FINA} strokeWidth={0.5} />
        </g>

        <path d={ROTA} stroke="#D8FF3E" strokeWidth={12} opacity={0.07} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d={ROTA} stroke="#D8FF3E" strokeWidth={7} opacity={0.16} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path
          d={ROTA}
          stroke={`url(#rota-${id})`}
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          pathLength={1}
          className={desenhar ? 'animate-[traca_2.4s_var(--ease-entrada)_both]' : undefined}
          style={desenhar ? { strokeDasharray: 1 } : undefined}
        />

        <circle cx={ORIGEM.x} cy={ORIGEM.y} r={5} fill="#D8FF3E" opacity={0.22} />
        <circle cx={ORIGEM.x} cy={ORIGEM.y} r={2.6} fill="#D8FF3E" />

        {radar ? (
          <g>
            <circle cx={DESTINO.x} cy={DESTINO.y} r={18} fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth={1} />
            <circle
              cx={DESTINO.x}
              cy={DESTINO.y}
              r={11}
              fill="rgba(255,255,255,0.05)"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth={1.4}
              className="origin-center animate-[radar_2.4s_var(--ease-suave)_infinite] [transform-box:fill-box]"
            />
            <circle cx={DESTINO.x} cy={DESTINO.y} r={9} fill={`url(#radar-${id})`} />
            <circle cx={DESTINO.x} cy={DESTINO.y} r={3} fill="#D8FF3E" />
          </g>
        ) : (
          <g>
            <circle cx={DESTINO.x} cy={DESTINO.y} r={5} fill="#D8FF3E" opacity={0.22} />
            <circle cx={DESTINO.x} cy={DESTINO.y} r={2.6} fill="#D8FF3E" />
          </g>
        )}
      </g>
    </svg>
  )
}
