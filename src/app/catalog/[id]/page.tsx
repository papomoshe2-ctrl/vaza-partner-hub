'use client'

import { use, useState } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { TrendingUp, Check, ShoppingCart, Truck, Shield, Star, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react'
import { mockProducts } from '@/lib/mock-data'
import { formatPrice, formatPercent, CATEGORY_LABELS, SUITABLE_FOR_LABELS } from '@/lib/utils'
import { toast } from 'sonner'

const CATEGORY_EMOJI: Record<string, string> = {
  chocolates: '🍫', wines: '🍷', gift_sets: '🎁',
  tea: '🫖', cookies: '🥐', valentines: '🍾',
  desserts: '🧁', rosh_hashana: '🍯',
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = mockProducts.find(p => p.id === id)
  if (!product) notFound()
  const p = product!

  const [qty, setQty] = useState(p.moq)
  const [showFullDesc, setShowFullDesc] = useState(false)

  const totalCost = p.price_store * qty
  const totalRevenue = p.price_retail * qty
  const totalProfit = p.profit_per_unit * qty

  const related = mockProducts.filter(x => x.id !== p.id && x.category === p.category).slice(0, 4)

  return (
    <div className="min-h-screen pt-20" style={{ background: 'var(--layer-0)' }}>
      {/* Breadcrumb */}
      <div style={{ background: 'var(--layer-2)', borderBottom: '1px solid rgba(212,175,55,0.08)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2" style={{ fontSize: '0.75rem', color: 'rgba(245,240,232,0.35)' }}>
            <Link href="/" style={{ color: 'rgba(245,240,232,0.35)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#D4AF37' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(245,240,232,0.35)' }}>בית</Link>
            <ArrowRight className="w-3 h-3" />
            <Link href="/catalog" style={{ color: 'rgba(245,240,232,0.35)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#D4AF37' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(245,240,232,0.35)' }}>קטלוג</Link>
            <ArrowRight className="w-3 h-3" />
            <span style={{ color: '#F5F0E8' }}>{p.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-14">
          {/* Left: Visual */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="aspect-square rounded-2xl flex items-center justify-center relative overflow-hidden"
              style={{ background: 'linear-gradient(145deg, rgba(212,175,55,0.06), rgba(212,175,55,0.02))', border: '1px solid rgba(212,175,55,0.1)' }}>
              <span style={{ fontSize: '8rem' }}>{CATEGORY_EMOJI[p.category] ?? '📦'}</span>

              <div className="absolute top-4 right-4 flex flex-col gap-2">
                {p.is_new && <span className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', color: '#93c5fd' }}>חדש</span>}
                {p.is_top_seller && <span className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{ background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.3)', color: '#D4AF37' }}>TOP SELLER</span>}
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-4">
                {[{ icon: Truck, label: '48h' }, { icon: Shield, label: 'אחריות' }, { icon: Star, label: 'פרימיום' }].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                    style={{ background: 'rgba(5,5,5,0.7)', border: '1px solid rgba(212,175,55,0.15)', backdropFilter: 'blur(8px)' }}>
                    <Icon className="w-3 h-3" style={{ color: '#D4AF37' }} />
                    <span style={{ fontSize: '0.65rem', color: 'rgba(245,240,232,0.6)' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(212,175,55,0.6)', marginBottom: '0.75rem' }}>
              {CATEGORY_LABELS[p.category]?.toUpperCase()} · {p.sku}
            </div>
            <h1 className="font-black mb-2" style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', color: '#F5F0E8', letterSpacing: '-0.01em', lineHeight: 1.1 }}>
              {p.name}
            </h1>
            <p style={{ fontSize: '0.8rem', color: 'rgba(245,240,232,0.35)', marginBottom: '1.5rem' }}>מותג: {p.brand}</p>

            <p style={{ color: 'rgba(245,240,232,0.6)', lineHeight: 1.8, fontSize: '0.9rem' }}>
              {showFullDesc ? p.description_full : p.description_short}
            </p>
            <button onClick={() => setShowFullDesc(!showFullDesc)}
              className="flex items-center gap-1 mt-2 text-xs font-semibold transition-colors duration-200"
              style={{ color: '#D4AF37' }}>
              {showFullDesc ? <><ChevronUp className="w-3 h-3" />פחות</> : <><ChevronDown className="w-3 h-3" />קרא עוד</>}
            </button>

            {/* Pricing */}
            <div className="mt-6 p-5 rounded-2xl space-y-3"
              style={{ background: 'rgba(212,175,55,0.04)', border: '1px solid rgba(212,175,55,0.1)' }}>
              {[
                { label: 'מחיר לחנות', value: formatPrice(p.price_store), color: '#D4AF37', size: '1.25rem' },
                { label: 'מחיר קמעונאי מומלץ', value: formatPrice(p.price_retail), color: 'rgba(245,240,232,0.6)', size: '1rem' },
              ].map(({ label, value, color, size }) => (
                <div key={label} className="flex justify-between items-center">
                  <span style={{ fontSize: '0.8rem', color: 'rgba(245,240,232,0.45)' }}>{label}</span>
                  <span className="font-bold" style={{ color, fontSize: size }}>{value}</span>
                </div>
              ))}
              <div className="pt-3 flex justify-between items-center" style={{ borderTop: '1px solid rgba(212,175,55,0.1)' }}>
                <span className="font-semibold" style={{ fontSize: '0.85rem', color: '#4ade80' }}>
                  <TrendingUp className="w-3.5 h-3.5 inline ml-1" />
                  רווח ליחידה
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-black" style={{ color: '#4ade80', fontSize: '1.4rem' }}>{formatPrice(p.profit_per_unit)}</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: '#4ade80' }}>
                    {formatPercent(p.profit_percent)}
                  </span>
                </div>
              </div>
            </div>

            {/* Qty calculator */}
            <div className="mt-6">
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'rgba(245,240,232,0.45)', marginBottom: '0.75rem', letterSpacing: '0.06em' }}>
                כמות הזמנה (מינ&#x27; {p.moq} יח&#x27;)
              </label>
              <div className="flex items-center gap-4 mb-4">
                <button onClick={() => setQty(Math.max(p.moq, qty - p.moq))}
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg transition-all duration-200"
                  style={{ border: '1px solid rgba(212,175,55,0.2)', color: '#D4AF37', background: 'rgba(212,175,55,0.05)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(212,175,55,0.12)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(212,175,55,0.05)' }}>
                  −
                </button>
                <span className="font-black w-10 text-center" style={{ color: '#F5F0E8', fontSize: '1.25rem' }}>{qty}</span>
                <button onClick={() => setQty(qty + p.moq)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg transition-all duration-200"
                  style={{ border: '1px solid rgba(212,175,55,0.2)', color: '#D4AF37', background: 'rgba(212,175,55,0.05)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(212,175,55,0.12)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(212,175,55,0.05)' }}>
                  +
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { label: 'עלות', value: formatPrice(totalCost), color: '#F5F0E8' },
                  { label: 'הכנסות', value: formatPrice(totalRevenue), color: '#F5F0E8' },
                  { label: 'רווח', value: formatPrice(totalProfit), color: '#4ade80' },
                ].map(({ label, value, color }) => (
                  <div key={label} className="text-center p-3 rounded-xl"
                    style={{ background: color === '#4ade80' ? 'rgba(34,197,94,0.06)' : 'rgba(255,255,255,0.02)', border: `1px solid ${color === '#4ade80' ? 'rgba(34,197,94,0.15)' : 'rgba(212,175,55,0.08)'}` }}>
                    <div style={{ fontSize: '0.6rem', color: 'rgba(245,240,232,0.35)', marginBottom: '4px' }}>{label}</div>
                    <div className="font-bold" style={{ color, fontSize: '0.9rem' }}>{value}</div>
                  </div>
                ))}
              </div>

              <button onClick={() => toast.success(`${p.name} נוסף להצעת המחיר`)}
                className="btn-gold w-full justify-center">
                <ShoppingCart className="w-4 h-4" />
                הוסף להצעת מחיר
              </button>
            </div>

            {/* Meta */}
            <div className="grid grid-cols-2 gap-3 mt-5">
              {[
                { label: 'MOQ מינ\'', value: `${p.moq} יח'` },
                { label: 'יח\' בקרטון', value: `${p.carton_qty} יח'` },
                { label: 'מלאי', value: `${p.stock_quantity} יח'` },
                { label: 'קטגוריה', value: CATEGORY_LABELS[p.category] },
              ].map(({ label, value }) => (
                <div key={label} className="p-3 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(212,175,55,0.08)' }}>
                  <div style={{ fontSize: '0.6rem', color: 'rgba(245,240,232,0.3)', marginBottom: '2px' }}>{label}</div>
                  <div className="font-semibold" style={{ color: '#F5F0E8', fontSize: '0.85rem' }}>{value}</div>
                </div>
              ))}
            </div>

            {p.suitable_for.length > 0 && (
              <div className="mt-5">
                <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'rgba(245,240,232,0.4)', marginBottom: '0.5rem', letterSpacing: '0.08em' }}>מתאים ל:</div>
                <div className="flex flex-wrap gap-2">
                  {p.suitable_for.map(s => (
                    <span key={s} className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.15)', color: '#4ade80' }}>
                      <Check className="w-3 h-3" />
                      {SUITABLE_FOR_LABELS[s] ?? s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-bold mb-6" style={{ color: '#F5F0E8', fontSize: '1.2rem' }}>
              מוצרים נוספים מ<span className="gold-text">אותה קטגוריה</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map(r => (
                <Link key={r.id} href={`/catalog/${r.id}`}>
                  <div className="p-4 rounded-xl transition-all duration-200 group"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(212,175,55,0.08)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.25)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.08)' }}>
                    <div className="h-20 flex items-center justify-center rounded-lg mb-3"
                      style={{ background: 'rgba(212,175,55,0.04)' }}>
                      <span className="text-3xl transition-transform duration-200 group-hover:scale-110">
                        {CATEGORY_EMOJI[r.category] ?? '📦'}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#F5F0E8', lineHeight: 1.3, marginBottom: '4px' }}>{r.name}</div>
                    <div className="flex justify-between">
                      <span style={{ fontSize: '0.72rem', color: 'rgba(245,240,232,0.4)' }}>{formatPrice(r.price_store)}</span>
                      <span style={{ fontSize: '0.72rem', color: '#4ade80', fontWeight: 700 }}>{formatPercent(r.profit_percent)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
