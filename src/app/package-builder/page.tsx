'use client'

import { useState } from 'react'
import { Plus, Minus, Trash2, TrendingUp, ShoppingBag, Send } from 'lucide-react'
import { mockProducts } from '@/lib/mock-data'
import { formatPrice, formatPercent, CATEGORY_LABELS } from '@/lib/utils'
import type { Product } from '@/types'
import { toast } from 'sonner'

interface CartItem {
  product: Product
  qty: number
}

export default function PackageBuilderPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [category, setCategory] = useState('all')

  function addProduct(product: Product) {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id)
      if (existing) return prev.map((i) => i.product.id === product.id ? { ...i, qty: i.qty + product.moq } : i)
      return [...prev, { product, qty: product.moq }]
    })
    toast.success(`${product.name} נוסף לחבילה`)
  }

  function removeProduct(id: string) {
    setCart((prev) => prev.filter((i) => i.product.id !== id))
  }

  function changeQty(id: string, delta: number) {
    setCart((prev) =>
      prev.map((i) => {
        if (i.product.id !== id) return i
        const next = i.qty + delta
        return next <= 0 ? i : { ...i, qty: next }
      })
    )
  }

  const totalCost = cart.reduce((s, i) => s + i.product.price_store * i.qty, 0)
  const totalRevenue = cart.reduce((s, i) => s + i.product.price_retail * i.qty, 0)
  const totalProfit = cart.reduce((s, i) => s + i.product.profit_per_unit * i.qty, 0)
  const totalItems = cart.reduce((s, i) => s + i.qty, 0)

  const categories = ['all', ...Array.from(new Set(mockProducts.map((p) => p.category)))]
  const filtered = category === 'all' ? mockProducts : mockProducts.filter((p) => p.category === category)

  function sendQuote() {
    if (cart.length === 0) { toast.error('הוסף מוצרים לחבילה תחילה'); return }
    toast.success('הצעת המחיר נשלחה! ניצור איתך קשר תוך 24 שעות.')
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="bg-gray-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">בנה את החבילה שלך</h1>
          <p className="text-gray-400">בחר מוצרים, ראה את הרווח הצפוי, שלח הצעת מחיר</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Products panel */}
          <div className="lg:col-span-2">
            {/* Category filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    category === cat
                      ? 'bg-[#C9A84C] text-white border-[#C9A84C]'
                      : 'border-gray-200 text-gray-600 hover:border-[#C9A84C]/50 bg-white'
                  }`}
                >
                  {cat === 'all' ? 'הכל' : CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filtered.map((product) => {
                const inCart = cart.find((i) => i.product.id === product.id)
                return (
                  <div
                    key={product.id}
                    className={`bg-white rounded-xl border p-5 transition-all ${
                      inCart ? 'border-[#C9A84C] shadow-sm' : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">
                          {CATEGORY_LABELS[product.category]}
                        </div>
                        <h3 className="font-semibold text-gray-900 text-sm leading-snug">{product.name}</h3>
                      </div>
                      <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full mr-2 shrink-0">
                        {formatPercent(product.profit_percent)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-gray-400">לחנות / קמעונאי</div>
                        <div className="text-sm font-medium text-gray-700">
                          {formatPrice(product.price_store)} / {formatPrice(product.price_retail)}
                        </div>
                      </div>
                      <button
                        onClick={() => addProduct(product)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          inCart
                            ? 'bg-[#C9A84C] text-white'
                            : 'bg-gray-900 text-white hover:bg-gray-700'
                        }`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                        {inCart ? 'הוסף עוד' : 'הוסף'}
                      </button>
                    </div>
                    {inCart && (
                      <div className="mt-2 pt-2 border-t border-[#C9A84C]/20 text-xs text-[#C9A84C] font-medium">
                        ✓ {inCart.qty} יח&apos; בחבילה
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Cart panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="bg-gray-950 px-5 py-4">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-[#C9A84C]" />
                    <span className="text-white font-semibold">החבילה שלך</span>
                    {cart.length > 0 && (
                      <span className="bg-[#C9A84C] text-white text-xs rounded-full px-2 py-0.5 mr-auto">
                        {cart.length} מוצרים
                      </span>
                    )}
                  </div>
                </div>

                {cart.length === 0 ? (
                  <div className="px-5 py-12 text-center">
                    <ShoppingBag className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                    <p className="text-gray-400 text-sm">הוסף מוצרים לחבילה</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.product.id} className="px-4 py-3">
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-xs font-medium text-gray-900 leading-snug flex-1">
                            {item.product.name}
                          </span>
                          <button onClick={() => removeProduct(item.product.id)} className="text-gray-300 hover:text-red-400 transition-colors mr-1">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => changeQty(item.product.id, -item.product.moq)}
                              className="w-6 h-6 rounded-md border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-400"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-gray-900 w-6 text-center">{item.qty}</span>
                            <button
                              onClick={() => changeQty(item.product.id, item.product.moq)}
                              className="w-6 h-6 rounded-md border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-400"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="text-xs text-green-600 font-semibold">
                            +{formatPrice(item.product.profit_per_unit * item.qty)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Summary */}
                <div className="border-t border-gray-100 px-5 py-4 space-y-2">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>סה&quot;כ יחידות</span>
                    <span className="font-medium text-gray-900">{totalItems}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>עלות לחנות</span>
                    <span className="font-medium text-gray-900">{formatPrice(totalCost)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>הכנסות צפויות</span>
                    <span className="font-medium text-gray-900">{formatPrice(totalRevenue)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                    <span className="text-sm font-bold text-gray-900">רווח צפוי</span>
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-lg font-bold text-green-600">{formatPrice(totalProfit)}</span>
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5">
                  <button
                    onClick={sendQuote}
                    className="w-full h-11 rounded-xl bg-[#C9A84C] hover:bg-[#b8943e] text-white font-semibold flex items-center justify-center gap-2 transition-colors text-sm"
                  >
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
