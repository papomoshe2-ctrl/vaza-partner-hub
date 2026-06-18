'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Product, ProductCategory } from '@/types'
import { CATEGORY_LABELS } from '@/lib/utils'

interface Props {
  product: Product | null
  onSave: (data: Partial<Product>) => void
  onClose: () => void
}

export function ProductFormModal({ product, onSave, onClose }: Props) {
  const [form, setForm] = useState<Partial<Product>>(
    product ?? {
      name: '', description_short: '', description_full: '', sku: '',
      category: 'chocolates', price_store: 0, price_retail: 0,
      moq: 1, stock_quantity: 0, carton_qty: 1, brand: '',
      suitable_for: [], tags: [],
      is_new: false, is_featured: false, is_top_seller: false, is_seasonal: false,
    }
  )

  function field(key: keyof Product) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const val = e.target.type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : e.target.type === 'number'
        ? Number(e.target.value)
        : e.target.value
      setForm((prev) => ({ ...prev, [key]: val }))
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h2 className="font-bold text-gray-900">
            {product ? 'עריכת מוצר' : 'מוצר חדש'}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label className="text-sm mb-1.5 block">שם מוצר *</Label>
              <Input value={form.name ?? ''} onChange={field('name')} placeholder="שם המוצר" />
            </div>
            <div>
              <Label className="text-sm mb-1.5 block">מק&quot;ט</Label>
              <Input value={form.sku ?? ''} onChange={field('sku')} placeholder="SKU-001" dir="ltr" />
            </div>
            <div>
              <Label className="text-sm mb-1.5 block">מותג</Label>
              <Input value={form.brand ?? ''} onChange={field('brand')} placeholder="שם המותג" />
            </div>
            <div className="col-span-2">
              <Label className="text-sm mb-1.5 block">קטגוריה</Label>
              <select
                value={form.category ?? 'chocolates'}
                onChange={field('category')}
                className="w-full h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>
            <div className="col-span-2">
              <Label className="text-sm mb-1.5 block">תיאור קצר</Label>
              <Input value={form.description_short ?? ''} onChange={field('description_short')} placeholder="תיאור קצר" />
            </div>
            <div className="col-span-2">
              <Label className="text-sm mb-1.5 block">תיאור מלא</Label>
              <textarea
                value={form.description_full ?? ''}
                onChange={field('description_full')}
                rows={3}
                placeholder="תיאור מלא..."
                className="w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 resize-none"
              />
            </div>
            <div>
              <Label className="text-sm mb-1.5 block">מחיר לחנות (₪)</Label>
              <Input type="number" value={form.price_store ?? 0} onChange={field('price_store')} min={0} dir="ltr" />
            </div>
            <div>
              <Label className="text-sm mb-1.5 block">מחיר קמעונאי (₪)</Label>
              <Input type="number" value={form.price_retail ?? 0} onChange={field('price_retail')} min={0} dir="ltr" />
            </div>
            <div>
              <Label className="text-sm mb-1.5 block">MOQ מינימום הזמנה</Label>
              <Input type="number" value={form.moq ?? 1} onChange={field('moq')} min={1} dir="ltr" />
            </div>
            <div>
              <Label className="text-sm mb-1.5 block">יחידות בקרטון</Label>
              <Input type="number" value={form.carton_qty ?? 1} onChange={field('carton_qty')} min={1} dir="ltr" />
            </div>
            <div>
              <Label className="text-sm mb-1.5 block">כמות במלאי</Label>
              <Input type="number" value={form.stock_quantity ?? 0} onChange={field('stock_quantity')} min={0} dir="ltr" />
            </div>
          </div>

          {/* Profit preview */}
          {(form.price_store ?? 0) > 0 && (form.price_retail ?? 0) > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex justify-between items-center">
              <span className="text-sm text-green-700 font-medium">רווח ליחידה</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-green-700">
                  ₪{((form.price_retail ?? 0) - (form.price_store ?? 0)).toFixed(0)}
                </span>
                <span className="text-xs text-green-600">
                  ({(form.price_retail ?? 0) > 0
                    ? Math.round((((form.price_retail ?? 0) - (form.price_store ?? 0)) / (form.price_retail ?? 1)) * 100)
                    : 0}%)
                </span>
              </div>
            </div>
          )}

          {/* Flags */}
          <div>
            <Label className="text-sm mb-2 block">תגיות</Label>
            <div className="flex flex-wrap gap-4">
              {[
                { key: 'is_new', label: 'חדש' },
                { key: 'is_featured', label: 'מומלץ' },
                { key: 'is_top_seller', label: 'נמכר ביותר' },
                { key: 'is_seasonal', label: 'עונתי' },
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!form[key as keyof Product]}
                    onChange={field(key as keyof Product)}
                    className="accent-[#C9A84C]"
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            ביטול
          </button>
          <button
            onClick={() => onSave(form)}
            className="px-5 py-2 text-sm rounded-xl bg-[#C9A84C] hover:bg-[#b8943e] text-white font-semibold transition-colors"
          >
            {product ? 'שמור שינויים' : 'הוסף מוצר'}
          </button>
        </div>
      </div>
    </div>
  )
}
