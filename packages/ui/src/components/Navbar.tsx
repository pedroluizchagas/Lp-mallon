'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import { cn } from '../lib/utils'

interface NavbarProps {
  links?: { label: string; href: string }[]
  ctaLabel?: string
  ctaUrl?: string
  theme?: 'dark' | 'light'
}

const DEFAULT_LINKS = [
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Planos', href: '#planos' },
  { label: 'Para Entregadores', href: '#para-entregadores' },
  { label: 'FAQ', href: '#faq' },
]

const DEFAULT_CTA_URL =
  process.env.NEXT_PUBLIC_APP_URL
    ? `${process.env.NEXT_PUBLIC_APP_URL}/cadastro`
    : 'https://app.mallevo.com.br/cadastro'

export default function Navbar({
  links = DEFAULT_LINKS,
  ctaLabel = 'Cadastrar minha loja',
  ctaUrl = DEFAULT_CTA_URL,
  theme = 'dark',
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-dark/96 backdrop-blur-md shadow-lg shadow-black/20'
            : 'bg-transparent'
        )}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a href="/" className="flex items-center">
              <span className="font-jakarta text-2xl font-bold tracking-tight">
                <span className={scrolled || theme === 'dark' ? 'text-white' : 'text-ink'}>Mall</span>
                <span className="text-lime">evo</span>
              </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {links.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-white/80 hover:text-white text-sm font-medium transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <motion.a
                href={ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-lime text-lime-ink font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-lime-dark transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {ctaLabel}
                <ArrowRight size={16} />
              </motion.a>
            </div>

            {/* Mobile hamburger */}
            <button
              className={cn(
                'lg:hidden p-2 rounded-lg transition-colors',
                scrolled || theme === 'dark' ? 'text-white' : 'text-ink'
              )}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Abrir menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 h-full w-72 bg-dark z-50 lg:hidden flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <span className="font-jakarta text-xl font-bold tracking-tight">
                  <span className="text-white">Mall</span>
                  <span className="text-lime">evo</span>
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-white/70 hover:text-white"
                  aria-label="Fechar menu"
                >
                  <X size={22} />
                </button>
              </div>

              <nav className="flex flex-col gap-1 p-4 flex-1">
                {links.map((link, i) => (
                  <motion.button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="text-white/80 hover:text-white hover:bg-white/10 text-left px-4 py-3 rounded-xl text-base font-medium transition-colors w-full cursor-pointer"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>

              <div className="p-6 border-t border-white/10">
                <a
                  href={ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-lime text-lime-ink font-bold px-5 py-3.5 rounded-xl w-full hover:bg-lime-dark transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {ctaLabel}
                  <ArrowRight size={16} />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
