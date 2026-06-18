export type ProductCategory =
  | 'chocolates'
  | 'wines'
  | 'desserts'
  | 'cakes'
  | 'cookies'
  | 'crackers'
  | 'tea'
  | 'gift_sets'
  | 'accessories'
  | 'romantic'
  | 'newborn'
  | 'birthday'
  | 'holidays'
  | 'rosh_hashana'
  | 'pesach'
  | 'valentines'
  | 'tu_beav'
  | 'b2b'

export type BusinessType =
  | 'flower_shop'
  | 'gift_shop'
  | 'balloon_shop'
  | 'catering'
  | 'boutique'
  | 'online'
  | 'small_chain'
  | 'medium_chain'
  | 'wholesaler'

export type LeadStatus =
  | 'new'
  | 'in_progress'
  | 'proposal_sent'
  | 'closed'
  | 'not_relevant'

export interface Product {
  id: string
  name: string
  description_short: string
  description_full: string
  sku: string
  category: ProductCategory
  tags: string[]
  price_store: number
  price_retail: number
  profit_per_unit: number
  profit_percent: number
  moq: number
  stock_quantity: number
  carton_qty: number
  brand: string
  suitable_for: string[]
  images: string[]
  video_url?: string
  is_new: boolean
  is_featured: boolean
  is_top_seller: boolean
  is_seasonal: boolean
  season?: string
  created_at: string
  updated_at: string
}

export interface Lead {
  id: string
  business_name: string
  contact_name: string
  phone: string
  email: string
  city: string
  business_type: BusinessType
  works_with_vaza: boolean
  interested_products: string[]
  notes?: string
  status: LeadStatus
  created_at: string
  updated_at: string
}

export interface Package {
  id: string
  name: string
  description: string
  price: number
  products: { product_id: string; quantity: number }[]
  type: 'starter' | 'growth' | 'premium' | 'holiday' | 'corporate'
  is_seasonal: boolean
  season?: string
  created_at: string
}

export interface DashboardStats {
  total_leads: number
  new_leads: number
  proposals_sent: number
  closed_deals: number
  conversion_rate: number
  new_stores_this_month: number
}
