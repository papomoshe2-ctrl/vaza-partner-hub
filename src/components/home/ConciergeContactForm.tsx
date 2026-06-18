'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

const BUSINESS_TYPES = [
  'חנות פרחים עצמאית',
  'רשת חנויות (2+)',
  'חנות מתנות',
  'בוטיק / גלריה',
  'אחר',
]

export function ConciergeContactForm() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    city: '',
    businessType: '',
    message: '',
  })
  const [sending, setSending] = useState(false)

  const set = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone) {
      toast.error('שם וטלפון הם שדות חובה')
      return
    }
    setSending(true)
    await new Promise((r) => setTimeout(r, 900))
    setSending(false)
    toast.success('קיבלנו את הפנייה. נחזור אליך תוך 24 שעות.')
    setForm({ name: '', phone: '', city: '', businessType: '', message: '' })
  }

  const whatsappText = encodeURIComponent(
    `שלום, אני ${form.name || 'שם לא מוזן'} מ-${form.city || 'ישראל'}, מעוניין לשמוע על חבילות VAZA לחנות פרחים.`
  )

  return (
    <section id="contact" style={{ background: 'var(--ink-0)', padding: '120px 0', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="grid lg:grid-cols-12 gap-16 items-start">

          {/* Left — editorial intro */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="editorial-label">צור קשר</span>
            <div className="line-bronze mt-4 mb-8" />

            <h2 className="display-md mb-8">
              נשמח<br />
              לשמוע<br />
              <span style={{ color: 'var(--bronze)' }}>עליך.</span>
            </h2>

            <p className="editorial-body mb-10">
              מלא את הטופס ואחד מהצוות שלנו יחזור אליך תוך 24 שעות עם הצעה
              מותאמת לגודל ולסוג החנות שלך.
            </p>

            {/* WhatsApp direct */}
            <a
              href={`https://wa.me/972501234567?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.7rem 1.4rem',
                border: '1px solid rgba(37, 211, 102, 0.3)',
                color: '#25D366',
                fontSize: '0.78rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textDecoration: 'none',
                transition: 'border-color 0.2s',
                marginBottom: '2rem',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp ישיר
            </a>

            <div style={{ fontSize: '0.7rem', color: 'var(--cream-muted)' }}>
              <div style={{ marginBottom: '0.4rem' }}>שעות פעילות</div>
              <div style={{ color: 'var(--cream)', fontWeight: 600 }}>א׳–ה׳, 8:00–18:00</div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

              <div className="grid sm:grid-cols-2 gap-6">
                <FormField label="שם מלא *" id="name">
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                    placeholder="ישראל ישראלי"
                    required
                    style={inputStyle}
                  />
                </FormField>
                <FormField label="טלפון *" id="phone">
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => set('phone', e.target.value)}
                    placeholder="050-0000000"
                    required
                    style={inputStyle}
                    dir="ltr"
                  />
                </FormField>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <FormField label="עיר" id="city">
                  <input
                    id="city"
                    type="text"
                    value={form.city}
                    onChange={(e) => set('city', e.target.value)}
                    placeholder="תל אביב"
                    style={inputStyle}
                  />
                </FormField>
                <FormField label="סוג העסק" id="businessType">
                  <select
                    id="businessType"
                    value={form.businessType}
                    onChange={(e) => set('businessType', e.target.value)}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                  >
                    <option value="">בחר...</option>
                    {BUSINESS_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </FormField>
              </div>

              <FormField label="הערות / שאלות" id="message">
                <textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => set('message', e.target.value)}
                  placeholder="ספר לנו קצת על החנות שלך ומה אתה מחפש..."
                  rows={4}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                />
              </FormField>

              <button
                type="submit"
                disabled={sending}
                className="btn-primary"
                style={{ alignSelf: 'flex-start', opacity: sending ? 0.7 : 1 }}
              >
                {sending ? 'שולח...' : 'שלח פנייה'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function FormField({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <label
        htmlFor={id}
        style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.12em', color: 'var(--bronze)', textTransform: 'uppercase' }}
      >
        {label}
      </label>
      {children}
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  background: 'var(--ink-2)',
  border: '1px solid var(--border-subtle)',
  color: 'var(--cream)',
  padding: '0.85rem 1rem',
  fontSize: '0.88rem',
  outline: 'none',
  fontFamily: 'inherit',
  width: '100%',
  transition: 'border-color 0.2s',
}
