"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { FilterDropdown } from "@/components/shops/FilterDropdown"
import { ShopGrid } from "@/components/shops/ShopGrid"
import { shops } from "@/data/shop"

const options = ["All types", "Open now", "High rating"]

const Page = () => {
  const [selected, setSelected] = useState(options[0])
  const router = useRouter()

  const handleCardClick = (id: number) => {
    router.push(`/shops/${id}`)
  }

  return (
    <div className="px-5">
      <div className="max-w-[1625px] mx-auto">
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

        <ShopGrid shops={shops} onCardClick={handleCardClick} />
      </div>
    </div>
  )
}

export default Page
