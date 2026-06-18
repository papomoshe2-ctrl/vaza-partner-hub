'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ChevronDown } from 'lucide-react'

const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 8 + 6,
  delay: Math.random() * 6,
  travel: -(Math.random() * 300 + 150),
  maxOpacity: Math.random() * 0.4 + 0.1,
}))

const WORDS = ['רווחית', 'פרימיום', 'מנצחת', 'יוקרתית']

export function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const interval = setInterval(() => setWordIndex((i) => (i + 1) % WORDS.length), 2500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: 'var(--layer-0)' }}>

      {/* Dynamic glow following mouse */}
      <div
        className="absolute inset-0 pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
          background: `radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,55,0.07) 0%, transparent 70%)`,
        }}
      />

      {/* Static ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10"
          style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full blur-[100px] opacity-6"
          style={{ background: 'radial-gradient(circle, #B8963E 0%, transparent 70%)' }} />
      </div>

      {/* Luxury grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212,175,55,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,175,55,0.4) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Gold particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className="particle"
            style={{
              left: p.left,
              bottom: '-10px',
              width: `${p.size}px`,
              height: `${p.size}px`,
              '--duration': `${p.duration}s`,
              '--delay': `${p.delay}s`,
              '--travel': `${p.travel}px`,
              '--max-opacity': p.maxOpacity,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full py-32">
        <div className="max-w-4xl">

          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="section-label">
              מערכת B2B פרימיום לישראל
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-black leading-[0.95] mb-6"
            style={{ fontSize: 'clamp(52px, 8vw, 96px)', color: '#F5F0E8', letterSpacing: '-0.02em' }}
          >
            הפוך כל חנות
            <br />
            פרחים לחנות
            <br />
            <span
              className="gold-text-shimmer"
              key={wordIndex}
            >
              {WORDS[wordIndex]} יותר
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg leading-relaxed mb-10 max-w-2xl"
            style={{ color: 'rgba(245,240,232,0.5)', fontWeight: 300 }}
          >
            גישה למאות מוצרי פרימיום — שוקולדים, יינות, מארזים יוקרתיים ועוד —
            שמגדילים את סל הקנייה מ-150₪ ל-450₪ ומעלה.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-wrap gap-10 mb-12"
          >
            {[
              { value: '200%+', label: 'גידול ממוצע בסל הקנייה' },
              { value: '500+', label: 'מוצרי פרימיום בקטלוג' },
              { value: '48h', label: 'אספקה מובטחת לכל הארץ' },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-1">
                <span
                  className="font-black"
                  style={{ fontSize: '2rem', lineHeight: 1, color: '#D4AF37' }}
                >
                  {value}
                </span>
                <span style={{ fontSize: '0.72rem', color: 'rgba(245,240,232,0.4)', letterSpacing: '0.08em' }}>
                  {label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/catalog" className="btn-gold text-sm">
              צפה בקטלוג המלא
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <Link href="/package-builder" className="btn-ghost-gold text-sm">
              בנה חבילת מוצרים
            </Link>
          </motion.div>
        </div>

        {/* Floating product preview cards */}
        <div className="hidden xl:block absolute left-8 top-1/2 -translate-y-1/2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col gap-3"
          >
            {[
              { name: 'שוקולד בלגי פרימיום', profit: '49%', price: '₪28', cat: 'שוקולדים' },
              { name: 'יין אדום בוטיק', profit: '46%', price: '₪65', cat: 'יינות' },
              { name: 'מארז מתנה יוקרה', profit: '47%', price: '₪85', cat: 'מארזים' },
            ].map((card, i) => (
              <motion.div
                key={card.name}
                className="luxury-card px-5 py-4 w-56"
                style={{ animationDelay: `${i * 0.5}s` }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.7 }}
              >
                <div style={{ fontSize: '0.65rem', color: 'rgba(212,175,55,0.5)', letterSpacing: '0.15em', marginBottom: '0.35rem' }}>
                  {card.cat.toUpperCase()}
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#F5F0E8', marginBottom: '0.6rem', lineHeight: 1.3 }}>
                  {card.name}
                </div>
                <div className="flex justify-between items-center">
                  <span style={{ fontSize: '1rem', fontWeight: 800, color: '#D4AF37' }}>{card.price}</span>
                  <span style={{
                    fontSize: '0.7rem', fontWeight: 700,
                    background: 'rgba(34,197,94,0.1)',
                    border: '1px solid rgba(34,197,94,0.2)',
                    color: '#4ade80',
                    padding: '2px 8px', borderRadius: '20px'
                  }}>
                    רווח {card.profit}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(245,240,232,0.25)' }}>
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-4 h-4" style={{ color: 'rgba(212,175,55,0.4)' }} />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, var(--layer-0), transparent)' }} />
    </section>
  )
}
