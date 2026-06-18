import Link from 'next/link'
import { Check } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'

const packages = [
  {
    id: 'starter',
    name: 'Starter',
    price: 1500,
    description: 'אידאלי לחנויות שמתחילות להרחיב את הקטלוג',
    products: 15,
    highlighted: false,
    features: [
      'עד 15 סוגי מוצרים',
      'שוקולדים ומארזים בסיסיים',
      'משלוח חינם',
      'תמיכה בוואטסאפ',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 3500,
    description: 'לחנויות שרוצות לגדול ולהרחיב את המבחר',
    products: 35,
    highlighted: true,
    features: [
      'עד 35 סוגי מוצרים',
      'שוקולדים, יינות ומארזים',
      'משלוח חינם + עדיפות',
      'מנהל לקוח אישי',
      'הנחה 5% על הזמנות עתידיות',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 5000,
    description: 'לחנויות גדולות ורשתות שמחפשות מקסימום רווח',
    products: 60,
    highlighted: false,
    features: [
      'עד 60 סוגי מוצרים',
      'קטלוג מלא + מוצרים בלעדיים',
      'משלוח חינם express',
      'מנהל לקוח VIP',
      'הנחה 10% על הזמנות עתידיות',
      'גישה למוצרים לפני השוק',
    ],
  },
]

export function PackagesSection() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-3">
            חבילות מוכנות
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            התחל עם חבילה מוכנה
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            בחר את החבילה המתאימה לגודל ולסוג החנות שלך. כולן כוללות מוצרים מוכנים למדף.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-2xl p-8 border ${
                pkg.highlighted
                  ? 'bg-gray-950 border-[#C9A84C] shadow-xl shadow-amber-900/10 scale-105'
                  : 'bg-white border-gray-200'
              }`}
            >
              {pkg.highlighted && (
                <div className="inline-block bg-[#C9A84C] text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  הפופולרי ביותר
                </div>
              )}
              <h3
                className={`text-xl font-bold mb-1 ${pkg.highlighted ? 'text-white' : 'text-gray-900'}`}
              >
                {pkg.name}
              </h3>
              <p className={`text-sm mb-6 ${pkg.highlighted ? 'text-gray-400' : 'text-gray-500'}`}>
                {pkg.description}
              </p>
              <div className="mb-6">
                <span
                  className={`text-4xl font-bold ${pkg.highlighted ? 'text-[#C9A84C]' : 'text-gray-900'}`}
                >
                  {formatPrice(pkg.price)}
                </span>
                <span className={`text-sm mr-1 ${pkg.highlighted ? 'text-gray-500' : 'text-gray-400'}`}>
                  לחבילה
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check
                      className={`w-4 h-4 mt-0.5 shrink-0 ${pkg.highlighted ? 'text-[#C9A84C]' : 'text-green-500'}`}
                    />
                    <span className={`text-sm ${pkg.highlighted ? 'text-gray-300' : 'text-gray-600'}`}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={buttonVariants({ className: `w-full justify-center ${
                  pkg.highlighted
                    ? 'bg-[#C9A84C] hover:bg-[#b8943e] text-white'
                    : 'bg-gray-900 hover:bg-gray-800 text-white'
                }` })}
              >
                הזמן עכשיו
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/package-builder"
            className="text-sm text-[#C9A84C] font-medium hover:underline"
          >
            או בנה חבילה מותאמת אישית ←
          </Link>
        </div>
      </div>
    </section>
  )
}
