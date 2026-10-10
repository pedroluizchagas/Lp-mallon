import { Suspense } from 'react'
import { Abertura } from './components/secoes/Abertura'
import { BalcaoAoVivo } from './components/secoes/BalcaoAoVivo'
import { Cabecalho } from './components/secoes/Cabecalho'
import { Chamada } from './components/secoes/Chamada'
import { Comecar } from './components/secoes/Comecar'
import { Explorar } from './components/secoes/Explorar'
import { Folha } from './components/secoes/Folha'
import { Manifesto } from './components/secoes/Manifesto'
import { Marquise } from './components/secoes/Marquise'
import { Painel } from './components/secoes/Painel'
import { Perguntas } from './components/secoes/Perguntas'
import { Precos } from './components/secoes/Precos'
import { Provador } from './components/secoes/Provador'
import { Rodape } from './components/secoes/Rodape'
import { buscarPlanos } from './lib/planos'

/**
 * A landing do lojista é o balcão visto de dentro, com o vocabulário do app
 * dele: a porta sobe, a marquise acende com a loja ao vivo, a linha da
 * lista vira vitrine e a folha clara sobe — provador de vitrines, Explorar,
 * o pedido do balcão à porta, o painel, o preço, os passos e as perguntas —
 * até a mesma porta, agora para a loja de quem lê.
 *
 * Cada seção abaixo da dobra fica no próprio <Suspense>: nada suspende no
 * servidor (o HTML sai inteiro), mas a hidratação vira várias tarefas
 * curtas em vez de uma longa.
 */
export default async function Pagina() {
  const planos = await buscarPlanos()

  return (
    <>
      <Abertura />
      <Cabecalho />
      <main>
        <Marquise />
        <Suspense>
          <Manifesto />
        </Suspense>
        <Folha>
          <Suspense>
            <Provador />
          </Suspense>
          <Suspense>
            <Explorar />
          </Suspense>
          <Suspense>
            <BalcaoAoVivo />
          </Suspense>
          <Suspense>
            <Painel />
          </Suspense>
          <Suspense>
            <Precos planos={planos} />
          </Suspense>
          <Suspense>
            <Comecar />
          </Suspense>
          <Suspense>
            <Perguntas planos={planos} />
          </Suspense>
        </Folha>
        <Suspense>
          <Chamada />
        </Suspense>
      </main>
      <Suspense>
        <Rodape />
      </Suspense>
    </>
  )
}
