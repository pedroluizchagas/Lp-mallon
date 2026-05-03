import Link from 'next/link'
import { Instagram, MessageCircle, Mail, MapPin, Phone } from 'lucide-react'

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || 'https://app.mallevo.com.br'

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Col 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="font-jakarta text-3xl font-bold tracking-tight">
                <span className="text-white">Mall</span>
                <span className="text-lime">evo</span>
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              O shopping digital de Divinópolis, MG. A plataforma que conecta
              lojistas locais, consumidores e entregadores.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-lime/20 flex items-center justify-center transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://wa.me/5537999999999"
                aria-label="WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-lime/20 flex items-center justify-center transition-colors"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Col 2 — Para Lojistas */}
          <div>
            <h3 className="font-jakarta font-semibold text-xs uppercase tracking-widest text-white/30 mb-5">
              Para Lojistas
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'Como funciona', href: '#como-funciona' },
                { label: 'Planos e preços', href: '#planos' },
                { label: 'Cadastrar minha loja', href: `${APP_URL}/cadastro` },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-white/50 hover:text-white text-sm transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Para você */}
          <div>
            <h3 className="font-jakarta font-semibold text-xs uppercase tracking-widest text-white/30 mb-5">
              Para você
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'Baixar o app', href: '#para-consumidores' },
                { label: 'Seja um entregador', href: '#para-entregadores' },
                { label: 'FAQ', href: '#faq' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-white/50 hover:text-white text-sm transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contato */}
          <div>
            <h3 className="font-jakarta font-semibold text-xs uppercase tracking-widest text-white/30 mb-5">
              Contato
            </h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 text-white/50 text-sm">
                <Mail size={16} className="mt-0.5 shrink-0 text-lime" />
                <a
                  href="mailto:contato@mallevo.com.br"
                  className="hover:text-white transition-colors"
                >
                  contato@mallevo.com.br
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/50 text-sm">
                <Phone size={16} className="mt-0.5 shrink-0 text-lime" />
                <a
                  href="https://wa.me/5537999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  (37) 99999-9999
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/50 text-sm">
                <MapPin size={16} className="mt-0.5 shrink-0 text-lime" />
                <span>Divinópolis, MG</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm text-center sm:text-left">
            © 2026 Mallevo. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-white/30 hover:text-white/60 text-sm transition-colors"
            >
              Termos de uso
            </a>
            <a
              href="#"
              className="text-white/30 hover:text-white/60 text-sm transition-colors"
            >
              Política de privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
