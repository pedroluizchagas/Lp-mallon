import { cn } from '@mallevo/ui'
import { CourierIcon, type CourierIconName } from '../marca/CourierIcon'
import { StatusBar } from './Cromo'

export type EtapaCadastro = 1 | 2 | 3 | 4 | 'analise'

/** O `labelStyle` do cadastro (credenciais.tsx). */
const ROTULO = 'mb-[8px] text-[13px] font-semibold uppercase tracking-[0.4px] text-[#A4A7AD]'

/**
 * O cadastro do app do entregador ((auth)/cadastro/*): quatro telas escuras
 * com a barra de etapas no topo — conta, dados pessoais, veículo,
 * documentos — e, depois do envio, "Cadastro em análise"
 * (aguardando-aprovacao.tsx), que confere o status sozinha a cada 15 s.
 *
 * O app ainda oferece "A pé" na etapa do veículo; a opção sai daqui porque
 * o Mallevo não vai mantê-la.
 */
export function TelaCadastro({ etapa }: { etapa: EtapaCadastro }) {
  return (
    <div className="relative h-[844px] w-[390px] overflow-hidden bg-surface-dark font-sistema text-white">
      <StatusBar tom="claro" />
      {etapa === 'analise' ? <Analise /> : <Etapa etapa={etapa} />}
    </div>
  )
}

function Etapa({ etapa }: { etapa: 1 | 2 | 3 | 4 }) {
  return (
    <div className="px-[24px] pt-[60px]">
      <span className="mb-[32px] flex size-[24px] items-center">
        <CourierIcon name="back" size={24} color="#FFFFFF" />
      </span>
      <div className="mb-[28px] flex gap-[6px]">
        {[1, 2, 3, 4].map((i) => (
          <span key={i} className={cn('h-[3px] flex-1 rounded-full', i <= etapa ? 'bg-accent' : 'bg-line-dark')} />
        ))}
      </div>

      {etapa === 1 && (
        <>
          <Titulo titulo="Criar conta" sub="Defina o email e a senha para acessar o app." />
          <Campo rotulo="Email" valor="joao.silva@email.com" />
          <Campo rotulo="Senha" valor="••••••••" icone="eye" />
          <Campo rotulo="Confirmar senha" valor="••••••••" />
        </>
      )}
      {etapa === 2 && (
        <>
          <Titulo titulo="Dados pessoais" sub="Suas informações serão usadas para verificar sua identidade." />
          <Campo rotulo="Nome completo" valor="João Silva" />
          <Campo rotulo="CPF" valor="000.000.000-00" vazio />
          <Campo rotulo="Telefone (WhatsApp)" valor="(37) 99999-9999" vazio />
        </>
      )}
      {etapa === 3 && (
        <>
          <Titulo titulo="Seu veículo" sub="Informe como você fará as entregas." />
          <p className={ROTULO}>Tipo de veículo</p>
          <div className="mb-[28px] flex flex-wrap gap-[10px]">
            {['Moto', 'Bicicleta', 'Carro'].map((v) => (
              <span
                key={v}
                className={cn(
                  'rounded-[20px] border-[1.5px] px-[22px] py-[13px] text-[14px] font-semibold',
                  v === 'Moto'
                    ? 'border-accent bg-[rgb(216_255_62/0.18)] text-accent'
                    : 'border-line-dark bg-surface-dark-soft text-[#A4A7AD]',
                )}
              >
                {v}
              </span>
            ))}
          </div>
          <Campo rotulo="Placa" valor="ABC-1234" vazio />
        </>
      )}
      {etapa === 4 && (
        <>
          <Titulo titulo="Documentos e foto" sub="Necessários para verificar sua identidade e aprovar seu cadastro." />
          <p className={ROTULO}>Foto de perfil</p>
          <span className="mb-[28px] flex size-[88px] flex-col items-center justify-center gap-[6px] rounded-full border-2 border-dashed border-line-dark">
            <CourierIcon name="user" size={22} color="#8B8E94" />
            <span className="text-[10px] text-[#A4A7AD]">Adicionar</span>
          </span>
          <Campo rotulo="Número da CNH" valor="00000000000" vazio />
          <p className={cn(ROTULO, 'mb-[4px]')}>
            Foto da CNH
            <span className="ml-[8px] text-[11px] font-normal normal-case tracking-normal text-[#A4A7AD]">opcional</span>
          </p>
          <span className="mb-[36px] mt-[8px] flex h-[52px] items-center justify-center rounded-[20px] border-[1.5px] border-dashed border-line-dark bg-surface-dark-soft text-[14px] font-semibold text-[#A4A7AD]">
            Toque para adicionar
          </span>
        </>
      )}

      <span className="flex h-[56px] items-center justify-center rounded-full bg-accent text-[16px] font-extrabold text-ink">
        {etapa === 4 ? 'Enviar cadastro' : 'Próximo'}
      </span>
    </div>
  )
}

function Titulo({ titulo, sub }: { titulo: string; sub: string }) {
  return (
    <>
      <p className="mb-[8px] text-[26px] font-extrabold tracking-[-0.4px]">{titulo}</p>
      <p className="mb-[32px] text-[15px] leading-[22px] text-[#A4A7AD]">{sub}</p>
    </>
  )
}

function Campo({
  rotulo,
  valor,
  vazio = false,
  icone,
}: {
  rotulo: string
  valor: string
  /** Ainda no placeholder. */
  vazio?: boolean
  icone?: CourierIconName
}) {
  return (
    <>
      <p className={ROTULO}>{rotulo}</p>
      <p
        className={cn(
          'mb-[16px] flex h-[54px] items-center justify-between rounded-[20px] border-[1.5px] border-line-dark bg-surface-dark-soft px-[18px] text-[16px]',
          vazio ? 'text-[#A4A7AD]' : 'text-white',
        )}
      >
        {valor}
        {icone && <CourierIcon name={icone} size={20} color="#8B8E94" />}
      </p>
    </>
  )
}

/**
 * "Próximos passos" da tela de análise. O app também lista "Notificação
 * enviada por email ao aprovar" — o aviso ainda não existe, então fica de
 * fora, assim como o "você receberá uma notificação" do texto.
 */
const PASSOS: { icone: CourierIconName; rotulo: string }[] = [
  { icone: 'shield', rotulo: 'Documentação verificada pela nossa equipe' },
  { icone: 'wallet', rotulo: 'Configure sua conta de recebimentos' },
  { icone: 'route', rotulo: 'Pronto para receber entregas' },
]

function Analise() {
  return (
    <div className="px-[24px] pt-[72px]">
      <span className="mb-[36px] inline-flex items-center gap-[7px] rounded-full border border-[rgb(242_184_75/0.25)] bg-[rgb(242_184_75/0.12)] px-[12px] py-[6px]">
        <span className="size-[6px] animate-pulso rounded-full bg-warning" />
        <span className="text-[11px] font-bold uppercase tracking-[0.8px] text-warning">Em análise</span>
      </span>
      <span className="mb-[24px] flex size-[68px] items-center justify-center rounded-[28px] border border-line-dark bg-surface-dark-soft">
        <CourierIcon name="shield" size={30} color="#F2B84B" strokeWidth={1.6} />
      </span>
      <p className="mb-[12px] text-[30px] font-extrabold leading-[36px] tracking-[-0.6px]">
        Cadastro
        <br />
        em análise
      </p>
      <p className="mb-[36px] text-[15px] leading-[22px] text-[#A4A7AD]">
        Recebemos seus dados e estamos verificando seu cadastro. Assim que for aprovado, o app libera as entregas.
      </p>
      <div className="mb-[12px] rounded-[28px] border border-line-dark bg-surface-dark-soft p-[20px]">
        <p className="mb-[22px] text-[11px] font-bold uppercase tracking-[1px] text-[#A4A7AD]">Próximos passos</p>
        {PASSOS.map((p, i) => {
          const ultimo = i === PASSOS.length - 1
          return (
            <div key={p.rotulo} className="flex gap-[14px]">
              <div className="flex w-[34px] flex-col items-center">
                <span className="flex size-[34px] items-center justify-center rounded-[14px] border border-line-dark bg-surface-dark">
                  <CourierIcon name={p.icone} size={16} color="#8B8E94" strokeWidth={1.8} />
                </span>
                {!ultimo && <span className="my-[4px] min-h-[18px] w-px flex-1 bg-line-dark" />}
              </div>
              <p className={cn('flex-1 pt-[8px] text-[14px] text-[#A4A7AD]', !ultimo && 'pb-[18px]')}>{p.rotulo}</p>
            </div>
          )
        })}
      </div>
      <p className="mb-[44px] flex items-center gap-[10px] rounded-[20px] border border-line-dark bg-surface-dark-soft px-[16px] py-[13px] text-[13px] text-[#A4A7AD]">
        <span className="size-[7px] animate-pulso rounded-full bg-accent opacity-70" />
        Verificando status automaticamente…
      </p>
      <p className="flex items-center justify-center gap-[8px] text-[14px] text-[#A4A7AD]">
        <CourierIcon name="logout" size={15} color="#8B8E94" strokeWidth={1.8} />
        Sair da conta
      </p>
    </div>
  )
}
