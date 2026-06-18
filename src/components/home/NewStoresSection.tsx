'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const STEPS = [
  { n: '01', title: 'שלח פנייה', body: 'מלא טופס קצר — שם, טלפון, עיר. הצוות שלנו חוזר תוך 24 שעות.' },
  { n: '02', title: 'קבל הצעה', body: 'נתאים חבילת כניסה לפי גודל החנות וסוג הלקוחות שלך.' },
  { n: '03', title: 'מוצרים אצלך', body: 'אספקה תוך 48 שעות עם חומרי תצוגה מוכנים להצבה.' },
  { n: '04', title: 'מתחיל למכור', body: 'הסחורה על המדף, הלקוחות רואים, הסל גדל. פשוט.' },
]

export function NewStoresSection() {
  return (
    <section style={{ background: 'var(--ink-0)', padding: '120px 0', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="grid lg:grid-cols-12 gap-12 items-start">

          {/* Left — steps */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="editorial-label">לחנויות חדשות</span>
            <div className="line-bronze mt-4 mb-12" />

            <h2 className="display-md mb-12">
              מהיום להכנסה<br />
              <span style={{ color: 'var(--bronze)' }}>תוך שלושה ימים.</span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0', borderRight: '1px solid var(--border-subtle)', paddingRight: '2rem' }}>
              {STEPS.map((step, i) => (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '48px 1fr',
                    gap: '1.5rem',
                    paddingBottom: i < STEPS.length - 1 ? '2.5rem' : '0',
                    position: 'relative',
                  }}
                >
                  {/* Step number */}
                  <div
                    style={{
                      fontSize: '0.6rem',
                      fontWeight: 700,
                      color: 'var(--bronze)',
                      letterSpacing: '0.1em',
                      paddingTop: '3px',
                    }}
                  >
                    {step.n}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--cream)', marginBottom: '0.4rem' }}>
                      {step.title}
                    </h3>
                    <p className="editorial-body" style={{ fontSize: '0.85rem' }}>{step.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — CTA box */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div
              style={{
                border: '1px solid var(--border-bronze)',
                padding: '48px 40px',
                background: 'var(--ink-2)',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  background: 'var(--bronze-ghost)',
                  border: '1px solid var(--border-bronze)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '2rem',
                  fontSize: '1.25rem',
                }}
              >
                ✦
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--cream)', marginBottom: '1rem', lineHeight: 1.3 }}>
                מוכן להגדיל<br />את הסל?
              </h3>

              <p className="editorial-body" style={{ fontSize: '0.85rem', marginBottom: '2rem' }}>
                ללא חוזה, ללא מינימום, ללא סיכון.
                מחזירים מה שלא נמכר.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <Link href="#contact" className="btn-primary" style={{ justifyContent: 'center' }}>
                  שלח פנייה עכשיו
                </Link>
                <Link href="/catalog" className="btn-secondary" style={{ justifyContent: 'center' }}>
                  צפה בקטלוג תחילה
                </Link>
              </div>

              <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
                <p style={{ fontSize: '0.72rem', color: 'var(--cream-muted)', lineHeight: 1.6 }}>
                  ✓ משלוח חינם על הזמנה ראשונה<br />
                  ✓ החזר מלא תוך 30 יום<br />
                  ✓ חומרי תצוגה כלולים
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
