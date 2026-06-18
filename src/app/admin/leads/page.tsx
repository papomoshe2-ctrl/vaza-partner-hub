'use client'

import { useState } from 'react'
import { Plus, Search, Pencil, Trash2, Phone, Mail } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { LEAD_STATUS_LABELS, BUSINESS_TYPE_LABELS } from '@/lib/utils'
import type { Lead, LeadStatus } from '@/types'
import { toast } from 'sonner'
import { LeadFormModal } from '@/components/admin/LeadFormModal'

const mockLeads: Lead[] = [
  { id: '1', business_name: 'פרחי שרון', contact_name: 'שרון לוי', phone: '052-1234567', email: 'sharon@flowers.co.il', city: 'תל אביב', business_type: 'flower_shop', works_with_vaza: false, interested_products: ['1', '2'], status: 'new', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: '2', business_name: 'בוטיק אורה', contact_name: 'אורה כהן', phone: '054-7654321', email: 'ora@boutique.co.il', city: 'חיפה', business_type: 'gift_shop', works_with_vaza: true, interested_products: ['3'], status: 'in_progress', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: '3', business_name: 'יעל פלורל', contact_name: 'יעל מזרחי', phone: '050-9876543', email: 'yael@floral.co.il', city: 'ירושלים', business_type: 'flower_shop', works_with_vaza: false, interested_products: ['1', '3'], status: 'proposal_sent', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: '4', business_name: 'מתנות דן', contact_name: 'דן אברהם', phone: '053-5551234', email: 'dan@gifts.co.il', city: 'ראשל"צ', business_type: 'gift_shop', works_with_vaza: true, interested_products: ['2', '4'], status: 'closed', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: '5', business_name: 'פרחים ועוד', contact_name: 'רנה סמואל', phone: '058-3334567', email: 'rena@flowers.co.il', city: 'נתניה', business_type: 'flower_shop', works_with_vaza: false, interested_products: ['1'], status: 'new', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
]

const statusColors: Record<LeadStatus, string> = {
  new: 'bg-blue-100 text-blue-700',
  in_progress: 'bg-yellow-100 text-yellow-700',
  proposal_sent: 'bg-purple-100 text-purple-700',
  closed: 'bg-green-100 text-green-700',
  not_relevant: 'bg-gray-100 text-gray-600',
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [editLead, setEditLead] = useState<Lead | null>(null)
  const [showForm, setShowForm] = useState(false)

  const filtered = leads.filter((l) => {
    const matchSearch = l.business_name.includes(search) || l.contact_name.includes(search) || l.phone.includes(search)
    const matchStatus = statusFilter === 'all' || l.status === statusFilter
    return matchSearch && matchStatus
  })

  function deleteLead(id: string) {
    if (!confirm('למחוק ליד זה?')) return
    setLeads((prev) => prev.filter((l) => l.id !== id))
    toast.success('הליד נמחק')
  }

  function updateStatus(id: string, status: LeadStatus) {
    setLeads((prev) => prev.map((l) => l.id === id ? { ...l, status } : l))
    toast.success('הסטטוס עודכן')
  }

  function saveLead(data: Partial<Lead>) {
    if (editLead) {
      setLeads((prev) => prev.map((l) => l.id === editLead.id ? { ...l, ...data } : l))
      toast.success('הליד עודכן')
    } else {
      setLeads((prev) => [{
        id: String(Date.now()),
        business_name: '', contact_name: '', phone: '', email: '',
        city: '', business_type: 'flower_shop', works_with_vaza: false,
        interested_products: [], status: 'new',
        created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
        ...data,
      }, ...prev])
      toast.success('ליד חדש נוסף')
    }
    setShowForm(false)
    setEditLead(null)
  }

  const counts: Record<string, number> = { all: leads.length }
  leads.forEach((l) => { counts[l.status] = (counts[l.status] ?? 0) + 1 })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">לידים & CRM</h1>
          <p className="text-sm text-gray-500 mt-0.5">{leads.length} לידים במערכת</p>
        </div>
        <button
          onClick={() => { setEditLead(null); setShowForm(true) }}
          className="flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b8943e] text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" />
          ליד חדש
        </button>
      </div>

      {/* Status filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        {[
          { key: 'all', label: 'הכל' },
          ...Object.entries(LEAD_STATUS_LABELS).map(([k, v]) => ({ key: k, label: v })),
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setStatusFilter(key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              statusFilter === key
                ? 'bg-gray-900 text-white border-gray-900'
                : 'border-gray-200 text-gray-600 hover:border-gray-400 bg-white'
            }`}
          >
            {label}
            {counts[key] !== undefined && (
              <span className="mr-1.5 bg-white/20 px-1.5 py-0.5 rounded-full text-[10px]">
                {counts[key]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          placeholder="חיפוש לפי שם, טלפון..."
          className="pr-10 bg-white"
        />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((lead) => (
          <div key={lead.id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">{lead.business_name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {BUSINESS_TYPE_LABELS[lead.business_type]} · {lead.city}
                </p>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium shrink-0 ${statusColors[lead.status]}`}>
                {LEAD_STATUS_LABELS[lead.status]}
              </span>
            </div>

            <div className="space-y-1.5 mb-4">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className="font-medium text-gray-900">{lead.contact_name}</span>
              </div>
              <a href={`tel:${lead.phone}`} className="flex items-center gap-2 text-xs text-gray-500 hover:text-[#C9A84C]">
                <Phone className="w-3.5 h-3.5" />{lead.phone}
              </a>
              {lead.email && (
                <a href={`mailto:${lead.email}`} className="flex items-center gap-2 text-xs text-gray-500 hover:text-[#C9A84C]">
                  <Mail className="w-3.5 h-3.5" />{lead.email}
                </a>
              )}
            </div>

            <div className="flex items-center justify-between">
              <select
                value={lead.status}
                onChange={(e) => updateStatus(lead.id, e.target.value as LeadStatus)}
                className="text-xs border border-gray-200 rounded-lg px-2 py-1 text-gray-600 outline-none focus:border-[#C9A84C]"
              >
                {Object.entries(LEAD_STATUS_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
              <div className="flex gap-1">
                <button
                  onClick={() => { setEditLead(lead); setShowForm(true) }}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => deleteLead(lead.id)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <LeadFormModal
          lead={editLead}
          onSave={saveLead}
          onClose={() => { setShowForm(false); setEditLead(null) }}
        />
      )}
    </div>
  )
}
