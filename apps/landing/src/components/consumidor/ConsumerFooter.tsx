'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Instagram, MessageCircle, Mail, MapPin } from 'lucide-react'

const footerLinks = {
  'Para você': [
    { label: 'Como funciona', href: '#como-funciona' },
    { label: 'Categorias', href: '#categorias' },
    { label: 'O app', href: '#o-app' },
    { label: 'Depoimentos', href: '#depoimentos' },
  ],
  'Para negócios': [
    { label: 'Cadastrar minha loja', href: '/lojista' },
    { label: 'Ser entregador', href: '/lojista#para-entregadores' },
    { label: 'Planos e preços', href: '/lojista#planos' },
    { label: 'FAQ', href: '/lojista#faq' },
  ],
}

export default function ConsumerFooter() {
  return (
    <footer className="bg-[#080C09] border-t border-white/5 overflow-hidden">

      {/* Top content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/consumidor" className="inline-flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-xl bg-[#4CAF82] flex items-center justify-center">
                <span className="font-sora font-bold text-white text-sm">M</span>
              </div>
              <span className="font-sora font-bold text-[#EDF7F2] text-lg">
                Mall<span className="text-[#4CAF82]">evo</span>
              </span>
            </Link>
            <p className="text-[#EDF7F2]/35 text-sm leading-relaxed mb-6 max-w-xs">
              O shopping digital de Divinópolis, MG. Conectando pessoas às melhores lojas locais.
            </p>
            <div className="flex items-center gap-2.5">
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-xl bg-white/6 hover:bg-[#4CAF82]/15 border border-white/6 hover:border-[#4CAF82]/20 flex items-center justify-center transition-all duration-200"
              >
                <Instagram size={16} className="text-[#EDF7F2]/50" />
              </a>
              <a
                href="https://wa.me/5537999999999"
                aria-label="WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/6 hover:bg-[#4CAF82]/15 border border-white/6 hover:border-[#4CAF82]/20 flex items-center justify-center transition-all duration-200"
              >
                <MessageCircle size={16} className="text-[#EDF7F2]/50" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, items]) => (
            <div key={group}>
              <h3 className="font-sora font-semibold text-[10px] uppercase tracking-[0.18em] text-[#EDF7F2]/25 mb-5">
                {group}
              </h3>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-[#EDF7F2]/40 hover:text-[#EDF7F2] text-sm transition-colors duration-150"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contato */}
          <div>
            <h3 className="font-sora font-semibold text-[10px] uppercase tracking-[0.18em] text-[#EDF7F2]/25 mb-5">
              Contato
            </h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <Mail size={14} className="text-[#4CAF82] mt-0.5 shrink-0" />
                <a
                  href="mailto:contato@mallevo.com.br"
                  className="text-[#EDF7F2]/40 hover:text-[#EDF7F2] text-sm transition-colors duration-150"
                >
                  contato@mallevo.com.br
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-[#4CAF82] mt-0.5 shrink-0" />
                <span className="text-[#EDF7F2]/40 text-sm">Divinópolis, MG</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-linear-to-r from-transparent via-white/8 to-transparent mx-4 sm:mx-8" />

      {/* Large brand name — Arpeggio signature */}
      <div className="relative overflow-hidden py-6 lg:py-8">
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            className="font-sora font-bold select-none leading-none tracking-tight text-[#EDF7F2]/4 whitespace-nowrap"
            style={{ fontSize: 'clamp(5rem, 18vw, 16rem)' }}
          >
            Mallevo
          </h2>
        </motion.div>

        {/* Subtle center glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-100 h-50 bg-[#4CAF82]/4 rounded-full blur-[80px]" />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 px-4 sm:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#EDF7F2]/20 text-xs text-center sm:text-left">
            © 2026 Mallevo. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[#EDF7F2]/20 hover:text-[#EDF7F2]/50 text-xs transition-colors">
              Termos de uso
            </a>
            <a href="#" className="text-[#EDF7F2]/20 hover:text-[#EDF7F2]/50 text-xs transition-colors">
              Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
