"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ShopGrid } from "@/components/shop/ShopGrid"
import TagFilter from "@/components/shop/TagFilter"
import { Shop } from "@/types/shop"
import { fetchShops } from "@/services/shopService"
import { motion } from "framer-motion"
import { AnimatePresence } from "framer-motion"

const ShopCatalog = () => {
  const [shops, setShops] = useState<Shop[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTags, setActiveTags] = useState<string[]>([])

  const router = useRouter()

  const handleCardClick = (id: number) => {
    router.push(`/shops/${id}`)
  }

  useEffect(() => {
    const loadShops = async () => {
      try {
        const data = await fetchShops()
        console.log(data)
        setShops(data)
      } catch (err: any) {
        setError(err.message || "Failed to load shops")
      } finally {
        setLoading(false)
      }
    }

    loadShops()
  }, [])

  // Dynamically get all unique tags from the shop data
  const allTags = Array.from(
    new Set((Array.isArray(shops) ? shops : []).flatMap((shop) =>
      Array.isArray(shop.tags) ? shop.tags.map((tag) => tag.name) : []
    ))
  )

  // Filter shops based on activeTags (multi-filter, match any)
  const filteredShops =
    activeTags.length === 0
      ? shops
      : shops.filter((shop) =>
          shop.tags.some((tag) => activeTags.includes(tag.name))
        )

  const handleTagToggle = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const handleClearAll = () => setActiveTags([])

  return (
    <div className="px-5">
      <div className="max-w-[1000px] mx-auto">
        {/* Header */}
        <h1 className="title">Shops</h1>

        {/* Results count and filter */}
        <div className="flex justify-between items-center mb-3 mt-3">
          {filteredShops.length > 0 && (
            <div className="text-[13px]">
              {filteredShops.length} shops found
            </div>
          )}
          <TagFilter
            tags={allTags}
            activeTags={activeTags}
            onTagToggle={handleTagToggle}
            onClearAll={handleClearAll}
          />
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-brown-700 border-solid"></div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTags.join(",")}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3, // 250ms ≈ ControlNormal
                ease: [0.25, 0.1, 0.25, 1], // Fast-Out, Slow-In
              }}
            >
              {error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <ShopGrid
                  shops={filteredShops}
                  onCardClick={handleCardClick}
                />
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}

export default ShopCatalog 