'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Minus, Trash2, TrendingUp, ShoppingBag, Send } from 'lucide-react'
import { mockProducts } from '@/lib/mock-data'
import { formatPrice, formatPercent, CATEGORY_LABELS } from '@/lib/utils'
import type { Product } from '@/types'
import { toast } from 'sonner'

const CATEGORY_EMOJI: Record<string, string> = {
  chocolates: '🍫', wines: '🍷', gift_sets: '🎁',
  tea: '🫖', cookies: '🥐', valentines: '🍾',
  desserts: '🧁', rosh_hashana: '🍯',
}

interface CartItem { product: Product; qty: number }

export default function PackageBuilderPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [category, setCategory] = useState('all')

  const addProduct = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id)
      if (existing) return prev.map(i => i.product.id === product.id ? { ...i, qty: i.qty + product.moq } : i)
      return [...prev, { product, qty: product.moq }]
    })
    toast.success(`${product.name} נוסף לחבילה`)
  }

  const removeProduct = (id: string) => setCart(prev => prev.filter(i => i.product.id !== id))

  const changeQty = (id: string, delta: number) =>
    setCart(prev => prev.map(i => {
      if (i.product.id !== id) return i
      const next = i.qty + delta
      return next <= 0 ? i : { ...i, qty: next }
    }))

  const totalCost = cart.reduce((s, i) => s + i.product.price_store * i.qty, 0)
  const totalRevenue = cart.reduce((s, i) => s + i.product.price_retail * i.qty, 0)
  const totalProfit = cart.reduce((s, i) => s + i.product.profit_per_unit * i.qty, 0)
  const totalItems = cart.reduce((s, i) => s + i.qty, 0)

  const categories = ['all', ...Array.from(new Set(mockProducts.map(p => p.category)))]
  const filtered = category === 'all' ? mockProducts : mockProducts.filter(p => p.category === category)

  const sendQuote = () => {
    if (cart.length === 0) { toast.error('הוסף מוצרים לחבילה תחילה'); return }
    toast.success('הצעת המחיר נשלחה! ניצור איתך קשר תוך 24 שעות.')
  }

  return (
    <div className="min-h-screen pt-20" style={{ background: 'var(--layer-0)' }}>
      {/* Header */}
      <section className="relative py-14 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 50% 70% at 50% 0%, rgba(212,175,55,0.05), transparent 70%)' }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="section-label mb-5 inline-block">Package Builder</span>
            <h1 className="font-black mb-3"
              style={{ fontSize: 'clamp(28px, 4.5vw, 52px)', color: '#F5F0E8', letterSpacing: '-0.02em', lineHeight: 1.05 }}>
              בנה את החבילה שלך<br />
              <span className="gold-text">וראה רווח בזמן אמת</span>
            </h1>
            <p style={{ color: 'rgba(245,240,232,0.4)', maxWidth: 420, lineHeight: 1.8 }}>
              בחר מוצרים, קבע כמויות, ראה את הרווח הצפוי — ושלח הצעת מחיר ישירות.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Products panel */}
          <div className="lg:col-span-2">
            {/* Category filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map(cat => (
                <button key={cat} onClick={() => setCategory(cat)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
                  style={{
                    background: category === cat ? 'linear-gradient(135deg, #B8963E, #D4AF37)' : 'rgba(255,255,255,0.03)',
                    border: category === cat ? '1px solid #D4AF37' : '1px solid rgba(212,175,55,0.12)',
                    color: category === cat ? '#050505' : 'rgba(245,240,232,0.5)',
                  }}>
                  {cat === 'all' ? 'הכל' : CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {filtered.map((product, i) => {
                const inCart = cart.find(i => i.product.id === product.id)
                return (
                  <motion.div key={product.id}
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}>
                    <div className="p-5 rounded-xl transition-all duration-200"
                      style={{
                        background: inCart ? 'rgba(212,175,55,0.05)' : 'rgba(255,255,255,0.02)',
                        border: inCart ? '1px solid rgba(212,175,55,0.3)' : '1px solid rgba(212,175,55,0.08)',
                      }}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span style={{ fontSize: '1.75rem' }}>{CATEGORY_EMOJI[product.category] ?? '📦'}</span>
                          <div>
                            <div style={{ fontSize: '0.6rem', letterSpacing: '0.12em', color: 'rgba(212,175,55,0.5)', marginBottom: '2px' }}>
                              {CATEGORY_LABELS[product.category]?.toUpperCase()}
                            </div>
                            <h3 style={{ fontWeight: 700, color: '#F5F0E8', fontSize: '0.88rem', lineHeight: 1.3 }}>{product.name}</h3>
                          </div>
                        </div>
                        <span className="text-xs font-bold px-2 py-1 rounded-full flex-shrink-0"
                          style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.15)', color: '#4ade80' }}>
                          {formatPercent(product.profit_percent)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div style={{ fontSize: '0.6rem', color: 'rgba(245,240,232,0.3)' }}>לחנות / קמעונאי</div>
                          <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'rgba(245,240,232,0.7)' }}>
                            {formatPrice(product.price_store)} / {formatPrice(product.price_retail)}
                          </div>
                        </div>
                        <button onClick={() => addProduct(product)}
                          className={inCart ? 'btn-gold text-xs py-2 px-4' : 'btn-ghost-gold text-xs py-2 px-4'}>
                          <Plus className="w-3.5 h-3.5" />
                          {inCart ? 'הוסף עוד' : 'הוסף'}
                        </button>
                      </div>

                      {inCart && (
                        <div className="mt-3 pt-3 text-xs font-semibold flex items-center gap-1.5"
                          style={{ borderTop: '1px solid rgba(212,175,55,0.12)', color: '#D4AF37' }}>
                          ✓ {inCart.qty} יח&apos; בחבילה
                        </div>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Cart */}
          <div>
            <div className="sticky top-24">
              <div className="rounded-2xl overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(212,175,55,0.15)', backdropFilter: 'blur(12px)' }}>
                {/* Cart header */}
                <div className="px-5 py-4 flex items-center gap-3"
                  style={{ background: 'rgba(212,175,55,0.06)', borderBottom: '1px solid rgba(212,175,55,0.12)' }}>
                  <ShoppingBag className="w-4 h-4" style={{ color: '#D4AF37' }} />
                  <span style={{ fontWeight: 700, color: '#F5F0E8', fontSize: '0.9rem' }}>החבילה שלך</span>
                  {cart.length > 0 && (
                    <span className="mr-auto text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)', color: '#D4AF37' }}>
                      {cart.length}
                    </span>
                  )}
                </div>

                {cart.length === 0 ? (
                  <div className="px-5 py-14 text-center">
                    <ShoppingBag className="w-10 h-10 mx-auto mb-3" style={{ color: 'rgba(212,175,55,0.15)' }} />
                    <p style={{ fontSize: '0.82rem', color: 'rgba(245,240,232,0.3)' }}>הוסף מוצרים לחבילה</p>
                  </div>
                ) : (
                  <div className="divide-y max-h-64 overflow-y-auto"
                    style={{ borderColor: 'rgba(212,175,55,0.08)' }}>
                    {cart.map(item => (
                      <div key={item.product.id} className="px-4 py-3">
                        <div className="flex items-center justify-between mb-2">
                          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#F5F0E8', lineHeight: 1.3 }}>
                            {item.product.name}
                          </span>
                          <button onClick={() => removeProduct(item.product.id)}
                            className="mr-2 transition-colors"
                            style={{ color: 'rgba(245,240,232,0.2)' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#f87171' }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(245,240,232,0.2)' }}>
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            {[
                              { delta: -item.product.moq, icon: <Minus className="w-3 h-3" /> },
                              { delta: item.product.moq, icon: <Plus className="w-3 h-3" /> },
                            ].map(({ delta, icon }, idx) => (
                              idx === 0 ? (
                                <button key={idx} onClick={() => changeQty(item.product.id, delta)}
                                  className="w-6 h-6 rounded-md flex items-center justify-center transition-colors"
                                  style={{ border: '1px solid rgba(212,175,55,0.15)', color: 'rgba(245,240,232,0.5)' }}>
                                  {icon}
                                </button>
                              ) : (
                                <span key="qty" className="text-xs font-bold w-6 text-center" style={{ color: '#F5F0E8' }}>
                                  {item.qty}
                                </span>
                              )
                            ))}
                            <button onClick={() => changeQty(item.product.id, item.product.moq)}
                              className="w-6 h-6 rounded-md flex items-center justify-center transition-colors"
                              style={{ border: '1px solid rgba(212,175,55,0.15)', color: 'rgba(245,240,232,0.5)' }}>
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span style={{ fontSize: '0.8rem', color: '#4ade80', fontWeight: 700 }}>
                            +{formatPrice(item.product.profit_per_unit * item.qty)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Summary */}
                <div className="px-5 py-4 space-y-2" style={{ borderTop: '1px solid rgba(212,175,55,0.08)' }}>
                  {[
                    { label: 'סה"כ יחידות', value: String(totalItems) },
                    { label: 'עלות לחנות', value: formatPrice(totalCost) },
                    { label: 'הכנסות צפויות', value: formatPrice(totalRevenue) },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between" style={{ fontSize: '0.75rem' }}>
                      <span style={{ color: 'rgba(245,240,232,0.4)' }}>{label}</span>
                      <span style={{ color: 'rgba(245,240,232,0.7)', fontWeight: 600 }}>{value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-3" style={{ borderTop: '1px solid rgba(212,175,55,0.08)' }}>
                    <span className="font-bold" style={{ fontSize: '0.85rem', color: '#F5F0E8' }}>
                      <TrendingUp className="w-3.5 h-3.5 inline ml-1" style={{ color: '#4ade80' }} />
                      רווח צפוי
                    </span>
                    <span className="font-black" style={{ color: '#4ade80', fontSize: '1.3rem' }}>{formatPrice(totalProfit)}</span>
                  </div>
                </div>

                <div className="px-5 pb-5">
                  <button onClick={sendQuote} className="btn-gold w-full justify-center text-sm">
                    <Send className="w-4 h-4" />
                    שלח הצעת מחיר
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
