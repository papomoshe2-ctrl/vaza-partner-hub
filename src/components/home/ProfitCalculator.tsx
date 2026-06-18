'use client'

import { useState } from 'react'
import { TrendingUp } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

const products = [
  { name: 'שוקולד בלגי', storePrice: 28, retailPrice: 55, moq: 12 },
  { name: 'יין בוטיק', storePrice: 65, retailPrice: 120, moq: 6 },
  { name: 'מארז מתנה', storePrice: 85, retailPrice: 160, moq: 6 },
  { name: 'תה פרימיום', storePrice: 32, retailPrice: 65, moq: 12 },
]

export function ProfitCalculator() {
  const [selectedProduct, setSelectedProduct] = useState(products[0])
  const [units, setUnits] = useState(20)

  const monthlyRevenue = selectedProduct.retailPrice * units
  const monthlyProfit = (selectedProduct.retailPrice - selectedProduct.storePrice) * units
  const annualProfit = monthlyProfit * 12
  const profitPercent = Math.round(
    ((selectedProduct.retailPrice - selectedProduct.storePrice) / selectedProduct.retailPrice) * 100
  )

  return (
    <section className="bg-gray-950 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-3">
            מחשבון רווח
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            כמה תרוויח?
          </h2>
          <p className="mt-4 text-gray-400 max-w-md mx-auto">
            בחר מוצר, הכנס כמות מכירות חודשית וראה את הרווח שלך.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-10">
            {/* Product selector */}
            <div className="mb-8">
              <label className="block text-gray-400 text-sm mb-3">בחר מוצר</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {products.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => setSelectedProduct(p)}
                    className={`rounded-xl px-4 py-3 text-sm font-medium transition-all border ${
                      selectedProduct.name === p.name
                        ? 'bg-[#C9A84C] text-white border-[#C9A84C]'
                        : 'border-white/10 text-gray-400 hover:border-[#C9A84C]/50 hover:text-white'
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Units slider */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-3">
                <label className="text-gray-400 text-sm">יחידות בחודש</label>
                <span className="text-white font-bold text-lg">{units} יח'</span>
              </div>
              <input
                type="range"
                min={5}
                max={200}
                step={5}
                value={units}
                onChange={(e) => setUnits(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-[#C9A84C]"
              />
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>5</span>
                <span>200</span>
              </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white/5 rounded-xl p-5 text-center">
                <div className="text-gray-400 text-xs mb-2">הכנסות חודשיות</div>
                <div className="text-white text-2xl font-bold">
                  {formatPrice(monthlyRevenue)}
                </div>
              </div>
              <div className="bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-xl p-5 text-center">
                <div className="text-[#C9A84C] text-xs mb-2 flex items-center justify-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  רווח חודשי
                </div>
                <div className="text-[#C9A84C] text-2xl font-bold">
                  {formatPrice(monthlyProfit)}
                </div>
                <div className="text-[#C9A84C]/60 text-xs mt-1">{profitPercent}% מרווח</div>
              </div>
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-5 text-center">
                <div className="text-green-400 text-xs mb-2">רווח שנתי</div>
                <div className="text-green-400 text-2xl font-bold">
                  {formatPrice(annualProfit)}
                </div>
              </div>
            </div>

            <p className="text-center text-gray-600 text-xs mt-6">
              * חישוב לדוגמה. המחירים עשויים להשתנות בהתאם לנפח ולסוג החשבון.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
