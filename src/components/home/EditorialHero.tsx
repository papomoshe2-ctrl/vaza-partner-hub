'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

export function EditorialHero() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden" style={{ background: '#050505' }}>

      {/* Background image — full cover */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1549465323-8f9f00e22bdb?auto=format&fit=crop&w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
        }}
      />

      {/* Dark overlay — editorial weight */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, #050505 0%, rgba(5,5,5,0.75) 45%, rgba(5,5,5,0.35) 100%)' }}
      />

      {/* Content — anchored to bottom */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pb-20 pt-48">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <span className="editorial-label">VAZA Partner Hub — B2B פרימיום לישראל</span>
        </motion.div>

        {/* Headline — editorial scale */}
        <motion.h1
          className="display-xl mb-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{ maxWidth: '14ch' }}
        >
          מוצרי פרימיום<br />
          <span style={{ color: 'var(--bronze)' }}>שמכפילים</span><br />
          את הסל שלך
        </motion.h1>

        {/* Lead copy */}
        <motion.p
          className="editorial-body mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ maxWidth: '44ch', fontSize: '1.05rem' }}
        >
          חנויות פרחים מוכרות פרחים. החנויות שמשגשגות מוכרות גם מה שמגיע איתם —
          שוקולדים, יינות, מארזים. גישה לקטלוג המלא בלחיצה אחת.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <Link href="/catalog" className="btn-primary">
            צפה בקטלוג
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <Link href="/package-builder" className="btn-secondary">
            בנה חבילה
          </Link>
        </motion.div>

        {/* Thin line divider at bottom */}
        <motion.div
          className="mt-20 flex items-center gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <div style={{ height: '1px', flex: 1, background: 'var(--border-subtle)' }} />
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.18em', color: 'var(--cream-ghost)', whiteSpace: 'nowrap' }}>
            VAZA — GIFT PRODUCTS FOR FLORISTS
          </span>
          <div style={{ height: '1px', flex: 1, background: 'var(--border-subtle)' }} />
        </motion.div>
      </div>
    </section>
  )
}
