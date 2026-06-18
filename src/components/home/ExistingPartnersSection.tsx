'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function ExistingPartnersSection() {
  return (
    <section style={{ background: 'var(--ink-2)', padding: '100px 0', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 items-center">

          {/* Image block */}
          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ height: '380px' }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundImage: `url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '24px',
                right: '24px',
                background: 'var(--ink-0)',
                border: '1px solid var(--border-bronze)',
                padding: '16px 24px',
              }}
            >
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--bronze)', lineHeight: 1 }}>48h</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--cream-muted)', marginTop: '4px', letterSpacing: '0.1em' }}>
                איחזור מלאי
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            className="lg:col-span-7 lg:pr-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="editorial-label">לשותפים קיימים</span>
            <div className="line-bronze mt-4 mb-8" />

            <h2 className="display-md mb-6">
              כבר עובד איתנו?<br />
              <span style={{ color: 'var(--bronze)' }}>הכל כאן בשבילך.</span>
            </h2>

            <p className="editorial-body mb-10">
              הזמנות חוזרות, הרחבת הקטלוג, תמיכה בתצוגה — הכל דרך אותה נקודת קשר.
              מנהל החשבון שלך זמין ישירות בווצאפ.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/catalog" className="btn-primary">
                הוסף להזמנה
              </Link>
              <Link href="/contact" className="btn-secondary">
                דבר עם מנהל החשבון
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
