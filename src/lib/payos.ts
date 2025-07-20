import { api } from "@/lib/api"
import { PayOSRequest, PayOSResponse } from "@/types/payos"

export async function createCheckoutSession({
  orderId,
  amount,
  description,
}: PayOSRequest): Promise<PayOSResponse> {
  const res = await api.post<PayOSResponse>("/payment/create/", {
    order_id: orderId,
    amount,
    description,
  })

  console.log(res)
  return res.data
}
