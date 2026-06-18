'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Lead } from '@/types'
import { BUSINESS_TYPE_LABELS, LEAD_STATUS_LABELS } from '@/lib/utils'

interface Props {
  lead: Lead | null
  onSave: (data: Partial<Lead>) => void
  onClose: () => void
}

export function LeadFormModal({ lead, onSave, onClose }: Props) {
  const [form, setForm] = useState<Partial<Lead>>(
    lead ?? {
      business_name: '', contact_name: '', phone: '', email: '',
      city: '', business_type: 'flower_shop', works_with_vaza: false,
      interested_products: [], status: 'new',
    }
  )

  function field(key: keyof Lead) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const val = e.target.type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : e.target.value
      setForm((prev) => ({ ...prev, [key]: val }))
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white">
          <h2 className="font-bold text-gray-900">{lead ? 'עריכת ליד' : 'ליד חדש'}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label className="text-sm mb-1.5 block">שם העסק *</Label>
              <Input value={form.business_name ?? ''} onChange={field('business_name')} placeholder="פרחי שרון" />
            </div>
            <div>
              <Label className="text-sm mb-1.5 block">איש קשר *</Label>
              <Input value={form.contact_name ?? ''} onChange={field('contact_name')} placeholder="שם מלא" />
            </div>
            <div>
              <Label className="text-sm mb-1.5 block">עיר</Label>
              <Input value={form.city ?? ''} onChange={field('city')} placeholder="תל אביב" />
            </div>
            <div>
              <Label className="text-sm mb-1.5 block">טלפון *</Label>
              <Input value={form.phone ?? ''} onChange={field('phone')} placeholder="050-0000000" dir="ltr" />
            </div>
            <div>
              <Label className="text-sm mb-1.5 block">אימייל</Label>
              <Input type="email" value={form.email ?? ''} onChange={field('email')} placeholder="email@..." dir="ltr" />
            </div>
            <div>
              <Label className="text-sm mb-1.5 block">סוג עסק</Label>
              <select
                value={form.business_type ?? 'flower_shop'}
                onChange={field('business_type')}
                className="w-full h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring"
              >
                {Object.entries(BUSINESS_TYPE_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>
            <div>
              <Label className="text-sm mb-1.5 block">סטטוס</Label>
              <select
                value={form.status ?? 'new'}
                onChange={field('status')}
                className="w-full h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring"
              >
                {Object.entries(LEAD_STATUS_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={!!form.works_with_vaza}
              onChange={field('works_with_vaza')}
              className="accent-[#C9A84C]"
            />
            עובד כבר עם VAZA
          </label>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex gap-3 justify-end">
          <button onClick={onClose} className="px-5 py-2 text-sm rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
            ביטול
          </button>
          <button
            onClick={() => onSave(form)}
            className="px-5 py-2 text-sm rounded-xl bg-[#C9A84C] hover:bg-[#b8943e] text-white font-semibold transition-colors"
          >
            {lead ? 'שמור' : 'הוסף ליד'}
          </button>
        </div>
      </div>
    </div>
  )
}
