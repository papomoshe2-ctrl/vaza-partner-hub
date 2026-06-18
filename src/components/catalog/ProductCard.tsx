'use client'

import Link from 'next/link'
import { TrendingUp, Plus } from 'lucide-react'
import type { Product } from '@/types'
import { formatPrice, formatPercent, CATEGORY_LABELS } from '@/lib/utils'

const CATEGORY_EMOJI: Record<string, string> = {
  chocolates: '🍫', wines: '🍷', gift_sets: '🎁',
  tea: '🫖', cookies: '🥐', valentines: '🍾',
  desserts: '🧁', rosh_hashana: '🍯',
}

interface Props {
  product: Product
  onAdd?: (product: Product) => void
}

export function ProductCard({ product, onAdd }: Props) {
  return (
    <div
      className="group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
        border: '1px solid rgba(212,175,55,0.08)',
        backdropFilter: 'blur(12px)',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.border = '1px solid rgba(212,175,55,0.25)'
        el.style.transform = 'translateY(-3px)'
        el.style.boxShadow = '0 16px 48px rgba(212,175,55,0.08)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.border = '1px solid rgba(212,175,55,0.08)'
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = 'none'
      }}
    >
      {/* Badges */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5">
        {product.is_new && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', color: '#93c5fd' }}>
            חדש
          </span>
        )}
        {product.is_top_seller && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.25)', color: '#D4AF37' }}>
            TOP
          </span>
        )}
      </div>

      {/* Profit badge */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2 py-1 rounded-full"
        style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
        <TrendingUp className="w-2.5 h-2.5" style={{ color: '#4ade80' }} />
        <span className="text-[10px] font-bold" style={{ color: '#4ade80' }}>
          {formatPercent(product.profit_percent)}
        </span>
      </div>

      {/* Image area */}
      <div className="h-40 flex items-center justify-center"
        style={{ background: 'rgba(212,175,55,0.03)', borderBottom: '1px solid rgba(212,175,55,0.06)' }}>
        <span className="text-5xl transition-transform duration-300 group-hover:scale-110">
          {CATEGORY_EMOJI[product.category] ?? '📦'}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-1" style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: 'rgba(212,175,55,0.5)' }}>
          {CATEGORY_LABELS[product.category]?.toUpperCase()}
        </div>
        <h3 className="font-bold mb-1 leading-snug line-clamp-2" style={{ color: '#F5F0E8', fontSize: '0.92rem' }}>
          {product.name}
        </h3>
        <p className="line-clamp-2 mb-4" style={{ fontSize: '0.75rem', color: 'rgba(245,240,232,0.35)', lineHeight: 1.6 }}>
          {product.description_short}
        </p>

        {/* Pricing */}
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-3 p-3 rounded-xl"
            style={{ background: 'rgba(212,175,55,0.04)', border: '1px solid rgba(212,175,55,0.08)' }}>
            <div className="text-center">
              <div style={{ fontSize: '0.55rem', color: 'rgba(245,240,232,0.3)', marginBottom: '2px' }}>לחנות</div>
              <div className="font-bold" style={{ color: '#D4AF37', fontSize: '0.9rem' }}>{formatPrice(product.price_store)}</div>
            </div>
            <div style={{ color: 'rgba(212,175,55,0.2)' }}>→</div>
            <div className="text-center">
              <div style={{ fontSize: '0.55rem', color: 'rgba(245,240,232,0.3)', marginBottom: '2px' }}>קמעונאי</div>
              <div className="font-semibold" style={{ color: 'rgba(245,240,232,0.6)', fontSize: '0.9rem' }}>{formatPrice(product.price_retail)}</div>
            </div>
            <div className="text-center">
              <div style={{ fontSize: '0.55rem', color: 'rgba(34,197,94,0.6)', marginBottom: '2px' }}>רווח</div>
              <div className="font-bold" style={{ color: '#4ade80', fontSize: '0.9rem' }}>{formatPrice(product.profit_per_unit)}</div>
            </div>
          </div>

          <div className="flex gap-2">
            <Link href={`/catalog/${product.id}`}
              className="flex-1 text-center py-2 rounded-xl text-xs font-semibold transition-all duration-200"
              style={{ border: '1px solid rgba(212,175,55,0.2)', color: 'rgba(245,240,232,0.6)' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(212,175,55,0.5)'; el.style.color = '#D4AF37' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(212,175,55,0.2)'; el.style.color = 'rgba(245,240,232,0.6)' }}>
              פרטים
            </Link>
            {onAdd && (
              <button onClick={() => onAdd(product)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 btn-gold">
                <Plus className="w-3.5 h-3.5" />
                הוסף
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
