import { api } from "@/lib/api"
import { ShopPayload } from "@/types/models/shop"

export const createShop = async (token: string, data: ShopPayload) => {
  const formData = new FormData()
  formData.append("name", data.name)
  formData.append("description", data.description)
  formData.append("location", data.location)
  if (data.image) formData.append("image", data.image)

  const res = await api.post("/api/shops/", formData, {
    headers: {
      Authorization: `JWT ${token}`,
      "Content-Type": "multipart/form-data",
    },
  })

  return res.data
}
