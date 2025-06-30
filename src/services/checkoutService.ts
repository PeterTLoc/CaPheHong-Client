import { createCheckoutSession as payos } from "./payos"

export async function startCheckout(
  method: "payos" /* | "momo" */,
  params: {
    orderId: string
    amount: number
    description: string
  }
): Promise<string> {
  switch (method) {
    case "payos":
      return (await payos(params)).checkout_url
    // case "momo":
    //   return (await momo(params)).checkout_url
    default:
      throw new Error(`Unsupported payment method: ${method}`)
  }
}
