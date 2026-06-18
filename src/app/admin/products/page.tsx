'use client'

import { useState } from 'react'
import { Plus, Search, Pencil, Trash2, Package, TrendingUp } from 'lucide-react'
import { mockProducts } from '@/lib/mock-data'
import { formatPrice, formatPercent, CATEGORY_LABELS } from '@/lib/utils'
import type { Product } from '@/types'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { ProductFormModal } from '@/components/admin/ProductFormModal'

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [search, setSearch] = useState('')
  const [editProduct, setEditProduct] = useState<Product | null>(null)
  const [showForm, setShowForm] = useState(false)

  const filtered = products.filter(
    (p) =>
      p.name.includes(search) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
  )

  function deleteProduct(id: string) {
    if (!confirm('למחוק את המוצר?')) return
    setProducts((prev) => prev.filter((p) => p.id !== id))
    toast.success('המוצר נמחק')
  }

  function saveProduct(data: Partial<Product>) {
    if (editProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editProduct.id ? { ...p, ...data } : p))
      )
      toast.success('המוצר עודכן')
    } else {
      const newProduct: Product = {
        id: String(Date.now()),
        name: data.name ?? '',
        description_short: data.description_short ?? '',
        description_full: data.description_full ?? '',
        sku: data.sku ?? '',
        category: data.category ?? 'chocolates',
        tags: data.tags ?? [],
        price_store: data.price_store ?? 0,
        price_retail: data.price_retail ?? 0,
        profit_per_unit: (data.price_retail ?? 0) - (data.price_store ?? 0),
        profit_percent: data.price_retail
          ? Math.round(((data.price_retail - (data.price_store ?? 0)) / data.price_retail) * 100)
          : 0,
        moq: data.moq ?? 1,
        stock_quantity: data.stock_quantity ?? 0,
        carton_qty: data.carton_qty ?? 1,
        brand: data.brand ?? '',
        suitable_for: data.suitable_for ?? [],
        images: [],
        is_new: data.is_new ?? false,
        is_featured: data.is_featured ?? false,
        is_top_seller: data.is_top_seller ?? false,
        is_seasonal: data.is_seasonal ?? false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      setProducts((prev) => [newProduct, ...prev])
      toast.success('המוצר נוסף')
    }
    setShowForm(false)
    setEditProduct(null)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">מוצרים</h1>
          <p className="text-sm text-gray-500 mt-0.5">{products.length} מוצרים במערכת</p>
        </div>
        <button
          onClick={() => { setEditProduct(null); setShowForm(true) }}
          className="flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b8943e] text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" />
          מוצר חדש
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          placeholder="חיפוש לפי שם או מק״ט..."
          className="pr-10"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-right text-xs font-semibold text-gray-500 px-5 py-3">מוצר</th>
                <th className="text-right text-xs font-semibold text-gray-500 px-4 py-3">קטגוריה</th>
                <th className="text-right text-xs font-semibold text-gray-500 px-4 py-3">מחיר לחנות</th>
                <th className="text-right text-xs font-semibold text-gray-500 px-4 py-3">מחיר קמעונאי</th>
                <th className="text-right text-xs font-semibold text-gray-500 px-4 py-3">רווח</th>
                <th className="text-right text-xs font-semibold text-gray-500 px-4 py-3">מלאי</th>
                <th className="text-right text-xs font-semibold text-gray-500 px-4 py-3">סטטוס</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                        <Package className="w-4 h-4 text-gray-400" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-xs text-gray-400">{product.sku}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-gray-600">
                    {CATEGORY_LABELS[product.category]}
                  </td>
                  <td className="px-4 py-3.5 font-medium text-gray-900">
                    {formatPrice(product.price_store)}
                  </td>
                  <td className="px-4 py-3.5 text-gray-600">
                    {formatPrice(product.price_retail)}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                      <span className="font-semibold text-green-600">
                        {formatPercent(product.profit_percent)}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-gray-600">{product.stock_quantity}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex gap-1 flex-wrap">
                      {product.is_new && <Badge className="bg-blue-100 text-blue-700 text-[10px]">חדש</Badge>}
                      {product.is_featured && <Badge className="bg-purple-100 text-purple-700 text-[10px]">מומלץ</Badge>}
                      {product.is_top_seller && <Badge className="bg-amber-100 text-amber-700 text-[10px]">מוביל</Badge>}
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => { setEditProduct(product); setShowForm(true) }}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <ProductFormModal
          product={editProduct}
          onSave={saveProduct}
          onClose={() => { setShowForm(false); setEditProduct(null) }}
        />
      )}
    </div>
  )
}
