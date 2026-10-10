/**
 * Cortina de abertura — o neon da marquise acende e as colunas sobem do
 * centro para as bordas, revelando a fachada. Abstrata como as transições
 * do app (cor + movimento, sem marca). CSS puro: roda antes da hidratação,
 * uma vez por sessão (ver ABERTURA_INIT no layout) e nunca com movimento
 * reduzido.
 */
const ORDEM = [2, 1, 0, 0, 1, 2]

export function Abertura() {
  return (
    <div className="abertura" aria-hidden>
      {ORDEM.map((i, coluna) => (
        <div key={coluna} className="abertura__coluna" style={{ ['--i' as string]: i }} />
      ))}
      <div className="abertura__neon" />
    </div>
  )
}
