'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Package, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

const navLinks = [
  { href: '/catalog', label: 'קטלוג מוצרים' },
  { href: '/package-builder', label: 'בנה חבילה' },
  { href: '/top-sellers', label: 'נמכרים ביותר' },
  { href: '/about', label: 'אודות' },
  { href: '/contact', label: 'צור קשר' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#C9A84C] flex items-center justify-center">
              <Package className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">
              VAZA <span className="text-[#C9A84C]">Partner</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-[#C9A84C] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://wa.me/972500000000"
              className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-[#C9A84C] transition-colors"
            >
              <Phone className="w-4 h-4" />
              וואטסאפ
            </a>
            <Link
              href="/catalog"
              className={buttonVariants({ className: 'bg-[#C9A84C] hover:bg-[#b8943e] text-white text-sm' })}
            >
              צפייה בקטלוג
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="תפריט"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-[#C9A84C] hover:bg-amber-50 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                href="/catalog"
                className={buttonVariants({ className: 'w-full bg-[#C9A84C] hover:bg-[#b8943e] text-white justify-center' })}
              >
                צפייה בקטלוג
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
