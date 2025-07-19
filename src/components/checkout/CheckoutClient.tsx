"use client"

import React from "react"
import { ChevronRight } from "lucide-react"
import { startCheckout } from "@/services/checkoutService"
import { RequireAuth } from "@/components/auth/RequireAuth"
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

const CheckoutClient = ({
  plan,
  price,
  user,
  closeModal,
  type,
}: {
  plan: string
  price: string
  user: any
  closeModal: () => void
  type: string
}) => {
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
      <div className="max-w-[400px] mx-auto">
        {/* Modal Title */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold">Checkout</h2>
        </div>

        {/* Plan Details Card */}
        <div>
          <h3 className="subtitle-top">Plan Details</h3>
          <div className="container flex flex-col gap-2 text-sm">
            <div className="flex justify-between ">
              <span className="font-medium">Email</span>
              <span>{user?.email}</span>
            </div>
            <div className="flex justify-between ">
              <span className="font-medium">Plan</span>
              <span>{plan}</span>
            </div>
            <div className="flex justify-between ">
              <span className="font-medium">Price</span>
              <span>{price}</span>
            </div>
            <div className="flex justify-between ">
              <span className="font-medium">Type</span>
              <span>{type}</span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div>
          <h3 className="subtitle">Payment Method</h3>
          <div className="flex flex-col gap-2">
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

        <div className="flex justify-end mt-4">
          <button
            onClick={closeModal}
            className="button text-[#6F4E37] border border-[#6F4E37] bg-white hover:bg-[#f3f3f3]"
          >
            Cancel
          </button>
        </div>
      </div>
    </RequireAuth>
  )
}

export default CheckoutClient
