'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Package, Award } from 'lucide-react'

const values = [
  { icon: TrendingUp, title: 'רווחיות אמיתית', desc: 'אנחנו לא מוכרים מוצרים — אנחנו מוכרים רווחיות. כל מוצר נבחר לפי מרווח, ביקוש ויכולת מכירה.' },
  { icon: Users, title: 'שותפות לטווח ארוך', desc: 'אנחנו לא ספק — אנחנו שותף אסטרטגי. מנהל לקוח אישי, ייעוץ מתמיד, תמיכה בכל שלב.' },
  { icon: Package, title: 'מוכן למדף', desc: 'כל מוצר מגיע ארוז, מתויג ומוכן לתצוגה מיידית. אפס עבודה מצד הלקוח.' },
  { icon: Award, title: 'איכות ללא פשרות', desc: 'קטלוג של מותגי פרימיום בינלאומיים בלבד. אם זה לא עומד בסטנדרט שלנו — זה לא נכנס לקטלוג.' },
]

const timeline = [
  { year: '2019', title: 'הקמת VAZA', desc: 'נוסדה מתוך הבנה שחנויות פרחים מפספסות הכנסה עצומה מסל הקנייה.' },
  { year: '2020', title: 'הרחבת הקטלוג', desc: 'מ-30 מוצרים ל-200+. כניסת מותגי שוקולד ויין מובחרים לרשת.' },
  { year: '2022', title: '100 לקוחות פעילים', desc: 'נקודת ציון: 100 עסקים בישראל בוחרים VAZA כספק הפרימיום שלהם.' },
  { year: '2024', title: 'VAZA Partner Hub', desc: 'השקת פלטפורמת B2B דיגיטלית עם קטלוג חי, Package Builder ומחשבון רווח.' },
]

const stats = [
  { value: '500+', label: 'מוצרים בקטלוג' },
  { value: '300+', label: 'לקוחות פעילים' },
  { value: '48h', label: 'זמן אספקה' },
  { value: '42%', label: 'מרווח ממוצע' },
]

export function AboutClient() {
  return (
    <div className="min-h-screen pt-20" style={{ background: 'var(--layer-0)' }}>
      {/* Hero */}
      <section className="relative py-24 lg:py-36 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(212,175,55,0.06), transparent 70%)' }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="section-label mb-6 inline-block">אודות VAZA</span>
            <h1 className="font-black mb-6"
              style={{ fontSize: 'clamp(36px, 6vw, 72px)', color: '#F5F0E8', letterSpacing: '-0.02em', lineHeight: 1.05 }}>
              לא רק ספק מוצרים.<br />
              <span className="gold-text">שותף לצמיחה.</span>
            </h1>
            <p className="max-w-2xl mx-auto" style={{ fontSize: '1.1rem', color: 'rgba(245,240,232,0.45)', lineHeight: 1.8 }}>
              VAZA נולדה מתוך שאלה פשוטה: למה חנות פרחים עם 100 לקוחות ביום מרוויחה רק ממה שהלקוח מגיע לקנות?
              ה-Bundle הנכון של מוצרי פרימיום יכול להכפיל את ההכנסה — בלי לקוחות נוספים.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: 'var(--layer-2)', borderTop: '1px solid rgba(212,175,55,0.08)', borderBottom: '1px solid rgba(212,175,55,0.08)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div key={s.label} className="text-center"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <div className="font-black mb-1" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#D4AF37' }}>{s.value}</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(245,240,232,0.4)', letterSpacing: '0.08em' }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32" style={{ background: 'var(--layer-1)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="font-black" style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: '#F5F0E8', letterSpacing: '-0.02em' }}>
              מה מנחה אותנו
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <div className="luxury-card p-7 h-full">
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-5"
                    style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.15)' }}>
                    <Icon className="w-5 h-5" style={{ color: '#D4AF37' }} />
                  </div>
                  <h3 className="font-bold mb-3" style={{ color: '#F5F0E8', fontSize: '1rem' }}>{title}</h3>
                  <p style={{ fontSize: '0.82rem', color: 'rgba(245,240,232,0.45)', lineHeight: 1.8 }}>{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 lg:py-32" style={{ background: 'var(--layer-0)' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <motion.div className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="font-black" style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: '#F5F0E8', letterSpacing: '-0.02em' }}>
              הדרך שלנו
            </h2>
          </motion.div>
          <div className="relative">
            <div className="absolute right-[22px] top-0 bottom-0 w-px" style={{ background: 'rgba(212,175,55,0.15)' }} />
            <div className="space-y-10">
              {timeline.map((t, i) => (
                <motion.div key={t.year} className="flex gap-6 items-start"
                  initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                  <div className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-xs font-black z-10"
                    style={{ background: 'linear-gradient(135deg, #B8963E, #D4AF37)', color: '#050505' }}>
                    {t.year.slice(2)}
                  </div>
                  <div className="luxury-card p-5 flex-1">
                    <div style={{ fontSize: '0.65rem', color: 'rgba(212,175,55,0.6)', letterSpacing: '0.15em', marginBottom: '4px' }}>{t.year}</div>
                    <div className="font-bold mb-1" style={{ color: '#F5F0E8' }}>{t.title}</div>
                    <div style={{ fontSize: '0.82rem', color: 'rgba(245,240,232,0.45)', lineHeight: 1.7 }}>{t.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: 'var(--layer-2)', borderTop: '1px solid rgba(212,175,55,0.08)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-black mb-6" style={{ fontSize: 'clamp(24px, 4vw, 44px)', color: '#F5F0E8' }}>
            מוכן להצטרף?
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-gold">הצטרף לרשת VAZA</Link>
            <Link href="/catalog" className="btn-ghost-gold">צפה בקטלוג</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
