'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

function useCountUp(target: number, duration = 700) {
  const [value, setValue] = useState(0)
  const raf = useRef<number | null>(null)

  useEffect(() => {
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * ease))
      if (progress < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => { if (raf.current) cancelAnimationFrame(raf.current) }
  }, [target, duration])

  return value
}

export function ProfitCalculator() {
  const [qty, setQty] = useState(50)
  const [avgPrice, setAvgPrice] = useState(65)
  const [margin, setMargin] = useState(42)

  const monthly = Math.round(qty * avgPrice * 30 * (margin / 100))
  const annual = monthly * 12

  const displayMonthly = useCountUp(monthly)
  const displayAnnual = useCountUp(annual)

  return (
    <section style={{ background: 'var(--ink-0)', padding: '120px 0', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-8 mb-16 items-end">
          <div className="lg:col-span-6">
            <motion.span
              className="editorial-label"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              מחשבון רווחיות
            </motion.span>
            <motion.h2
              className="display-md mt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              כמה אתה יכול<br />
              <span style={{ color: 'var(--bronze)' }}>להרוויח?</span>
            </motion.h2>
          </div>
          <motion.p
            className="lg:col-span-6 editorial-body"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontSize: '0.88rem' }}
          >
            הזז את המחוונים לפי המציאות של החנות שלך — ותראה את הרווח הנוסף שמחכה לך.
          </motion.p>
        </div>

        <motion.div
          className="grid lg:grid-cols-2 gap-px"
          style={{ background: 'var(--border-subtle)' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Controls */}
          <div style={{ background: 'var(--ink-2)', padding: '48px 40px', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <Slider
              label="מכירות ביום"
              value={qty}
              min={5}
              max={200}
              onChange={setQty}
              display={String(qty)}
            />
            <Slider
              label="מחיר מכירה ממוצע"
              value={avgPrice}
              min={20}
              max={250}
              onChange={setAvgPrice}
              display={`₪${avgPrice}`}
            />
            <Slider
              label="מרווח רווח"
              value={margin}
              min={20}
              max={65}
              onChange={setMargin}
              display={`${margin}%`}
            />
          </div>

          {/* Results */}
          <div style={{ background: 'var(--ink-3)', padding: '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2rem' }}>
            <div>
              <div className="editorial-label" style={{ color: 'var(--cream-muted)', marginBottom: '1rem' }}>רווח חודשי משוער</div>
              <div
                className="tabular-nums"
                style={{
                  fontSize: 'clamp(40px, 6vw, 72px)',
                  fontWeight: 900,
                  color: 'var(--bronze)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                ₪{displayMonthly.toLocaleString('he-IL')}
              </div>
              <p style={{ fontSize: '0.72rem', color: 'var(--cream-muted)', marginTop: '0.5rem' }}>
                על בסיס {qty} מכירות ביום × 30 יום
              </p>
            </div>

            <div style={{ height: '1px', background: 'var(--border-subtle)' }} />

            <div>
              <div className="editorial-label" style={{ color: 'var(--cream-muted)', marginBottom: '0.75rem' }}>רווח שנתי פוטנציאלי</div>
              <div
                className="tabular-nums"
                style={{
                  fontSize: 'clamp(28px, 4vw, 48px)',
                  fontWeight: 800,
                  color: 'var(--cream)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                ₪{displayAnnual.toLocaleString('he-IL')}
              </div>
            </div>

            <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--cream-muted)', lineHeight: 1.7 }}>
                מבוסס על מרווח ממוצע של {margin}% —
                בתחום הנמוך של קטלוג VAZA. רוב המוצרים מגיעים ל-45–55%.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Slider({
  label,
  value,
  min,
  max,
  onChange,
  display,
}: {
  label: string
  value: number
  min: number
  max: number
  onChange: (v: number) => void
  display: string
}) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem' }}>
        <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--cream)' }}>{label}</label>
        <span style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--bronze)', letterSpacing: '-0.01em' }}>{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: '100%', accentColor: 'var(--bronze)' }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.4rem', fontSize: '0.62rem', color: 'var(--cream-muted)' }}>
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  )
}
