import { createClient } from '@/lib/supabase/client'
import type { Lead, LeadStatus } from '@/types'

export async function getLeads(filters?: { status?: LeadStatus; search?: string }) {
  const supabase = createClient()
  let query = supabase.from('leads').select('*').order('created_at', { ascending: false })
  if (filters?.status) query = query.eq('status', filters.status)
  if (filters?.search) {
    query = query.or(
      `business_name.ilike.%${filters.search}%,contact_name.ilike.%${filters.search}%,phone.ilike.%${filters.search}%`
    )
  }
  const { data, error } = await query
  if (error) throw error
  return data as Lead[]
}

export async function createLead(lead: Partial<Lead>) {
  const supabase = createClient()
  const { data, error } = await supabase.from('leads').insert([lead]).select().single()
  if (error) throw error
  return data as Lead
}

export async function updateLead(id: string, updates: Partial<Lead>) {
  const supabase = createClient()
  const { data, error } = await supabase.from('leads').update(updates).eq('id', id).select().single()
  if (error) throw error
  return data as Lead
}

export async function deleteLead(id: string) {
  const supabase = createClient()
  const { error } = await supabase.from('leads').delete().eq('id', id)
  if (error) throw error
}

export async function submitContactForm(data: {
  business_name: string
  contact_name: string
  phone: string
  email?: string
  city?: string
}) {
  const supabase = createClient()
  const { error } = await supabase.from('contact_submissions').insert([data])
  if (error) throw error
}
