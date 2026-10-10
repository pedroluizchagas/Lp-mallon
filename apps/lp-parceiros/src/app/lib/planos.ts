/**
 * Os planos de verdade, lidos da mesma tabela pública que o passo 12 do
 * cadastro mostra (Mall-online · apps/web/app/(auth)/onboarding/fluxo.tsx:
 * `plans` com `ativo = true`, por preço). Preço mudou no banco, muda aqui
 * em até uma hora — sem número copiado à mão para envelhecer na landing.
 *
 * Sem as variáveis (ou com o Supabase fora do ar), devolve null e a seção
 * de preços mostra só o que vale para todos os planos.
 */
export interface Plano {
  nome: string
  /** Centavos por mês. */
  precoMensal: number
  maxProdutos: number
  temEstoque: boolean
  temRelatorios: boolean
  temAntecipacao: boolean
}

interface LinhaPlano {
  nome: string
  preco_mensal: number
  max_produtos: number
  tem_estoque: boolean
  tem_relatorios: boolean
  tem_antecipacao: boolean
}

export async function buscarPlanos(): Promise<Plano[] | null> {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL
  const chave = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!base || !chave) return null

  try {
    const resposta = await fetch(
      `${base.replace(/\/$/, '')}/rest/v1/plans?select=nome,preco_mensal,max_produtos,tem_estoque,tem_relatorios,tem_antecipacao&ativo=eq.true&order=preco_mensal`,
      {
        headers: { apikey: chave, Authorization: `Bearer ${chave}` },
        next: { revalidate: 3600 },
      },
    )
    if (!resposta.ok) return null
    const linhas = (await resposta.json()) as LinhaPlano[]
    // Preço zero é "Sob consulta" no cadastro — fica fora da tabela pública.
    const planos = linhas
      .filter((l) => l.preco_mensal > 0)
      .map((l) => ({
        nome: l.nome,
        precoMensal: l.preco_mensal,
        maxProdutos: l.max_produtos,
        temEstoque: l.tem_estoque,
        temRelatorios: l.tem_relatorios,
        temAntecipacao: l.tem_antecipacao,
      }))
    return planos.length > 0 ? planos : null
  } catch {
    return null
  }
}
