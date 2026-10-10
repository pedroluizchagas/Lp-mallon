/**
 * Ícones do entregador — porte 1:1 de
 * Mall-online/apps/mobile-courier/components/CourierIcon.tsx para SVG web.
 * As telas do app recriadas na landing usam exatamente estes traços.
 *
 * Convenções (as do app): viewBox 0 0 24 24, stroke-only, pontas e juntas
 * arredondadas, traço 1,9.
 *
 * Acréscimos, da mesma família (PartnerIcon/ConsumerIcon): os ícones que a
 * landing usa fora das telas do app (menu, setas, veículos, status).
 */
export type CourierIconName =
  | 'home'
  | 'route'
  | 'wallet'
  | 'user'
  | 'search'
  | 'power'
  | 'store'
  | 'pin'
  | 'clock'
  | 'cash'
  | 'package'
  | 'back'
  | 'phone'
  | 'check'
  | 'trend'
  | 'logout'
  | 'shield'
  | 'spark'
  | 'eye'
  | 'eye-off'
  | 'camera'
  // Da família (fora das telas do app)
  | 'close'
  | 'chevron-right'
  | 'chevron-down'
  | 'chevron-left'
  | 'bike'
  | 'truck'
  | 'bell'
  | 'check-circle'
  | 'check-double'
  | 'calendar'
  | 'info'
  | 'file'
  | 'users'
  | 'plus'
  | 'minus'
  | 'menu'
  | 'star'
  | 'heart'
  | 'external'

interface Props {
  name: CourierIconName
  size?: number
  color?: string
  strokeWidth?: number
  className?: string
}

export function CourierIcon({
  name,
  size = 20,
  color = 'currentColor',
  strokeWidth = 1.9,
  className,
}: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {renderIcon(name, color, strokeWidth)}
    </svg>
  )
}

function renderIcon(name: CourierIconName, color: string, strokeWidth: number) {
  const common = {
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  switch (name) {
    case 'home':
      return (
        <>
          <path {...common} d="M3.5 10.5L12 3.5l8.5 7v9a1 1 0 0 1-1 1h-4.5v-5.5h-6V20.5H4.5a1 1 0 0 1-1-1v-9z" />
        </>
      )
    case 'route':
      return (
        <>
          <circle {...common} cx="6" cy="18" r="2.25" />
          <circle {...common} cx="18" cy="6" r="2.25" />
          <path {...common} d="M8.5 17.5h3a4 4 0 0 0 4-4v-3" />
          <path {...common} d="M14.25 8H18V4.25" />
        </>
      )
    case 'wallet':
      return (
        <>
          <rect {...common} x="3.5" y="6.5" width="17" height="11" rx="2.5" />
          <path {...common} d="M15 11.5h5.5v4H15a2 2 0 1 1 0-4z" />
        </>
      )
    case 'user':
      return (
        <>
          <circle {...common} cx="12" cy="8" r="3.25" />
          <path {...common} d="M5.5 19.5a6.5 6.5 0 0 1 13 0" />
        </>
      )
    case 'search':
      return (
        <>
          <circle {...common} cx="10.5" cy="10.5" r="5.75" />
          <path {...common} d="M15 15l4.5 4.5" />
        </>
      )
    case 'power':
      return (
        <>
          <path {...common} d="M12 3.5v7" />
          <path {...common} d="M7.25 6.75a6.5 6.5 0 1 0 9.5 0" />
        </>
      )
    case 'store':
      return (
        <>
          <path {...common} d="M5 9.5h14l-1-4H6l-1 4z" />
          <path {...common} d="M6 9.5v9.5h12V9.5" />
          <path {...common} d="M9.5 19V14h5v5" />
        </>
      )
    case 'pin':
      return (
        <>
          <path {...common} d="M12 20.25s5.25-4.75 5.25-9a5.25 5.25 0 1 0-10.5 0c0 4.25 5.25 9 5.25 9z" />
          <circle {...common} cx="12" cy="11.25" r="1.9" />
        </>
      )
    case 'clock':
      return (
        <>
          <circle {...common} cx="12" cy="12" r="8.25" />
          <path {...common} d="M12 7.75v4.75l3.5 2" />
        </>
      )
    case 'cash':
      return (
        <>
          <rect {...common} x="3.5" y="6.5" width="17" height="11" rx="2.5" />
          <circle {...common} cx="12" cy="12" r="2.5" />
          <path {...common} d="M7 10v0M17 14v0" />
        </>
      )
    case 'package':
      return (
        <>
          <path {...common} d="M12 3.75l7 3.75v9L12 20.25 5 16.5v-9l7-3.75z" />
          <path {...common} d="M12 20.25V12" />
          <path {...common} d="M5.25 7.75L12 12l6.75-4.25" />
        </>
      )
    case 'back':
      return <path {...common} d="M14.75 5.5L8.25 12l6.5 6.5" />
    case 'phone':
      return (
        <>
          <path {...common} d="M8.2 5.5h2.6l1.1 3.2-1.6 1.45a13 13 0 0 0 3.7 3.7l1.45-1.6 3.2 1.1v2.6a1.6 1.6 0 0 1-1.6 1.6c-6.35 0-11.5-5.15-11.5-11.5A1.6 1.6 0 0 1 8.2 5.5z" />
        </>
      )
    case 'check':
      return <path {...common} d="M5.5 12.5l4 4 9-9" />
    case 'trend':
      return (
        <>
          <path {...common} d="M4.5 17.5l5.5-5.5 3.5 3.5 6-7" />
          <path {...common} d="M15.5 5h4.5v4.5" />
        </>
      )
    case 'logout':
      return (
        <>
          <path {...common} d="M10 5H6.5A1.5 1.5 0 0 0 5 6.5v11A1.5 1.5 0 0 0 6.5 19H10" />
          <path {...common} d="M13.5 8.5l4 3.5-4 3.5" />
          <path {...common} d="M9 12h8" />
        </>
      )
    case 'shield':
      return (
        <>
          <path {...common} d="M12 3.75l6 2.25v5.25c0 4-2.55 6.75-6 9-3.45-2.25-6-5-6-9V6l6-2.25z" />
          <path {...common} d="M9.5 12.25l1.75 1.75 3.5-4" />
        </>
      )
    case 'spark':
      return (
        <>
          <path {...common} d="M12 3.5l1.2 4.3 4.3 1.2-4.3 1.2L12 14.5l-1.2-4.3-4.3-1.2 4.3-1.2L12 3.5z" />
          <path {...common} d="M18 14.5l.65 2.35L21 17.5l-2.35.65L18 20.5l-.65-2.35L15 17.5l2.35-.65L18 14.5z" />
        </>
      )
    case 'eye':
      return (
        <>
          <path {...common} d="M2 12s3.5-7.5 10-7.5S22 12 22 12s-3.5 7.5-10 7.5S2 12 2 12z" />
          <circle {...common} cx="12" cy="12" r="3" />
        </>
      )
    case 'eye-off':
      return (
        <>
          <path {...common} d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
          <path {...common} d="M1 1l22 22" />
        </>
      )
    case 'camera':
      return (
        <>
          <path {...common} d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle {...common} cx="12" cy="13" r="4" />
        </>
      )

    // ─────────────────────────────────────────────────────────
    // Da família (PartnerIcon), fora das telas do app
    // ─────────────────────────────────────────────────────────
    case 'close':
      return <path {...common} d="M5 5l14 14M19 5L5 19" />
    case 'chevron-right':
      return <path {...common} d="M9.5 6l6 6-6 6" />
    case 'chevron-down':
      return <path {...common} d="M6 9.5l6 6 6-6" />
    case 'chevron-left':
      return <path {...common} d="M14.5 6l-6 6 6 6" />
    case 'bike':
      return (
        <>
          <circle {...common} cx="5.5" cy="17" r="3.25" />
          <circle {...common} cx="18.5" cy="17" r="3.25" />
          <path
            {...common}
            d="M5.5 17l3.5-7h5l3.5 7M9 10l-1.5-3.5H5M14 10l1-3.5h2.5"
          />
        </>
      )
    case 'truck':
      return (
        <>
          <rect {...common} x="2.5" y="7.5" width="11" height="9" rx="1.5" />
          <path {...common} d="M13.5 10.5h4l3 3.5v2.5h-7" />
          <circle {...common} cx="7" cy="17" r="2" />
          <circle {...common} cx="17" cy="17" r="2" />
        </>
      )
    case 'bell':
      return (
        <>
          <path
            {...common}
            d="M6 9.5a6 6 0 1 1 12 0c0 4 1.5 5.5 2 6.5H4c.5-1 2-2.5 2-6.5z"
          />
          <path {...common} d="M10 19.5a2 2 0 0 0 4 0" />
        </>
      )
    case 'check-circle':
      return (
        <>
          <circle {...common} cx="12" cy="12" r="8.25" />
          <path {...common} d="M8.5 12.5l3 3 4-5" />
        </>
      )
    case 'check-double':
      return (
        <>
          <path {...common} d="M3 12.5l4 4 9-9" />
          <path {...common} d="M9 16.5l4 4 9-9" />
        </>
      )
    case 'calendar':
      return (
        <>
          <rect {...common} x="4" y="5.5" width="16" height="14" rx="2" />
          <path {...common} d="M4 9.5h16M8.5 3.5v3M15.5 3.5v3" />
        </>
      )
    case 'info':
      return (
        <>
          <circle {...common} cx="12" cy="12" r="8.25" />
          <path {...common} d="M12 11v5M12 8v0.01" />
        </>
      )
    case 'file':
      return (
        <>
          <path {...common} d="M6 3.5h7l5 5v12H6v-17z" />
          <path {...common} d="M13 3.5v5h5M9 12.5h6M9 16h6" />
        </>
      )
    case 'users':
      return (
        <>
          <circle {...common} cx="9.5" cy="8.5" r="3.25" />
          <path {...common} d="M3.5 19.5a6 6 0 0 1 12 0" />
          <path {...common} d="M16.25 5.9a3.25 3.25 0 0 1 0 5.2" />
          <path {...common} d="M17.75 14.4a6 6 0 0 1 2.75 5.1" />
        </>
      )
    case 'plus':
      return <path {...common} d="M12 5v14M5 12h14" />
    case 'minus':
      return <path {...common} d="M5 12h14" />
    /** Abre no Dashboard (web) — seta saindo da caixa. */
    case 'menu':
      return <path {...common} d="M4 6.5h16M4 12h16M4 17.5h10" />

    case 'star':
      return (
        <path
          {...common}
          d="M12 3.75l2.6 5.27 5.82.85-4.21 4.1.99 5.79L12 17.03l-5.2 2.73.99-5.79-4.21-4.1 5.82-.85L12 3.75z"
        />
      )
    case 'heart':
      return (
        <path
          {...common}
          d="M12 20.5s-7.5-4.5-7.5-10A4 4 0 0 1 12 7.5 4 4 0 0 1 19.5 10.5c0 5.5-7.5 10-7.5 10z"
        />
      )
    case 'external':
      return (
        <>
          <path {...common} d="M14 4.5h5.5V10" />
          <path {...common} d="M19.5 4.5L11 13" />
          <path {...common} d="M17 13.5v5a1 1 0 0 1-1 1H5.5a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h5" />
        </>
      )

    default:
      return null
  }
}
