import type { Metadata } from 'next'
import Link from 'next/link'
import { DocumentoLegal, type SecaoLegal } from '../components/legal/DocumentoLegal'
import { EMPRESA } from '../dados/empresa'
import { LINKS } from '../lib/links'

export const metadata: Metadata = {
  title: 'Termos de Uso · Mallevo',
  description: 'As regras de uso do Mallevo, o shopping digital de Divinópolis — para quem compra, para as lojas e para os entregadores.',
  alternates: { canonical: '/termos' },
  openGraph: { title: 'Termos de Uso · Mallevo', url: '/termos', locale: 'pt_BR', type: 'article' },
}

const VIGENCIA = '10/10/2026'

const RESUMO = [
  <>O Mallevo aproxima você das lojas de Divinópolis e organiza a entrega. Quem vende — e responde pelo produto — é a loja.</>,
  <>Preço, taxa de entrega e tempo estimado aparecem antes de você confirmar. O pedido só vale depois que o pagamento é aprovado.</>,
  <>Para cancelar ou resolver um problema, fale com a loja pelo WhatsApp ou com a gente pelo e-mail. Se a loja recusar o pedido, o valor volta inteiro.</>,
  <>Use de boa-fé: sem fraude, sem trote, sem conteúdo ofensivo. A conta é pessoal, e você pode excluí-la quando quiser.</>,
  <>Dúvidas e reclamações: {EMPRESA.email}. A lei é a brasileira, e você sempre pode recorrer ao foro da sua cidade.</>,
]

const SECOES: SecaoLegal[] = [
  {
    id: 'quem-somos',
    titulo: 'Quem somos e o que estes termos regulam',
    conteudo: (
      <>
        <p>
          O Mallevo — o shopping digital de Divinópolis — é operado por <strong>{EMPRESA.nome}</strong>,{' '}
          {EMPRESA.natureza}, inscrito no CNPJ sob o nº <strong>{EMPRESA.cnpj}</strong>, com endereço no{' '}
          {EMPRESA.endereco} (“Mallevo”, “nós”).
        </p>
        <p>
          Estes Termos de Uso regulam o uso dos aplicativos Mallevo, do site mallevo.com.br e das vitrines das lojas
          publicadas em endereços como <em>nomedaloja</em>.mallevo.com.br (em conjunto, a “Plataforma”). Ao criar uma
          conta ou fazer um pedido, você declara que leu e concorda com estes Termos e com a nossa{' '}
          <Link href="/privacidade">Política de Privacidade</Link>, que é parte deles. Lojistas e entregadores encontram as
          regras específicas deles em <a href="#parceiros">Lojas e entregadores parceiros</a>.
        </p>
      </>
    ),
  },
  {
    id: 'papel',
    titulo: 'O que o Mallevo é (e o que não é)',
    conteudo: (
      <>
        <p>
          O Mallevo é uma <strong>plataforma de intermediação</strong>: reúne lojas e prestadores de serviço da cidade,
          exibe o que eles oferecem, recebe os pedidos e os pagamentos e organiza a entrega por entregadores parceiros. Não
          fabricamos, não preparamos e não vendemos os produtos anunciados.
        </p>
        <p>
          A loja que oferece o produto ou o serviço é responsável por ele: qualidade, quantidade, preço, prazo de preparo,
          informações de rótulo e validade, e pela emissão da nota fiscal. Isso não afasta os direitos que o Código de
          Defesa do Consumidor garante a você perante toda a cadeia de fornecimento.
        </p>
        <p>
          Fotos, vídeos e textos das vitrines e dos posts são publicados pelas próprias lojas. Fazemos o possível para
          que estejam corretos, mas cabe à loja mantê-los atualizados.
        </p>
      </>
    ),
  },
  {
    id: 'conta',
    titulo: 'Sua conta',
    conteudo: (
      <ul>
        <li>Informe dados verdadeiros e mantenha-os atualizados. Endereço errado é a causa mais comum de entrega frustrada.</li>
        <li>A conta é pessoal e intransferível. Você é responsável por manter sua senha em sigilo e pelo que for feito com ela.</li>
        <li>
          Para contratar sozinho é preciso ter 18 anos. Entre 13 e 18 anos, o uso depende do consentimento e da supervisão
          dos pais ou responsáveis legais. A Plataforma não se destina a menores de 13 anos.
        </li>
        <li>
          Você pode excluir sua conta a qualquer momento pelo aplicativo, em Perfil › Excluir minha conta, ou pedir pelo
          e-mail {EMPRESA.email}. O que é apagado e o que é mantido está na{' '}
          <Link href="/privacidade#exclusao">Política de Privacidade</Link>.
        </li>
      </ul>
    ),
  },
  {
    id: 'pedidos',
    titulo: 'Pedidos',
    conteudo: (
      <>
        <p>
          Antes de confirmar, você vê os itens, o preço de cada um, a taxa de entrega da loja e o tempo estimado. O pedido
          só é confirmado depois da aprovação do pagamento; se o pagamento não for aprovado, o pedido é cancelado.
        </p>
        <p>
          O tempo de entrega é uma estimativa e pode variar com o volume de pedidos, o trânsito e o clima. Você acompanha
          cada etapa pelo aplicativo ou pela vitrine — da confirmação pela loja à entrega.
        </p>
        <p>
          A loja pode recusar um pedido — por falta do item, por estar fora do horário ou por não atender o endereço. Nesse
          caso, o valor pago é devolvido integralmente, pelo mesmo meio de pagamento.
        </p>
      </>
    ),
  },
  {
    id: 'pagamento',
    titulo: 'Pagamento',
    conteudo: (
      <>
        <p>
          O pagamento é feito no aplicativo ou na vitrine, por Pix ou cartão de crédito, e processado pelo Pagar.me,
          instituição de pagamento parceira. Na fatura do cartão, a compra aparece em nome do Mallevo.
        </p>
        <p>
          Os dados do cartão vão do seu aparelho direto para o Pagar.me: o Mallevo recebe só um código que não permite
          recuperar o número do cartão.
        </p>
        <p>
          No cartão, dá para parcelar. O número de parcelas, os juros (quando houver) e o valor total aparecem na tela antes
          da confirmação.
        </p>
      </>
    ),
  },
  {
    id: 'cancelamento',
    titulo: 'Cancelamento, trocas e arrependimento',
    conteudo: (
      <>
        <p>
          Para cancelar, fale com a loja pelo WhatsApp dela, que aparece no aplicativo e na vitrine, ou com a gente, pelo
          e-mail {EMPRESA.email}. Se a loja ainda não tiver começado a preparar o pedido, ele é cancelado e o valor volta{' '}
          <strong>integralmente</strong>, pelo mesmo meio de pagamento. Depois que o preparo começou, o cancelamento
          depende da concordância da loja, porque o item pode já estar sendo feito.
        </p>
        <p>
          No Pix, o valor devolvido volta para a conta de onde saiu. No cartão, o estorno aparece na fatura conforme o prazo
          do banco emissor.
        </p>
        <p>
          O direito de arrependimento do art. 49 do Código de Defesa do Consumidor — sete dias contados do recebimento —
          vale para compras feitas fora do estabelecimento. Pela natureza, ele não alcança alimentos e outros produtos
          perecíveis, itens preparados na hora, sob encomenda ou personalizados — o que não afasta a troca ou o reembolso
          quando houver defeito ou erro no pedido.
        </p>
        <p>
          Se o pedido chegar errado, incompleto ou em más condições, fale com a loja pelo WhatsApp assim que possível. Se a
          questão não se resolver, escreva para {EMPRESA.email} — nós intermediamos a conversa.
        </p>
      </>
    ),
  },
  {
    id: 'entrega',
    titulo: 'Entrega',
    conteudo: (
      <>
        <p>
          A entrega é feita por entregadores parceiros, no endereço que você escolher ao finalizar a compra — confira com
          atenção. A taxa de entrega é definida por cada loja. No aplicativo, você acompanha o entregador no mapa enquanto
          ele está a caminho, e o próprio aplicativo avisa quando o endereço escolhido parece longe de onde você está.
        </p>
        <p>
          Se não houver ninguém para receber, ou se o acesso estiver impedido, a entrega pode ser encerrada sem devolução do
          valor de um produto que já foi preparado.
        </p>
      </>
    ),
  },
  {
    id: 'agendamentos',
    titulo: 'Agendamentos de serviços',
    conteudo: (
      <>
        <p>
          Serviços agendados — em salões, barbearias, estética e afins — são pagos no momento do agendamento e prestados no
          estabelecimento, na data, no horário e com o profissional escolhidos.
        </p>
        <p>
          Para remarcar ou cancelar, fale com o estabelecimento pelo WhatsApp, com antecedência. Se o estabelecimento
          cancelar ou não puder atender no horário marcado, o valor pago é devolvido integralmente.
        </p>
      </>
    ),
  },
  {
    id: 'conteudo',
    titulo: 'Conteúdo e propriedade intelectual',
    conteudo: (
      <>
        <p>
          A marca Mallevo, os aplicativos, o site e o desenho das vitrines são do Mallevo e protegidos por lei. Fotos,
          vídeos, textos e marcas de cada loja pertencem a ela, que responde pelo que publica.
        </p>
        <p>
          Se você enviar conteúdo à Plataforma — uma avaliação ou um comentário, por exemplo —, ele continua sendo seu. Ao
          enviá-lo, você autoriza o Mallevo a exibi-lo na Plataforma enquanto estiver no ar, e podemos removê-lo se violar
          estes Termos ou a lei.
        </p>
      </>
    ),
  },
  {
    id: 'uso-adequado',
    titulo: 'Uso adequado',
    conteudo: (
      <>
        <p>Ao usar a Plataforma, você se compromete a não:</p>
        <ul>
          <li>Fornecer dados falsos nem usar meios de pagamento de terceiros sem autorização.</li>
          <li>Fazer pedidos para fraudar, passar trote ou prejudicar lojas e entregadores.</li>
          <li>Publicar conteúdo ofensivo, discriminatório, enganoso ou ilegal.</li>
          <li>Tentar acessar áreas restritas ou contas de outras pessoas, nem interferir no funcionamento dos sistemas.</li>
        </ul>
        <p>O descumprimento pode levar à suspensão ou ao encerramento da conta, sem prejuízo das medidas legais cabíveis.</p>
      </>
    ),
  },
  {
    id: 'parceiros',
    titulo: 'Lojas e entregadores parceiros',
    conteudo: (
      <>
        <p>
          <strong>Lojas.</strong> Cada loja responde pelos produtos e serviços que oferece, pelas informações da vitrine —
          preços, fotos, disponibilidade, horários —, pelo que publica, pelo atendimento e pela nota fiscal, nos termos do
          Código de Defesa do Consumidor. O plano escolhido na adesão é cobrado por assinatura. O valor das vendas é
          repassado pelo Pagar.me, descontadas a tarifa do Mallevo por pedido e as taxas de processamento do pagamento; a
          loja responde pelas contestações de pagamento das suas vendas. Planos e condições estão em{' '}
          <a href={LINKS.parceiros}>parceiros.mallevo.com.br</a>.
        </p>
        <p>
          <strong>Entregadores.</strong> O entregador é parceiro autônomo, sem vínculo de emprego com o Mallevo: escolhe
          quando ficar disponível e quais entregas aceitar. O cadastro passa por análise e aprovação da nossa equipe, e o
          valor de cada entrega é repassado pelo Pagar.me à conta de recebimento do entregador. Mais em{' '}
          <a href={LINKS.entregadores}>entregadores.mallevo.com.br</a>.
        </p>
        <p>
          Estes Termos valem para lojas e entregadores no que couber. A conta pode ser suspensa em caso de fraude,
          descumprimento destes Termos ou risco à segurança de clientes, lojas ou entregadores.
        </p>
      </>
    ),
  },
  {
    id: 'disponibilidade',
    titulo: 'Disponibilidade da Plataforma',
    conteudo: (
      <p>
        Trabalhamos para manter a Plataforma no ar, mas ela pode ficar indisponível por manutenção, falhas técnicas ou
        causas fora do nosso controle. Não garantimos funcionamento ininterrupto; quando houver instabilidade que afete
        pedidos, vamos priorizar a solução e informar você.
      </p>
    ),
  },
  {
    id: 'alteracoes',
    titulo: 'Alterações destes termos',
    conteudo: (
      <p>
        Podemos atualizar estes Termos. A data de vigência no topo desta página muda junto, e mudanças relevantes serão
        avisadas com antecedência razoável, pelo aplicativo ou pelos canais que tivermos com você. Continuar usando a
        Plataforma depois disso significa concordar com a nova versão.
      </p>
    ),
  },
  {
    id: 'foro',
    titulo: 'Lei aplicável, foro e contato',
    conteudo: (
      <>
        <p>
          Fale com a gente pelo e-mail <a href={`mailto:${EMPRESA.email}`}>{EMPRESA.email}</a>. Vamos buscar resolver qualquer
          questão de forma amigável. Você também pode registrar uma reclamação no{' '}
          <a href="https://www.consumidor.gov.br" target="_blank" rel="noopener noreferrer">
            consumidor.gov.br
          </a>{' '}
          ou no Procon.
        </p>
        <p>
          Estes Termos seguem a lei brasileira. Fica eleito o foro da comarca de {EMPRESA.comarca}, sem prejuízo do direito do
          consumidor de propor a ação no foro do seu domicílio (art. 101, I, do Código de Defesa do Consumidor).
        </p>
      </>
    ),
  },
]

export default function PaginaTermos() {
  return (
    <DocumentoLegal
      titulo="Termos"
      acesa="de uso."
      vigencia={VIGENCIA}
      resumo={RESUMO}
      secoes={SECOES}
      outro={{ href: '/privacidade', rotulo: 'Política de Privacidade' }}
    />
  )
}
