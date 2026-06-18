import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('he-IL', {
    style: 'currency',
    currency: 'ILS',
    minimumFractionDigits: 0,
  }).format(price)
}

export function formatPercent(value: number): string {
  return `${value.toFixed(0)}%`
}

export const CATEGORY_LABELS: Record<string, string> = {
  chocolates: 'שוקולדים',
  wines: 'יינות',
  desserts: 'קינוחים',
  cakes: 'עוגות',
  cookies: 'עוגיות',
  crackers: 'קרקרים',
  tea: 'תה וחליטות',
  gift_sets: 'מארזי מתנה',
  accessories: 'אביזרי מתנה',
  romantic: 'מוצרים רומנטיים',
  newborn: 'יולדת',
  birthday: 'ימי הולדת',
  holidays: 'חגים',
  rosh_hashana: 'ראש השנה',
  pesach: 'פסח',
  valentines: 'ולנטיין',
  tu_beav: 'ט"ו באב',
  b2b: 'B2B',
}

export const SUITABLE_FOR_LABELS: Record<string, string> = {
  flowers: 'פרחים',
  gift_sets: 'מארזים',
  newborn: 'יולדת',
  catering: 'אירוח',
  employees: 'עובדים',
  corporate: 'לקוחות עסקיים',
}

export const LEAD_STATUS_LABELS: Record<string, string> = {
  new: 'חדש',
  in_progress: 'בטיפול',
  proposal_sent: 'הצעה נשלחה',
  closed: 'נסגר',
  not_relevant: 'לא רלוונטי',
}

export const BUSINESS_TYPE_LABELS: Record<string, string> = {
  flower_shop: 'חנות פרחים',
  gift_shop: 'חנות מתנות',
  balloon_shop: 'חנות בלונים',
  catering: 'אירוח',
  boutique: 'בוטיק',
  online: 'אונליין',
  small_chain: 'רשת קטנה',
  medium_chain: 'רשת בינונית',
  wholesaler: 'סיטונאי',
}
