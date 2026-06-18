'use client'

import { motion } from 'framer-motion'

export function BasketValueSection() {
  return (
    <section style={{ background: 'var(--ink-2)', padding: '120px 0', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="editorial-label">מה זה עושה לסל הקנייה</span>
        </motion.div>

        {/* Before / After — editorial comparison */}
        <div className="grid lg:grid-cols-2 gap-0">

          {/* BEFORE */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              padding: '56px 48px',
              borderLeft: '1px solid var(--border-subtle)',
              borderTop: '1px solid var(--border-subtle)',
            }}
          >
            <div className="editorial-label mb-8" style={{ color: 'var(--cream-muted)' }}>לפני VAZA</div>
            <div
              style={{
                fontSize: 'clamp(56px, 8vw, 96px)',
                fontWeight: 900,
                color: 'var(--cream-muted)',
                lineHeight: 1,
                letterSpacing: '-0.03em',
                marginBottom: '1.5rem',
              }}
            >
              ₪150
            </div>
            <p className="editorial-body" style={{ fontSize: '0.88rem' }}>
              זר פרחים בינוני.<br />
              הלקוח שילם, יצא, נגמר.
            </p>

            <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid var(--border-subtle)' }}>
              {['זר פרחים — 150₪'].map((item) => (
                <div key={item} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', fontSize: '0.82rem', color: 'var(--cream-muted)' }}>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* AFTER */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              padding: '56px 48px',
              background: 'var(--ink-3)',
              borderTop: '1px solid var(--border-bronze)',
              borderLeft: '1px solid var(--border-bronze)',
              borderRight: '1px solid var(--border-bronze)',
              borderBottom: '1px solid var(--border-bronze)',
            }}
          >
            <div className="editorial-label mb-8">אחרי VAZA</div>
            <div
              style={{
                fontSize: 'clamp(56px, 8vw, 96px)',
                fontWeight: 900,
                color: 'var(--cream)',
                lineHeight: 1,
                letterSpacing: '-0.03em',
                marginBottom: '1.5rem',
              }}
            >
              ₪420
            </div>
            <p className="editorial-body" style={{ fontSize: '0.88rem' }}>
              אותו לקוח, אותה ביקורה.<br />
              שלוש שורות נוספות בקופה.
            </p>

            <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid var(--border-bronze)' }}>
              {[
                'זר פרחים — 150₪',
                'שוקולד בלגי פרימיום — 65₪',
                'יין אדום בוטיק — 95₪',
                'מארז אריזה יוקרה — 110₪',
              ].map((item, i) => (
                <div
                  key={item}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0.5rem 0',
                    fontSize: '0.82rem',
                    color: i === 0 ? 'var(--cream-muted)' : 'var(--cream)',
                    fontWeight: i === 0 ? 400 : 600,
                    borderTop: i > 0 ? '1px solid var(--border-subtle)' : 'none',
                  }}
                >
                  <span>{item}</span>
                  {i > 0 && (
                    <span style={{ color: 'var(--bronze)', fontSize: '0.7rem', fontWeight: 600 }}>+VAZA</span>
                  )}
                </div>
              ))}
            </div>

            {/* Profit highlight */}
            <div
              style={{
                marginTop: '2rem',
                padding: '1rem 1.25rem',
                background: 'var(--bronze-ghost)',
                border: '1px solid var(--border-bronze)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--cream)' }}>רווח נוסף לחנות</span>
              <span style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--bronze)' }}>+₪118</span>
            </div>
          </motion.div>
        </div>

        {/* Caption */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ marginTop: '3rem', fontSize: '0.75rem', color: 'var(--cream-muted)', textAlign: 'center', maxWidth: '60ch', margin: '3rem auto 0' }}
        >
          מחירים לדוגמה בלבד. הרווח בפועל תלוי בסוג המוצר ובמחיר המכירה שתבחר.
          מרווח ממוצע בקטלוג VAZA: 42–55%.
        </motion.p>
      </div>
    </section>
  )
}
