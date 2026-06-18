'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Phone, Send } from 'lucide-react'
import { toast } from 'sonner'

export function ContactSection() {
  const [form, setForm] = useState({ name: '', business: '', phone: '', city: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    toast.success('הבקשה נשלחה! ניצור איתך קשר תוך 24 שעות.')
    setForm({ name: '', business: '', phone: '', city: '' })
  }

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  return (
    <section className="relative py-24 lg:py-36" style={{ background: 'var(--layer-1)' }}>
      <div className="gold-line absolute top-0 inset-x-0" />

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 60% at 50% 100%, rgba(212,175,55,0.05), transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex mb-6">
              <span className="section-label">הצטרפות לרשת</span>
            </div>
            <h2
              className="font-black mb-6"
              style={{ fontSize: 'clamp(30px, 5vw, 52px)', color: '#F5F0E8', letterSpacing: '-0.02em', lineHeight: 1.05 }}
            >
              מוכן להתחיל<br />
              <span className="gold-text">להרוויח יותר?</span>
            </h2>
            <p className="mb-10" style={{ color: 'rgba(245,240,232,0.45)', lineHeight: 1.8, maxWidth: 400 }}>
              שלח לנו פרטים בסיסיים ומנהל הלקוחות שלנו יחזור אליך תוך 24 שעות עם מחירון מותאם אישית.
            </p>

            <div className="space-y-4">
              <a
                href="https://wa.me/972500000000"
                className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200"
                style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.12)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(34,197,94,0.1)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(34,197,94,0.06)' }}
              >
                <MessageCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#4ade80' }} />
                <div>
                  <div style={{ fontWeight: 700, color: '#F5F0E8', fontSize: '0.9rem' }}>וואטסאפ ישיר</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(245,240,232,0.4)' }}>050-000-0000</div>
                </div>
              </a>
              <a
                href="tel:+97250000000"
                className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200"
                style={{ background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.1)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(212,175,55,0.09)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(212,175,55,0.05)' }}
              >
                <Phone className="w-5 h-5 flex-shrink-0" style={{ color: '#D4AF37' }} />
                <div>
                  <div style={{ fontWeight: 700, color: '#F5F0E8', fontSize: '0.9rem' }}>שיחה טלפונית</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(245,240,232,0.4)' }}>ראשון–חמישי 9:00–18:00</div>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="luxury-card p-8 space-y-5">
              {[
                { field: 'name' as const, label: 'שם מלא', placeholder: 'ישראל ישראלי' },
                { field: 'business' as const, label: 'שם העסק', placeholder: 'פרחי ישראל' },
                { field: 'phone' as const, label: 'טלפון', placeholder: '050-000-0000' },
                { field: 'city' as const, label: 'עיר', placeholder: 'תל אביב' },
              ].map(({ field, label, placeholder }) => (
                <div key={field}>
                  <label
                    htmlFor={field}
                    style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'rgba(245,240,232,0.5)', marginBottom: '0.5rem', letterSpacing: '0.05em' }}
                  >
                    {label}
                  </label>
                  <input
                    id={field}
                    type={field === 'phone' ? 'tel' : 'text'}
                    value={form[field]}
                    onChange={set(field)}
                    placeholder={placeholder}
                    required
                    style={{
                      width: '100%',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(212,175,55,0.12)',
                      borderRadius: '10px',
                      padding: '12px 14px',
                      fontSize: '0.9rem',
                      color: '#F5F0E8',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)' }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.12)' }}
                  />
                </div>
              ))}

              <button
                type="submit"
                disabled={loading}
                className="btn-gold w-full justify-center text-sm mt-2"
                style={{ opacity: loading ? 0.7 : 1 }}
              >
                {loading ? 'שולח...' : (
                  <>
                    <Send className="w-4 h-4" />
                    שלח בקשה להצטרפות
                  </>
                )}
              </button>

              <p style={{ fontSize: '0.7rem', textAlign: 'center', color: 'rgba(245,240,232,0.25)', marginTop: '0.5rem' }}>
                אנו מתחייבים לחזור אליך תוך 24 שעות. ללא התחייבות.
              </p>
            </form>
          </motion.div>
        </div>
      </div>

      <div className="gold-line absolute bottom-0 inset-x-0" />
    </section>
  )
}
