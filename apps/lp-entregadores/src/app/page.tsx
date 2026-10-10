import { Suspense } from 'react'
import { Abertura } from './components/secoes/Abertura'
import { Cabecalho } from './components/secoes/Cabecalho'
import { Chamada } from './components/secoes/Chamada'
import { Comecar } from './components/secoes/Comecar'
import { EntregaAoVivo } from './components/secoes/EntregaAoVivo'
import { Folha } from './components/secoes/Folha'
import { Ganhos } from './components/secoes/Ganhos'
import { Manifesto } from './components/secoes/Manifesto'
import { Marquise } from './components/secoes/Marquise'
import { Oferta } from './components/secoes/Oferta'
import { Perguntas } from './components/secoes/Perguntas'
import { Rodape } from './components/secoes/Rodape'
import { SeuJeito } from './components/secoes/SeuJeito'

/**
 * A landing do entregador é a rua, com o vocabulário do app dele: a rota
 * acende, a marquise mostra o Início com o modo online e a oferta chegando,
 * o manifesto desenha o caminho do balcão até a porta e a folha clara sobe
 * — a oferta por dentro, uma entrega inteira, os ganhos, o que vale para
 * todo mundo, o cadastro e as perguntas — até a mesma rota, agora para
 * quem lê.
 *
 * Cada seção abaixo da dobra fica no próprio <Suspense>: nada suspende no
 * servidor (o HTML sai inteiro), mas a hidratação vira várias tarefas
 * curtas em vez de uma longa.
 */
export default function Pagina() {
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
            <Oferta />
          </Suspense>
          <Suspense>
            <EntregaAoVivo />
          </Suspense>
          <Suspense>
            <Ganhos />
          </Suspense>
          <Suspense>
            <SeuJeito />
          </Suspense>
          <Suspense>
            <Comecar />
          </Suspense>
          <Suspense>
            <Perguntas />
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
