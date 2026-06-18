'use client'

import Link from 'next/link'
import { ArrowLeft, TrendingUp, Star, Zap } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gray-950 flex items-center overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Gold gradient orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#C9A84C]/10 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-full px-4 py-1.5 mb-8">
            <Star className="w-3.5 h-3.5 text-[#C9A84C] fill-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs font-medium tracking-wide">
              מערכת B2B פרימיום לחנויות פרחים ומתנות
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            הפוך כל חנות פרחים
            <br />
            <span className="text-[#C9A84C]">לחנות מתנות רווחית יותר</span>
          </h1>

          <p className="text-lg text-gray-400 leading-relaxed mb-10 max-w-xl">
            גישה למאות מוצרים נבחרים — שוקולדים, יינות, מארזים, קינוחים ועוד —
            שיכולים להגדיל את סל הקנייה מ-150 ₪ ל-450 ₪.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mb-10">
            {[
              { icon: TrendingUp, value: '200%+', label: 'גידול ממוצע בסל' },
              { icon: Zap, value: '48 שעות', label: 'אספקה מהירה' },
              { icon: Star, value: '500+', label: 'מוצרים בקטלוג' },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C9A84C]/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#C9A84C]" />
                </div>
                <div>
                  <div className="text-white font-bold text-lg leading-none">{value}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3">
            <Link
              href="/catalog"
              className={buttonVariants({ size: 'lg', className: 'bg-[#C9A84C] hover:bg-[#b8943e] text-white font-semibold px-8 h-12' })}
            >
              <ArrowLeft className="w-4 h-4 ml-2" />
              צפייה בקטלוג
            </Link>
            <Link
              href="/package-builder"
              className={buttonVariants({ size: 'lg', variant: 'outline', className: 'border-white/20 text-white hover:bg-white/10 bg-transparent h-12 px-8' })}
            >
              בניית חבילת מוצרים
            </Link>
            <Link
              href="/contact"
              className={buttonVariants({ size: 'lg', variant: 'ghost', className: 'text-gray-400 hover:text-white hover:bg-white/5 h-12 px-8' })}
            >
              יצירת קשר
            </Link>
          </div>
        </div>
      </div>

      {/* Floating product cards */}
      <div className="hidden xl:flex absolute left-16 top-1/2 -translate-y-1/2 flex-col gap-4">
        {[
          { name: 'שוקולד בלגי פרימיום', price: '₪28', profit: '45%' },
          { name: 'יין אדום בוטיק', price: '₪65', profit: '38%' },
          { name: 'מארז מתנה יוקרה', price: '₪120', profit: '52%' },
        ].map((card) => (
          <div
            key={card.name}
            className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-4 w-52"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-white text-xs font-medium leading-snug">{card.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#C9A84C] text-sm font-bold">{card.price}</span>
              <span className="text-green-400 text-xs bg-green-400/10 px-2 py-0.5 rounded-full">
                רווח {card.profit}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
