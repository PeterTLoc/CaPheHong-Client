import { api } from "@/lib/api"
import { PayOSRequest, PayOSResponse } from "@/types/payment/payos"

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

  return res.data
}
