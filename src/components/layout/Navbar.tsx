'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

const NAV = [
  { href: '/catalog', label: 'קטלוג' },
  { href: '/package-builder', label: 'בנה חבילה' },
  { href: '/about', label: 'אודות' },
  { href: '/contact', label: 'צור קשר' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'background 0.4s, border-color 0.4s',
        background: scrolled ? 'rgba(5,5,5,0.94)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>

          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                background: 'var(--bronze)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: '0.9rem',
                color: '#050505',
                letterSpacing: '-0.01em',
              }}
            >
              V
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{ fontWeight: 900, fontSize: '0.9rem', letterSpacing: '0.18em', color: 'var(--cream)', textTransform: 'uppercase' }}>
                VAZA
              </span>
              <span style={{ fontSize: '0.55rem', letterSpacing: '0.28em', color: 'var(--bronze-dim)', textTransform: 'uppercase', marginTop: '2px' }}>
                Partner Hub
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: 'none', gap: '2.5rem' }} className="lg:flex">
            {NAV.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--cream-muted)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--bronze)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--cream-muted)' }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* CTA desktop */}
          <div style={{ display: 'none', alignItems: 'center', gap: '1rem' }} className="lg:flex">
            <Link href="/catalog" className="btn-primary" style={{ padding: '0.55rem 1.4rem', fontSize: '0.72rem' }}>
              צפה בקטלוג
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden"
            onClick={() => setOpen(!open)}
            style={{ color: 'var(--cream-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden', background: 'rgba(5,5,5,0.98)', borderBottom: '1px solid var(--border-subtle)' }}
          >
            <div style={{ padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {NAV.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--cream-dim)',
                    textDecoration: 'none',
                  }}
                >
                  {l.label}
                </Link>
              ))}
              <Link href="/catalog" className="btn-primary" style={{ justifyContent: 'center', marginTop: '0.5rem' }}>
                צפה בקטלוג
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
