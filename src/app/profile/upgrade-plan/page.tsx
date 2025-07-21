"use client"

import { RequireAuth } from "@/components/auth/RequireAuth"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { plans } from "@/data/plans"
import { Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import CheckoutClient from "@/components/checkout/CheckoutClient"
import { useAuth } from "@/context/AuthContext"

export default function UpgradePlans() {
  const [planType, setPlanType] = useState<"Personal" | "Business">("Personal")
  const [showCheckout, setShowCheckout] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string
    price: string
    type: string
  } | null>(null)
  const { user } = useAuth()
  const router = useRouter()

  // Dynamically set current plan based on user premium status
  const userIsPremium = user?.is_premium;
  const plansWithCurrent = plans[planType].map(plan => {
    const isPremiumPlan = plan.name.toLowerCase().includes("premium");
    const isBasicPlan = plan.name.toLowerCase().includes("basic");
    return {
      ...plan,
      current: userIsPremium ? (isPremiumPlan || isBasicPlan) : isBasicPlan,
    };
  });

  return (
    <RequireAuth>
      <div className="max-w-[1000px] mx-auto">
        <div className="title">Upgrade Plans</div>
        <div className="flex pb-[13px]">
          <div className="bg-[#EEEEEE] border border-[#E5E5E5] gap-1 rounded-[5px] inline-flex shadow-inner">
            {["Personal", "Business"].map((type) => (
              <button
                key={type}
                onClick={() => setPlanType(type as "Personal" | "Business")}
                className={`min-w-[130px] min-h-[32px] pt-[5px] pb-[3px] text-[13px] font-medium rounded-[5px] transition-all duration-200 ${
                  planType === type
                    ? "bg-[#6F4E37] text-white shadow"
                    : "text-[#4a4a4a] hover:bg-[#d9d9d9] hover:cursor-pointer"
                }`}
              >
                {type === "Personal" ? "Cá nhân" : "Doanh nghiệp"}
              </button>
            ))}
          </div>
        </div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {plansWithCurrent.map((plan, index) => (
            <div
              key={index}
              className={`container w-full max-w-[350px] relative  ${plan.current ? "" : "border border-[#ECECEC]"}`}
            >
              <div className={`text-lg font-semibold ${plan.current ? "text-[#8B8B8B]" : "text-[#1b1b1b]"}`}>
                {plan.name}
              </div>
              <div className={`font-semibold text-lg ${plan.current ? "text-[#8B8B8B]" : "text-[#6F4E37]"}`}>
                {plan.price}
              </div>
              <div className="flex justify-center mt-3 mb-4">
                {plan.current ? (
                  <button
                    disabled
                    className="subtext min-h-[32px] pt-[5px] pb-[3px] w-full rounded-[5px] text-[13px] bg-[#FEFEFE] border border-[#E5E5E5]"
                  >
                    Your current plan
                  </button>
                ) : (
                  <button
                    className="w-full min-h-[32px] px-3 pt-[5px] pb-[3px] rounded-[5px] text-[13px] text-white bg-[#6F4E37] hover:opacity-75 py-2 hover:cursor-pointer"
                    onClick={() => {
                      setSelectedPlan({
                        name: plan.name,
                        price: plan.price,
                        type: planType,
                      })
                      setShowCheckout(true)
                    }}
                  >
                    Upgrade
                  </button>
                )}
              </div>
              <div className="text-sm text-[#6e6e6e]">
                {Array.isArray(plan.description) && plan.description.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {plan.description.map((item, idx) => (
                      <div key={idx} className="flex">
                        <Check
                          className="inline-block mr-2 text-[#6F4E37] w-[18px] h-[18px] flex-shrink-0"
                          size={18}
                        />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span>
                    <Check className="inline-block mr-2 text-[#6F4E37]" />
                    Không có tính năng nào
                  </span>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      {showCheckout && selectedPlan && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#F3F3F3] rounded-[5px] p-5 w-full max-w-md shadow-lg relative">
            <button
              onClick={() => setShowCheckout(false)}
              className="hover:cursor-pointer rounded-[5px] absolute top-3 right-3 text-gray-500 hover:text-gray-700 hover:bg-gray-200 px-2 py-1"
            >
              ✕
            </button>
            <CheckoutClient
              plan={selectedPlan.name}
              price={selectedPlan.price}
              user={user}
              closeModal={() => setShowCheckout(false)}
              type={selectedPlan.type}
            />
          </div>
        </div>
      )}
    </RequireAuth>
  )
}
