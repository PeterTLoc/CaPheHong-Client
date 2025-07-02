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
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
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

  const allTags = Array.from(
    new Set(shops.flatMap((shop) => shop.tags.map((tag) => tag.name)))
  )

  const filteredShops = selectedTag
    ? shops.filter((shop) => shop.tags.some((tag) => tag.name === selectedTag))
    : shops

  return (
    <div className="flex">
      <Sidebar
        tags={allTags}
        activeTag={selectedTag}
        onTagSelect={setSelectedTag}
      />

      <div className="px-5 flex-1">
        <div className="max-w-[1000px] mx-auto">
          <h1 className="title text-center">Discover Coffee Shops</h1>

          <div className="flex justify-between items-center mb-3">
            {filteredShops.length > 0 && (
              <div className="text-[13px]">
                {filteredShops.length} shops found
              </div>
            )}
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <ShopGrid shops={filteredShops} onCardClick={handleCardClick} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Page
