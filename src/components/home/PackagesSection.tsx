'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, Star } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    nameHe: 'התחלתי',
    monthlyFee: 0,
    minOrder: 500,
    features: ['גישה לקטלוג בסיסי (150+ מוצרים)', 'אספקה תוך 72 שעות', 'תמיכה בוואטסאפ', 'מחשבון רווח בסיסי'],
    cta: 'התחל חינם',
    href: '/contact',
    featured: false,
  },
  {
    name: 'Premium',
    nameHe: 'פרימיום',
    monthlyFee: 299,
    minOrder: 1500,
    features: ['גישה לקטלוג מלא (500+ מוצרים)', 'אספקה תוך 48 שעות', 'מנהל לקוח אישי', 'מחירים מיוחדים עד 15% הנחה', 'Package Builder מלא', 'תמיכה 24/7'],
    cta: 'הצטרף עכשיו',
    href: '/contact',
    featured: true,
  },
  {
    name: 'Enterprise',
    nameHe: 'ארגוני',
    monthlyFee: null,
    minOrder: 5000,
    features: ['כל מה שב-Premium', 'מחירים מותאמים אישית', 'אספקה מהירה 24 שעות', 'תיוג פרטי ומיתוג מותאם', 'מנהל חשבון ייעודי', 'API אינטגרציה'],
    cta: 'צור קשר',
    href: '/contact',
    featured: false,
  },
]

export function PackagesSection() {
  return (
    <section className="relative py-24 lg:py-36" style={{ background: 'var(--layer-1)' }}>
      <div className="gold-line absolute top-0 inset-x-0" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-5">
            <span className="section-label">חבילות מנוי</span>
          </div>
          <h2
            className="font-black mb-4"
            style={{ fontSize: 'clamp(30px, 5vw, 52px)', color: '#F5F0E8', letterSpacing: '-0.02em', lineHeight: 1.05 }}
          >
            תכנית שמתאימה<br />
            <span className="gold-text">לגודל העסק שלך</span>
          </h2>
          <p style={{ color: 'rgba(245,240,232,0.4)', maxWidth: 420, margin: '0 auto', lineHeight: 1.8 }}>
            בלי עמלות נסתרות. בלי הפתעות. רק שותפות שמשתלמת.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={plan.featured ? 'md:-mt-4 md:mb-4' : ''}
            >
              <div
                className="relative rounded-2xl p-8 h-full flex flex-col"
                style={{
                  background: plan.featured
                    ? 'linear-gradient(145deg, rgba(212,175,55,0.08), rgba(212,175,55,0.03))'
                    : 'linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
                  border: plan.featured ? '1px solid rgba(212,175,55,0.35)' : '1px solid rgba(212,175,55,0.08)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                {plan.featured && (
                  <div className="absolute -top-3.5 inset-x-0 flex justify-center">
                    <div
                      className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold"
                      style={{ background: 'linear-gradient(90deg, #B8963E, #D4AF37, #F4D06F)', color: '#050505' }}
                    >
                      <Star className="w-3 h-3" fill="currentColor" />
                      הכי פופולרי
                    </div>
                  </div>
                )}

                {plan.featured && (
                  <div className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(212,175,55,0.08), transparent 60%)' }} />
                )}

                <div className="relative z-10">
                  <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(212,175,55,0.5)', marginBottom: '0.5rem' }}>
                    {plan.name.toUpperCase()}
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#F5F0E8', marginBottom: '1.5rem' }}>
                    {plan.nameHe}
                  </div>

                  <div className="mb-6">
                    {plan.monthlyFee === null ? (
                      <div style={{ fontSize: '2rem', fontWeight: 900, color: '#D4AF37' }}>מחיר מותאם</div>
                    ) : plan.monthlyFee === 0 ? (
                      <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#D4AF37' }}>חינם</div>
                    ) : (
                      <div className="flex items-end gap-1">
                        <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#D4AF37', lineHeight: 1 }}>₪{plan.monthlyFee}</span>
                        <span style={{ fontSize: '0.8rem', color: 'rgba(245,240,232,0.35)', marginBottom: '0.4rem' }}>/חודש</span>
                      </div>
                    )}
                    <div style={{ fontSize: '0.75rem', color: 'rgba(245,240,232,0.3)', marginTop: '0.25rem' }}>
                      הזמנה מינימלית ₪{plan.minOrder.toLocaleString('he-IL')}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#D4AF37' }} />
                        <span style={{ fontSize: '0.82rem', color: 'rgba(245,240,232,0.65)', lineHeight: 1.5 }}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={plan.href}
                    className={plan.featured ? 'btn-gold w-full justify-center text-sm' : 'btn-ghost-gold w-full justify-center text-sm'}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="gold-line absolute bottom-0 inset-x-0" />
    </section>
  )
}
