export interface ShopPayload {
  name: string
  description: string
  location: string
  image?: File | null
}

export interface Shop {
  id: number
  name: string
  address: string
  image: string
  description: string
  recentVisits: number
}
