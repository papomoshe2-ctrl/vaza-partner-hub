'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const faqs = [
  {
    q: 'מהו המינימום הזמנה?',
    a: 'המינימום הזמנה משתנה לפי מוצר — החל מ-6 יחידות לבקבוקי יין ועד 12 יחידות לשוקולדים. ניתן לראות את ה-MOQ בעמוד כל מוצר.',
  },
  {
    q: 'כמה זמן לוקחת האספקה?',
    a: 'הזמנות שנשלחות לפני 12:00 מגיעות תוך 24-48 שעות. בחבילות Growth ו-Premium ניתן לקבל משלוח express תוך 24 שעות.',
  },
  {
    q: 'האם צריך לשלם מינימום חודשי?',
    a: 'לא! אין התחייבות חודשית. רוכשים כמו שצריכים, מתי שצריכים. החבילות הן רכישה חד-פעמית שנותנת הנחות.',
  },
  {
    q: 'איך מתבצע התשלום?',
    a: 'ניתן לשלם בהעברה בנקאית, כרטיס אשראי, או ביט. לחנויות גדולות ניתן לפתוח חשבון אשראי חודשי.',
  },
  {
    q: 'האם ניתן להחזיר מוצרים?',
    a: 'כן, מוצרים פגומים או לא תואמים להזמנה ניתן להחזיר תוך 48 שעות מהקבלה. נשלח מוצר חלופי ללא עלות.',
  },
  {
    q: 'אני חנות קטנה — האם זה מתאים לי?',
    a: 'בהחלט! חבילת ה-Starter עוצבה במיוחד לחנויות קטנות שרוצות להתחיל להרחיב. אין צורך בהשקעה גדולה.',
  },
]

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-3">
            שאלות נפוצות
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            יש לך שאלות?
          </h2>
        </div>

        <div className="divide-y divide-gray-100">
          {faqs.map((faq, i) => (
            <div key={i} className="py-5">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 text-right"
              >
                <span className="font-semibold text-gray-900 text-sm sm:text-base">
                  {faq.q}
                </span>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 text-[#C9A84C] shrink-0 transition-transform duration-200',
                    open === i && 'rotate-180'
                  )}
                />
              </button>
              {open === i && (
                <p className="mt-3 text-gray-500 text-sm leading-relaxed">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
