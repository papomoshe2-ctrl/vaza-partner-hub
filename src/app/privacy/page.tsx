import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'מדיניות פרטיות | VAZA Partner Hub',
}

export default function PrivacyPage() {
  const sections = [
    { title: 'מה אנחנו אוספים', body: 'אנו אוספים פרטי קשר (שם, טלפון, אימייל) שמסרת לנו מרצון בעת הרשמה או יצירת קשר. אנו אוספים גם נתוני גלישה טכניים (IP, דפדפן) לצרכי אבטחה ואנליטיקה.' },
    { title: 'כיצד אנחנו משתמשים במידע', body: 'המידע משמש אך ורק ליצירת קשר, אספקת שירותים, שיפור הפלטפורמה וניהול חשבונך. לא נמכור, נשכיר או נשתף את פרטיך עם גורמים שלישיים ללא הסכמתך המפורשת.' },
    { title: 'אבטחת מידע', body: 'אנו נוקטים באמצעי אבטחה תקניים (SSL, הצפנה, בקרת גישה) כדי להגן על המידע שלך. גישה למידע מוגבלת לעובדים המורשים בלבד.' },
    { title: 'עוגיות (Cookies)', body: 'האתר משתמש בעוגיות לצרכי ניתוח שימוש ושיפור חוויית הגלישה. ניתן לנטרל עוגיות דרך הגדרות הדפדפן, אך חלק מהפונקציות עלולות שלא לעבוד כראוי.' },
    { title: 'זכויות שלך', body: 'יש לך זכות לעיין, לתקן, למחוק או להגביל את עיבוד המידע שלך. לפנייה בנושא: info@vaza.co.il' },
    { title: 'שינויים במדיניות', body: 'אנו עשויים לעדכן מדיניות זו מעת לעת. שינויים מהותיים יפורסמו באתר. המשך השימוש לאחר פרסום השינויים מהווה הסכמה למדיניות המעודכנת.' },
  ]

  return (
    <div className="min-h-screen pt-20" style={{ background: 'var(--layer-0)' }}>
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-20">
        <div className="flex mb-6">
          <span className="section-label">מדיניות פרטיות</span>
        </div>
        <h1 className="font-black mb-4" style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: '#F5F0E8', letterSpacing: '-0.02em' }}>
          פרטיות ואבטחה
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
