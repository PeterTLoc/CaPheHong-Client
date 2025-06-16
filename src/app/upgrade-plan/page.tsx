"use client"

import { useState } from "react"

export default function UpgradePlans() {
  const [planType, setPlanType] = useState<"Personal" | "Business">("Personal")

  const plans = {
    Personal: [
      {
        name: "Barista Basic",
        description:
          "Track sales and manage your single-location shop with ease.",
        price: "$9/mo",
      },
      {
        name: "Latte Pro",
        description: "Add employee logins and access inventory reports.",
        price: "$19/mo",
      },
      {
        name: "Espresso Elite",
        description: "Advanced analytics, loyalty programs, and mobile access.",
        price: "$29/mo",
      },
    ],
    Business: [
      {
        name: "Cafe Team",
        description: "Manage multiple shop branches and sync team schedules.",
        price: "$49/mo",
      },
      {
        name: "Roastery Growth",
        description: "Full CRM, supplier tracking, and staff permissions.",
        price: "$99/mo",
      },
      {
        name: "Franchise Cloud",
        description: "Custom enterprise tools for chains and franchises.",
        price: "Contact us",
      },
    ],
  }

  return (
    <div
      className="flex justify-center h-screen"
      style={{
        height: "calc(100vh - 84px)",
      }}
    >
      <div className="max-w-[1000px]">
        <div className="title text-center">Upgrade Plans</div>

        {/* Fluent-style toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-[#e6e6e6] rounded-full p-[3px] inline-flex shadow-inner">
            {["Personal", "Business"].map((type) => (
              <button
                key={type}
                onClick={() => setPlanType(type as "Personal" | "Business")}
                className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
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

        {/* Fluent-style plan cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {plans[planType].map((plan, index) => (
            <div key={index} className="container">
              <div className="text-[#6F4E37] font-semibold text-lg">
                {plan.price}
              </div>
              <div className="text-lg font-semibold text-[#1b1b1b] mb-1">
                {plan.name}
              </div>
              <div className="text-sm text-[#6e6e6e] mb-3">
                {plan.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
