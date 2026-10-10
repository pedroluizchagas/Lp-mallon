import { cn } from '@mallevo/ui'
import { ConsumerIcon } from '../marca/ConsumerIcon'

/**
 * O cartão de vidro do pedido em curso (components/pedidos/CartaoPedidoVivo
 * do app): ponto ao vivo, status em statement e a barra de progresso acesa.
 */
export function CartaoPedidoVivo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'rounded-[22px] border border-white/10 bg-[rgb(35_35_38/0.72)] p-4 font-sistema text-white shadow-[0_30px_60px_-24px_rgb(0_0_0/0.7)] backdrop-blur-xl',
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.12em] text-accent">
          <span className="size-[7px] rounded-full bg-accent animate-pulso" />
          Ao vivo · Café Aroma
        </p>
        <span className="font-mono text-[12px] tabular-nums text-white/60">52%</span>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/[0.1]">
          <ConsumerIcon name="chef" size={19} color="#D8FF3E" strokeWidth={2} />
        </span>
        <div className="min-w-0">
          <p className="font-sans text-[17px] font-semibold leading-tight">Em preparo</p>
          <p className="truncate text-[12.5px] text-white/60">Seu pedido está sendo preparado.</p>
        </div>
      </div>
      <div className="mt-3.5 h-1 overflow-hidden rounded-full bg-white/[0.13]">
        <div className="entra-progresso h-full w-[52%] origin-left rounded-full bg-accent" />
      </div>
    </div>
  )
}
