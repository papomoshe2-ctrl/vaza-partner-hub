'use client'

import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/catalog/ProductCard'
import { mockProducts } from '@/lib/mock-data'
import { CATEGORY_LABELS } from '@/lib/utils'

const categories = [
  'all',
  'chocolates',
  'wines',
  'gift_sets',
  'desserts',
  'tea',
  'cookies',
  'valentines',
  'rosh_hashana',
]

const filters = [
  { key: 'featured', label: 'מומלץ' },
  { key: 'top_seller', label: 'נמכר ביותר' },
  { key: 'new', label: 'חדש' },
]

export function CatalogClient() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const toggleFilter = (key: string) => {
    setActiveFilters((prev) =>
      prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]
    )
  }

  const products = useMemo(() => {
    return mockProducts.filter((p) => {
      if (category !== 'all' && p.category !== category) return false
      if (search && !p.name.includes(search) && !p.sku.includes(search)) return false
      if (activeFilters.includes('featured') && !p.is_featured) return false
      if (activeFilters.includes('top_seller') && !p.is_top_seller) return false
      if (activeFilters.includes('new') && !p.is_new) return false
      return true
    })
  }, [search, category, activeFilters])

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-gray-950 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">קטלוג מוצרים</h1>
          <p className="text-gray-400">מאות מוצרים נבחרים לחנות שלך</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search + Filters */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-8 shadow-sm">
          {/* Search */}
          <div className="relative mb-5">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              placeholder="חיפוש לפי שם, מק״ט..."
              className="pr-10"
            />
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                  category === cat
                    ? 'bg-[#C9A84C] text-white border-[#C9A84C]'
                    : 'border-gray-200 text-gray-600 hover:border-[#C9A84C]/50'
                }`}
              >
                {cat === 'all' ? 'הכל' : CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>

          {/* Quick filters */}
          <div className="flex flex-wrap items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-gray-400" />
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => toggleFilter(f.key)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                  activeFilters.includes(f.key)
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'border-gray-200 text-gray-600 hover:border-gray-400'
                }`}
              >
                {f.label}
                {activeFilters.includes(f.key) && <X className="w-3 h-3" />}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-6">
          {products.length} מוצרים
        </p>

        {/* Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400">לא נמצאו מוצרים</p>
            <Button
              variant="ghost"
              className="mt-4 text-[#C9A84C]"
              onClick={() => {
                setSearch('')
                setCategory('all')
                setActiveFilters([])
              }}
            >
              נקה פילטרים
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
