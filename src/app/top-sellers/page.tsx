import type { Metadata } from 'next'
import { TopSellersClient } from './TopSellersClient'

export const metadata: Metadata = {
  title: 'נמכרים ביותר | VAZA Partner Hub',
  description: 'המוצרים הכי נמכרים ברשת VAZA — שוקולד, יין, מארזים ועוד',
}

export default function TopSellersPage() {
  return <TopSellersClient />
}
