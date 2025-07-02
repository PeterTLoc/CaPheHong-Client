"use client"

import React, { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { startCheckout } from "@/services/checkoutService"
import { RequireAuth } from "@/components/auth/RequireAuth"
import { useAuth } from "@/context/AuthContext"
import { parseAxiosError } from "@/utils/apiErrors"

const paymentMethods = [
  {
    id: "payos",
    name: "PayOS",
    logo: "/images/payment-logo/payos-logo.svg",
    disabled: false,
  },
  {
    id: "momo",
    name: "Momo",
    logo: "/images/payment-logo/momo-logo.png",
    disabled: true,
  },
  {
    id: "zalopay",
    name: "ZaloPay",
    logo: "/images/payment-logo/zalopay-logo.png",
    disabled: true,
  },
]

const getAmountFromPrice = (priceString: string | null): number => {
  if (!priceString) return 0
  const match = priceString.replace(/[^\d]/g, "")
  return match ? parseInt(match, 10) : 0
}

const CheckoutClient = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const plan = searchParams.get("plan")
  const price = searchParams.get("price")

  useEffect(() => {
    if (!plan || !price || price.toLowerCase().includes("contact")) {
      alert("This plan requires contacting support.")
      router.push("/upgrade-plan")
    }
  }, [plan, price, router])

  const handleCheckout = async (methodId: string, methodName: string) => {
    try {
      const amount = getAmountFromPrice(price)
      const orderId = `ORDER-${Date.now()}`

      const checkoutUrl = await startCheckout(methodId as any, {
        orderId,
        amount,
        description: `${plan}`.slice(0, 25),
      })

      window.location.href = checkoutUrl
    } catch (error) {
      const parsed = parseAxiosError(error)
      console.error("Checkout failed:", parsed.message)
      throw new Error(parsed.message)
    }
  }

  return (
    <RequireAuth>
      <div className="px-5">
        <div className="max-w-[1000px] mx-auto space-y-6">
          {/* Breadcrumbs */}
          <div className="title text-[#5F5F5F] text-sm">
            <span
              onClick={() => router.push("/upgrade-plan")}
              className="hover:cursor-pointer hover:text-black"
            >
              Upgrade Plans
            </span>
            <span className="mx-2">›</span>
            <span className="text-black">Checkout</span>
          </div>

          {/* Plan Summary */}
          <div>
            <h2 className="subtitle-top">Plan Summary</h2>
            <div className="container">
              <div className="flex gap-6 text-[13px]">
                <div>
                  <div>Email</div>
                  <div>Plan name</div>
                  <div>Price</div>
                </div>

                <div className="subtext">
                  <div>{user?.email}</div>
                  <div>{plan}</div>
                  <div>{price}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <h2 className="subtitle">Choose a payment method</h2>
            <div className="flex flex-col gap-[3px]">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  onClick={() =>
                    !method.disabled && handleCheckout(method.id, method.name)
                  }
                  className={`bg-[#FBFBFB] border p-5 rounded-[5px] h-[69px] flex items-center justify-between transition
                    ${
                      method.disabled
                        ? "opacity-50 cursor-not-allowed bg-gray-100 border-gray-200"
                        : "cursor-pointer border-[#E5E5E5] hover:-translate-y-[2px] hover:shadow-sm"
                    }`}
                >
                  <div className="flex items-center gap-5">
                    <img
                      src={method.logo}
                      alt={`${method.name} logo`}
                      className="w-6 h-6 object-contain"
                    />

                    <div className="flex flex-col">
                      <span className="text-[13px] font-medium">
                        {method.name}
                      </span>
                      <span className="text-xs text-[#8B8B8B]">
                        Pay with {method.name}
                      </span>
                    </div>
                  </div>

                  <ChevronRight strokeWidth={1} size={20} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </RequireAuth>
  )
}

export default CheckoutClient
