'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Phone, Mail, MapPin, Send, Clock } from 'lucide-react'
import { toast } from 'sonner'

const contactInfo = [
  { icon: Phone, label: 'טלפון', value: '050-000-0000', href: 'tel:+97250000000' },
  { icon: MessageCircle, label: 'וואטסאפ', value: 'שלח הודעה', href: 'https://wa.me/972500000000' },
  { icon: Mail, label: 'אימייל', value: 'info@vaza.co.il', href: 'mailto:info@vaza.co.il' },
  { icon: MapPin, label: 'כתובת', value: 'ישראל', href: '#' },
]

const hours = [
  { day: "ראשון–חמישי", time: "09:00–18:00" },
  { day: "שישי", time: "09:00–13:00" },
  { day: "שבת", time: "סגור" },
]

export function ContactPageClient() {
  const [form, setForm] = useState({ name: '', business: '', phone: '', city: '', type: '', message: '' })
  const [loading, setLoading] = useState(false)

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    toast.success('הודעה נשלחה! ניצור איתך קשר תוך 24 שעות.')
    setForm({ name: '', business: '', phone: '', city: '', type: '', message: '' })
  }

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(212,175,55,0.12)',
    borderRadius: '10px',
    padding: '12px 14px',
    fontSize: '0.9rem',
    color: '#F5F0E8',
    outline: 'none',
  }

  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)'
  }
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = 'rgba(212,175,55,0.12)'
  }

  return (
    <div className="min-h-screen pt-20" style={{ background: 'var(--layer-0)' }}>
      {/* Header */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 50% 60% at 50% 0%, rgba(212,175,55,0.05), transparent 70%)' }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="section-label mb-5 inline-block">דבר איתנו</span>
            <h1 className="font-black mb-4"
              style={{ fontSize: 'clamp(32px, 5vw, 60px)', color: '#F5F0E8', letterSpacing: '-0.02em', lineHeight: 1.05 }}>
              בוא נדבר על<br />
              <span className="gold-text">הצמיחה שלך</span>
            </h1>
            <p style={{ color: 'rgba(245,240,232,0.4)', maxWidth: 420, margin: '0 auto', lineHeight: 1.8 }}>
              מלא את הטופס ומנהל לקוחות ייצור איתך קשר תוך 24 שעות עם הצעה מותאמת אישית.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24 lg:pb-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">

            {/* Sidebar */}
            <motion.div className="lg:col-span-2 space-y-5"
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}>

              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <a key={label} href={href}
                  className="luxury-card p-5 flex items-center gap-4 block transition-all duration-200"
                  style={{ textDecoration: 'none' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.3)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.08)' }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.15)' }}>
                    <Icon className="w-4 h-4" style={{ color: '#D4AF37' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.65rem', color: 'rgba(245,240,232,0.35)', letterSpacing: '0.1em', marginBottom: '2px' }}>{label}</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#F5F0E8' }}>{value}</div>
                  </div>
                </a>
              ))}

              {/* Hours */}
              <div className="luxury-card p-5">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-4 h-4" style={{ color: '#D4AF37' }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#F5F0E8' }}>שעות פעילות</span>
                </div>
                <div className="space-y-2">
                  {hours.map(h => (
                    <div key={h.day} className="flex justify-between">
                      <span style={{ fontSize: '0.78rem', color: 'rgba(245,240,232,0.4)' }}>{h.day}</span>
                      <span style={{ fontSize: '0.78rem', color: h.time === 'סגור' ? 'rgba(245,240,232,0.25)' : '#D4AF37', fontWeight: 600 }}>{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div className="lg:col-span-3"
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
              <form onSubmit={handleSubmit} className="luxury-card p-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  {[
                    { field: 'name' as const, label: 'שם מלא', placeholder: 'ישראל ישראלי', type: 'text' },
                    { field: 'business' as const, label: 'שם העסק', placeholder: 'פרחי ישראל', type: 'text' },
                    { field: 'phone' as const, label: 'טלפון', placeholder: '050-000-0000', type: 'tel' },
                    { field: 'city' as const, label: 'עיר', placeholder: 'תל אביב', type: 'text' },
                  ].map(({ field, label, placeholder, type }) => (
                    <div key={field}>
                      <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: 'rgba(245,240,232,0.45)', marginBottom: '0.5rem', letterSpacing: '0.06em' }}>{label}</label>
                      <input type={type} value={form[field]} onChange={set(field)} placeholder={placeholder} required
                        style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                    </div>
                  ))}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: 'rgba(245,240,232,0.45)', marginBottom: '0.5rem', letterSpacing: '0.06em' }}>סוג עסק</label>
                  <select value={form.type} onChange={set('type')} required style={{ ...inputStyle, cursor: 'pointer' }} onFocus={onFocus} onBlur={onBlur}>
                    <option value="" disabled>בחר סוג עסק...</option>
                    <option value="flower_shop">חנות פרחים</option>
                    <option value="gift_shop">חנות מתנות</option>
                    <option value="hotel">מלון / צימר</option>
                    <option value="event">אולם אירועים</option>
                    <option value="other">אחר</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: 'rgba(245,240,232,0.45)', marginBottom: '0.5rem', letterSpacing: '0.06em' }}>הודעה (אופציונלי)</label>
                  <textarea value={form.message} onChange={set('message')} rows={4} placeholder="ספר לנו על העסק שלך..."
                    style={{ ...inputStyle, resize: 'none' }} onFocus={onFocus} onBlur={onBlur} />
                </div>

                <button type="submit" disabled={loading} className="btn-gold w-full justify-center"
                  style={{ opacity: loading ? 0.7 : 1 }}>
                  <Send className="w-4 h-4" />
                  {loading ? 'שולח...' : 'שלח פנייה'}
                </button>

                <p style={{ fontSize: '0.68rem', textAlign: 'center', color: 'rgba(245,240,232,0.2)' }}>
                  ניצור איתך קשר תוך 24 שעות. ללא התחייבות.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
