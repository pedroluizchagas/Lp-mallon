'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@mallevo/ui'
import type { ModeloPainel } from '../../dados/painel'
import { PartnerIcon, type PartnerIconName } from '../marca/PartnerIcon'

/** Tamanho de desenho do painel (px); a moldura escala por `--k`. */
export const PAINEL_W = 1240
export const PAINEL_H = 780
const BARRA = 44

interface Item {
  rotulo: string
  icone: PartnerIconName
  ativo?: boolean
  badge?: number
  sub?: string[]
}

/** A régua da sidebar do painel (components/dashboard/sidebar.tsx), por modelo. */
function grupos(modelo: ModeloPainel): { rotulo: string; itens: Item[] }[] {
  const operar: Item[] = [
    { rotulo: 'Início', icone: 'home', ativo: true },
    { rotulo: 'Pedidos', icone: 'bag', badge: 1 },
    {
      rotulo: 'Catálogo',
      icone: 'package',
      sub: [modelo.catalogo, 'Categorias', ...(modelo.modulos.estoque ? ['Estoque'] : [])],
    },
  ]
  if (modelo.modulos.entregadores) operar.push({ rotulo: 'Entregadores', icone: 'bike' })
  if (modelo.modulos.agenda) operar.push({ rotulo: 'Agenda', icone: 'calendar' })
  operar.push(
    { rotulo: 'Mensagens', icone: 'bell' },
    { rotulo: 'Avaliações', icone: 'star' },
    { rotulo: 'Conteúdo', icone: 'play' },
  )
  const minhaLoja: Item[] = [
    { rotulo: 'Vitrine', icone: 'store' },
    { rotulo: 'Configurações', icone: 'gear' },
    { rotulo: 'Tipo de loja', icone: 'tag' },
  ]
  if (modelo.modulos.agenda) minhaLoja.push({ rotulo: 'Profissionais', icone: 'users' })
  return [
    { rotulo: 'Operar', itens: operar },
    {
      rotulo: 'Analisar',
      itens: [
        { rotulo: 'Financeiro', icone: 'cash' },
        { rotulo: 'Relatórios', icone: 'chart' },
      ],
    },
    { rotulo: 'Minha loja', itens: minhaLoja },
    {
      rotulo: 'Conta',
      itens: [
        { rotulo: 'Minha conta', icone: 'user' },
        { rotulo: 'Central de ajuda', icone: 'help' },
      ],
    },
  ]
}

const MOVIMENTO = [1, 2, 1, 0, 1, 1, 2, 3, 2, 0, 0]
const HORAS = ['12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h']

const FILA = [
  { cliente: 'Maria Silva', id: '#a3f9c1', bairro: 'Centro', itens: 3, hora: '19:12', total: 'R$ 48,60', status: 'Novo' },
  { cliente: 'Bruno Teixeira', id: '#7be204', bairro: 'Bom Pastor', itens: 2, hora: '19:03', total: 'R$ 34,70', status: 'Em preparo' },
  { cliente: 'Camila Rocha', id: '#c51d88', bairro: 'Sidil', itens: 3, hora: '18:56', total: 'R$ 43,60', status: 'Saiu p/ entrega' },
] as const

const PILULA: Record<(typeof FILA)[number]['status'], string> = {
  Novo: 'bg-painel-brick text-painel-sidebar',
  'Em preparo': 'bg-[#fbe8a0] text-[#8a6a00]',
  'Saiu p/ entrega': 'bg-[#d1e1f5] text-[#2a4d7a]',
}

/**
 * A home do painel web do lojista (app/(dashboard)/page.tsx) com a régua
 * da sidebar montada pelo modelo do tipo de loja. Números de uma
 * loja-exemplo; a avaliação fica em "—" (sem avaliações, sem nota).
 */
export function TelaPainel({ modelo }: { modelo: ModeloPainel }) {
  return (
    <div
      className="flex flex-col overflow-hidden bg-painel-bg font-sans text-painel-ink"
      style={{ width: PAINEL_W, height: PAINEL_H }}
    >
      {/* Barra do navegador */}
      <div className="flex shrink-0 items-center gap-3 border-b border-painel-line bg-painel-bg-2 px-4" style={{ height: BARRA }}>
        <span className="flex gap-1.5">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </span>
        <span className="mx-auto flex w-[420px] items-center justify-center gap-2 rounded-lg bg-painel-bg px-3 py-1.5 text-[12.5px] text-painel-ink-3 ring-1 ring-painel-line">
          <PartnerIcon name="shield" size={13} strokeWidth={2.1} />
          app.mallevo.com.br
        </span>
        <span className="w-[52px]" />
      </div>

      <div className="flex min-h-0 flex-1">
        {/* Sidebar */}
        <aside className="flex w-[236px] shrink-0 flex-col bg-painel-sidebar px-[14px] py-[20px] text-painel-sidebar-ink">
          <div className="flex items-center gap-2.5 px-2 pb-[18px] pt-1">
            <span className="flex size-[34px] items-center justify-center rounded-[10px] bg-painel-brick text-[16px] font-extrabold tracking-tight text-painel-sidebar">
              M
            </span>
            <span>
              <span className="block text-[15px] font-bold tracking-tight">Mallevo</span>
              <span className="block text-[10px] text-painel-sidebar-ink/35">shopping de Divinópolis</span>
            </span>
          </div>
          <span className="mb-3 flex items-center gap-2 rounded-lg bg-white/[0.06] px-3 py-2 text-[12.5px] text-painel-sidebar-ink/55">
            <PartnerIcon name="search" size={14} strokeWidth={2} />
            Buscar…
            <span className="ml-auto rounded border border-white/10 px-1.5 text-[10px]">⌘K</span>
          </span>
          <nav className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden">
            {grupos(modelo).map((grupo) => (
              <div key={grupo.rotulo}>
                <p className="px-2.5 pb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-painel-sidebar-ink/35">{grupo.rotulo}</p>
                <AnimatePresence initial={false}>
                  {grupo.itens.map((item) => (
                    <motion.div
                      key={item.rotulo}
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <span
                        className={cn(
                          'flex items-center gap-2.5 rounded-lg px-2.5 py-[6px] text-[13px]',
                          item.ativo ? 'bg-white/[0.07] font-semibold text-painel-sidebar-ink' : 'text-painel-sidebar-ink/55',
                        )}
                      >
                        <PartnerIcon name={item.icone} size={15} strokeWidth={item.ativo ? 2.1 : 1.8} />
                        {item.rotulo}
                        {item.badge ? (
                          <span className="ml-auto rounded-full bg-painel-brick px-1.5 text-[10px] font-bold text-painel-sidebar">
                            {item.badge}
                          </span>
                        ) : null}
                        {item.sub && <PartnerIcon name="chevron-down" size={13} className="ml-auto opacity-60" />}
                      </span>
                      {item.sub && (
                        <span className="ml-[30px] flex flex-col border-l border-white/[0.06] pl-2.5">
                          {item.sub.map((s) => (
                            <motion.span
                              key={s}
                              layout
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="py-[3px] text-[12.5px] text-painel-sidebar-ink/45"
                            >
                              {s}
                            </motion.span>
                          ))}
                        </span>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ))}
          </nav>
        </aside>

        {/* Conteúdo */}
        <main className="min-w-0 flex-1 overflow-hidden bg-painel-bg-2 p-8">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <p className="text-[30px] font-bold leading-tight tracking-[-0.02em]">Olá, Helena!</p>
              <p className="mt-1 text-[14px] text-painel-ink-3">Aqui está a visão geral do seu negócio.</p>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="flex size-[38px] items-center justify-center rounded-full border border-painel-line bg-painel-bg">
                <PartnerIcon name="bell" size={15} strokeWidth={1.9} />
              </span>
              <span className="flex items-center gap-2.5 rounded-full border border-painel-line bg-painel-bg py-1 pl-1 pr-3.5">
                <span className="flex size-8 items-center justify-center rounded-full bg-painel-brick-lt text-[12px] font-bold">HD</span>
                <span className="text-[12px] font-bold">Helena Duarte</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-[16px]">
            <Kpi rotulo="Receita hoje" prefixo="R$" valor="457,20" icone="cash" spark />
            <Kpi rotulo="Pedidos hoje" valor="12" icone="bag" spark />
            <Kpi rotulo="Ticket médio" prefixo="R$" valor="38,10" icone="chart" />
            <Kpi rotulo="Avaliação" valor="—" sufixo="/ 5,0" icone="star" />
          </div>

          <div className="mt-[16px] grid grid-cols-3 gap-[16px]">
            <Cartao className="col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="flex items-center gap-2 text-[16px] font-bold tracking-tight">
                    Fila de pedidos
                    <span className="size-2 animate-pulso rounded-full bg-painel-brick" />
                  </p>
                  <p className="mt-0.5 text-[11.5px] text-painel-ink-3">4 ativos · atualizando em tempo real</p>
                </div>
                <span className="rounded-full border border-painel-line px-3 py-1 text-[11.5px] font-semibold">Ver todos →</span>
              </div>
              <div className="mb-4 grid grid-cols-3 gap-2.5">
                <Balde rotulo="Novos" n={1} classe="bg-painel-brick text-painel-sidebar" />
                <Balde rotulo="Em preparo" n={2} classe="bg-[#fbe8a0] text-[#8a6a00]" />
                <Balde rotulo="Saiu p/ entrega" n={1} classe="bg-[#d1e1f5] text-[#2a4d7a]" />
              </div>
              <div className="space-y-2">
                {FILA.map((o) => (
                  <div key={o.id} className="flex items-center gap-3 rounded-[14px] bg-painel-bg-2 px-3.5 py-2.5">
                    <span className="flex size-[32px] items-center justify-center rounded-full bg-painel-bg-3 text-[11px] font-bold">
                      {o.cliente
                        .split(' ')
                        .map((p) => p[0])
                        .join('')}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2 text-[12.5px] font-bold">
                        {o.cliente}
                        <span className="font-mono text-[10.5px] font-normal text-painel-ink-3">{o.id}</span>
                      </span>
                      <span className="mt-0.5 flex items-center gap-1 text-[10.5px] text-painel-ink-3">
                        <PartnerIcon name="pin" size={10} />
                        {o.bairro} · {o.itens} itens · {o.hora}
                      </span>
                    </span>
                    <span className="text-right">
                      <span className="block text-[13px] font-bold">{o.total}</span>
                      <span className={cn('mt-0.5 inline-block rounded-full px-2 py-px text-[10px] font-bold', PILULA[o.status])}>
                        {o.status}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </Cartao>

            <Cartao>
              <p className="text-[16px] font-bold tracking-tight">Movimento do dia</p>
              <p className="text-[11.5px] text-painel-ink-3">pedidos por hora</p>
              <div className="mt-6 flex h-[132px] items-end gap-[7px]">
                {MOVIMENTO.map((n, i) => (
                  <span key={HORAS[i]} className="flex flex-1 flex-col items-center gap-1.5">
                    <span
                      className={cn('w-full rounded-[4px]', i === 7 ? 'bg-painel-brick' : 'bg-painel-bg-3')}
                      style={{ height: `${Math.max(6, n * 36)}px` }}
                    />
                    <span className="text-[9px] text-painel-ink-3">{HORAS[i]}</span>
                  </span>
                ))}
              </div>
              <div className="mt-4 flex justify-between border-t border-painel-line pt-4">
                <div>
                  <p className="text-[9.5px] font-semibold uppercase tracking-wider text-painel-ink-3">Pico</p>
                  <p className="text-[13px] font-bold">
                    19h <span className="font-normal text-painel-ink-3">· 3</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[9.5px] font-semibold uppercase tracking-wider text-painel-ink-3">Agora</p>
                  <p className="text-[13px] font-bold">3 pedidos</p>
                </div>
              </div>
            </Cartao>
          </div>

          <Cartao className="mt-[16px]">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[15px] font-bold tracking-tight">Saúde da loja</p>
              <span className="font-mono text-[10px] text-painel-ink-3">tudo certo</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                'Recebimentos verificados',
                `8 itens em ${modelo.catalogo}`,
                'Horários configurados',
                modelo.modulos.entregadores ? 'Entrega configurada' : 'Agenda aberta',
                'cafe-aroma.mallevo.com.br no ar',
              ].map((aviso) => (
                <span
                  key={aviso}
                  className="inline-flex items-center gap-2 rounded-full border border-painel-line bg-painel-ok-lt py-1.5 pl-2.5 pr-3 text-[11.5px] font-semibold text-painel-ink-2"
                >
                  <PartnerIcon name="check-circle" size={13} className="text-painel-ok" strokeWidth={2.2} />
                  {aviso}
                </span>
              ))}
            </div>
          </Cartao>
        </main>
      </div>
    </div>
  )
}

function Cartao({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('rounded-[20px] border border-painel-line bg-painel-bg p-[20px]', className)}>{children}</div>
}

function Kpi({
  rotulo,
  valor,
  prefixo,
  sufixo,
  icone,
  spark = false,
}: {
  rotulo: string
  valor: string
  prefixo?: string
  sufixo?: string
  icone: PartnerIconName
  spark?: boolean
}) {
  return (
    <Cartao>
      <div className="mb-2.5 flex items-start justify-between">
        <p className="text-[12.5px] font-medium text-painel-ink-2">{rotulo}</p>
        <span className="flex size-7 items-center justify-center rounded-full bg-painel-bg-2 text-painel-ink-2">
          <PartnerIcon name={icone} size={14} strokeWidth={1.8} />
        </span>
      </div>
      <p className="flex items-baseline gap-1.5">
        {prefixo && <span className="text-[16px] font-bold">{prefixo}</span>}
        <span className="text-[30px] font-bold leading-none tracking-[-0.02em]">{valor}</span>
        {sufixo && <span className="text-[12px] text-painel-ink-3">{sufixo}</span>}
      </p>
      {spark ? (
        <svg viewBox="0 0 100 28" className="mt-3 h-7 w-full" preserveAspectRatio="none" aria-hidden>
          <path d="M0 24 L14 22 L28 23 L42 18 L56 19 L70 12 L84 8 L100 10" fill="none" stroke="#c1f148" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
      ) : (
        <span className="mt-3 block h-7" />
      )}
    </Cartao>
  )
}

function Balde({ rotulo, n, classe }: { rotulo: string; n: number; classe: string }) {
  return (
    <span className={cn('rounded-[12px] px-3 py-2.5', classe)}>
      <span className="block text-[11px] font-semibold opacity-80">{rotulo}</span>
      <span className="block text-[22px] font-bold leading-tight">{n}</span>
    </span>
  )
}
