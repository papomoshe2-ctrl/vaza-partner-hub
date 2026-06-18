'use client'

import Link from 'next/link'
import { Phone, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative" style={{ background: 'var(--layer-2)', borderTop: '1px solid rgba(212,175,55,0.08)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div
                className="w-8 h-8 rounded flex items-center justify-center font-black text-sm"
                style={{ background: 'linear-gradient(135deg, #B8963E, #D4AF37, #F4D06F)', color: '#050505' }}
              >
                V
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-black text-base tracking-widest uppercase" style={{ color: '#F5F0E8', letterSpacing: '0.15em' }}>
                  VAZA
                </span>
                <span className="text-[9px] font-medium tracking-[0.3em] uppercase" style={{ color: 'rgba(212,175,55,0.6)' }}>
                  Partner Hub
                </span>
              </div>
            </Link>
            <p style={{ fontSize: '0.8rem', color: 'rgba(245,240,232,0.35)', lineHeight: 1.8 }}>
              מערכת B2B פרימיום לחנויות פרחים, מתנות ואירוח בישראל.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(245,240,232,0.3)', marginBottom: '1.25rem' }}>
              ניווט
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/catalog', label: 'קטלוג מוצרים' },
                { href: '/package-builder', label: 'בנה חבילה' },
                { href: '/about', label: 'אודות' },
                { href: '/contact', label: 'צור קשר' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{ fontSize: '0.82rem', color: 'rgba(245,240,232,0.4)', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#D4AF37' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(245,240,232,0.4)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(245,240,232,0.3)', marginBottom: '1.25rem' }}>
              קטגוריות
            </h4>
            <ul className="space-y-3">
              {['שוקולדים', 'יינות', 'מארזי מתנה', 'תה פרמיום', 'שמפניה'].map((cat) => (
                <li key={cat}>
                  <Link
                    href="/catalog"
                    style={{ fontSize: '0.82rem', color: 'rgba(245,240,232,0.4)', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#D4AF37' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(245,240,232,0.4)' }}
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(245,240,232,0.3)', marginBottom: '1.25rem' }}>
              יצירת קשר
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'rgba(212,175,55,0.5)' }} />
                <span style={{ fontSize: '0.82rem', color: 'rgba(245,240,232,0.4)' }}>050-000-0000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'rgba(212,175,55,0.5)' }} />
                <span style={{ fontSize: '0.82rem', color: 'rgba(245,240,232,0.4)' }}>info@vaza.co.il</span>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3"
          style={{ borderTop: '1px solid rgba(212,175,55,0.06)' }}
        >
          <p style={{ fontSize: '0.7rem', color: 'rgba(245,240,232,0.2)' }}>
            © 2025 VAZA Partner Hub. כל הזכויות שמורות.
          </p>
          <div className="flex items-center gap-5">
            {[{ href: '/privacy', label: 'פרטיות' }, { href: '/terms', label: 'תנאי שימוש' }].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{ fontSize: '0.7rem', color: 'rgba(245,240,232,0.2)', transition: 'color 0.2s' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(212,175,55,0.5)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(245,240,232,0.2)' }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
