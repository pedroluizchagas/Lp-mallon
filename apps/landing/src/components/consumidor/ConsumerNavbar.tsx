'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'

const navLinks = [
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Categorias', href: '#categorias' },
  { label: 'O app', href: '#o-app' },
]

export default function ConsumerNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const scrollTo = (href: string) => {
    setMobileOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0B0F0D]/92 backdrop-blur-md border-b border-white/[0.06] shadow-xl shadow-black/30'
            : 'bg-transparent'
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/consumidor" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-[#4CAF82] flex items-center justify-center shadow-lg shadow-[#4CAF82]/25">
                <span className="font-sora font-bold text-white text-sm leading-none">M</span>
              </div>
              <span className="font-sora font-bold text-[#EDF7F2] text-lg tracking-tight">
                Mall<span className="text-[#4CAF82]">evo</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-[#EDF7F2]/50 hover:text-[#EDF7F2] text-sm font-medium transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
              <Link
                href="/lojista"
                className="text-[#EDF7F2]/50 hover:text-[#EDF7F2] text-sm font-medium transition-colors"
              >
                Para lojistas
              </Link>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <motion.a
                href="#baixar-app"
                className="flex items-center gap-2 bg-[#4CAF82] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[#3d9e71] transition-colors shadow-lg shadow-[#4CAF82]/20"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => { e.preventDefault(); scrollTo('#baixar-app') }}
              >
                Baixar app
                <ArrowRight size={15} />
              </motion.a>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden text-[#EDF7F2]/70 hover:text-[#EDF7F2] p-2 rounded-lg transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Abrir menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 h-full w-72 bg-[#0E1410] border-l border-white/[0.06] z-50 lg:hidden flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
                <span className="font-sora font-bold text-[#EDF7F2] text-lg">
                  Mall<span className="text-[#4CAF82]">evo</span>
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-[#EDF7F2]/50 hover:text-[#EDF7F2] transition-colors"
                  aria-label="Fechar menu"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="flex flex-col gap-1 p-4 flex-1">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className="text-[#EDF7F2]/60 hover:text-[#EDF7F2] hover:bg-white/5 text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors w-full"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    {link.label}
                  </motion.button>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.06 }}
                >
                  <Link
                    href="/lojista"
                    className="block text-[#EDF7F2]/60 hover:text-[#EDF7F2] hover:bg-white/5 px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    Para lojistas
                  </Link>
                </motion.div>
              </nav>

              <div className="p-6 border-t border-white/[0.06]">
                <a
                  href="#baixar-app"
                  className="flex items-center justify-center gap-2 bg-[#4CAF82] text-white font-semibold text-sm px-5 py-3.5 rounded-xl w-full hover:bg-[#3d9e71] transition-colors"
                  onClick={(e) => { e.preventDefault(); scrollTo('#baixar-app') }}
                >
                  Baixar app
                  <ArrowRight size={15} />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
