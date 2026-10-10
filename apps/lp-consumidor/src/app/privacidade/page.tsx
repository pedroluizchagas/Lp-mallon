import type { Metadata } from 'next'
import Link from 'next/link'
import { DocumentoLegal, type SecaoLegal } from '../components/legal/DocumentoLegal'
import { EMPRESA } from '../dados/empresa'

export const metadata: Metadata = {
  title: 'Política de Privacidade · Mallevo',
  description:
    'Quais dados o Mallevo trata, para quê, com quem compartilha e como você exerce seus direitos pela LGPD — para quem compra, entrega, vende ou só visita.',
  alternates: { canonical: '/privacidade' },
  openGraph: { title: 'Política de Privacidade · Mallevo', url: '/privacidade', locale: 'pt_BR', type: 'article' },
}

const VIGENCIA = '10/10/2026'

const RESUMO = [
  <>Usamos seus dados para o pedido acontecer: a loja recebe o que precisa para preparar; o entregador, o que precisa para entregar.</>,
  <>Não vendemos dados e não usamos ferramentas de anúncio ou de rastreamento — nem nos aplicativos, nem no site.</>,
  <>O número do seu cartão não passa por nós: vai do seu aparelho direto para o Pagar.me.</>,
  <>A localização do seu celular só é lida na hora de pagar, para avisar se o endereço parece longe, e não é guardada. A do entregador é compartilhada só durante a entrega.</>,
  <>Você pode ver, corrigir e apagar seus dados pelo aplicativo — ou pedir pelo e-mail {EMPRESA.email}.</>,
]

const SECOES: SecaoLegal[] = [
  {
    id: 'quem-somos',
    titulo: 'Quem somos e a quem esta política se aplica',
    conteudo: (
      <>
        <p>
          O controlador dos dados pessoais tratados no Mallevo é <strong>{EMPRESA.nome}</strong>, {EMPRESA.natureza},
          inscrito no CNPJ sob o nº <strong>{EMPRESA.cnpj}</strong>, com endereço no {EMPRESA.endereco} (“Mallevo”,
          “nós”).
        </p>
        <p>
          Esta política vale para todos que usam a Plataforma: quem compra pelo aplicativo Mallevo ou pelas vitrines das
          lojas (<em>nomedaloja</em>.mallevo.com.br), quem entrega pelo aplicativo do entregador, quem vende pelo Mallevo e
          quem só visita este site. Ela segue a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018, a “LGPD”) e
          complementa os <Link href="/termos">Termos de Uso</Link>.
        </p>
      </>
    ),
  },
  {
    id: 'clientes',
    titulo: 'Dados de quem compra',
    conteudo: (
      <>
        <p>Para você criar a conta, comprar e receber, tratamos:</p>
        <ul>
          <li>
            <strong>Cadastro:</strong> nome, e-mail e senha — e, se quiser, o celular. Nas vitrines das lojas, dá para entrar
            só com o e-mail, por senha ou por um código enviado a ele. A senha é guardada criptografada: ninguém da equipe
            tem acesso a ela.
          </li>
          <li>
            <strong>Perfil, se você completar:</strong> foto, CPF e data de nascimento.
          </li>
          <li>
            <strong>Endereços de entrega:</strong> apelido, CEP, rua, número, complemento, bairro, cidade e estado, além das
            coordenadas aproximadas do endereço, calculadas a partir dele para o mapa e o cálculo de distância.
          </li>
          <li>
            <strong>Pedidos:</strong> loja, itens, valores, observações que você escreve, endereço de entrega, forma de
            pagamento e o andamento do pedido. Nos agendamentos, também a data, o horário e o profissional escolhidos.
          </li>
          <li>
            <strong>Pagamento:</strong> os identificadores da transação no Pagar.me e, no Pix, o código gerado para pagar. O
            número do cartão é enviado do seu aparelho direto ao Pagar.me; o Mallevo recebe só um código (token) que não
            permite recuperá-lo.
          </li>
          <li>
            <strong>Notificações:</strong> o identificador de notificações do seu aparelho, para avisar sobre os seus
            pedidos.
          </li>
        </ul>
        <p>
          Algumas coisas ficam só no seu celular e não chegam até nós — como as lojas que você segue, os posts que você
          curte e as buscas recentes. Elas são apagadas quando você desinstala o aplicativo ou limpa os dados dele.
        </p>
      </>
    ),
  },
  {
    id: 'entregadores',
    titulo: 'Dados de quem entrega',
    conteudo: (
      <>
        <ul>
          <li>
            <strong>Cadastro:</strong> nome, CPF, celular (WhatsApp), e-mail, senha, tipo de veículo e placa (para moto e
            carro), número da CNH, foto de perfil e, se você enviar, foto da CNH. Uma pessoa da nossa equipe analisa o
            cadastro antes de aprovar.
          </li>
          <li>
            <strong>Recebimentos:</strong> a chave Pix ou os dados bancários que você informa são enviados ao Pagar.me, com
            seu nome, e-mail e CPF, para abrir sua conta de recebimento; a verificação de identidade acontece no ambiente do
            próprio Pagar.me. Desses dados, guardamos só o identificador da conta e a situação dela.
          </li>
          <li>
            <strong>Entregas:</strong> as entregas que você aceita e conclui, os valores repassados e, quando registrada, a
            foto que comprova a entrega.
          </li>
          <li>
            <strong>Localização:</strong> só durante as entregas — os detalhes estão em{' '}
            <a href="#localizacao">Localização</a>.
          </li>
        </ul>
        <p>Enquanto a entrega acontece, o cliente do pedido vê o seu nome e o seu telefone.</p>
      </>
    ),
  },
  {
    id: 'lojistas',
    titulo: 'Dados de quem vende',
    conteudo: (
      <ul>
        <li>
          <strong>Cadastro:</strong> nome completo, celular (de preferência WhatsApp), e-mail e senha do responsável; CNPJ,
          quando houver; nome, endereço e categoria da loja; e o plano escolhido.
        </li>
        <li>
          <strong>Assinatura:</strong> a mensalidade é cobrada pela Stripe, que recebe nome, e-mail e celular do
          responsável. Os dados do cartão são digitados no ambiente da própria Stripe.
        </li>
        <li>
          <strong>Recebimentos:</strong> a abertura da conta de recebimento e a verificação de identidade acontecem no
          ambiente do Pagar.me.
        </li>
        <li>
          <strong>O que é público:</strong> o que a loja mostra na vitrine — nome, descrição, logo, capa, telefone,
          horários, taxa e tempo de entrega e os posts. O endereço da loja é usado nas entregas e não aparece na vitrine; os
          dados do responsável também não.
        </li>
      </ul>
    ),
  },
  {
    id: 'localizacao',
    titulo: 'Localização',
    conteudo: (
      <>
        <ul>
          <li>
            <strong>Quem compra:</strong> com a sua permissão, o aplicativo lê a localização do celular uma vez, na hora de
            pagar, só para avisar se o endereço de entrega parece longe de onde você está. Essa leitura não é guardada nem
            enviada para nós.
          </li>
          <li>
            <strong>Quem entrega:</strong> enquanto há uma entrega ou rota em andamento, o aplicativo do entregador envia a
            posição do celular a cada poucos segundos. Fora disso — inclusive quando você só está disponível —, a
            localização não é coletada. Guardamos apenas a última posição, substituída a cada atualização.
          </li>
          <li>
            <strong>Quem vê a posição do entregador:</strong> o cliente e a loja daquele pedido, enquanto a entrega está em
            andamento, e a equipe do Mallevo, para suporte e segurança.
          </li>
          <li>
            <strong>Endereços:</strong> quando você salva um endereço no aplicativo, ele é convertido em coordenadas
            aproximadas pelo serviço do OpenStreetMap (Nominatim), para o mapa e o cálculo de distância.
          </li>
        </ul>
        <p>
          Você pode negar ou retirar a permissão de localização a qualquer momento, nas configurações do celular. Para quem
          compra, só deixa de existir o aviso de distância; para quem entrega, a localização é necessária para fazer
          entregas.
        </p>
      </>
    ),
  },
  {
    id: 'cookies',
    titulo: 'Site, vitrines e cookies',
    conteudo: (
      <ul>
        <li>
          <strong>Este site</strong> (mallevo.com.br) não usa cookies, não tem formulários nem ferramentas de análise ou de
          anúncio. Ele só guarda no seu navegador, durante a visita, um sinal de que a animação de abertura já foi exibida —
          para não repeti-la a cada página.
        </li>
        <li>
          <strong>Vitrines das lojas:</strong> a sacola fica guardada no seu navegador enquanto a aba estiver aberta. Quando
          você entra na sua conta, usamos cookies estritamente necessários para manter você conectado, separados por loja.
          Algumas vitrines carregam fontes do Google Fonts, e por isso o navegador se conecta aos servidores do Google.
        </li>
        <li>
          <strong>Painel das lojas:</strong> cookies para manter a sessão e preferências de tela — como tema, sons e menu —
          guardadas no navegador.
        </li>
        <li>
          <strong>Registros de acesso:</strong> como em qualquer serviço na internet, nossos servidores e fornecedores
          registram dados técnicos das conexões — como endereço IP, data e hora —, usados para segurança, prevenção de
          fraude e cumprimento da lei.
        </li>
      </ul>
    ),
  },
  {
    id: 'finalidades',
    titulo: 'Para que usamos e com qual base legal',
    conteudo: (
      <>
        <ul>
          <li>
            <strong>Fazer a Plataforma funcionar</strong> — criar e manter contas (incluindo a análise do cadastro de
            entregadores), processar pedidos, pagamentos e entregas, repassar valores a lojas e entregadores, avisar sobre o
            andamento dos pedidos e dar suporte: execução de contrato (art. 7º, V, da LGPD).
          </li>
          <li>
            <strong>Cumprir a lei</strong> — guardar registros de pedidos, pagamentos e acessos e atender autoridades:
            cumprimento de obrigação legal ou regulatória (art. 7º, II).
          </li>
          <li>
            <strong>Proteger a Plataforma e as pessoas</strong> — prevenir fraudes, manter a segurança e melhorar o serviço:
            legítimo interesse (art. 7º, IX), sempre dentro do que você pode razoavelmente esperar.
          </li>
          <li>
            <strong>Localização de quem compra e notificações</strong> — com o seu consentimento (art. 7º, I), dado pela
            permissão do celular e que pode ser retirado nas configurações.
          </li>
          <li>
            <strong>Defender direitos</strong> — em processos judiciais, administrativos ou arbitrais: exercício regular de
            direitos (art. 7º, VI).
          </li>
        </ul>
        <p>
          CPF e data de nascimento, quando informados, servem para identificar você com segurança — em atendimentos e
          contestações de pagamento, por exemplo — e para confirmar a idade mínima de uso. Não vendemos dados pessoais, não
          os usamos para publicidade e não pedimos dados sensíveis.
        </p>
      </>
    ),
  },
  {
    id: 'compartilhamento',
    titulo: 'Com quem compartilhamos',
    conteudo: (
      <>
        <p>Só o necessário, com quem precisa:</p>
        <ul>
          <li>
            <strong>A loja do seu pedido:</strong> seu nome, telefone, endereço de entrega, itens e observações — para
            preparar e enviar.
          </li>
          <li>
            <strong>O entregador:</strong> o necessário para a entrega, como seu nome e o endereço.
          </li>
          <li>
            <strong>Quem compra:</strong> nome e telefone do entregador e, durante a entrega, a posição dele no mapa.
          </li>
        </ul>
        <p>E os fornecedores que fazem a Plataforma funcionar, cada um só com o que a sua função exige:</p>
        <ul>
          <li>
            <strong>Supabase</strong> — banco de dados, login, arquivos e funções do servidor;
          </li>
          <li>
            <strong>Pagar.me</strong> — pagamentos por Pix e cartão e repasses a lojas e entregadores;
          </li>
          <li>
            <strong>Stripe</strong> — cobrança da assinatura das lojas;
          </li>
          <li>
            <strong>Expo</strong> — envio de notificações e atualizações dos aplicativos;
          </li>
          <li>
            <strong>Vercel e Cloudflare</strong> — hospedagem do site e das vitrines e os endereços das lojas;
          </li>
          <li>
            <strong>ViaCEP e OpenStreetMap (Nominatim)</strong> — busca do endereço pelo CEP e cálculo das coordenadas
            aproximadas;
          </li>
          <li>
            <strong>Apple Maps ou Google Maps</strong> — o mapa da entrega, conforme o sistema do celular;
          </li>
          <li>
            <strong>Google Fonts</strong> — fontes de algumas vitrines.
          </li>
        </ul>
        <p>
          Quando você toca no WhatsApp de uma loja, a conversa acontece no WhatsApp, sob as regras dele. Também podemos
          compartilhar dados com autoridades, quando a lei exigir ou por ordem judicial.
        </p>
        <p>
          <strong>Fora do Brasil.</strong> Alguns desses fornecedores — como Supabase, Stripe, Expo, Vercel e Cloudflare —
          podem processar dados em outros países. Nesses casos, a transferência segue as hipóteses do art. 33 da LGPD, com
          fornecedores que mantêm compromissos de proteção de dados compatíveis com ela.
        </p>
      </>
    ),
  },
  {
    id: 'retencao',
    titulo: 'Por quanto tempo guardamos',
    conteudo: (
      <>
        <ul>
          <li>
            <strong>Conta e perfil:</strong> enquanto a conta existir.
          </li>
          <li>
            <strong>Pedidos e pagamentos:</strong> pelo prazo das obrigações fiscais e de defesa do consumidor — em regra,
            cinco anos — e pelo necessário para defender direitos.
          </li>
          <li>
            <strong>Cadastro de lojas e entregadores:</strong> enquanto durar a parceria e, depois, pelo prazo legal dos
            registros de vendas e repasses.
          </li>
          <li>
            <strong>Localização do entregador:</strong> só a última posição, substituída a cada atualização.
          </li>
          <li>
            <strong>Registros de acesso:</strong> pelo tempo necessário à segurança da Plataforma e pelo prazo que a lei
            exigir.
          </li>
        </ul>
        <p>Passados esses prazos, os dados são eliminados ou anonimizados.</p>
      </>
    ),
  },
  {
    id: 'exclusao',
    titulo: 'Exclusão da conta',
    conteudo: (
      <>
        <p>
          <strong>Quem compra</strong> pode excluir a conta pelo aplicativo, em Perfil › Excluir minha conta. Na hora,
          apagamos seu login, celular, CPF, data de nascimento, foto e endereços salvos, e seu nome passa a aparecer como
          “Conta excluída”.
        </p>
        <p>
          O histórico de pedidos é mantido pelos prazos da seção anterior, porque faz parte do registro da compra — incluindo
          o endereço de entrega e as observações de cada pedido. O Pagar.me mantém os registros das transações conforme as
          regras dele e do Banco Central.
        </p>
        <p>
          <strong>Lojas e entregadores</strong> pedem a exclusão pelo e-mail{' '}
          <a href={`mailto:${EMPRESA.email}`}>{EMPRESA.email}</a> — o mesmo canal vale para quem não tiver mais acesso ao
          aplicativo. O que fica só no celular (lojas seguidas, curtidas, buscas recentes) é apagado ao desinstalar o
          aplicativo ou limpar os dados dele.
        </p>
      </>
    ),
  },
  {
    id: 'direitos',
    titulo: 'Seus direitos',
    conteudo: (
      <>
        <p>A LGPD (art. 18) garante a você, a qualquer momento:</p>
        <ul>
          <li>confirmar se tratamos seus dados e acessá-los;</li>
          <li>corrigir dados incompletos, inexatos ou desatualizados;</li>
          <li>pedir a anonimização, o bloqueio ou a eliminação de dados desnecessários, excessivos ou tratados em desacordo com a lei;</li>
          <li>pedir a portabilidade dos seus dados a outro fornecedor;</li>
          <li>pedir a eliminação dos dados tratados com o seu consentimento — e revogar esse consentimento;</li>
          <li>saber com quem compartilhamos seus dados e o que acontece se você não der o consentimento.</li>
        </ul>
        <p>
          No aplicativo, você corrige seus dados em Perfil › Editar perfil e Perfil › Endereços. Para os outros pedidos,
          escreva para {EMPRESA.email}: respondemos em até 15 dias e podemos pedir uma confirmação de identidade antes, para
          proteger você. Se não ficar satisfeito, você pode reclamar à Autoridade Nacional de Proteção de Dados (ANPD).
        </p>
      </>
    ),
  },
  {
    id: 'seguranca',
    titulo: 'Segurança',
    conteudo: (
      <>
        <p>
          Adotamos medidas técnicas e administrativas para proteger os dados: conexões criptografadas (HTTPS), senhas
          guardadas criptografadas, regras de acesso por perfil no banco de dados e pagamentos tokenizados, sem o número do
          cartão passar por nós.
        </p>
        <p>
          Nenhum sistema é totalmente imune a falhas. Se acontecer um incidente de segurança que possa trazer risco ou dano
          relevante a você, avisaremos você e a ANPD, como determina a LGPD (art. 48).
        </p>
      </>
    ),
  },
  {
    id: 'criancas',
    titulo: 'Crianças e adolescentes',
    conteudo: (
      <p>
        A Plataforma não se destina a menores de 13 anos. Entre 13 e 18 anos, o uso depende do consentimento e da supervisão
        dos pais ou responsáveis. Se soubermos que tratamos dados de uma criança sem o consentimento de um responsável, vamos
        eliminá-los.
      </p>
    ),
  },
  {
    id: 'mudancas',
    titulo: 'Mudanças nesta política',
    conteudo: (
      <p>
        Podemos atualizar esta política quando a Plataforma ou a lei mudarem. A data no topo da página muda junto, e
        mudanças relevantes serão avisadas com antecedência, pelo aplicativo ou pelos canais que tivermos com você.
      </p>
    ),
  },
  {
    id: 'contato',
    titulo: 'Encarregado e contato',
    conteudo: (
      <>
        <p>
          Quem responde pelo tratamento dos dados — o encarregado de que trata o art. 41 da LGPD — é {EMPRESA.nome}, pelo
          e-mail <a href={`mailto:${EMPRESA.email}`}>{EMPRESA.email}</a>. Use esse canal para dúvidas, pedidos sobre os seus
          dados ou reclamações.
        </p>
        <p>
          Você também pode procurar a Autoridade Nacional de Proteção de Dados (ANPD), em{' '}
          <a href="https://www.gov.br/anpd" target="_blank" rel="noopener noreferrer">
            gov.br/anpd
          </a>
          .
        </p>
      </>
    ),
  },
]

export default function PaginaPrivacidade() {
  return (
    <DocumentoLegal
      titulo="Política"
      acesa="de privacidade."
      vigencia={VIGENCIA}
      resumo={RESUMO}
      secoes={SECOES}
      outro={{ href: '/termos', rotulo: 'Termos de Uso' }}
    />
  )
}
