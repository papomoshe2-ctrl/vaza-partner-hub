'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

const navLinks = [
  { href: '/catalog', label: 'קטלוג' },
  { href: '/package-builder', label: 'בנה חבילה' },
  { href: '/top-sellers', label: 'Top Sellers' },
  { href: '/about', label: 'אודות' },
  { href: '/contact', label: 'צור קשר' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-[#050505]/90 backdrop-blur-xl border-b border-[rgba(212,175,55,0.08)]'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className="w-8 h-8 rounded flex items-center justify-center font-black text-sm"
              style={{
                background: 'linear-gradient(135deg, #B8963E, #D4AF37, #F4D06F)',
                color: '#050505',
                letterSpacing: '-0.02em',
              }}
            >
              V
            </div>
            <div className="flex flex-col leading-none">
              <span
                className="font-black text-base tracking-widest uppercase"
                style={{ color: '#F5F0E8', letterSpacing: '0.15em' }}
              >
                VAZA
              </span>
              <span
                className="text-[9px] font-medium tracking-[0.3em] uppercase"
                style={{ color: 'rgba(212,175,55,0.7)' }}
              >
                Partner Hub
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-medium tracking-wider uppercase transition-colors duration-200"
                style={{ color: 'rgba(245,240,232,0.6)', letterSpacing: '0.12em' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#D4AF37' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245,240,232,0.6)' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/admin"
              className="text-xs font-medium tracking-wider uppercase transition-colors"
              style={{ color: 'rgba(245,240,232,0.35)', letterSpacing: '0.1em' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(212,175,55,0.7)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245,240,232,0.35)' }}
            >
              ניהול
            </Link>
            <Link href="/catalog" className="btn-gold text-xs py-2.5 px-6">
              צפה בקטלוג
            </Link>
          </div>

          {/* Mobile */}
          <button
            className="lg:hidden p-2 text-[rgba(245,240,232,0.6)]"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden"
            style={{ background: 'rgba(5,5,5,0.98)', borderBottom: '1px solid rgba(212,175,55,0.1)' }}
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-sm font-medium tracking-wider uppercase py-2"
                  style={{ color: 'rgba(245,240,232,0.7)', letterSpacing: '0.1em' }}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2">
                <Link href="/catalog" className="btn-gold w-full justify-center">
                  צפה בקטלוג
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
