export interface Shop {
  id: number
  title: string
  body: string
  slug: string
  banner: string 
  date: string
  owner: string
}

export interface ShopPayload {
  title: string
  body: string
  slug: string
  banner: File
}

export interface ShopUpdatePayload {
  title?: string
  body?: string
  slug?: string
  banner?: File | string
}
