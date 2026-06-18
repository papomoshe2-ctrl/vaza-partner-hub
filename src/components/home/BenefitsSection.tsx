import { TrendingUp, Truck, Package, RefreshCw, DollarSign, Headphones } from 'lucide-react'

const benefits = [
  {
    icon: TrendingUp,
    title: 'רווח גבוה',
    desc: 'מרווח ממוצע של 35-55% על כל מוצר. מחשבון רווח מובנה בכל עמוד מוצר.',
  },
  {
    icon: Truck,
    title: 'אספקה מהירה',
    desc: 'משלוח תוך 24-48 שעות לכל הארץ. תמיד בזמן, תמיד מוכן למדף.',
  },
  {
    icon: Package,
    title: 'מוצרים מוכנים למדף',
    desc: 'אריזה יפה, תיוג מקצועי, מוכן לתצוגה ולמכירה מיידית.',
  },
  {
    icon: RefreshCw,
    title: 'קטלוג מתעדכן',
    desc: 'מוצרים חדשים כל עונה. תמיד עם ההצעות הטובות ביותר בשוק.',
  },
  {
    icon: DollarSign,
    title: 'מחירים לסיטונאים',
    desc: 'מחירי סיטונאי בלעדיים לחברי הרשת. ככל שקונים יותר, חוסכים יותר.',
  },
  {
    icon: Headphones,
    title: 'תמיכה מלאה',
    desc: 'מנהל לקוח אישי, ייעוץ בחירת מוצרים, תמיכה בוואטסאפ.',
  },
]

export function BenefitsSection() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-3">
            למה VAZA
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            היתרון שלנו
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            לא עוד ספק אחד ממיליון. VAZA היא פתרון מלא שמגדיל את הרווחיות שלך.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group p-6 rounded-2xl border border-gray-100 hover:border-[#C9A84C]/30 hover:shadow-lg hover:shadow-amber-50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center mb-4 group-hover:bg-[#C9A84C]/20 transition-colors">
                <Icon className="w-6 h-6 text-[#C9A84C]" />
              </div>
              <h3 className="text-gray-900 font-semibold text-lg mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
