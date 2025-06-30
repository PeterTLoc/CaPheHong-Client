"use client"

import { useParams, useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { MapPin } from "lucide-react"
import dynamic from "next/dynamic"
import { Shop } from "@/types/shop"
import { fetchShopById } from "@/services/shopService"

const Map = dynamic(() => import("@/components/shops/Map"), { ssr: false })

const page = () => {
  const { shopId } = useParams()
  const router = useRouter()

  const [shop, setShop] = useState<Shop | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadShop = async () => {
      if (!shopId) return

      try {
        const data = await fetchShopById(Number(shopId))
        setShop(data)
      } catch (err: any) {
        setError(err.message || "Failed to load shop.")
      } finally {
        setLoading(false)
      }
    }

    loadShop()
  }, [shopId])

  if (loading) return <div className="text-center py-10">Loading...</div>
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>
  if (!shop) return <div className="text-center py-10">Shop not found.</div>

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
          <span>{shop.title}</span>
        </div>

        {/* contents */}
        <div className="flex flex-col gap-1">
          <div className="container">
            <img
              src={shop.banner}
              alt={shop.title}
              className="w-full h-[300px] object-cover"
            />

            <div className="p-5 text-sm space-y-4">
              <div>
                <h1 className="text-[22px] font-bold">{shop.title}</h1>
                {/* <p className="text-[#616161] flex items-center gap-1">
                  <MapPin size={16} strokeWidth={1} />
                  {shop.address}
                </p> */}
              </div>

              {/* <div className="text-[#6F4E37] font-medium">
                {shop.recentVisits} visits this{" "}
                {shop.recentVisits > 50 ? "week" : "month"}
              </div> */}

              <p className="text-[#333]">{shop.body}</p>

              <button
                onClick={() => router.push(`/checkout?shopId=${shop.id}`)}
                className="text-white w-fit px-3 min-h-[33px] pt-[5px] pb-[3px] rounded-[5px] text-[13px] bg-[#6F4E37] hover:opacity-75"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>

          <div>
            <p className="subtitle">Map View</p>
            <div className="container">
              {/* {shop.location && <Map destination={shop.location} />} */}
            </div>
          </div>

          {/* Placeholder for comment */}
          <div className="container">Review and comments (coming soon)</div>
        </div>
      </div>
    </div>
  )
}

export default page
