import type { Metadata } from 'next'
import { Heebo } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ClientProviders } from '@/components/layout/ClientProviders'

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
        <ClientProviders>
          <Navbar />
          <main className="flex-1 relative z-10">{children}</main>
          <Footer />
          <Toaster position="top-center" theme="dark" />
        </ClientProviders>
      </body>
    </html>
  )
}
