import { cn } from '@mallevo/ui'
import { reais, resumoItens, type MetaStatus, type PedidoDemo } from '../../dados/balcao'
import { PartnerIcon } from '../marca/PartnerIcon'
import { BarraProgresso, CartaoVidro, MICRO_MUDO, PontoAoVivo } from './Vidro'

/**
 * Cartão de pedido AO VIVO (components/pedidos/CartaoPedidoVivo do app): o
 * pedido que pede a atenção do lojista, na marquise. Quem é o cliente, há
 * quanto tempo espera, o status por extenso, a barra e — quando o status
 * pede ação — o botão da ação, sem abrir o detalhe.
 */
export function CartaoPedidoVivo({
  pedido,
  meta,
  espera = 'agora',
  acao,
  tocando = false,
  className,
}: {
  pedido: PedidoDemo
  meta: MetaStatus
  espera?: string
  /** Rótulo da ação rápida (pílula accent no pé). */
  acao?: string
  /** O dedo do lojista no botão (estado pressionado + "Um instante…"). */
  tocando?: boolean
  className?: string
}) {
  return (
    <CartaoVidro className={className}>
      <div className="space-y-[12px]">
        <div className="flex items-center gap-[8px]">
          <PontoAoVivo apagado={!meta.pedeAcao} />
          <p className={cn(MICRO_MUDO, 'flex-1 truncate')}>{pedido.cliente}</p>
          <span className="text-[12px] font-extrabold text-accent">{espera === 'agora' ? 'agora' : `há ${espera}`}</span>
        </div>

        <div className="space-y-[3px]">
          <p className="truncate font-sans text-[20px] font-semibold leading-[24px] tracking-[-0.4px] text-white">
            {meta.rotuloLongo}
          </p>
          <p className="text-[13px] font-medium text-white/66">{meta.descricao}</p>
        </div>

        <div className="flex items-center gap-[10px]">
          <BarraProgresso valor={meta.progresso} />
          <span className="text-[11px] font-extrabold text-white/66">{Math.round(meta.progresso * 100)}%</span>
        </div>

        <div className="flex items-center gap-[12px]">
          <p className="flex-1 truncate text-[12.5px] font-medium text-white/66">{resumoItens(pedido.itens)}</p>
          <span className="text-[14px] font-extrabold tracking-[-0.2px] text-white">{reais(pedido.total)}</span>
          {!acao && (
            <span className="flex items-center gap-[2px] text-[12.5px] font-bold text-accent">
              Abrir
              <PartnerIcon name="chevron-right" size={13} strokeWidth={2.4} />
            </span>
          )}
        </div>

        {acao && (
          <span
            className={cn(
              'flex h-[44px] items-center justify-center gap-[6px] rounded-full bg-accent text-[14px] font-extrabold text-ink transition-[opacity,transform] duration-200',
              tocando && 'scale-[0.97] opacity-40',
            )}
          >
            <PartnerIcon name="check" size={16} strokeWidth={2.4} />
            {tocando ? 'Um instante…' : acao}
          </span>
        )}
      </div>
    </CartaoVidro>
  )
}

/** A linha de vidro de quando nenhum pedido espera o lojista (SemAcaoPendente). */
export function SemAcaoPendente() {
  return (
    <CartaoVidro className="p-[16px]">
      <div className="flex items-center gap-[12px]">
        <span className="flex size-[36px] items-center justify-center rounded-full bg-white/[0.13]">
          <PartnerIcon name="check-double" size={17} color="rgb(255 255 255 / 0.66)" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[14px] font-bold text-white">Nenhum pedido esperando você</p>
          <p className="mt-[2px] text-[12.5px] font-medium text-white/66">Pedidos novos chegam aqui com som e aviso.</p>
        </div>
      </div>
    </CartaoVidro>
  )
}
