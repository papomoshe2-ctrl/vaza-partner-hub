import Link from 'next/link'
import { Package, Phone, Mail, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#C9A84C] flex items-center justify-center">
                <Package className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-bold text-lg">VAZA Partner</span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              מערכת B2B פרימיום לחנויות פרחים, מתנות ואירוח בישראל.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              ניווט מהיר
            </h4>
            <ul className="space-y-2">
              {[
                { href: '/catalog', label: 'קטלוג מוצרים' },
                { href: '/package-builder', label: 'בנה חבילה' },
                { href: '/top-sellers', label: 'נמכרים ביותר' },
                { href: '/about', label: 'אודות' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-[#C9A84C] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              קטגוריות
            </h4>
            <ul className="space-y-2">
              {[
                'שוקולדים',
                'יינות',
                'מארזי מתנה',
                'קינוחים',
                'תה וחליטות',
              ].map((cat) => (
                <li key={cat}>
                  <Link
                    href="/catalog"
                    className="text-sm text-gray-400 hover:text-[#C9A84C] transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              יצירת קשר
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Phone className="w-4 h-4 text-[#C9A84C] shrink-0" />
                <span>050-000-0000</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="w-4 h-4 text-[#C9A84C] shrink-0" />
                <span>info@vaza.co.il</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-[#C9A84C] shrink-0" />
                <span>ישראל</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-500">
            © 2025 VAZA Partner Hub. כל הזכויות שמורות.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">
              פרטיות
            </Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">
              תנאי שימוש
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
