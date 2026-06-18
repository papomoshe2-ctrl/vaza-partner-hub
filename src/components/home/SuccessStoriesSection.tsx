'use client'

import { motion } from 'framer-motion'

import { Quote } from 'lucide-react'

const stories = [
  {
    name: 'פרחי שרון',
    city: 'תל אביב',
    type: 'חנות פרחים',
    before: '₪120',
    after: '₪380',
    growth: '+217%',
    quote: 'תוך חודשיים הכפלנו את סל הקנייה הממוצע. VAZA שינתה לנו את כל הדינמיקה של העסק.',
    owner: 'שרון כהן',
  },
  {
    name: 'מתנות ועוד',
    city: 'ירושלים',
    type: 'חנות מתנות',
    before: '₪95',
    after: '₪410',
    growth: '+332%',
    quote: 'הלקוחות שלנו אוהבים את המוצרים. כל שבוע יש מוצר חדש שאנחנו מציגים בחלון.',
    owner: 'מירי לוי',
  },
  {
    name: 'מלון בוטיק הים',
    city: 'אילת',
    type: 'מלון בוטיק',
    before: 'ללא מארזים',
    after: '₪520/מארז',
    growth: '+∞',
    quote: 'פתחנו קטגוריה חדשה לגמרי — מארזי ברוכים הבאים לחדרים. הרווח טהור.',
    owner: 'אבי נחמן',
  },
]

export function SuccessStoriesSection() {
  return (
    <section className="relative py-24 lg:py-36" style={{ background: 'var(--layer-0)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-5">
            <span className="section-label">סיפורי הצלחה</span>
          </div>
          <h2
            className="font-black mb-4"
            style={{ fontSize: 'clamp(30px, 5vw, 52px)', color: '#F5F0E8', letterSpacing: '-0.02em', lineHeight: 1.05 }}
          >
            עסקים שכבר<br />
            <span className="gold-text">שינו את הגישה</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {stories.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="luxury-card p-8 h-full flex flex-col">
                {/* Before / After */}
                <div
                  className="flex items-center gap-3 mb-6 p-4 rounded-xl"
                  style={{ background: 'rgba(212,175,55,0.04)', border: '1px solid rgba(212,175,55,0.1)' }}
                >
                  <div className="text-center flex-1">
                    <div style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: 'rgba(245,240,232,0.3)', marginBottom: '4px' }}>לפני</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'rgba(245,240,232,0.5)' }}>{s.before}</div>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'rgba(212,175,55,0.4)' }}>→</div>
                  <div className="text-center flex-1">
                    <div style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: 'rgba(245,240,232,0.3)', marginBottom: '4px' }}>אחרי</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#D4AF37' }}>{s.after}</div>
                  </div>
                  <div className="text-center flex-1">
                    <div style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: 'rgba(245,240,232,0.3)', marginBottom: '4px' }}>גידול</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#4ade80' }}>{s.growth}</div>
                  </div>
                </div>

                {/* Quote */}
                <div className="flex-1 mb-6">
                  <Quote className="w-5 h-5 mb-3" style={{ color: 'rgba(212,175,55,0.3)' }} />
                  <p style={{ fontSize: '0.875rem', color: 'rgba(245,240,232,0.65)', lineHeight: 1.8, fontStyle: 'italic' }}>
                    {s.quote}
                  </p>
                </div>

                {/* Attribution */}
                <div className="pt-5" style={{ borderTop: '1px solid rgba(212,175,55,0.1)' }}>
                  <div style={{ fontWeight: 700, color: '#F5F0E8', fontSize: '0.9rem' }}>{s.owner}</div>
                  <div style={{ fontSize: '0.72rem', color: 'rgba(245,240,232,0.35)', marginTop: '2px' }}>
                    {s.name} · {s.type} · {s.city}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
