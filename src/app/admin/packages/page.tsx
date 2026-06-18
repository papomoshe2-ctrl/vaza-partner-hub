'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2, ShoppingBag } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import type { Package } from '@/types'
import { toast } from 'sonner'

const mockPackages: Package[] = [
  { id: '1', name: 'Starter', description: 'חבילת התחלה לחנויות קטנות', price: 1500, products: [{ product_id: '1', quantity: 12 }, { product_id: '3', quantity: 6 }], type: 'starter', is_seasonal: false, created_at: new Date().toISOString() },
  { id: '2', name: 'Growth', description: 'חבילת צמיחה לחנויות בצמיחה', price: 3500, products: [{ product_id: '1', quantity: 24 }, { product_id: '2', quantity: 6 }, { product_id: '3', quantity: 12 }], type: 'growth', is_seasonal: false, created_at: new Date().toISOString() },
  { id: '3', name: 'Premium', description: 'חבילה פרימיום למקסימום רווח', price: 5000, products: [{ product_id: '1', quantity: 48 }, { product_id: '2', quantity: 12 }, { product_id: '3', quantity: 24 }, { product_id: '4', quantity: 12 }], type: 'premium', is_seasonal: false, created_at: new Date().toISOString() },
  { id: '4', name: 'Holiday Rosh Hashana', description: 'חבילת ראש השנה', price: 2800, products: [{ product_id: '5', quantity: 12 }, { product_id: '1', quantity: 12 }], type: 'holiday', is_seasonal: true, season: 'rosh_hashana', created_at: new Date().toISOString() },
]

const typeColors: Record<string, string> = {
  starter: 'bg-blue-100 text-blue-700',
  growth: 'bg-purple-100 text-purple-700',
  premium: 'bg-amber-100 text-amber-700',
  holiday: 'bg-green-100 text-green-700',
  corporate: 'bg-gray-100 text-gray-700',
}

const typeLabels: Record<string, string> = {
  starter: 'Starter',
  growth: 'Growth',
  premium: 'Premium',
  holiday: 'Holiday',
  corporate: 'Corporate',
}

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<Package[]>(mockPackages)

  function deletePackage(id: string) {
    if (!confirm('למחוק את החבילה?')) return
    setPackages((prev) => prev.filter((p) => p.id !== id))
    toast.success('החבילה נמחקה')
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">חבילות</h1>
          <p className="text-sm text-gray-500 mt-0.5">{packages.length} חבילות במערכת</p>
        </div>
        <button
          onClick={() => toast.info('עורך חבילות בקרוב')}
          className="flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b8943e] text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" />
          חבילה חדשה
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-[#C9A84C]" />
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${typeColors[pkg.type]}`}>
                {typeLabels[pkg.type]}
              </span>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-1">{pkg.name}</h3>
            <p className="text-gray-500 text-sm mb-4">{pkg.description}</p>
            <div className="flex justify-between items-center mb-4 p-3 bg-gray-50 rounded-xl">
              <span className="text-sm text-gray-500">מחיר</span>
              <span className="font-bold text-gray-900 text-lg">{formatPrice(pkg.price)}</span>
            </div>
            <div className="mb-4">
              <div className="text-xs text-gray-500 mb-2">מוצרים ({pkg.products.length})</div>
              <div className="flex gap-1.5 flex-wrap">
                {pkg.products.map((p) => (
                  <span key={p.product_id} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    {p.quantity} יח&apos;
                  </span>
                ))}
              </div>
            </div>
            {pkg.is_seasonal && (
              <div className="mb-3 text-xs text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg">
                🎄 חבילה עונתית — {pkg.season}
              </div>
            )}
            <div className="flex gap-2 pt-3 border-t border-gray-100">
              <button
                onClick={() => toast.info('עורך חבילות בקרוב')}
                className="flex-1 flex items-center justify-center gap-1.5 text-xs text-gray-600 border border-gray-200 rounded-lg py-2 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
              >
                <Pencil className="w-3.5 h-3.5" /> ערוך
              </button>
              <button
                onClick={() => deletePackage(pkg.id)}
                className="flex-1 flex items-center justify-center gap-1.5 text-xs text-gray-600 border border-gray-200 rounded-lg py-2 hover:border-red-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" /> מחק
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
