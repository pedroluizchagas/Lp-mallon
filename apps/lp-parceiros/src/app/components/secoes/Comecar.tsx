import { BlurIn, RevealLines, StackedCards, cn } from '@mallevo/ui'
import { LINKS } from '../../lib/links'
import { PartnerIcon, type PartnerIconName } from '../marca/PartnerIcon'
import { Botao } from '../ui/Botao'
import { Sobrelinha } from '../ui/Sobrelinha'

interface Etapa {
  titulo: string
  texto: string
  itens: string[]
  escuro: boolean
  visual: React.ReactNode
}

const ETAPAS: Etapa[] = [
  {
    titulo: 'Cadastre a loja',
    texto:
      'Doze perguntas, uma por tela: seus dados, o CNPJ, o tipo de negócio, o estilo da vitrine, o nome, o endereço e o plano. No fim, o painel abre — e o endereço da loja na web já existe.',
    itens: ['Só pessoa jurídica (CNPJ)', 'O painel se monta pelo tipo de negócio', '15 dias de teste, sem cartão'],
    escuro: true,
    visual: <VisualCadastro />,
  },
  {
    titulo: 'Ative os recebimentos',
    texto:
      'É a conta onde a sua parte de cada venda cai. A Pagar.me verifica os dados, e a partir daí o cliente paga no app com Pix ou cartão — a comissão de R$ 1,00 já sai separada no pagamento.',
    itens: ['Verificação pela Pagar.me', 'Pix ou cartão em até 12x para o cliente', 'Saldo disponível e a receber no painel'],
    escuro: false,
    visual: <VisualRecebimentos />,
  },
  {
    titulo: 'Monte o catálogo',
    texto:
      'Produtos com foto, preço e categoria — ou a planilha inteira de uma vez, por CSV. Variações, adicionais e estoque aparecem quando o seu ramo pede.',
    itens: ['Importação e exportação por CSV', 'Variações e adicionais', 'Disponível ou esgotado com um toque'],
    escuro: true,
    visual: <VisualCatalogo />,
  },
  {
    titulo: 'Horários e entrega',
    texto:
      'Diga quando a loja abre, quanto custa a entrega e quanto tempo ela leva. Pronto: a loja acende no shopping, e o primeiro pedido chega com som.',
    itens: ['Grade da semana', 'Taxa e tempo de entrega definidos por você', 'Pausar a loja quando precisar'],
    escuro: false,
    visual: <VisualHorarios />,
  },
]

/** Como começar — os quatro passos de verdade, empilhados como folhas. */
export function Comecar() {
  return (
    <section id="comecar" className="relative px-3 md:px-6">
      <div className="mx-auto max-w-[1440px] px-2 pb-6 pt-6 lg:pb-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Sobrelinha tom="claro">Como começar</Sobrelinha>
            <RevealLines
              as="h2"
              className="mt-6 text-[clamp(36px,5.8vw,100px)] font-semibold leading-[0.95] tracking-[-0.045em] text-ink"
              lines={[
                'Da porta fechada',
                <span key="acesa" className="italic">
                  <span className="marca-texto">ao primeiro pedido.</span>
                </span>,
              ]}
            />
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <BlurIn delay={0.1}>
              <p className="text-[17px] leading-[1.65] text-ink-muted">
                O cadastro é pelo navegador; o resto, o painel vai pedindo num checklist — e mostra o quanto falta para a
                loja abrir.
              </p>
            </BlurIn>
          </div>
        </div>
      </div>

      <StackedCards cardClassName="rounded-[28px] md:rounded-[40px]">
        {ETAPAS.map((etapa, i) => (
          <article
            key={etapa.titulo}
            data-tema={etapa.escuro ? 'escuro' : 'claro'}
            className={cn(
              'mx-auto grid h-[min(82svh,720px)] w-full max-w-[1400px] grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-[28px] md:grid-cols-2 md:grid-rows-1 md:rounded-[40px]',
              etapa.escuro ? 'bg-marquee text-white' : 'bg-white text-ink ring-1 ring-ink/[0.06]',
            )}
          >
            <div className="relative flex min-h-0 flex-col p-6 md:p-10 lg:p-14">
              {etapa.escuro && <div aria-hidden className="glow-marquise absolute inset-0" />}
              <span className={cn('relative font-mono text-[13px]', etapa.escuro ? 'text-white/55' : 'text-ink-muted')}>
                {`{0${i + 1}}`}
              </span>
              <h3 className="relative mt-4 text-[clamp(34px,4.2vw,72px)] font-semibold leading-[0.95] tracking-[-0.045em] md:mt-6">
                {etapa.titulo}
              </h3>
              <p
                className={cn(
                  'relative mt-4 max-w-[46ch] text-[15px] leading-[1.6] md:mt-6 md:text-[17px]',
                  etapa.escuro ? 'text-white/66' : 'text-ink-muted',
                )}
              >
                {etapa.texto}
              </p>
              <ul className="relative mt-auto hidden space-y-2.5 pt-8 text-[15px] font-semibold md:block">
                {etapa.itens.map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span
                      className={cn(
                        'flex size-5 shrink-0 items-center justify-center rounded-full',
                        etapa.escuro ? 'bg-accent' : 'bg-ink',
                      )}
                    >
                      <PartnerIcon name="check" size={11} color={etapa.escuro ? '#111216' : '#D8FF3E'} strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              {i === 0 && (
                <div className="relative mt-6 md:mt-8">
                  <Botao href={LINKS.cadastro} externo>
                    Começar o cadastro
                  </Botao>
                </div>
              )}
            </div>
            <div
              className={cn(
                // No celular a mini-tela vem embaixo do texto, um pouco menor; em tela baixa, sai.
                'relative flex min-h-0 items-start justify-center overflow-hidden px-5 pb-6 max-md:[@media(max-height:719px)]:hidden md:items-center md:p-10',
                etapa.escuro ? 'bg-white/[0.03]' : 'bg-canvas',
              )}
            >
              <div className="flex w-full origin-top scale-[0.86] justify-center md:scale-100">{etapa.visual}</div>
            </div>
          </article>
        ))}
      </StackedCards>

      <div className="h-24 lg:h-32" />
    </section>
  )
}

// ─── As mini-telas de cada passo ───────────────────────────────────────

/** O passo 9 do cadastro (apps/web · onboarding/fluxo.tsx), na fachada escura. */
function VisualCadastro() {
  return (
    <div className="w-full max-w-[420px] rounded-[24px] border border-white/10 bg-[#0c0c0e] p-7 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)]">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">Passo 09 · 12</p>
      <p className="mt-3 text-[26px] font-semibold leading-tight tracking-[-0.02em]">Qual o nome da sua loja?</p>
      <div className="mt-6 flex h-14 items-center rounded-[14px] border border-[rgb(193_241_72/0.4)] bg-white/[0.04] px-4 text-[18px] font-medium">
        Café Aroma
        <span className="ml-0.5 h-5 w-[2px] animate-pulso bg-glow" />
      </div>
      <p className="mt-3 font-mono text-[12.5px] text-white/60">cafe-aroma.mallevo.com.br</p>
      <div className="mt-8 flex items-center justify-between">
        <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
          <span className="block h-full w-3/4 rounded-full bg-glow" />
        </span>
        <span className="ml-4 rounded-full bg-glow px-5 py-2.5 text-[13.5px] font-bold text-ink">Continuar</span>
      </div>
    </div>
  )
}

const CHECKLIST: { titulo: string; descricao: string; icone: PartnerIconName; feito: boolean }[] = [
  { titulo: 'Configurar recebimentos', descricao: 'Conclua a verificação Pagar.me para receber pagamentos.', icone: 'wallet', feito: true },
  { titulo: 'Cadastrar produtos', descricao: 'Adicione seu catálogo para começar a vender.', icone: 'package', feito: false },
  { titulo: 'Horários de funcionamento', descricao: 'Configure quando sua loja estará aberta para pedidos.', icone: 'clock', feito: false },
  { titulo: 'Configurar entrega', descricao: 'Defina taxa e tempo médio.', icone: 'truck', feito: false },
]

/** O checklist do painel (components/dashboard/setup-wizard.tsx). */
function VisualRecebimentos() {
  return (
    <div className="w-full max-w-[440px] space-y-3">
      <div className="relative overflow-hidden rounded-[18px] bg-ink p-6 text-white">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">Configuração da loja</p>
        <p className="mt-2 flex items-end gap-1.5">
          <span className="text-[48px] font-semibold leading-none tracking-[-0.04em]">25</span>
          <span className="mb-1 text-[20px] font-semibold text-white/50">%</span>
        </p>
        <p className="mt-2 text-[13px] text-white/50">
          <span className="text-white/85">1</span> de <span className="text-white/85">4</span> etapas concluídas
        </p>
      </div>
      {CHECKLIST.map((item) => (
        <div key={item.titulo} className="flex items-center gap-3 rounded-[16px] bg-white p-4 shadow-[0_4px_12px_rgb(0_0_0/0.05)] ring-1 ring-ink/[0.05]">
          <span className={cn('flex size-10 shrink-0 items-center justify-center rounded-[12px]', item.feito ? 'bg-ink text-accent' : 'bg-canvas text-ink')}>
            <PartnerIcon name={item.feito ? 'check' : item.icone} size={18} strokeWidth={item.feito ? 2.6 : 1.9} />
          </span>
          <span className="min-w-0 flex-1">
            <span className={cn('block text-[14px] font-bold', item.feito ? 'text-ink-muted line-through' : 'text-ink')}>{item.titulo}</span>
            <span className="block truncate text-[12.5px] text-ink-muted">{item.descricao}</span>
          </span>
        </div>
      ))}
    </div>
  )
}

/** Um produto do cardápio e a importação por planilha. */
function VisualCatalogo() {
  return (
    <div className="w-full max-w-[420px] space-y-3">
      <div className="flex items-center justify-between rounded-[16px] border border-white/10 bg-white/[0.06] p-4">
        <span className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-[12px] bg-white/[0.08]">
            <PartnerIcon name="file" size={18} strokeWidth={1.9} />
          </span>
          <span>
            <span className="block text-[14px] font-bold">Importar produtos</span>
            <span className="block text-[12.5px] text-white/55">cardapio-cafe-aroma.csv</span>
          </span>
        </span>
        <span className="rounded-full bg-accent px-3 py-1 text-[12px] font-extrabold text-ink">8 itens</span>
      </div>
      {[
        { nome: 'Cappuccino Trio', preco: 'R$ 15,90', cat: 'Cafés', on: true },
        { nome: 'Cold Brew Tônica', preco: 'R$ 16,90', cat: 'Cafés', on: true },
        { nome: 'Croissant Amanteigado', preco: 'R$ 11,90', cat: 'Doces & fatias', on: false },
      ].map((p) => (
        <div key={p.nome} className="flex items-center gap-3 rounded-[16px] border border-white/10 bg-white/[0.04] p-4">
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[14.5px] font-bold">{p.nome}</span>
            <span className="block text-[12.5px] text-white/55">
              {p.cat} · {p.preco}
            </span>
          </span>
          <span className={cn('text-[11px] font-bold uppercase tracking-[0.08em]', p.on ? 'text-accent' : 'text-white/55')}>
            {p.on ? 'Disponível' : 'Esgotado'}
          </span>
          <span className={cn('flex h-6 w-10 items-center rounded-full p-0.5', p.on ? 'bg-accent' : 'bg-white/15')}>
            <span className={cn('size-5 rounded-full bg-white shadow transition-transform', p.on && 'translate-x-4')} />
          </span>
        </div>
      ))}
    </div>
  )
}

const SEMANA = [
  { dia: 'Seg a sex', horario: '07:00 – 19:00' },
  { dia: 'Sábado', horario: '08:00 – 14:00' },
  { dia: 'Domingo', horario: 'Fechado' },
]

/** Horários, entrega e a loja no ar (Configurações · Saúde da loja). */
function VisualHorarios() {
  return (
    <div className="w-full max-w-[420px] space-y-3">
      <div className="rounded-[16px] bg-white p-5 shadow-[0_4px_12px_rgb(0_0_0/0.05)] ring-1 ring-ink/[0.05]">
        <p className="micro text-ink-muted">Horários de funcionamento</p>
        <ul className="mt-3 divide-y divide-line">
          {SEMANA.map((d) => (
            <li key={d.dia} className="flex justify-between py-2.5 text-[14px]">
              <span className="font-semibold text-ink">{d.dia}</span>
              <span className={cn('font-mono', d.horario === 'Fechado' ? 'text-ink-muted' : 'text-ink')}>{d.horario}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-[16px] bg-white p-5 shadow-[0_4px_12px_rgb(0_0_0/0.05)] ring-1 ring-ink/[0.05]">
          <p className="micro text-ink-muted">Taxa de entrega</p>
          <p className="mt-2 text-[24px] font-semibold tracking-[-0.03em] text-ink">R$ 4,90</p>
        </div>
        <div className="rounded-[16px] bg-white p-5 shadow-[0_4px_12px_rgb(0_0_0/0.05)] ring-1 ring-ink/[0.05]">
          <p className="micro text-ink-muted">Tempo médio</p>
          <p className="mt-2 text-[24px] font-semibold tracking-[-0.03em] text-ink">25 min</p>
        </div>
      </div>
      <div className="flex items-center gap-3 rounded-[16px] bg-ink p-4 text-white">
        <span className="relative flex size-2.5">
          <span className="absolute inset-0 animate-pulso rounded-full bg-accent" />
        </span>
        <span className="text-[14px] font-semibold">
          <span className="font-mono text-accent">cafe-aroma.mallevo.com.br</span> no ar
        </span>
      </div>
    </div>
  )
}
