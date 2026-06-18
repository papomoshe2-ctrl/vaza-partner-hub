'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Truck, Package, RefreshCw, DollarSign, Headphones } from 'lucide-react'

const benefits = [
  { icon: TrendingUp, title: 'רווח גבוה', desc: 'מרווח ממוצע 35–55% על כל מוצר. מחשבון רווח מובנה בכל עמוד.' },
  { icon: Truck, title: 'אספקה 48 שעות', desc: 'משלוח תוך 24-48 שעות לכל הארץ. תמיד בזמן, תמיד מוכן.' },
  { icon: Package, title: 'מוכן למדף', desc: 'אריזה יפהפייה, תיוג מקצועי — מוכן לתצוגה מיידית.' },
  { icon: RefreshCw, title: 'קטלוג חי', desc: 'מוצרים חדשים כל עונה. תמיד עם ההצעות הטובות ביותר בשוק.' },
  { icon: DollarSign, title: 'מחירי סיטונאי', desc: 'מחירים בלעדיים לחברי הרשת. ככל שקונים יותר, חוסכים יותר.' },
  { icon: Headphones, title: 'תמיכה VIP', desc: 'מנהל לקוח אישי, ייעוץ בחירת מוצרים, וואטסאפ 24/7.' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } }
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export function BenefitsSection() {
  return (
    <section className="relative py-24 lg:py-36" style={{ background: 'var(--layer-1)' }}>
      {/* Subtle top border */}
      <div className="gold-line absolute top-0 inset-x-0" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-5">
            <span className="section-label">למה VAZA</span>
          </div>
          <h2
            className="font-black mb-4"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)', color: '#F5F0E8', lineHeight: 1.05, letterSpacing: '-0.02em' }}
          >
            לא ספק.<br />
            <span className="gold-text">שותף לרווח.</span>
          </h2>
          <p style={{ color: 'rgba(245,240,232,0.4)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.8 }}>
            VAZA היא לא עוד קטלוג מוצרים. היא מערכת שלמה שמגדילה את הרווחיות שלך מהיום הראשון.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {benefits.map(({ icon: Icon, title, desc }) => (
            <motion.div key={title} variants={item}>
              <div className="luxury-card p-8 h-full group cursor-default">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))',
                    border: '1px solid rgba(212,175,55,0.2)',
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: '#D4AF37' }} />
                </div>
                <h3
                  className="font-bold mb-3"
                  style={{ fontSize: '1.1rem', color: '#F5F0E8' }}
                >
                  {title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'rgba(245,240,232,0.45)', lineHeight: 1.8 }}>
                  {desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="gold-line absolute bottom-0 inset-x-0" />
    </section>
  )
}
