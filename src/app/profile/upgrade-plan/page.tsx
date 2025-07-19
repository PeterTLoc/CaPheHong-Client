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

  return (
    <RequireAuth>
      <div className="max-w-[1000px] mx-auto">
        <div className="title">Upgrade Plans</div>

        <div className="flex pb-5">
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

        {plans[planType].length === 1 ? (
          <motion.div
            key={planType}
            className="flex"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div
              key={0}
              onClick={() => {
                setSelectedPlan({
                  name: plans[planType][0].name,
                  price: plans[planType][0].price,
                  type: planType,
                })
                setShowCheckout(true)
              }}
              className="container cursor-pointer hover:shadow-md transition hover:-translate-y-1 w-full max-w-[350px]"
            >
              <div className="text-lg font-semibold text-[#1b1b1b]">
                {plans[planType][0].name}
              </div>
              <div className="text-[#6F4E37] font-semibold text-lg py-2">
                {plans[planType][0].price}
              </div>
              <div className="text-sm text-[#6e6e6e]">
                {Array.isArray(plans[planType][0].description) ? (
                  <div className="flex flex-col gap-2">
                    {plans[planType][0].description.map((item, idx) => (
                      <div key={idx} className="flex items-start">
                        <Check
                          className="inline-block mr-2 text-[#6F4E37] mt-1"
                          size={18}
                        />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span>
                    <Check className="inline-block mr-2 text-[#6F4E37]" />
                    {plans[planType][0].description}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={planType}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {plans[planType].map((plan, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedPlan({
                    name: plan.name,
                    price: plan.price,
                    type: planType,
                  })
                  setShowCheckout(true)
                }}
                className="container cursor-pointer hover:shadow-md transition hover:-translate-y-1 w-full max-w-[350px]"
              >
                <div className="text-lg font-semibold text-[#1b1b1b]">
                  {plan.name}
                </div>
                <div className="text-[#6F4E37] font-semibold text-lg py-2">
                  {plan.price}
                </div>
                <div className="text-sm text-[#6e6e6e]">
                  {Array.isArray(plan.description) ? (
                    <div className="flex flex-col gap-2">
                      {plan.description.map((item, idx) => (
                        <div key={idx} className="flex items-start">
                          <Check
                            className="inline-block mr-2 text-[#6F4E37] mt-1"
                            size={18}
                          />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span>
                      <Check className="inline-block mr-2 text-[#6F4E37]" />
                      {plan.description}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
      
      {showCheckout && selectedPlan && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#F3F3F3] rounded-[5px] p-5 w-full max-w-md shadow-lg relative">
            <button
              onClick={() => setShowCheckout(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
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
