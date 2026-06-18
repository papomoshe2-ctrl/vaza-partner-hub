'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

function useCountUp(target: number, duration = 800) {
  const [value, setValue] = useState(0)
  const raf = useRef<number | null>(null)

  useEffect(() => {
    const start = performance.now()
    const from = 0

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(from + (target - from) * ease))
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

  const monthlyRevenue = qty * avgPrice * 30
  const monthlyProfit = Math.round(monthlyRevenue * (margin / 100))
  const annualProfit = monthlyProfit * 12

  const displayMonthly = useCountUp(monthlyProfit)
  const displayAnnual = useCountUp(annualProfit)

  return (
    <section className="relative py-24 lg:py-36" style={{ background: 'var(--layer-2)' }}>
      <div className="gold-line absolute top-0 inset-x-0" />

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-5">
            <span className="section-label">מחשבון רווחיות</span>
          </div>
          <h2
            className="font-black mb-4"
            style={{ fontSize: 'clamp(30px, 5vw, 52px)', color: '#F5F0E8', letterSpacing: '-0.02em', lineHeight: 1.05 }}
          >
            כמה אתה יכול<br />
            <span className="gold-text">להרוויח עם VAZA?</span>
          </h2>
          <p style={{ color: 'rgba(245,240,232,0.4)', maxWidth: 420, margin: '0 auto', lineHeight: 1.8 }}>
            הזז את המחוונים וראה את הרווח הפוטנציאלי שלך בזמן אמת.
          </p>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-2 gap-8 items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {/* Controls */}
          <div className="luxury-card p-8 space-y-8">
            {/* Qty */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#F5F0E8' }}>
                  מכירות ביום
                </label>
                <span className="font-black" style={{ color: '#D4AF37', fontSize: '1.2rem' }}>{qty}</span>
              </div>
              <input
                type="range" min={5} max={200} value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between mt-1" style={{ fontSize: '0.65rem', color: 'rgba(245,240,232,0.25)' }}>
                <span>5</span><span>200</span>
              </div>
            </div>

            {/* Avg price */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#F5F0E8' }}>
                  מחיר מכירה ממוצע
                </label>
                <span className="font-black" style={{ color: '#D4AF37', fontSize: '1.2rem' }}>₪{avgPrice}</span>
              </div>
              <input
                type="range" min={20} max={250} value={avgPrice}
                onChange={(e) => setAvgPrice(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between mt-1" style={{ fontSize: '0.65rem', color: 'rgba(245,240,232,0.25)' }}>
                <span>₪20</span><span>₪250</span>
              </div>
            </div>

            {/* Margin */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#F5F0E8' }}>
                  מרווח רווח
                </label>
                <span className="font-black" style={{ color: '#D4AF37', fontSize: '1.2rem' }}>{margin}%</span>
              </div>
              <input
                type="range" min={20} max={65} value={margin}
                onChange={(e) => setMargin(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between mt-1" style={{ fontSize: '0.65rem', color: 'rgba(245,240,232,0.25)' }}>
                <span>20%</span><span>65%</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-5">
            <div
              className="luxury-card p-8 text-center"
              style={{ border: '1px solid rgba(212,175,55,0.25)' }}
            >
              <div style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'rgba(212,175,55,0.6)', marginBottom: '0.75rem' }}>
                רווח חודשי משוער
              </div>
              <div
                className="font-black tabular-nums"
                style={{ fontSize: 'clamp(36px, 5vw, 56px)', color: '#D4AF37', lineHeight: 1 }}
              >
                ₪{displayMonthly.toLocaleString('he-IL')}
              </div>
              <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'rgba(245,240,232,0.3)' }}>
                על בסיס {qty} מכירות ביום
              </div>
            </div>

            <div className="luxury-card p-8 text-center">
              <div style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'rgba(212,175,55,0.5)', marginBottom: '0.75rem' }}>
                רווח שנתי פוטנציאלי
              </div>
              <div
                className="font-black tabular-nums"
                style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: '#F5F0E8', lineHeight: 1 }}
              >
                ₪{displayAnnual.toLocaleString('he-IL')}
              </div>
            </div>

            <div
              className="flex items-center gap-3 p-4 rounded-xl"
              style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.12)' }}
            >
              <TrendingUp className="w-4 h-4 flex-shrink-0" style={{ color: '#4ade80' }} />
              <p style={{ fontSize: '0.78rem', color: 'rgba(74,222,128,0.85)', lineHeight: 1.6 }}>
                חברי VAZA מדווחים על גידול ממוצע של <strong>200%</strong> בסל הקנייה תוך 3 חודשים.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="gold-line absolute bottom-0 inset-x-0" />
    </section>
  )
}
