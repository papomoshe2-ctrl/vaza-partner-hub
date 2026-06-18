'use client'

import { use } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  Package, ArrowRight, TrendingUp, Check, ShoppingCart,
  Star, Truck, Shield, ChevronDown, ChevronUp
} from 'lucide-react'
import { mockProducts } from '@/lib/mock-data'
import { formatPrice, formatPercent, CATEGORY_LABELS, SUITABLE_FOR_LABELS } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { useState } from 'react'
import { toast } from 'sonner'

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = mockProducts.find((p) => p.id === id)
  if (!product) notFound()
  // product is defined past this point (notFound throws)
  const p = product!

  const [qty, setQty] = useState(p.moq)
  const [showFullDesc, setShowFullDesc] = useState(false)

  const totalCost = p.price_store * qty
  const totalRevenue = p.price_retail * qty
  const totalProfit = p.profit_per_unit * qty

  function addToQuote() {
    toast.success(`${p.name} נוסף להצעת המחיר`)
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-900">בית</Link>
            <span>/</span>
            <Link href="/catalog" className="hover:text-gray-900">קטלוג</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{p.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Image */}
          <div>
            <div className="bg-white rounded-2xl border border-gray-100 aspect-square flex items-center justify-center relative overflow-hidden">
              <Package className="w-32 h-32 text-gray-200" />
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                {p.is_new && <Badge className="bg-blue-500 text-white">חדש</Badge>}
                {p.is_top_seller && <Badge className="bg-amber-500 text-white">נמכר ביותר</Badge>}
                {p.is_featured && <Badge className="bg-purple-500 text-white">מומלץ</Badge>}
              </div>
            </div>
          </div>

          {/* Right: Info */}
          <div>
            <div className="mb-2">
              <span className="text-xs text-[#C9A84C] font-semibold uppercase tracking-wider">
                {CATEGORY_LABELS[p.category]}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{p.name}</h1>
            <p className="text-gray-500 mb-1 text-sm">מק&quot;ט: {p.sku}</p>
            <p className="text-gray-500 mb-1 text-sm">מותג: {p.brand}</p>

            <p className="text-gray-600 mt-4 leading-relaxed text-sm">
              {showFullDesc ? p.description_full : p.description_short}
            </p>
            <button
              onClick={() => setShowFullDesc(!showFullDesc)}
              className="text-[#C9A84C] text-xs mt-1 flex items-center gap-1"
            >
              {showFullDesc ? <><ChevronUp className="w-3 h-3" />פחות</> : <><ChevronDown className="w-3 h-3" />קרא עוד</>}
            </button>

            {/* Pricing box */}
            <div className="bg-gray-50 rounded-2xl p-6 mt-6 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">מחיר לחנות</span>
                <span className="font-bold text-gray-900 text-lg">{formatPrice(p.price_store)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">מחיר קמעונאי מומלץ</span>
                <span className="font-medium text-gray-600">{formatPrice(p.price_retail)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                <span className="text-sm font-semibold text-green-700">רווח ליחידה</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-green-600 text-xl">{formatPrice(p.profit_per_unit)}</span>
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-semibold">
                    {formatPercent(p.profit_percent)}
                  </span>
                </div>
              </div>
            </div>

            {/* Qty + calculator */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                כמות הזמנה (מינימום {p.moq} יח&apos;)
              </label>
              <div className="flex items-center gap-3 mb-4">
                <button
                  onClick={() => setQty(Math.max(p.moq, qty - p.moq))}
                  className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#C9A84C] transition-colors font-bold text-lg"
                >
                  −
                </button>
                <span className="text-xl font-bold text-gray-900 w-12 text-center">{qty}</span>
                <button
                  onClick={() => setQty(qty + p.moq)}
                  className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#C9A84C] transition-colors font-bold text-lg"
                >
                  +
                </button>
              </div>

              {/* Live calc */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-white border border-gray-100 rounded-xl p-3 text-center">
                  <div className="text-xs text-gray-400 mb-1">עלות</div>
                  <div className="font-bold text-gray-900 text-sm">{formatPrice(totalCost)}</div>
                </div>
                <div className="bg-white border border-gray-100 rounded-xl p-3 text-center">
                  <div className="text-xs text-gray-400 mb-1">הכנסות</div>
                  <div className="font-bold text-gray-900 text-sm">{formatPrice(totalRevenue)}</div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
                  <div className="text-xs text-green-600 mb-1 flex items-center justify-center gap-0.5">
                    <TrendingUp className="w-3 h-3" /> רווח
                  </div>
                  <div className="font-bold text-green-600 text-sm">{formatPrice(totalProfit)}</div>
                </div>
              </div>

              <button
                onClick={addToQuote}
                className="w-full h-12 rounded-xl bg-[#C9A84C] hover:bg-[#b8943e] text-white font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                הוסף להצעת מחיר
              </button>
            </div>

            {/* Meta info */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              {[
                { label: 'MOQ מינימום', value: `${p.moq} יח'` },
                { label: 'יחידות בקרטון', value: `${p.carton_qty} יח'` },
                { label: 'מלאי זמין', value: `${p.stock_quantity} יח'` },
                { label: 'קטגוריה', value: CATEGORY_LABELS[p.category] },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white rounded-xl border border-gray-100 p-3">
                  <div className="text-xs text-gray-400 mb-0.5">{label}</div>
                  <div className="font-semibold text-gray-900 text-sm">{value}</div>
                </div>
              ))}
            </div>

            {/* Suitable for */}
            {p.suitable_for.length > 0 && (
              <div className="mt-6">
                <div className="text-sm font-medium text-gray-700 mb-2">מתאים ל:</div>
                <div className="flex flex-wrap gap-2">
                  {p.suitable_for.map((s) => (
                    <span key={s} className="flex items-center gap-1 text-xs bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-full">
                      <Check className="w-3 h-3" />
                      {SUITABLE_FOR_LABELS[s] ?? s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-gray-100">
              {[
                { icon: Truck, label: 'משלוח 24-48 שעות' },
                { icon: Shield, label: 'החזרה תוך 48 שעות' },
                { icon: Star, label: 'מוצרים מוכנים למדף' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Icon className="w-4 h-4 text-[#C9A84C]" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related products */}
        <div className="mt-16">
          <h2 className="text-xl font-bold text-gray-900 mb-6">מוצרים נוספים</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {mockProducts.filter((p) => p.id !== p.id).slice(0, 4).map((p) => (
              <Link
                key={p.id}
                href={`/catalog/${p.id}`}
                className="bg-white rounded-xl border border-gray-100 hover:border-[#C9A84C]/40 hover:shadow-sm transition-all p-4"
              >
                <div className="bg-gray-50 rounded-lg h-24 flex items-center justify-center mb-3">
                  <Package className="w-10 h-10 text-gray-200" />
                </div>
                <div className="text-xs font-semibold text-gray-900 mb-1 line-clamp-2">{p.name}</div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{formatPrice(p.price_store)}</span>
                  <span className="text-xs text-green-600 font-semibold">{formatPercent(p.profit_percent)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
