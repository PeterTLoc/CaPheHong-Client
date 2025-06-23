export interface PayOSRequest {
  orderId: string
  amount: number
  description: string
}

export interface PayOSResponse {
  checkout_url: string
  order_code: number
}
