import type { Metadata } from 'next'
import { AboutClient } from './AboutClient'

export const metadata: Metadata = {
  title: 'אודות | VAZA Partner Hub',
  description: 'הסיפור מאחורי VAZA — הפלטפורמה שמחברת חנויות פרחים ומתנות עם מוצרי פרימיום',
}

export default function AboutPage() {
  return <AboutClient />
}
