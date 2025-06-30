import CheckoutClient from "@/components/checkout/CheckoutClient"
import { Suspense } from "react"

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading checkout...</div>}>
      <CheckoutClient />
    </Suspense>
  )
}
