'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const categories = [
  { slug: 'chocolates', label: 'שוקולד', emoji: '🍫', count: 48, desc: 'בלגי, שוויצרי, ארטיזן' },
  { slug: 'wines', label: 'יינות', emoji: '🍷', count: 36, desc: 'בוטיק, יקבים מובחרים' },
  { slug: 'gift-sets', label: 'מארזי מתנה', emoji: '🎁', count: 62, desc: 'מוכן למדף, ממותג' },
  { slug: 'teas', label: 'תה פרמיום', emoji: '🫖', count: 29, desc: 'אנגלי, ירוק, פרחוני' },
  { slug: 'spirits', label: "ספיריטס", emoji: '🥃', count: 21, desc: "וויסקי, קוניאק, ג'ין" },
  { slug: 'champagne', label: 'שמפניה', emoji: '🍾', count: 18, desc: 'מוסה, קאבה, פרוסקו' },
  { slug: 'cosmetics', label: 'קוסמטיקה', emoji: '💄', count: 34, desc: 'ספא, שמנים, סבונים' },
  { slug: 'nuts', label: 'אגוזים ונשנושים', emoji: '🥜', count: 27, desc: 'ממותק, מלוח, אורגני' },
]

export function CategoriesSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' })
  }

  return (
    <section className="relative py-24 lg:py-36 overflow-hidden" style={{ background: 'var(--layer-0)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="flex items-end justify-between mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="flex mb-4">
              <span className="section-label">הקטגוריות שלנו</span>
            </div>
            <h2
              className="font-black"
              style={{ fontSize: 'clamp(28px, 4.5vw, 52px)', color: '#F5F0E8', lineHeight: 1.05, letterSpacing: '-0.02em' }}
            >
              קטלוג של<br />
              <span className="gold-text">500+ מוצרים</span>
            </h2>
          </div>
          <div className="hidden md:flex gap-3">
            <button
              onClick={() => scroll('right')}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.15)', color: '#D4AF37' }}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('left')}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.15)', color: '#D4AF37' }}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4"
          style={{ scrollbarWidth: 'none' }}
        >
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              style={{ flexShrink: 0 }}
            >
              <Link href={`/catalog?category=${cat.slug}`}>
                <div
                  className="group relative w-52 h-56 rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-end p-5"
                  style={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
                    border: '1px solid rgba(212,175,55,0.1)',
                    backdropFilter: 'blur(12px)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.border = '1px solid rgba(212,175,55,0.3)'
                    el.style.transform = 'translateY(-4px)'
                    el.style.boxShadow = '0 20px 60px rgba(212,175,55,0.1)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.border = '1px solid rgba(212,175,55,0.1)'
                    el.style.transform = 'translateY(0)'
                    el.style.boxShadow = 'none'
                  }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{ background: 'radial-gradient(ellipse at center top, rgba(212,175,55,0.06), transparent 70%)' }} />

                  <div className="absolute top-5 left-5 text-4xl transition-transform duration-300 group-hover:scale-110">
                    {cat.emoji}
                  </div>

                  <div className="absolute top-5 right-5 text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)', color: '#D4AF37' }}>
                    {cat.count}
                  </div>

                  <div className="relative z-10">
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: '#F5F0E8', marginBottom: '4px' }}>
                      {cat.label}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'rgba(245,240,232,0.4)' }}>
                      {cat.desc}
                    </div>
                  </div>

                  <div className="absolute bottom-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
