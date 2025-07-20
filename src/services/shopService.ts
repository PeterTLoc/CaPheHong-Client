import { api } from "@/lib/api"
import { Shop, ShopPayload, ShopUpdatePayload } from "@/types/shop"
import { parseAxiosError } from "@/utils/apiErrors"

export const fetchShops = async (): Promise<Shop[]> => {
  try {
    const { data } = await api.get("/api/dashboard/shop");
    // Always return the results array if present, otherwise an empty array
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.results)) return data.results;
    return [];
  } catch (error) {
    const parsed = parseAxiosError(error);
    throw new Error(parsed.message);
  }
}

export const fetchShopById = async (id: number): Promise<Shop> => {
  try {
    const { data } = await api.get(`/api/dashboard/shop/${id}/`)
    return data
  } catch (error) {
    const parsed = parseAxiosError(error)
    throw new Error(parsed.message)
  }
}

export const createShop = async (payload: ShopPayload): Promise<Shop> => {
  try {
    const formData = new FormData()
    formData.append("title", payload.title)
    formData.append("body", payload.body)
    formData.append("slug", payload.slug)
    formData.append("banner", payload.banner)

    const { data: shop } = await api.post("/api/dashboard/shop/", formData)

    await api.post(`/api/dashboard/shop/${shop.id}/add_map/`, {
      name: payload.map.name,
      address: payload.map.address,
      latitude: payload.map.latitude,
      longitude: payload.map.longitude,
    })

    const { data: fullShop } = await api.get(`/api/dashboard/shop/${shop.id}/`)
    return fullShop
  } catch (error) {
    const parsed = parseAxiosError(error)
    throw new Error(parsed.message)
  }
}

export const updateShop = async (
  id: number,
  payload: ShopUpdatePayload
): Promise<Shop> => {
  try {
    console.log("Received update payload:", payload) // 🔍

    const formData = new FormData()

    if (payload.title !== undefined) formData.append("title", payload.title)
    if (payload.body !== undefined) formData.append("body", payload.body)
    if (payload.banner instanceof File) {
      formData.append("banner", payload.banner, payload.banner.name)
    }

    for (const [key, value] of formData.entries()) {
      console.log("FormData entry:", key, value)
    }

    const { data } = await api.patch(`/api/dashboard/shop/${id}/`, formData)
    return data
  } catch (error) {
    const parsed = parseAxiosError(error)
    throw new Error(parsed.message)
  }
}

export const deleteShop = async (id: number): Promise<void> => {
  try {
    await api.delete(`/api/dashboard/shop/${id}/`)
  } catch (error) {
    const parsed = parseAxiosError(error)
    throw new Error(parsed.message)
  }
}
