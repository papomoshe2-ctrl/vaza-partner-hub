const stories = [
  {
    name: 'פרחי שרון',
    city: 'תל אביב',
    type: 'חנות פרחים',
    before: '₪150',
    after: '₪390',
    growth: '+160%',
    quote: 'מאז שהתחלנו לעבוד עם VAZA, כל לקוח שקונה זר גם לוקח שוקולד ויין. הסל שלנו גדל פי 2.5.',
    avatar: 'ש',
  },
  {
    name: 'בוטיק אורה',
    city: 'חיפה',
    type: 'חנות מתנות',
    before: '₪200',
    after: '₪480',
    growth: '+140%',
    quote: 'הקטלוג של VAZA נותן לנו מוצרים שאי אפשר למצוא בשום מקום אחר. הלקוחות חוזרים שוב ושוב.',
    avatar: 'א',
  },
  {
    name: 'יעל פלורל',
    city: 'ירושלים',
    type: 'חנות פרחים',
    before: '₪130',
    after: '₪350',
    growth: '+170%',
    quote: 'לפני VAZA מכרנו רק פרחים. היום אנחנו חנות מתנות מלאה. הרווח השנתי גדל ב-70%.',
    avatar: 'י',
  },
]

export function SuccessStoriesSection() {
  return (
    <section className="bg-[#FAF8F5] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-3">
            סיפורי הצלחה
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            חנויות שגדלו עם VAZA
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((s) => (
            <div
              key={s.name}
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
            >
              {/* Before / After */}
              <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                <div className="text-center flex-1">
                  <div className="text-xs text-gray-400 mb-1">לפני</div>
                  <div className="text-lg font-bold text-gray-500 line-through">{s.before}</div>
                  <div className="text-xs text-gray-400">סל ממוצע</div>
                </div>
                <div className="text-2xl text-[#C9A84C]">→</div>
                <div className="text-center flex-1">
                  <div className="text-xs text-gray-400 mb-1">אחרי</div>
                  <div className="text-2xl font-bold text-gray-900">{s.after}</div>
                  <div className="text-xs text-green-600 font-semibold">{s.growth}</div>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="text-gray-600 text-sm leading-relaxed mb-6 italic">
                &quot;{s.quote}&quot;
              </blockquote>

              {/* Person */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C9A84C] flex items-center justify-center text-white font-bold text-sm">
                  {s.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{s.name}</div>
                  <div className="text-xs text-gray-400">
                    {s.type} · {s.city}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
