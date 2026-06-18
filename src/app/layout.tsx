import type { Metadata } from 'next'
import { Heebo } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  variable: '--font-heebo',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'VAZA Partner Hub — מערכת B2B לחנויות פרחים ומתנות',
  description:
    'הפוך כל חנות פרחים לחנות מתנות רווחית יותר. גישה למאות מוצרים נבחרים שיכולים להגדיל את המכירות והרווחיות שלך.',
  keywords: 'VAZA, פרחים, מתנות, B2B, מארזים, שוקולד, יין, חנות פרחים',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-heebo)]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}
