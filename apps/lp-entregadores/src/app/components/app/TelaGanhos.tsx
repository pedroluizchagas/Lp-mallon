import { cn } from '@mallevo/ui'
import { GANHOS_DEMO } from '../../dados/rua'
import { CourierIcon } from '../marca/CourierIcon'
import { StatusBar, TabBar } from './Cromo'

/**
 * A aba Ganhos ((tabs)/ganhos.tsx) de um entregador cujos recebimentos
 * ainda não estão ativos — o estado de todo cadastro novo: sem o cartão de
 * saldo e sem "Próximo repasse", só o que ele ganhou por entrega, no
 * período escolhido, e o histórico.
 */
export function TelaGanhos({ destaque = false }: { destaque?: boolean }) {
  const { periodo, entregas, total } = GANHOS_DEMO
  const media = Math.round(total / entregas.length)
  return (
    <div className="relative h-[844px] w-[390px] overflow-hidden bg-rua-canvas font-sistema text-ink">
      <StatusBar />
      <div className="px-[16px] pb-[20px] pt-[60px]">
        <p className="text-[28px] font-extrabold tracking-[-0.5px]">Ganhos</p>
      </div>

      <div className="mx-[16px] mb-[12px] flex gap-[2px] rounded-[28px] bg-white p-[4px]">
        {['Hoje', '7 dias', 'Mês'].map((p) => (
          <span
            key={p}
            className={cn(
              'flex h-[38px] flex-1 items-center justify-center rounded-[20px] text-[13px] font-bold',
              p === periodo ? 'bg-ink text-accent' : 'text-[#6B6E75]',
            )}
          >
            {p}
          </span>
        ))}
      </div>

      <div className="mx-[16px] mb-[12px] flex gap-[8px]">
        <Kpi rotulo="Ganhos" valor={reais(total)} />
        <Kpi
          rotulo="Entregas"
          valor={
            <>
              {entregas.length}
              <span className="text-[13px] font-normal text-[#6B6E75]">/{entregas.length}</span>
            </>
          }
        />
        <Kpi rotulo="Média" valor={reais(media)} sucesso />
      </div>

      <div className="mx-[16px]">
        <p className="mb-[10px] mt-[12px] text-[11px] font-bold uppercase tracking-[0.7px] text-[#6B6E75]">Histórico</p>
        <div className="space-y-[8px]">
          {entregas.map((e, i) => (
            <div
              key={e.quando}
              className={cn(
                'flex items-center justify-between rounded-[28px] bg-white px-[16px] py-[14px] transition-shadow duration-700',
                destaque && i === 0 && 'shadow-[0_0_0_2px_#D8FF3E]',
              )}
            >
              <div className="mr-[12px] flex flex-1 items-center gap-[12px]">
                <span className="flex size-[40px] items-center justify-center rounded-[14px] bg-rua-canvas-alt">
                  <CourierIcon name="package" size={17} color="#5E6168" strokeWidth={1.8} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-semibold">{e.loja}</p>
                  <p className="mt-[2px] text-[12px] text-[#6B6E75]">{e.quando}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-[5px]">
                <p className="text-[14px] font-bold">{reais(e.valor)}</p>
                <span className="rounded-full bg-[rgb(142_209_79/0.094)] px-[8px] py-[3px] text-[11px] font-bold text-[#3E7A1C]">
                  Entregue
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <TabBar ativa="wallet" />
    </div>
  )
}

function Kpi({ rotulo, valor, sucesso = false }: { rotulo: string; valor: React.ReactNode; sucesso?: boolean }) {
  return (
    <div className="flex-1 rounded-[28px] bg-white p-[16px]">
      <p className="mb-[6px] text-[11px] font-semibold uppercase tracking-[0.5px] text-[#6B6E75]">{rotulo}</p>
      <p className={cn('text-[20px] font-extrabold tracking-[-0.4px]', sucesso ? 'text-[#4A8A22]' : 'text-ink')}>{valor}</p>
    </div>
  )
}

/** "R$ 19,70" — montado à mão: o mesmo texto no servidor e no navegador. */
function reais(centavos: number) {
  const [inteiro, fracao] = (centavos / 100).toFixed(2).split('.')
  return `R$ ${inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.')},${fracao}`
}
