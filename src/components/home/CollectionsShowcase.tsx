'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'

const COLLECTIONS = [
  {
    id: 'chocolates',
    name: 'שוקולדים',
    subtitle: 'בלגי, ריכוז גבוה, אריזות מתנה',
    description: 'מרווח ממוצע 48%',
    image: 'https://images.unsplash.com/photo-1481391243133-f96216dcb5d2?auto=format&fit=crop&w=800&q=80',
    size: 'large',
  },
  {
    id: 'wines',
    name: 'יינות',
    subtitle: 'בוטיק ישראלי, מוכן לאריזה',
    description: 'מרווח ממוצע 46%',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
    size: 'small',
  },
  {
    id: 'gift_sets',
    name: 'מארזי מתנה',
    subtitle: 'קופסאות מוכנות, אריזה יוקרתית',
    description: 'מרווח ממוצע 47%',
    image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=800&q=80',
    size: 'small',
  },
  {
    id: 'valentines',
    name: 'שמפניה ואירועים',
    subtitle: 'לחגים, יום נישואים, הולדת',
    description: 'מרווח ממוצע 45%',
    image: 'https://images.unsplash.com/photo-1596803244608-4234b6a2ebb5?auto=format&fit=crop&w=800&q=80',
    size: 'medium',
  },
  {
    id: 'tea',
    name: 'תה ומשקאות',
    subtitle: 'פרימיום, טבעוני, ארומות',
    description: 'מרווח ממוצע 52%',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80',
    size: 'medium',
  },
]

export function CollectionsShowcase() {
  return (
    <section style={{ background: 'var(--ink-0)', padding: '120px 0' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <motion.span
              className="editorial-label"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              הקטלוג שלנו
            </motion.span>
            <motion.h2
              className="display-md mt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              קולקציות שנבנו<br />
              <span style={{ color: 'var(--bronze)' }}>לחנויות פרחים</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/catalog" className="btn-secondary" style={{ display: 'none' }}>
              כל הקטלוג
            </Link>
          </motion.div>
        </div>

        {/* Magazine grid — asymmetric */}
        <div className="grid grid-cols-12 grid-rows-2 gap-3" style={{ minHeight: '600px' }}>

          {/* Large — col 1-5, rows 1-2 */}
          <motion.div
            className="col-span-12 lg:col-span-5 row-span-2 relative overflow-hidden group"
            style={{ minHeight: '400px' }}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src={COLLECTIONS[0].image}
              alt={COLLECTIONS[0].name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.9) 0%, rgba(5,5,5,0.3) 50%, transparent 100%)' }}
            />
            <CollectionLabel collection={COLLECTIONS[0]} />
          </motion.div>

          {/* Small — col 6-8, row 1 */}
          <motion.div
            className="col-span-6 lg:col-span-4 relative overflow-hidden group"
            style={{ minHeight: '280px' }}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <Image
              src={COLLECTIONS[1].image}
              alt={COLLECTIONS[1].name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.85) 0%, transparent 60%)' }}
            />
            <CollectionLabel collection={COLLECTIONS[1]} />
          </motion.div>

          {/* Small — col 9-12, row 1 */}
          <motion.div
            className="col-span-6 lg:col-span-3 relative overflow-hidden group"
            style={{ minHeight: '280px' }}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <Image
              src={COLLECTIONS[2].image}
              alt={COLLECTIONS[2].name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.85) 0%, transparent 60%)' }}
            />
            <CollectionLabel collection={COLLECTIONS[2]} />
          </motion.div>

          {/* Medium — col 6-9, row 2 */}
          <motion.div
            className="col-span-6 lg:col-span-4 relative overflow-hidden group"
            style={{ minHeight: '280px' }}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Image
              src={COLLECTIONS[3].image}
              alt={COLLECTIONS[3].name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.85) 0%, transparent 60%)' }}
            />
            <CollectionLabel collection={COLLECTIONS[3]} />
          </motion.div>

          {/* Medium — col 10-12, row 2 */}
          <motion.div
            className="col-span-6 lg:col-span-3 relative overflow-hidden group"
            style={{ minHeight: '280px' }}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <Image
              src={COLLECTIONS[4].image}
              alt={COLLECTIONS[4].name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.85) 0%, transparent 60%)' }}
            />
            <CollectionLabel collection={COLLECTIONS[4]} />
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link href="/catalog" className="btn-primary">
            צפה בקטלוג המלא
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

function CollectionLabel({ collection }: { collection: typeof COLLECTIONS[0] }) {
  return (
    <div className="absolute bottom-0 right-0 left-0 p-6">
      <div style={{ fontSize: '0.6rem', letterSpacing: '0.18em', color: 'var(--bronze)', marginBottom: '0.4rem' }}>
        {collection.description.toUpperCase()}
      </div>
      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--cream)', lineHeight: 1.2, marginBottom: '0.25rem' }}>
        {collection.name}
      </h3>
      <p style={{ fontSize: '0.75rem', color: 'var(--cream-muted)' }}>{collection.subtitle}</p>
    </div>
  )
}
