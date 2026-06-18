import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const categories = [
  { label: 'שוקולדים', emoji: '🍫', count: 48, href: '/catalog?category=chocolates' },
  { label: 'יינות', emoji: '🍷', count: 32, href: '/catalog?category=wines' },
  { label: 'מארזי מתנה', emoji: '🎁', count: 64, href: '/catalog?category=gift_sets' },
  { label: 'קינוחים', emoji: '🧁', count: 28, href: '/catalog?category=desserts' },
  { label: 'תה וחליטות', emoji: '🍵', count: 20, href: '/catalog?category=tea' },
  { label: 'עוגות', emoji: '🎂', count: 18, href: '/catalog?category=cakes' },
  { label: 'ולנטיין', emoji: '❤️', count: 36, href: '/catalog?category=valentines' },
  { label: 'ראש השנה', emoji: '🍯', count: 42, href: '/catalog?category=rosh_hashana' },
]

export function CategoriesSection() {
  return (
    <section className="bg-[#FAF8F5] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-3">
              קטגוריות
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              גלה את הקטלוג
            </h2>
          </div>
          <Link
            href="/catalog"
            className="hidden sm:flex items-center gap-1 text-sm text-[#C9A84C] font-medium hover:underline"
          >
            כל המוצרים
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#C9A84C]/40 hover:shadow-md transition-all duration-300 text-center"
            >
              <div className="text-4xl mb-3">{cat.emoji}</div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">{cat.label}</h3>
              <p className="text-gray-400 text-xs">{cat.count} מוצרים</p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8 sm:hidden">
          <Link
            href="/catalog"
            className="text-sm text-[#C9A84C] font-medium hover:underline"
          >
            כל המוצרים ←
          </Link>
        </div>
      </div>
    </section>
  )
}
