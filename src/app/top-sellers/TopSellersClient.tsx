'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { TrendingUp, Star, Flame } from 'lucide-react'
import { mockProducts } from '@/lib/mock-data'
import { formatPrice, formatPercent, CATEGORY_LABELS } from '@/lib/utils'

export function TopSellersClient() {
  const topSellers = [...mockProducts].sort((a, b) => b.profit_percent - a.profit_percent)

  return (
    <div className="min-h-screen pt-20" style={{ background: 'var(--layer-0)' }}>
      {/* Header */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 50% 60% at 50% 0%, rgba(212,175,55,0.06), transparent 70%)' }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="section-label mb-5 inline-block">TOP SELLERS</span>
            <h1 className="font-black mb-4"
              style={{ fontSize: 'clamp(32px, 5vw, 60px)', color: '#F5F0E8', letterSpacing: '-0.02em', lineHeight: 1.05 }}>
              המוצרים שמוכרים<br />
              <span className="gold-text">הכי הרבה ברשת</span>
            </h1>
            <p style={{ color: 'rgba(245,240,232,0.4)', maxWidth: 480, lineHeight: 1.8 }}>
              נבחרו לפי נפח מכירות, ביקוש עונתי ומרווח רווח. המוצרים שהלקוחות שלנו הכי מרוויחים מהם.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products */}
      <section className="pb-24" style={{ background: 'var(--layer-0)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {topSellers.map((product, i) => (
              <motion.div key={product.id}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}>
                <Link href={`/catalog/${product.id}`}>
                  <div className="luxury-card p-6 h-full group cursor-pointer transition-all duration-300"
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.3)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.08)' }}>
                    {/* Rank */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {i === 0 && <Flame className="w-4 h-4" style={{ color: '#F4D06F' }} />}
                        <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(212,175,55,0.5)' }}>
                          #{i + 1} TOP SELLER
                        </span>
                      </div>
                      {product.is_top_seller && (
                        <Star className="w-4 h-4" style={{ color: '#D4AF37' }} fill="#D4AF37" />
                      )}
                    </div>

                    {/* Emoji placeholder */}
                    <div className="h-28 flex items-center justify-center mb-5 rounded-xl"
                      style={{ background: 'rgba(212,175,55,0.04)', border: '1px solid rgba(212,175,55,0.08)' }}>
                      <span style={{ fontSize: '3rem' }}>
                        {product.category === 'chocolates' ? '🍫' :
                         product.category === 'wines' ? '🍷' :
                         product.category === 'gift_sets' ? '🎁' :
                         product.category === 'tea' ? '🫖' :
                         product.category === 'valentines' ? '🍾' : '🥜'}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.65rem', letterSpacing: '0.12em', color: 'rgba(212,175,55,0.5)', marginBottom: '6px' }}>
                      {CATEGORY_LABELS[product.category]?.toUpperCase()}
                    </div>
                    <h3 className="font-bold mb-1" style={{ color: '#F5F0E8', fontSize: '1rem', lineHeight: 1.3 }}>{product.name}</h3>
                    <p style={{ fontSize: '0.78rem', color: 'rgba(245,240,232,0.4)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                      {product.description_short}
                    </p>

                    <div className="flex items-end justify-between pt-4"
                      style={{ borderTop: '1px solid rgba(212,175,55,0.08)' }}>
                      <div>
                        <div style={{ fontSize: '0.6rem', color: 'rgba(245,240,232,0.3)', marginBottom: '2px' }}>מחיר לחנות</div>
                        <div className="font-black" style={{ color: '#D4AF37', fontSize: '1.2rem' }}>{formatPrice(product.price_store)}</div>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                        style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.15)' }}>
                        <TrendingUp className="w-3.5 h-3.5" style={{ color: '#4ade80' }} />
                        <span className="font-bold text-sm" style={{ color: '#4ade80' }}>
                          {formatPercent(product.profit_percent)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div className="text-center mt-14"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Link href="/catalog" className="btn-gold">
              צפה בקטלוג המלא — 500+ מוצרים
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
