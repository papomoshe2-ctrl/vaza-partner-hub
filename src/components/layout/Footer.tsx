'use client'

import Link from 'next/link'

export function Footer() {
  return (
    <footer style={{ background: 'var(--ink-1)', borderTop: '1px solid var(--border-subtle)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 2rem 40px' }}>

        {/* Top row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '64px' }}
          className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', marginBottom: '1.25rem' }}>
              <div style={{ width: '28px', height: '28px', background: 'var(--bronze)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.8rem', color: '#050505' }}>
                V
              </div>
              <span style={{ fontWeight: 900, fontSize: '0.85rem', letterSpacing: '0.18em', color: 'var(--cream)', textTransform: 'uppercase' }}>
                VAZA
              </span>
            </Link>
            <p style={{ fontSize: '0.78rem', color: 'var(--cream-muted)', lineHeight: 1.8, maxWidth: '22ch' }}>
              מוצרי פרימיום לחנויות פרחים ומתנות בישראל.
            </p>
          </div>

          {/* Nav */}
          <div>
            <div className="editorial-label" style={{ marginBottom: '1.25rem' }}>ניווט</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { href: '/catalog', label: 'קטלוג מוצרים' },
                { href: '/package-builder', label: 'בנה חבילה' },
                { href: '/top-sellers', label: 'Top Sellers' },
                { href: '/about', label: 'אודות' },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    style={{ fontSize: '0.8rem', color: 'var(--cream-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--bronze)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--cream-muted)' }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <div className="editorial-label" style={{ marginBottom: '1.25rem' }}>קטגוריות</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['שוקולדים', 'יינות', 'מארזי מתנה', 'תה פרימיום', 'שמפניה'].map((cat) => (
                <li key={cat}>
                  <Link
                    href="/catalog"
                    style={{ fontSize: '0.8rem', color: 'var(--cream-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--bronze)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--cream-muted)' }}
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="editorial-label" style={{ marginBottom: '1.25rem' }}>קשר</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a
                href="https://wa.me/972501234567"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.8rem', color: 'var(--cream-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#25D366' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--cream-muted)' }}
              >
                WhatsApp
              </a>
              <a
                href="mailto:info@vaza.co.il"
                style={{ fontSize: '0.8rem', color: 'var(--cream-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--bronze)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--cream-muted)' }}
              >
                info@vaza.co.il
              </a>
              <Link
                href="/contact"
                style={{ fontSize: '0.8rem', color: 'var(--cream-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--bronze)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--cream-muted)' }}
              >
                צור קשר
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '2rem', borderTop: '1px solid var(--border-subtle)', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontSize: '0.68rem', color: 'var(--cream-ghost)', letterSpacing: '0.06em' }}>
            © 2025 VAZA. כל הזכויות שמורות.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {[{ href: '/privacy', label: 'פרטיות' }, { href: '/terms', label: 'תנאי שימוש' }].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{ fontSize: '0.68rem', color: 'var(--cream-ghost)', textDecoration: 'none', transition: 'color 0.2s', letterSpacing: '0.06em' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--bronze-dim)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--cream-ghost)' }}
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
