"use client"

import { useParams, useRouter } from "next/navigation"
import React from "react"
import { MapPin } from "lucide-react"
import { shops } from "@/data/shop"

const page = () => {
  const { shopId } = useParams()
  const router = useRouter()

  const shop = shops.find((s) => s.id === Number(shopId))

  if (!shop) {
    return <div className="text-center py-10">Shop not found.</div>
  }

  return (
    <div className="px-5">
      <div className="max-w-[1000px] mx-auto">
        <div className="title">
          <span
            onClick={() => router.push("/shops")}
            className="text-[#5F5F5F] hover:cursor-pointer hover:text-black"
          >
            Shops
          </span>
          <span className="mx-4">›</span>
          <span>{shop.name}</span>
        </div>

        {/* contents */}
        <div className="flex flex-col gap-1">
          <div className="container">
            <img
              src={shop.image}
              alt={shop.name}
              className="w-full h-[300px] object-cover"
            />

            <div className="p-5 text-sm space-y-4">
              <div>
                <h1 className="text-[22px] font-bold">{shop.name}</h1>
                <p className="text-[#616161] flex items-center gap-1">
                  <MapPin size={16} strokeWidth={1} />
                  {shop.address}
                </p>
              </div>

              <div className="text-[#6F4E37] font-medium">
                {shop.recentVisits} visits this{" "}
                {shop.recentVisits > 50 ? "week" : "month"}
              </div>

              <p className="text-[#333]">{shop.description}</p>

              <button
                onClick={() => router.push(`/checkout?shopId=${shop.id}`)}
                className="text-white w-fit px-3 min-h-[33px] pt-[5px] pb-[3px] rounded-[5px] text-[13px] bg-[#6F4E37] hover:opacity-75"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>

          {/* Placeholder for map */}
          <div className="container">Map View (coming soon)</div>

          {/* Placeholder for comment */}
          <div className="container">Review and comments (coming soon)</div>
        </div>
      </div>
    </div>
  )
}

export default page
