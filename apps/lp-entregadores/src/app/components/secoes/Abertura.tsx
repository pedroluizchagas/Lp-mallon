/**
 * Abertura — a rota acende. Sobre o zinco, a linha lima corre da loja até a
 * casa (o mesmo traço do mapa ilustrado do app) e a cortina sobe, revelando
 * a cidade. CSS puro: roda antes da hidratação, uma vez por sessão (ver
 * ABERTURA_INIT no layout) e nunca com movimento reduzido.
 */
/** O traço da loja (40, 190) até a casa (480, 30), num quadro de 520 × 220. A chamada final repete. */
export const ROTA = 'M 40 190 C 110 190, 120 120, 200 120 S 300 150, 340 90 S 430 30, 480 30'

export function Abertura() {
  return (
    <div className="abertura" aria-hidden>
      <svg viewBox="0 0 520 220" className="abertura__mapa" fill="none">
        {/* A malha da cidade, quase apagada */}
        <g stroke="rgb(255 255 255 / 0.06)" strokeWidth="1.2">
          <path d="M0 60 H520 M0 120 H520 M0 180 H520 M100 0 V220 M220 0 V220 M340 0 V220 M460 0 V220" />
        </g>
        <path d={ROTA} stroke="#D8FF3E" strokeOpacity="0.12" strokeWidth="18" strokeLinecap="round" />
        <path d={ROTA} pathLength={1} className="abertura__rota" stroke="#D8FF3E" strokeWidth="4" strokeLinecap="round" />
        {/* A loja e a casa */}
        <g className="abertura__pino">
          <circle cx="40" cy="190" r="13" fill="#18181B" stroke="#D8FF3E" strokeWidth="3" />
          <circle cx="40" cy="190" r="4.5" fill="#D8FF3E" />
        </g>
        <g className="abertura__pino abertura__pino--casa">
          <circle cx="480" cy="30" r="14" fill="#FFFFFF" />
          <path d="M473.5 31 l6.5 -6 l6.5 6 v6.5 h-13 z" fill="#111216" />
        </g>
      </svg>
    </div>
  )
}
