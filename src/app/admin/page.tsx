import { Users, TrendingUp, ShoppingBag, CheckCircle, Package, ArrowUpRight } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { mockProducts } from '@/lib/mock-data'

const stats = [
  { label: 'לידים החודש', value: '38', change: '+12', icon: Users, color: 'bg-blue-50 text-blue-600' },
  { label: 'הצעות שנשלחו', value: '22', change: '+5', icon: ShoppingBag, color: 'bg-purple-50 text-purple-600' },
  { label: 'עסקאות שנסגרו', value: '9', change: '+3', icon: CheckCircle, color: 'bg-green-50 text-green-600' },
  { label: 'אחוז המרה', value: '41%', change: '+8%', icon: TrendingUp, color: 'bg-amber-50 text-amber-600' },
]

const recentLeads = [
  { name: 'פרחי שרון', city: 'תל אביב', type: 'חנות פרחים', status: 'חדש', date: 'היום' },
  { name: 'בוטיק אורה', city: 'חיפה', type: 'חנות מתנות', status: 'בטיפול', date: 'אתמול' },
  { name: 'יעל פלורל', city: 'ירושלים', type: 'חנות פרחים', status: 'הצעה נשלחה', date: 'לפני 2 ימים' },
  { name: 'מתנות דן', city: 'ראשל"צ', type: 'חנות מתנות', status: 'נסגר', date: 'לפני 3 ימים' },
  { name: 'פרחים ועוד', city: 'נתניה', type: 'חנות פרחים', status: 'חדש', date: 'לפני 4 ימים' },
]

const statusColors: Record<string, string> = {
  'חדש': 'bg-blue-100 text-blue-700',
  'בטיפול': 'bg-yellow-100 text-yellow-700',
  'הצעה נשלחה': 'bg-purple-100 text-purple-700',
  'נסגר': 'bg-green-100 text-green-700',
  'לא רלוונטי': 'bg-gray-100 text-gray-600',
}

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">דשבורד</h1>
        <p className="text-gray-500 text-sm mt-1">ברוך הבא למערכת הניהול של VAZA</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                <s.icon className="w-5 h-5" />
              </div>
              <span className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded-full">
                {s.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{s.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent leads */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">לידים אחרונים</h2>
            <a href="/admin/leads" className="text-xs text-[#C9A84C] flex items-center gap-1 hover:underline">
              כל הלידים <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
          <div className="divide-y divide-gray-50">
            {recentLeads.map((lead) => (
              <div key={lead.name} className="px-6 py-3.5 flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900 text-sm">{lead.name}</div>
                  <div className="text-xs text-gray-400">{lead.type} · {lead.city} · {lead.date}</div>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[lead.status]}`}>
                  {lead.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top products */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">מוצרים מובילים</h2>
            <a href="/admin/products" className="text-xs text-[#C9A84C] flex items-center gap-1 hover:underline">
              כל המוצרים <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
          <div className="divide-y divide-gray-50">
            {mockProducts.slice(0, 5).map((p) => (
              <div key={p.id} className="px-5 py-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                  <Package className="w-4 h-4 text-gray-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-gray-900 truncate">{p.name}</div>
                  <div className="text-xs text-gray-400">{formatPrice(p.price_store)}</div>
                </div>
                <span className="text-xs font-bold text-green-600">{p.profit_percent}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
