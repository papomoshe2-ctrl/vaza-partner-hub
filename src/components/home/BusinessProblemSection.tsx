'use client'

import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
}

export function BusinessProblemSection() {
  return (
    <section style={{ background: 'var(--ink-0)', padding: '120px 0' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Asymmetric layout: narrow left label + wide right text */}
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-0 items-start">

          {/* Left — sticky label column */}
          <motion.div
            className="lg:col-span-3"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="editorial-label">האמת שאף אחד לא אומר</span>
            <div className="line-bronze mt-4" />
          </motion.div>

          {/* Right — editorial text block */}
          <motion.div
            className="lg:col-span-9 lg:pr-16"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            <h2 className="display-lg mb-10" style={{ lineHeight: 1 }}>
              לקוח שקונה זר ב-150₪<br />
              <span style={{ color: 'var(--bronze)' }}>היה יכול לקנות ב-420₪.</span><br />
              ההפרש הלך למישהו אחר.
            </h2>

            <div className="grid sm:grid-cols-2 gap-10 mt-12">
              {[
                {
                  num: '01',
                  title: 'הלקוח כבר כאן',
                  body: 'הוא עמד אצלך בחנות עם ארנק פתוח ומוכנות לקנות. שוקולד בלגי ליד הקופה לא מחייב שיחת מכירה.',
                },
                {
                  num: '02',
                  title: 'אפס מחסן נוסף',
                  body: 'אנחנו מנהלים את המלאי, הלוגיסטיקה, האריזות. אתה מקבל הכנסה נוספת בלי לנהל עוד ספק.',
                },
                {
                  num: '03',
                  title: 'רווח מיידי',
                  body: 'מרווח של 40–55% על כל מוצר. ללא ריסק, ללא MOQ מינימלי לחנויות קטנות, ללא חוזה.',
                },
                {
                  num: '04',
                  title: 'אפקט המתנה',
                  body: 'פרח + שוקולד = מתנה. מתנה שווה יותר, נקנית בלי תהייה על מחיר. זה לא שיווק — זו פסיכולוגיה.',
                },
              ].map((item) => (
                <div key={item.num}>
                  <div
                    style={{
                      fontSize: '0.6rem',
                      letterSpacing: '0.2em',
                      color: 'var(--bronze-dim)',
                      marginBottom: '0.75rem',
                    }}
                  >
                    {item.num}
                  </div>
                  <h3
                    style={{
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: 'var(--cream)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p className="editorial-body" style={{ fontSize: '0.88rem' }}>
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
