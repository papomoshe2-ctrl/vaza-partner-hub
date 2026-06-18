import type { Metadata } from 'next'
import { Heebo } from 'next/font/google'
import dynamic from 'next/dynamic'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const LenisProvider = dynamic(() => import('@/components/layout/LenisProvider').then(m => ({ default: m.LenisProvider })), { ssr: false })
const FloatingCTA = dynamic(() => import('@/components/layout/FloatingCTA').then(m => ({ default: m.FloatingCTA })), { ssr: false })

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  variable: '--font-heebo',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'VAZA Partner Hub — מערכת B2B לחנויות פרחים ומתנות',
  description: 'הפוך כל חנות פרחים לחנות מתנות רווחית יותר. גישה למאות מוצרים פרימיום שמגדילים את הרווחיות שלך.',
  keywords: 'VAZA, פרחים, מתנות, B2B, מארזים, שוקולד, יין',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} h-full`}>
      <body className="min-h-full flex flex-col" style={{ fontFamily: 'var(--font-heebo), system-ui, sans-serif' }}>
        <LenisProvider>
          <Navbar />
          <main className="flex-1 relative z-10">{children}</main>
          <Footer />
          <FloatingCTA />
          <Toaster position="top-center" theme="dark" />
        </LenisProvider>
      </body>
    </html>
  )
}
