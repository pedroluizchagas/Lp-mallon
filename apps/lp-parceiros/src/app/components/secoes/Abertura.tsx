/**
 * Abertura — a porta de enrolar da loja. A luz de dentro acende na fresta
 * do chão e a porta sobe inteira, revelando o balcão aceso. CSS puro: roda
 * antes da hidratação, uma vez por sessão (ver ABERTURA_INIT no layout) e
 * nunca com movimento reduzido.
 */
export function Abertura() {
  return (
    <div className="porta" aria-hidden>
      <div className="porta__chapa chapa">
        <div className="porta__puxador" />
        <div className="porta__fresta" />
      </div>
    </div>
  )
}
