'use client'

import { useState, useMemo } from 'react'
import { Search, X, SlidersHorizontal } from 'lucide-react'
import { motion } from 'framer-motion'
import { ProductCard } from '@/components/catalog/ProductCard'
import { mockProducts } from '@/lib/mock-data'
import { CATEGORY_LABELS } from '@/lib/utils'

const CATEGORIES = ['all', 'chocolates', 'wines', 'gift_sets', 'desserts', 'tea', 'cookies', 'valentines', 'rosh_hashana']
const FILTERS = [
  { key: 'featured', label: 'מומלץ' },
  { key: 'top_seller', label: 'TOP SELLERS' },
  { key: 'new', label: 'חדש' },
]

export function CatalogClient() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const toggleFilter = (key: string) =>
    setActiveFilters(prev => prev.includes(key) ? prev.filter(f => f !== key) : [...prev, key])

  const products = useMemo(() => mockProducts.filter(p => {
    if (category !== 'all' && p.category !== category) return false
    if (search && !p.name.includes(search) && !p.sku.includes(search)) return false
    if (activeFilters.includes('featured') && !p.is_featured) return false
    if (activeFilters.includes('top_seller') && !p.is_top_seller) return false
    if (activeFilters.includes('new') && !p.is_new) return false
    return true
  }), [search, category, activeFilters])

  return (
    <div className="min-h-screen pt-20" style={{ background: 'var(--layer-0)' }}>
      {/* Header */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 50% 70% at 50% 0%, rgba(212,175,55,0.05), transparent 70%)' }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="section-label mb-5 inline-block">הקטלוג שלנו</span>
            <h1 className="font-black mb-3"
              style={{ fontSize: 'clamp(32px, 5vw, 60px)', color: '#F5F0E8', letterSpacing: '-0.02em', lineHeight: 1.05 }}>
              500+ מוצרי פרימיום<br />
              <span className="gold-text">לחנות שלך</span>
            </h1>
            <p style={{ color: 'rgba(245,240,232,0.4)', maxWidth: 400, lineHeight: 1.8 }}>
              שוקולדים, יינות, מארזים, תה ועוד — הכל מוכן למדף, הכל עם מרווח גבוה.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        {/* Filters bar */}
        <motion.div className="mb-8 p-5 rounded-2xl space-y-4"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(212,175,55,0.1)', backdropFilter: 'blur(12px)' }}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          {/* Search */}
          <div className="relative">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(212,175,55,0.4)' }} />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="חיפוש לפי שם, מק״ט..."
              style={{
                width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,175,55,0.12)',
                borderRadius: '10px', padding: '10px 14px 10px 40px', fontSize: '0.875rem',
                color: '#F5F0E8', outline: 'none',
              }}
              onFocus={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.35)' }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.12)' }}
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute left-3.5 top-1/2 -translate-y-1/2">
                <X className="w-3.5 h-3.5" style={{ color: 'rgba(245,240,232,0.4)' }} />
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
                style={{
                  background: category === cat ? 'linear-gradient(135deg, #B8963E, #D4AF37)' : 'rgba(255,255,255,0.03)',
                  border: category === cat ? '1px solid #D4AF37' : '1px solid rgba(212,175,55,0.15)',
                  color: category === cat ? '#050505' : 'rgba(245,240,232,0.5)',
                }}>
                {cat === 'all' ? 'הכל' : CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>

          {/* Quick filters */}
          <div className="flex flex-wrap items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5" style={{ color: 'rgba(212,175,55,0.4)' }} />
            {FILTERS.map(f => (
              <button key={f.key} onClick={() => toggleFilter(f.key)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200"
                style={{
                  background: activeFilters.includes(f.key) ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.02)',
                  border: activeFilters.includes(f.key) ? '1px solid rgba(212,175,55,0.4)' : '1px solid rgba(212,175,55,0.1)',
                  color: activeFilters.includes(f.key) ? '#D4AF37' : 'rgba(245,240,232,0.4)',
                }}>
                {f.label}
                {activeFilters.includes(f.key) && <X className="w-3 h-3" />}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Count */}
        <p className="mb-6" style={{ fontSize: '0.78rem', color: 'rgba(245,240,232,0.3)', letterSpacing: '0.05em' }}>
          {products.length} מוצרים
        </p>

        {/* Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {products.map((product, i) => (
              <motion.div key={product.id}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="mb-4" style={{ color: 'rgba(245,240,232,0.3)' }}>לא נמצאו מוצרים</p>
            <button className="btn-ghost-gold text-sm" onClick={() => { setSearch(''); setCategory('all'); setActiveFilters([]) }}>
              נקה פילטרים
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
