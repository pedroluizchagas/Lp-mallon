import Link from 'next/link'
import { EMPRESA } from '../../dados/empresa'
import { dois } from '../../lib/divinopolis'
import { Cabecalho } from '../secoes/Cabecalho'
import { Rodape } from '../secoes/Rodape'
import { Sobrelinha } from '../ui/Sobrelinha'
import { IndiceLegal } from './IndiceLegal'

export interface SecaoLegal {
  id: string
  titulo: string
  conteudo: React.ReactNode
}

/**
 * Moldura dos documentos legais (Termos de Uso, Política de Privacidade):
 * a folha clara da landing, um resumo em linguagem simples, o índice que
 * acompanha a leitura e o texto completo numerado. São as URLs que os apps
 * abrem e que as lojas de aplicativos exigem públicas, sem login.
 */
export function DocumentoLegal({
  titulo,
  acesa,
  vigencia,
  resumo,
  secoes,
  outro,
}: {
  titulo: string
  /** Trecho final do título, na linha acesa (marca-texto). */
  acesa: string
  vigencia: string
  resumo: React.ReactNode[]
  secoes: SecaoLegal[]
  outro: { href: string; rotulo: string }
}) {
  return (
    <>
      <Cabecalho />
      <main data-tema="claro" className="vidro-fosco min-h-screen">
        <header id="topo" className="mx-auto max-w-[1320px] px-5 pb-14 pt-32 md:px-8 md:pt-40 lg:pb-20">
          <Sobrelinha tom="claro">Documento legal</Sobrelinha>
          <h1 className="mt-6 text-[clamp(44px,7vw,112px)] font-semibold leading-[0.94] tracking-[-0.045em] text-ink">
            {titulo}{' '}
            <span className="italic">
              <span className="marca-texto">{acesa}</span>
            </span>
          </h1>
          <dl className="mt-12 grid gap-6 border-t border-ink/10 pt-6 sm:grid-cols-3">
            <div>
              <dt className="micro text-ink-muted">Em vigor desde</dt>
              <dd className="mt-1.5 font-mono text-[15px] text-ink">{vigencia}</dd>
            </div>
            <div>
              <dt className="micro text-ink-muted">Responsável</dt>
              <dd className="mt-1.5 text-[15px] text-ink">
                {EMPRESA.nome} · CNPJ {EMPRESA.cnpj}
              </dd>
            </div>
            <div>
              <dt className="micro text-ink-muted">Veja também</dt>
              <dd className="mt-1.5">
                <Link href={outro.href} className="sublinha text-[15px] font-semibold text-ink">
                  {outro.rotulo}
                </Link>
              </dd>
            </div>
          </dl>
        </header>

        <div className="mx-auto grid max-w-[1320px] gap-10 px-5 pb-32 md:px-8 lg:grid-cols-12 lg:gap-12">
          <nav aria-label="Nesta página" className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <IndiceLegal itens={secoes.map(({ id, titulo: t }) => ({ id, titulo: t }))} />
            </div>
          </nav>

          <div className="min-w-0 lg:col-span-8 lg:col-start-5">
            <aside aria-label="Em resumo" className="rounded-[28px] bg-ink p-7 text-white md:p-10">
              <p className="micro text-accent">Em resumo</p>
              <ul className="mt-5 space-y-3.5">
                {resumo.map((item, i) => (
                  <li key={i} className="flex gap-3.5 text-[16px] leading-relaxed text-white/80">
                    <span className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-7 text-[13px] text-white/60">
                O resumo ajuda a ler, mas não substitui o texto completo abaixo.
              </p>
            </aside>

            <article className="mt-16 max-w-[72ch] space-y-14">
              {secoes.map((secao, i) => (
                <section key={secao.id} id={secao.id} className="scroll-mt-28">
                  <h2 className="flex items-baseline gap-4 text-[clamp(22px,2vw,28px)] font-semibold leading-tight tracking-[-0.025em] text-ink">
                    <span className="font-mono text-[14px] tabular-nums text-ink-muted">{dois(i + 1)}</span>
                    {secao.titulo}
                  </h2>
                  <div className="texto-legal mt-5 space-y-4 text-[17px] leading-[1.75] text-ink-muted">{secao.conteudo}</div>
                </section>
              ))}
            </article>

            <div className="mt-20 max-w-[72ch] rounded-[28px] bg-white p-7 ring-1 ring-ink/[0.06] md:p-10">
              <p className="text-[20px] font-semibold tracking-[-0.02em] text-ink">Ficou alguma dúvida?</p>
              <p className="mt-2 text-[16px] leading-relaxed text-ink-muted">
                Escreva para{' '}
                <a href={`mailto:${EMPRESA.email}`} className="font-semibold text-ink underline underline-offset-4">
                  {EMPRESA.email}
                </a>
                . Quem responde é daqui, de Divinópolis.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Rodape naHome={false} />
    </>
  )
}
