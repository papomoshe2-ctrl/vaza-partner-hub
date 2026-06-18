import type { Metadata } from 'next'
import { ContactPageClient } from './ContactPageClient'

export const metadata: Metadata = {
  title: 'צור קשר | VAZA Partner Hub',
  description: 'צור קשר עם צוות VAZA — הצטרף לרשת, קבל הצעת מחיר, או שאל כל שאלה',
}

export default function ContactPage() {
  return <ContactPageClient />
}
