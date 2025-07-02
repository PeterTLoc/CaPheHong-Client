export interface Shop {
  id: number
  title: string
  body: string
  date: string
  banner: string
  owner: string
  map: {
    id: number
    name: string
    address: string
    latitude: number
    longitude: number
  } | null
  tags: { id: number; name: string }[]
  comments: any[]
}

export interface ShopPayload {
  title: string
  body: string
  slug: string
  banner: File
  map: {
    name: string
    address: string
    latitude: number
    longitude: number
  }
}

export interface ShopUpdatePayload {
  title?: string
  body?: string
  slug?: string
  banner?: File | string
}
