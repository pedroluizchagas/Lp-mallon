import { cn } from '@mallevo/ui'
import { PartnerIcon, type PartnerIconName } from '../marca/PartnerIcon'

/**
 * As peças da marquise do app do lojista (components/marquise/Marquise.tsx),
 * em pontos do app: vidro fumê sobre o zinco, ícone de linha, accent só no
 * que está vivo. Só desenho — nada aqui é tocável (a tela é ilustração).
 */

/** Micro caps mudo da fachada (estiloMicroMudo). */
export const MICRO_MUDO = 'text-[11px] font-bold uppercase tracking-[1.2px] text-white/42'

/** O hero da marquise: sobrelinha, statement com a última linha acesa e a sublinha. */
export function Statement({
  sobrelinha,
  linha,
  acento,
  sublinha,
  tamanho = 'lg',
  className,
}: {
  sobrelinha: React.ReactNode
  linha: React.ReactNode
  acento?: React.ReactNode
  sublinha?: React.ReactNode
  tamanho?: 'lg' | 'md'
  className?: string
}) {
  return (
    <div className={cn('px-[24px] pt-[22px]', className)}>
      <p className={MICRO_MUDO}>{sobrelinha}</p>
      <p
        className={cn(
          'mt-[8px] font-sans font-semibold text-white',
          tamanho === 'lg' ? 'text-[30px] leading-[35px] tracking-[-0.7px]' : 'text-[24px] leading-[28px] tracking-[-0.5px]',
        )}
      >
        {linha}
        {acento && (
          <>
            <br />
            <span className="italic text-accent">{acento}</span>
          </>
        )}
      </p>
      {sublinha && <p className="mt-[8px] text-[13.5px] font-medium text-white/66">{sublinha}</p>}
    </div>
  )
}

/** Placa de vidro com número grande — um KPI na fachada. */
export function PlacaVidro({
  icone,
  valor,
  rotulo,
  alerta = false,
  className,
}: {
  icone: PartnerIconName
  valor: React.ReactNode
  rotulo: string
  /** Valor em accent (ex.: pedidos novos > 0). */
  alerta?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex min-w-0 flex-1 flex-col gap-[8px] rounded-[20px] border border-white/10 bg-white/[0.08] px-[12px] py-[14px]',
        className,
      )}
    >
      <PartnerIcon name={icone} size={16} color="#D8FF3E" strokeWidth={2} />
      <div className="min-w-0">
        <p
          className={cn(
            'truncate font-extrabold tracking-[-0.5px] tabular-nums transition-colors duration-500',
            alerta ? 'text-accent' : 'text-white',
          )}
          // Valor longo ("R$ 412,30") encolhe em vez de virar "R$ 41…".
          style={{ fontSize: String(valor).length >= 9 ? 16.5 : String(valor).length >= 8 ? 18 : 20 }}
        >
          {valor}
        </p>
        <p className="mt-px truncate text-[11px] font-semibold text-white/66">{rotulo}</p>
      </div>
    </div>
  )
}

/** Cartão de vidro fumê — o material do que está ao vivo na fachada. */
export function CartaoVidro({
  children,
  className,
  aceso = false,
}: {
  children: React.ReactNode
  className?: string
  aceso?: boolean
}) {
  return (
    <div
      className={cn(
        'rounded-[28px] border bg-white/[0.08] p-[18px]',
        aceso ? 'border-[rgb(216_255_62/0.34)]' : 'border-white/10',
        className,
      )}
    >
      {children}
    </div>
  )
}

/** Moeda redonda de vidro (voltar, telefone); `accent` = acesa. */
export function MoedaVidro({ icone, accent = false }: { icone: PartnerIconName; accent?: boolean }) {
  return (
    <span
      className={cn(
        'flex size-[40px] items-center justify-center rounded-full',
        accent ? 'bg-accent' : 'border border-white/10 bg-white/[0.08]',
      )}
    >
      <PartnerIcon name={icone} size={18} color={accent ? '#111216' : '#FFFFFF'} strokeWidth={2} />
    </span>
  )
}

/** Pílula de vidro — filtro curto sobre a fachada; ativa = accent sólido. */
export function PilulaVidro({ rotulo, icone, ativa = false }: { rotulo: string; icone?: PartnerIconName; ativa?: boolean }) {
  return (
    <span
      className={cn(
        'flex h-[34px] items-center gap-[6px] rounded-full border px-[14px] text-[13px] font-bold',
        ativa ? 'border-accent bg-accent text-ink' : 'border-white/10 bg-white/[0.08] text-white',
      )}
    >
      {icone && <PartnerIcon name={icone} size={13} strokeWidth={2.2} />}
      {rotulo}
    </span>
  )
}

/** Ponto accent respirando — o sinal de "ao vivo". */
export function PontoAoVivo({ apagado = false }: { apagado?: boolean }) {
  return (
    <span className={cn('size-[7px] shrink-0 rounded-full', apagado ? 'bg-white/66' : 'animate-pulso bg-accent')} />
  )
}

/** Barra de 4px sobre vidro, o preenchimento corre até `valor` (0–1). */
export function BarraProgresso({ valor, cor = '#D8FF3E' }: { valor: number; cor?: string }) {
  return (
    <span className="relative block h-[4px] flex-1 overflow-hidden rounded-full bg-white/[0.13]">
      <span
        className="absolute inset-y-0 left-0 rounded-full transition-[width,background-color] duration-700 ease-[var(--ease-entrada)]"
        style={{ width: `${Math.round(valor * 100)}%`, backgroundColor: cor }}
      />
    </span>
  )
}

/** O tijolo da loja: iniciais em ink sobre o accent da casa (TijoloLoja). */
export function TijoloLoja({ iniciais, tamanho = 28, raio = 14 }: { iniciais: string; tamanho?: number; raio?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center bg-accent font-extrabold tracking-[-0.5px] text-ink"
      style={{ width: tamanho, height: tamanho, borderRadius: raio, fontSize: Math.round(tamanho * 0.36) }}
    >
      {iniciais}
    </span>
  )
}

/** Seletor de loja escuro (pílula de vidro com o tijolo e o nome). */
export function SeletorLoja({ nome, iniciais }: { nome: string; iniciais: string }) {
  return (
    <span className="flex max-w-full items-center gap-[8px] self-start rounded-full border border-white/10 bg-white/[0.08] py-[6px] pl-[6px] pr-[14px]">
      <TijoloLoja iniciais={iniciais} />
      <span className="truncate text-[13.5px] font-bold text-white">{nome}</span>
    </span>
  )
}
