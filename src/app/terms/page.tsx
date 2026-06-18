import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'תנאי שימוש | VAZA Partner Hub',
}

export default function TermsPage() {
  const sections = [
    { title: 'קבלת התנאים', body: 'השימוש בפלטפורמת VAZA Partner Hub מהווה הסכמה מלאה לתנאים אלו. אם אינך מסכים לתנאים, אינך רשאי להשתמש בפלטפורמה.' },
    { title: 'הרשמה ואחריות החשבון', body: 'עליך לספק פרטים מדויקים בעת ההרשמה ולעדכנם בכל שינוי. אתה אחראי לשמירת פרטי הגישה לחשבונך ולכל פעילות שתבוצע בחשבונך.' },
    { title: 'שימוש מותר', body: 'הפלטפורמה מיועדת לשימוש עסקי לגיטימי בלבד. אין להשתמש בה לצרכים בלתי חוקיים, להפיץ תוכן פוגעני, לנסות לפרוץ את המערכת או לאסוף מידע בדרכים אוטומטיות ללא אישור.' },
    { title: 'מחירים והזמנות', body: 'מחירי המוצרים עשויים להשתנות ללא הודעה מוקדמת. הזמנה תאושר רק לאחר אישור בכתב מצד VAZA. החברה שומרת לעצמה את הזכות לסרב להזמנה בהתאם לשיקול דעתה.' },
    { title: 'קניין רוחני', body: 'כל התכנים, הלוגואים, העיצובים ומאגרי הנתונים באתר הם רכושה של VAZA ומוגנים בזכויות יוצרים. אין להעתיק, לשכפל או להפיץ תכנים ללא אישור מפורש בכתב.' },
    { title: 'הגבלת אחריות', body: 'VAZA לא תישא באחריות לנזקים עקיפים, מקריים או תוצאתיים הנובעים משימוש בפלטפורמה. האחריות הכוללת של החברה מוגבלת לסכום ששולם בפועל עבור השירות בשלושת החודשים האחרונים.' },
    { title: 'שינויים בתנאים', body: 'VAZA רשאית לעדכן תנאים אלו בכל עת. המשך השימוש בפלטפורמה לאחר פרסום שינויים מהווה הסכמה לתנאים המעודכנים.' },
  ]

  return (
    <div className="min-h-screen pt-20" style={{ background: 'var(--layer-0)' }}>
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-20">
        <div className="flex mb-6">
          <span className="section-label">תנאי שימוש</span>
        </div>
        <h1 className="font-black mb-4" style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: '#F5F0E8', letterSpacing: '-0.02em' }}>
          תנאי השימוש
        </h1>
        <p style={{ color: 'rgba(245,240,232,0.4)', marginBottom: '3rem', lineHeight: 1.8 }}>
          עדכון אחרון: ינואר 2025
        </p>

        <div className="space-y-8">
          {sections.map((s, i) => (
            <div key={i} className="luxury-card p-7">
              <h2 className="font-bold mb-3" style={{ color: '#F5F0E8', fontSize: '1rem' }}>
                <span style={{ color: '#D4AF37', marginLeft: '0.5rem' }}>{i + 1}.</span>
                {s.title}
              </h2>
              <p style={{ color: 'rgba(245,240,232,0.55)', lineHeight: 1.8, fontSize: '0.875rem' }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
