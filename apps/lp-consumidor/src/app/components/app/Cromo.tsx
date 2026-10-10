import { cn } from '@mallevo/ui'
import { ConsumerIcon, type ConsumerIconName } from '../marca/ConsumerIcon'

/** Barra de status do iOS (pontos do app). */
export function StatusBar({ tom = 'claro', className }: { tom?: 'claro' | 'escuro'; className?: string }) {
  const cor = tom === 'claro' ? '#FFFFFF' : '#111216'
  return (
    <div
      className={cn('absolute inset-x-0 top-0 z-40 flex h-[47px] items-center justify-between px-[34px] pt-[4px] font-sistema', className)}
      style={{ color: cor }}
    >
      <span className="text-[16px] font-semibold tracking-[-0.2px]">9:41</span>
      <span className="flex items-center gap-[6px]">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor">
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
          <rect x="10" y="3" width="3" height="9" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
          <path d="M8 2.2c2.3 0 4.4.9 6 2.4l1.1-1.2A10.2 10.2 0 0 0 8 .5 10.2 10.2 0 0 0 .9 3.4L2 4.6a8.6 8.6 0 0 1 6-2.4Zm0 3.4c1.4 0 2.6.5 3.6 1.4l1.1-1.2A6.9 6.9 0 0 0 8 3.9a6.9 6.9 0 0 0-4.7 1.9L4.4 7A5.2 5.2 0 0 1 8 5.6Zm0 3.4c.5 0 1 .2 1.3.5L8 11 6.7 9.5c.3-.3.8-.5 1.3-.5Z" />
        </svg>
        <span className="relative flex h-[12.5px] w-[26px] items-center rounded-[4px] border border-current/40 p-[1.5px]">
          <span className="h-full w-[78%] rounded-[2px] bg-current" />
          <span className="absolute -right-[3px] top-1/2 h-[4px] w-[1.5px] -translate-y-1/2 rounded-r bg-current/40" />
        </span>
      </span>
    </div>
  )
}

const ABAS: { nome: ConsumerIconName; rotulo: string }[] = [
  { nome: 'home', rotulo: 'Início' },
  { nome: 'reels', rotulo: 'Explorar' },
  { nome: 'orders', rotulo: 'Pedidos' },
  { nome: 'user', rotulo: 'Perfil' },
]

/** A cápsula de vidro escuro flutuante — a barra de abas do app. */
export function TabBar({ ativa }: { ativa: ConsumerIconName }) {
  return (
    <div className="absolute inset-x-[16px] bottom-[18px] z-40 flex h-[70px] items-center rounded-full border border-white/10 bg-[rgb(17_18_22/0.95)] px-[8px] shadow-[0_12px_24px_rgb(0_0_0/0.18)]">
      {ABAS.map((aba) => {
        const acesa = aba.nome === ativa
        return (
          <span key={aba.nome} className="flex flex-1 items-center justify-center">
            <ConsumerIcon
              name={aba.nome}
              size={22}
              color={acesa ? '#D8FF3E' : '#6B6E75'}
              strokeWidth={acesa ? 2.2 : 1.8}
            />
          </span>
        )
      })}
      <span className="pointer-events-none absolute inset-x-0 -bottom-[11px] mx-auto h-[5px] w-[134px] rounded-full bg-white/80" />
    </div>
  )
}
