import { cn } from '@mallevo/ui'
import { CourierIcon } from '../marca/CourierIcon'
import { RotaIlustrada } from './RotaIlustrada'

export interface Oferta {
  valor: string
  loja: string
  lojaEndereco: string
  clienteEndereco: string
}

/**
 * A entrega oferecida ao entregador (components/EntregaDisponivelCard.tsx):
 * o valor antes de tudo, de onde sai e para onde vai, o mapa ilustrado e as
 * duas respostas — recusar ou aceitar. `tocando` aperta o "Aceitar".
 */
export function CartaoOferta({
  oferta,
  tocando = false,
  className,
}: {
  oferta: Oferta
  tocando?: boolean
  className?: string
}) {
  return (
    <div className={cn('rounded-[28px] bg-surface-dark p-[16px] font-sistema', className)}>
      <div className="mb-[14px] flex items-center justify-between px-[4px] pt-[4px]">
        <div>
          <p className="mb-[4px] text-[11px] font-bold uppercase tracking-[0.7px] text-[#A4A7AD]">Oferta de entrega</p>
          <p className="text-[26px] font-extrabold tracking-[-0.5px] text-white">{oferta.valor}</p>
        </div>
        <span className="flex items-center gap-[6px] rounded-full bg-accent px-[12px] py-[7px]">
          <CourierIcon name="spark" size={13} color="#111216" />
          <span className="text-[11px] font-bold tracking-[0.2px] text-ink">Prioritária</span>
        </span>
      </div>

      <div className="relative mb-[14px] min-h-[152px] overflow-hidden rounded-[22px] bg-surface-dark-soft">
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[60%]">
          <RotaIlustrada />
        </div>
        <div className="relative p-[16px] pr-[96px]">
          <div className="flex items-start gap-[12px]">
            <span className="mt-[2px] flex size-[36px] shrink-0 items-center justify-center rounded-full bg-white/[0.08]">
              <CourierIcon name="store" size={16} color="#FFFFFF" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.6px] text-[#A4A7AD]">Coletar em</p>
              <p className="mt-[3px] truncate text-[14px] font-semibold text-white">{oferta.loja}</p>
              <p className="mt-[2px] truncate text-[11.5px] text-[#A4A7AD]">{oferta.lojaEndereco}</p>
            </div>
          </div>
          <span className="my-[8px] ml-[17px] block h-[18px] w-[2px] rounded-[1px] bg-white/10" />
          <div className="flex items-start gap-[12px]">
            <span className="mt-[2px] flex size-[36px] shrink-0 items-center justify-center rounded-full bg-accent">
              <CourierIcon name="pin" size={16} color="#111216" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.6px] text-[#A4A7AD]">Entregar em</p>
              <p className="mt-[3px] line-clamp-2 text-[12.5px] leading-[17px] text-[#D5D7DB]">{oferta.clienteEndereco}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-[10px]">
        <span className="flex flex-1 items-center justify-center rounded-full bg-white/[0.08] py-[13px] text-[13px] font-semibold text-[#BFC2C8]">
          Recusar
        </span>
        <span
          className={cn(
            'flex flex-[1.4] items-center justify-center rounded-full bg-accent py-[13px] text-[13px] font-extrabold tracking-[0.2px] text-ink transition-[transform,opacity] duration-200',
            tocando && 'scale-[0.96] opacity-60',
          )}
        >
          Aceitar entrega
        </span>
      </div>
    </div>
  )
}
