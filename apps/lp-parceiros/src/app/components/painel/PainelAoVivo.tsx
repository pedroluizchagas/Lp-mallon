import { cn } from '@mallevo/ui'
import { reais, resumoItens, type PedidoDemo } from '../../dados/balcao'
import { PartnerIcon } from '../marca/PartnerIcon'

/**
 * O mesmo pedido chegando no painel web (apps/web, Pedidos): a fila em
 * tempo real com o ponto aceso, "N novo aguardando confirmação" e o botão
 * de som — o painel toca um aviso a cada pedido novo. Duas janelas, o
 * mesmo balcão.
 */
export function PainelAoVivo({ pedido, className }: { pedido: PedidoDemo; className?: string }) {
  const itens = pedido.itens.reduce((s, i) => s + i.qtd, 0)
  return (
    <div
      className={cn(
        'overflow-hidden rounded-[18px] bg-white font-sans text-painel-ink shadow-[0_40px_80px_-30px_rgb(0_0_0/0.85)] ring-1 ring-black/5',
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-painel-line bg-painel-bg-2 px-3 py-2">
        <span className="flex gap-1">
          <span className="size-2 rounded-full bg-painel-line-2" />
          <span className="size-2 rounded-full bg-painel-line-2" />
          <span className="size-2 rounded-full bg-painel-line-2" />
        </span>
        <span className="ml-1 flex-1 truncate rounded-md bg-white px-2 py-0.5 font-mono text-[10.5px] text-painel-ink-3">
          app.mallevo.com.br/pedidos
        </span>
      </div>
      <div className="p-3.5">
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-1.5 text-[12px] text-painel-ink-3">
            <span className="size-1.5 animate-pulso rounded-full bg-painel-brick" />1 novo aguardando confirmação
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-painel-line px-2.5 py-1 text-[10.5px] font-semibold">
            <PartnerIcon name="volume" size={12} strokeWidth={2.2} />
            Som
          </span>
        </div>
        <div className="mt-3 flex items-center gap-3 rounded-[12px] border border-painel-line p-2.5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-painel-brick-lt text-painel-sidebar">
            <PartnerIcon name="bell" size={17} strokeWidth={2} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[13px] font-bold">{pedido.cliente}</span>
            <span className="block truncate text-[11.5px] text-painel-ink-3">
              {itens} {itens === 1 ? 'item' : 'itens'} · {resumoItens(pedido.itens)}
            </span>
          </span>
          <span className="text-right">
            <span className="block text-[13px] font-bold tabular-nums">{reais(pedido.total)}</span>
            <span className="mt-0.5 inline-block rounded-full bg-painel-warn-lt px-1.5 py-px text-[9.5px] font-bold uppercase tracking-[0.06em] text-painel-warn">
              Novo
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}
