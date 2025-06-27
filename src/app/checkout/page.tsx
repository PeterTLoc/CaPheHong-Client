"use client"

import React, { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronRight } from "lucide-react"

import { startCheckout } from "@/services/payment/checkoutService"
import { Shop } from "@/types/models/shop"
import { shops } from "@/data/shop"
import { RequireAuth } from "@/components/auth/RequireAuth"

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
    disabled: false,
  },
  {
    id: "zalopay",
    name: "ZaloPay",
    logo: "/images/payment-logo/zalopay-logo.png",
    disabled: false,
  },
]

const CheckoutPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const shopId = searchParams.get("shopId")

  const [shop, setShop] = useState<Shop | null>(null)

  useEffect(() => {
    if (!shopId) return
    const matchedShop = shops.find((s) => s.id === Number(shopId))
    setShop(matchedShop || null)
  }, [shopId])

  const handleCheckout = async (methodId: string, methodName: string) => {
    try {
      const checkoutUrl = await startCheckout(methodId as any, {
        orderId: `ORDER-${Date.now()}`,
        amount: 100000,
        description: `Demo payment via ${methodName}`,
      })
      window.location.href = checkoutUrl
    } catch (error) {
      console.error("Payment error:", error)
      alert("Something went wrong during payment.")
    }
  }

  return (
    <RequireAuth>
      <div className="px-5">
        <div className="max-w-[1000px] mx-auto space-y-6">
          {/* Breadcrumbs */}
          <div className="title text-[#5F5F5F]">
            <span
              onClick={() => router.push("/shops")}
              className="hover:cursor-pointer hover:text-black"
            >
              Shops
            </span>
            <span className="mx-4">›</span>
            <span
              onClick={() => router.push(`/shops/${shop?.id}`)}
              className="hover:cursor-pointer hover:text-black"
            >
              {shop?.name || "Unknown Shop"}
            </span>

            <span className="mx-4 text-black">›</span>
            <span className="text-black">Checkout</span>
          </div>

          <div>
            <h2 className="subtitle mb-3">Choose a payment method</h2>
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
                      : "cursor-pointer border-[#E5E5E5] hover:bg-[#F6F6F6]"
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

export default CheckoutPage
