import { EMPRESA } from '@mallevo/brand'
import { LINKS, SECOES } from '../../lib/links'
import { Logo } from '../marca/Logo'
import { PartnerIcon } from '../marca/PartnerIcon'
import { RelogioDaCidade } from './RelogioDaCidade'

const ANO = new Date().getFullYear()

const EXTERNOS = [
  { rotulo: 'Cadastrar minha loja', href: LINKS.cadastro },
  { rotulo: 'Entrar no painel', href: LINKS.entrar },
  { rotulo: 'Para quem compra', href: LINKS.consumidor },
  { rotulo: 'Para quem entrega', href: LINKS.entregadores },
]

/** Rodapé — a cidade em letra grande e a hora dela, ao vivo. */
export function Rodape() {
  return (
    <footer data-tema="escuro" className="relative z-20 overflow-hidden bg-marquee text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_-2%_112%,rgb(193_241_72/0.12),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-[1440px] px-5 pb-10 md:px-8">
        <div className="grid gap-12 border-t border-white/10 pt-14 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tom="branco" className="h-8 w-auto" />
            <p className="mt-5 max-w-[32ch] text-[15px] leading-relaxed text-white/55">
              O shopping digital de Divinópolis, do lado de dentro do balcão. Vitrine própria, pedido ao vivo e
              comissão de 9,1%.
            </p>
          </div>

          <nav aria-label="Nesta página" className="lg:col-span-2">
            <p className="micro text-white/55">O balcão</p>
            <ul className="mt-5 space-y-3 text-[15px] font-medium">
              {SECOES.map((secao) => (
                <li key={secao.id}>
                  <a href={`#${secao.id}`} className="sublinha text-white/75 transition-colors hover:text-white">
                    {secao.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Mallevo" className="lg:col-span-3">
            <p className="micro text-white/55">Mallevo</p>
            <ul className="mt-5 space-y-3 text-[15px] font-medium">
              {EXTERNOS.map((link) => (
                <li key={link.rotulo}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-white/75 hover:text-white"
                  >
                    <span className="sublinha">{link.rotulo}</span>
                    <PartnerIcon name="chevron-right" size={15} strokeWidth={2.2} className="transition-transform group-hover:translate-x-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="micro text-white/55">Contato</p>
            <ul className="mt-5 space-y-3 text-[15px] font-medium">
              <li>
                <a href={`mailto:${LINKS.email}`} className="sublinha text-white/75 hover:text-white">
                  {LINKS.email}
                </a>
              </li>
              {LINKS.instagram && (
                <li>
                  <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className="sublinha text-white/75 hover:text-white">
                    Instagram
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-20 grid items-end gap-10 lg:mt-28 lg:grid-cols-12">
          <p
            aria-hidden
            className="text-[clamp(56px,9vw,150px)] font-semibold leading-[0.82] tracking-[-0.06em] text-white lg:col-span-8"
          >
            Divinópolis<span className="text-accent">.</span>
          </p>
          <div className="lg:col-span-4 lg:pb-3 lg:text-right">
            <RelogioDaCidade />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-[13px] text-white/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {ANO} Mallevo · {EMPRESA.nome} (MEI) · CNPJ {EMPRESA.cnpj} · Feito em Divinópolis, MG
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href={LINKS.termos} className="sublinha hover:text-white/80">
              Termos de uso
            </a>
            <a href={LINKS.privacidade} className="sublinha hover:text-white/80">
              Privacidade
            </a>
            <a href="#topo" className="sublinha hover:text-white/80">
              Voltar ao topo
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
