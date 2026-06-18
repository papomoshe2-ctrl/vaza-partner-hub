'use client'

import { useState } from 'react'
import { Phone, Mail, MessageCircle, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

export function ContactSection() {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    business_name: '',
    contact_name: '',
    phone: '',
    email: '',
    city: '',
  })

  function handleChange(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [field]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    toast.success('הפרטים נשלחו! ניצור איתך קשר תוך 24 שעות.')
    setForm({ business_name: '', contact_name: '', phone: '', email: '', city: '' })
    setLoading(false)
  }

  return (
    <section className="bg-gray-950 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: info */}
          <div>
            <p className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-3">
              צור קשר
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              רוצה להצטרף?
              <br />
              דבר איתנו עכשיו
            </h2>
            <p className="text-gray-400 leading-relaxed mb-10">
              מלא את הטופס ונחזור אליך תוך 24 שעות עם הצעה מותאמת לחנות שלך.
              ללא עמלות נסתרות, ללא התחייבויות.
            </p>

            <div className="space-y-4">
              <a
                href="https://wa.me/972500000000"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                  <MessageCircle className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <div className="text-white font-medium text-sm">וואטסאפ</div>
                  <div className="text-gray-500 text-xs">050-000-0000</div>
                </div>
              </a>
              <a href="tel:050-000-0000" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-[#C9A84C]/10 flex items-center justify-center group-hover:bg-[#C9A84C]/20 transition-colors">
                  <Phone className="w-5 h-5 text-[#C9A84C]" />
                </div>
                <div>
                  <div className="text-white font-medium text-sm">טלפון</div>
                  <div className="text-gray-500 text-xs">050-000-0000</div>
                </div>
              </a>
              <a href="mailto:info@vaza.co.il" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-white font-medium text-sm">אימייל</div>
                  <div className="text-gray-500 text-xs">info@vaza.co.il</div>
                </div>
              </a>
            </div>
          </div>

          {/* Right: form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <Label className="text-gray-300 text-sm mb-1.5 block">שם העסק *</Label>
                <Input
                  required
                  value={form.business_name}
                  onChange={handleChange('business_name')}
                  placeholder="פרחי שרון"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#C9A84C]"
                />
              </div>
              <div>
                <Label className="text-gray-300 text-sm mb-1.5 block">איש קשר *</Label>
                <Input
                  required
                  value={form.contact_name}
                  onChange={handleChange('contact_name')}
                  placeholder="שם מלא"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#C9A84C]"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <Label className="text-gray-300 text-sm mb-1.5 block">טלפון *</Label>
                <Input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={handleChange('phone')}
                  placeholder="050-0000000"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#C9A84C]"
                  dir="ltr"
                />
              </div>
              <div>
                <Label className="text-gray-300 text-sm mb-1.5 block">אימייל</Label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={handleChange('email')}
                  placeholder="email@example.com"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#C9A84C]"
                  dir="ltr"
                />
              </div>
            </div>
            <div>
              <Label className="text-gray-300 text-sm mb-1.5 block">עיר</Label>
              <Input
                value={form.city}
                onChange={handleChange('city')}
                placeholder="תל אביב"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#C9A84C]"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#C9A84C] hover:bg-[#b8943e] text-white font-semibold h-12 mt-2"
            >
              {loading ? 'שולח...' : (
                <>
                  שלח פרטים
                  <Send className="w-4 h-4 mr-2" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
