import { createClient } from '@/lib/supabase/client'
import type { Product } from '@/types'

export async function getProducts(filters?: {
  category?: string
  search?: string
  is_featured?: boolean
  is_top_seller?: boolean
  is_new?: boolean
}) {
  const supabase = createClient()
  let query = supabase.from('products').select('*').order('created_at', { ascending: false })

  if (filters?.category) query = query.eq('category', filters.category)
  if (filters?.is_featured) query = query.eq('is_featured', true)
  if (filters?.is_top_seller) query = query.eq('is_top_seller', true)
  if (filters?.is_new) query = query.eq('is_new', true)
  if (filters?.search) query = query.ilike('name', `%${filters.search}%`)

  const { data, error } = await query
  if (error) throw error
  return data as Product[]
}

export async function getProduct(id: string) {
  const supabase = createClient()
  const { data, error } = await supabase.from('products').select('*').eq('id', id).single()
  if (error) throw error
  return data as Product
}

export async function createProduct(product: Partial<Product>) {
  const supabase = createClient()
  const { data, error } = await supabase.from('products').insert([product]).select().single()
  if (error) throw error
  return data as Product
}

export async function updateProduct(id: string, updates: Partial<Product>) {
  const supabase = createClient()
  const { data, error } = await supabase.from('products').update(updates).eq('id', id).select().single()
  if (error) throw error
  return data as Product
}

export async function deleteProduct(id: string) {
  const supabase = createClient()
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) throw error
}
