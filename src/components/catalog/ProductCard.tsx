import Link from 'next/link'
import { Package, TrendingUp, Plus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { Product } from '@/types'
import { formatPrice, formatPercent, CATEGORY_LABELS } from '@/lib/utils'

interface Props {
  product: Product
}

export function ProductCard({ product }: Props) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 hover:border-[#C9A84C]/30 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative bg-gray-50 h-44 flex items-center justify-center">
        <Package className="w-16 h-16 text-gray-200" />

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          {product.is_new && (
            <Badge className="bg-blue-500 text-white text-[10px] px-2 py-0.5">חדש</Badge>
          )}
          {product.is_top_seller && (
            <Badge className="bg-amber-500 text-white text-[10px] px-2 py-0.5">נמכר ביותר</Badge>
          )}
          {product.is_featured && (
            <Badge className="bg-purple-500 text-white text-[10px] px-2 py-0.5">מומלץ</Badge>
          )}
        </div>

        {/* Profit badge */}
        <div className="absolute top-3 left-3 bg-green-500/10 border border-green-500/20 rounded-full px-2.5 py-1 flex items-center gap-1">
          <TrendingUp className="w-3 h-3 text-green-500" />
          <span className="text-green-600 text-xs font-bold">
            {formatPercent(product.profit_percent)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-1">
          <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
            {CATEGORY_LABELS[product.category]}
          </span>
        </div>
        <h3 className="font-semibold text-gray-900 text-sm mb-1 leading-snug line-clamp-2">
          {product.name}
        </h3>
        <p className="text-xs text-gray-400 mb-4 line-clamp-2">{product.description_short}</p>

        {/* Pricing */}
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-3 p-3 bg-gray-50 rounded-xl">
            <div className="text-center">
              <div className="text-[10px] text-gray-400 mb-0.5">מחיר לחנות</div>
              <div className="text-sm font-bold text-gray-900">{formatPrice(product.price_store)}</div>
            </div>
            <div className="text-gray-200 text-lg">→</div>
            <div className="text-center">
              <div className="text-[10px] text-gray-400 mb-0.5">מחיר קמעונאי</div>
              <div className="text-sm font-bold text-gray-900">{formatPrice(product.price_retail)}</div>
            </div>
            <div className="text-center">
              <div className="text-[10px] text-green-600 mb-0.5">רווח</div>
              <div className="text-sm font-bold text-green-600">
                {formatPrice(product.profit_per_unit)}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Link
              href={`/catalog/${product.id}`}
              className="flex-1 text-center text-xs font-medium text-gray-600 border border-gray-200 rounded-lg py-2 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
            >
              פרטים
            </Link>
            <button className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium bg-[#C9A84C] text-white rounded-lg py-2 hover:bg-[#b8943e] transition-colors">
              <Plus className="w-3.5 h-3.5" />
              הוסף להצעה
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
