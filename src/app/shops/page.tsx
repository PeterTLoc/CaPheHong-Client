"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { FilterDropdown } from "@/components/shops/FilterDropdown"
import { ShopGrid } from "@/components/shops/ShopGrid"
import Sidebar from "@/components/shops/Sidebar"
import { Shop } from "@/types/shop"
import { fetchShops } from "@/services/shopService"

const options = ["All types", "Open now", "High rating"]

const Page = () => {
  const [selected, setSelected] = useState(options[0])
  const [shops, setShops] = useState<Shop[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  const handleCardClick = (id: number) => {
    router.push(`/shops/${id}`)
  }

  useEffect(() => {
    const loadShops = async () => {
      try {
        const data = await fetchShops()
        setShops(data)
      } catch (err: any) {
        setError(err.message || "Failed to load shops")
      } finally {
        setLoading(false)
      }
    }

    loadShops()
  }, [])

  return (
    <div className="flex">
      <Sidebar />

      <div className="px-5 flex-1">
        <div className="max-w-[1000px] mx-auto">
          <h1 className="title text-center">Discover Coffee Shops</h1>

          <div className="flex justify-between items-center mb-3">
            {shops.length > 0 && (
              <div className="text-[13px]">{shops.length} shops found</div>
            )}
            <FilterDropdown
              selected={selected}
              setSelected={setSelected}
              options={options}
            />
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <ShopGrid shops={shops} onCardClick={handleCardClick} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Page
