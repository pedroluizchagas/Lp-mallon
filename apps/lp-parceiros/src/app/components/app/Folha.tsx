import { cn } from '@mallevo/ui'
import { PartnerIcon, type PartnerIconName } from '../marca/PartnerIcon'

/**
 * As peças da folha clara do app do lojista (components/ui/SecaoFolha,
 * Badge, PedidoCard), em pontos do app: cartão `surface` sem borda sobre o
 * canvas fumê — elevação por luminosidade, não por fio.
 */

/** A folha que sobe por cima da marquise (marginTop −24, raio 20 no topo). */
export function FolhaApp({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('vidro-fosco relative -mt-[24px] space-y-[28px] rounded-t-[20px] pb-[120px] pt-[24px]', className)}>
      {children}
    </div>
  )
}

/** O letreiro de corredor: sobrelinha micro `inkSoft` + título Jakarta 700 21. */
export function SecaoFolha({
  sobrelinha,
  titulo,
  direita,
  children,
}: {
  sobrelinha: string
  titulo: string
  direita?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="space-y-[14px]">
      <div className="flex items-end justify-between gap-[12px] px-[24px]">
        <div className="min-w-0">
          <p className="mb-[3px] truncate text-[10.5px] font-bold uppercase tracking-[1.2px] text-ink-soft">{sobrelinha}</p>
          <p className="truncate font-sans text-[21px] font-bold tracking-[-0.4px] text-ink">{titulo}</p>
        </div>
        {direita && <div className="pb-[4px]">{direita}</div>}
      </div>
      <div className="px-[16px]">{children}</div>
    </div>
  )
}

export function CartaoFolha({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('overflow-hidden rounded-[20px] bg-white p-[16px] shadow-[0_4px_12px_rgb(0_0_0/0.06)]', className)}>
      {children}
    </div>
  )
}

/** Pílula de status: fundo soft (alpha 18%) na cor do momento. */
export function Badge({ rotulo, cor, icone }: { rotulo: string; cor: string; icone?: PartnerIconName }) {
  return (
    <span
      className="inline-flex h-[22px] items-center gap-[4px] rounded-full px-[8px] text-[11px] font-bold uppercase tracking-[1.2px]"
      style={{ backgroundColor: `color-mix(in srgb, ${cor} 18%, transparent)`, color: cor }}
    >
      {icone && <PartnerIcon name={icone} size={12} strokeWidth={2.2} />}
      {rotulo}
    </span>
  )
}

/** Recibo de pedido da folha (PedidoCard): o cliente no lugar do tijolo. */
export function Recibo({
  cliente,
  itens,
  total,
  quando,
  status,
  pagamento,
}: {
  cliente: string
  itens: string
  total: string
  quando: string
  status: { rotulo: string; cor: string; icone: PartnerIconName }
  pagamento: string
}) {
  return (
    <div className="rounded-[20px] bg-white p-[14px] shadow-[0_4px_12px_rgb(0_0_0/0.06)]">
      <div className="flex items-center gap-[12px]">
        <span className="flex size-[46px] shrink-0 items-center justify-center rounded-[14px] bg-canvas-alt">
          <PartnerIcon name="user" size={20} color="#111216" strokeWidth={1.8} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-bold tracking-[-0.2px] text-ink">{cliente}</p>
          <p className="mt-[2px] truncate text-[12.5px] font-medium text-ink-muted">{itens}</p>
        </div>
        <div className="text-right">
          <p className="text-[15px] font-extrabold tracking-[-0.2px] text-ink">{total}</p>
          <p className="mt-[2px] text-[11px] font-medium text-ink-soft">{quando}</p>
        </div>
      </div>
      <div className="mt-[12px] flex items-center justify-between gap-[10px] border-t border-line pt-[12px]">
        <span className="flex min-w-0 items-center gap-[8px]">
          <Badge {...status} />
          <span className="truncate text-[12px] font-medium text-ink-soft">{pagamento}</span>
        </span>
        <span className="flex shrink-0 items-center gap-[2px] text-[12.5px] font-bold text-ink-muted">
          Ver detalhes
          <PartnerIcon name="chevron-right" size={13} strokeWidth={2.2} />
        </span>
      </div>
    </div>
  )
}
