"use client"

import { RequireAuth } from "@/components/auth/RequireAuth"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { plans } from "@/data/plans"

export default function UpgradePlans() {
  const [planType, setPlanType] = useState<"Personal" | "Business">("Personal")
  const router = useRouter()

  return (
    <RequireAuth>
      <div className="px-5">
        <div className="max-w-[1000px] mx-auto">
          <div className="title text-center">Upgrade Plans</div>

          <div className="flex justify-center pb-5">
            <div className="bg-[#e6e6e6] gap-1 rounded-[5px] p-[3px] inline-flex shadow-inner">
              {["Personal", "Business"].map((type) => (
                <button
                  key={type}
                  onClick={() => setPlanType(type as "Personal" | "Business")}
                  className={`min-w-[130px] min-h-[32px] pt-[5px] pb-[3px] text-sm font-medium rounded-[5px] transition-all duration-200 ${
                    planType === type
                      ? "bg-[#6F4E37] text-white shadow"
                      : "text-[#4a4a4a] hover:bg-[#d9d9d9]"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-1">
            {plans[planType].map((plan, index) => (
              <div
                key={index}
                onClick={() =>
                  router.push(
                    `/checkout?plan=${encodeURIComponent(
                      plan.name
                    )}&price=${encodeURIComponent(plan.price)}`
                  )
                }
                className="container cursor-pointer hover:shadow-md transition hover:-translate-y-1"
              >
                <div className="text-lg font-semibold text-[#1b1b1b]">
                  {plan.name}
                </div>
                <div className="text-[#6F4E37] font-semibold text-lg py-2">
                  {plan.price}
                </div>
                <div className="text-sm text-[#6e6e6e]">
                  {plan.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </RequireAuth>
  )
}
