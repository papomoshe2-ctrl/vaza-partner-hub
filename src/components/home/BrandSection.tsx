'use client'

import { motion } from 'framer-motion'


const brands = [
  'LINDT', 'GODIVA', 'MIONETTO', 'FERRERO', 'GHIRARDELLI',
  'MOËT', 'DEWAR\'S', 'TWG TEA', 'ANTHON BERG', 'NEUHAUS',
]

export function BrandSection() {
  const doubled = [...brands, ...brands]

  return (
    <section className="relative py-20" style={{ background: 'var(--layer-2)' }}>
      <div className="gold-line absolute top-0 inset-x-0" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-10">
        <motion.p
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'rgba(245,240,232,0.25)' }}
        >
          מותגים שנמצאים בקטלוג שלנו
        </motion.p>
      </div>

      {/* Infinite marquee */}
      <div className="overflow-hidden">
        <div className="marquee-track flex gap-16 items-center">
          {doubled.map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              className="flex-shrink-0 font-black"
              style={{
                fontSize: '1.1rem',
                letterSpacing: '0.25em',
                color: 'rgba(245,240,232,0.12)',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(212,175,55,0.5)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(245,240,232,0.12)' }}
            >
              {brand}
            </span>
          ))}
        </div>
      </div>

      <div className="gold-line absolute bottom-0 inset-x-0" />
    </section>
  )
}
