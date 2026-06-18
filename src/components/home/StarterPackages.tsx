'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const PACKAGES = [
  {
    id: 'entry',
    name: 'כניסה',
    subtitle: 'לחנות שרוצה לנסות',
    price: '₪890',
    priceNote: 'עלות סחורה',
    expectedRevenue: '₪1,650+',
    margin: '46%',
    items: [
      '5 יח׳ שוקולד בלגי',
      '3 בקבוקי יין בוטיק',
      '4 מארזי מתנה בסיסיים',
      'חומרי תצוגה',
    ],
    cta: 'התחל עם החבילה הזו',
    href: '/package-builder?package=entry',
    featured: false,
  },
  {
    id: 'standard',
    name: 'סטנדרט',
    subtitle: 'הבחירה הנפוצה ביותר',
    price: '₪2,100',
    priceNote: 'עלות סחורה',
    expectedRevenue: '₪3,900+',
    margin: '46%',
    items: [
      '12 יח׳ שוקולד — 3 סוגים',
      '8 בקבוקי יין — 2 מינים',
      '10 מארזי מתנה מוכנים',
      'מגוון תה פרימיום',
      'חומרי תצוגה + תוויות',
      'תמיכה 48 שעות',
    ],
    cta: 'בחר חבילת סטנדרט',
    href: '/package-builder?package=standard',
    featured: true,
  },
  {
    id: 'premium',
    name: 'פרימיום',
    subtitle: 'לחנות שרוצה להוביל',
    price: '₪4,500',
    priceNote: 'עלות סחורה',
    expectedRevenue: '₪8,500+',
    margin: '47%',
    items: [
      'מגוון מלא — 6 קטגוריות',
      '25+ יח׳ שוקולד פרימיום',
      '15 בקבוקות יין ושמפניה',
      'מארזים מותאמים אישית',
      'תצוגת פרימיום מותג VAZA',
      'מנהל חשבון אישי',
      'איחזור מלאי חודשי',
    ],
    cta: 'בנה חבילה מותאמת',
    href: '/package-builder?package=premium',
    featured: false,
  },
]

export function StarterPackages() {
  return (
    <section style={{ background: 'var(--ink-1)', padding: '120px 0', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-8 mb-16 items-end">
          <div className="lg:col-span-7">
            <motion.span
              className="editorial-label"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              חבילות התחלה
            </motion.span>
            <motion.h2
              className="display-md mt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              מתחילים מהר.<br />
              <span style={{ color: 'var(--bronze)' }}>מרוויחים עוד יותר מהר.</span>
            </motion.h2>
          </div>
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="editorial-body" style={{ fontSize: '0.9rem' }}>
              כל החבילות כוללות משלוח, תמיכה ותצוגה. אין חוזה, אין מינימום חודשי.
              מחזירים מה שלא נמכר תוך 30 יום.
            </p>
          </motion.div>
        </div>

        {/* Packages */}
        <div className="grid lg:grid-cols-3 gap-px" style={{ background: 'var(--border-subtle)' }}>
          {PACKAGES.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              style={{
                background: pkg.featured ? 'var(--ink-3)' : 'var(--ink-1)',
                padding: '48px 40px',
                position: 'relative',
                borderTop: pkg.featured ? '2px solid var(--bronze)' : '2px solid transparent',
              }}
            >
              {pkg.featured && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-1px',
                    right: '40px',
                    background: 'var(--bronze)',
                    color: '#050505',
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    padding: '4px 12px',
                  }}
                >
                  POPULAR
                </div>
              )}

              <div className="editorial-label mb-2">{pkg.name}</div>
              <p style={{ fontSize: '0.8rem', color: 'var(--cream-muted)', marginBottom: '2rem' }}>
                {pkg.subtitle}
              </p>

              <div style={{ marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--cream)', letterSpacing: '-0.02em' }}>
                  {pkg.price}
                </span>
              </div>
              <p style={{ fontSize: '0.7rem', color: 'var(--bronze-dim)', marginBottom: '0.5rem' }}>
                {pkg.priceNote}
              </p>
              <div
                style={{
                  display: 'inline-flex',
                  gap: '0.5rem',
                  alignItems: 'center',
                  padding: '4px 10px',
                  border: '1px solid var(--border-bronze)',
                  marginBottom: '2rem',
                }}
              >
                <span style={{ fontSize: '0.65rem', color: 'var(--cream-muted)' }}>הכנסה צפויה:</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--bronze)' }}>
                  {pkg.expectedRevenue}
                </span>
              </div>

              <div style={{ height: '1px', background: 'var(--border-subtle)', marginBottom: '1.75rem' }} />

              <ul style={{ listStyle: 'none', marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {pkg.items.map((item) => (
                  <li key={item} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <Check style={{ width: '14px', height: '14px', color: 'var(--bronze)', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.82rem', color: 'var(--cream-dim)' }}>{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={pkg.href}
                className={pkg.featured ? 'btn-primary' : 'btn-secondary'}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {pkg.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ textAlign: 'center', marginTop: '3rem', fontSize: '0.75rem', color: 'var(--cream-muted)' }}
        >
          רוצה חבילה מותאמת לגודל החנות שלך?{' '}
          <Link href="/contact" style={{ color: 'var(--bronze)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            דבר איתנו
          </Link>
        </motion.p>
      </div>
    </section>
  )
}
