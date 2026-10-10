import { Suspense } from 'react'
import { Abertura } from './components/secoes/Abertura'
import { Cabecalho } from './components/secoes/Cabecalho'
import { Chamada } from './components/secoes/Chamada'
import { Diretorio } from './components/secoes/Diretorio'
import { Explorar } from './components/secoes/Explorar'
import { Folha } from './components/secoes/Folha'
import { LuzDoDia } from './components/secoes/LuzDoDia'
import { Marquise } from './components/secoes/Marquise'
import { ParaTodos } from './components/secoes/ParaTodos'
import { Passarela } from './components/secoes/Passarela'
import { PedidoAoVivo } from './components/secoes/PedidoAoVivo'
import { Perguntas } from './components/secoes/Perguntas'
import { Rodape } from './components/secoes/Rodape'
import { Vitrines } from './components/secoes/Vitrines'

/**
 * A landing é um passeio pelo shopping, com o vocabulário do app: chega-se
 * pela fachada acesa (marquise), a folha clara sobe e o visitante entra —
 * pisos, vitrines, Explorar, o pedido ao vivo, a luz da cidade — e sai pela
 * mesma marquise, agora com o shopping no bolso.
 *
 * Cada seção abaixo da dobra fica no próprio <Suspense>: nada suspende no
 * servidor (o HTML sai inteiro), mas a hidratação vira várias tarefas
 * curtas em vez de uma longa — o React cede o fio principal entre elas.
 */
export default function Pagina() {
  return (
    <>
      <Abertura />
      <Cabecalho />
      <main>
        <Marquise />
        <Suspense>
          <Passarela />
        </Suspense>
        <Folha>
          <Suspense>
            <Diretorio />
          </Suspense>
          <Suspense>
            <Vitrines />
          </Suspense>
          <Suspense>
            <Explorar />
          </Suspense>
          <Suspense>
            <PedidoAoVivo />
          </Suspense>
          <Suspense>
            <LuzDoDia />
          </Suspense>
          <Suspense>
            <ParaTodos />
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
