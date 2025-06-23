"use client"

import React from "react"
import { ShopCard } from "./ShopCard"

interface Shop {
  id: number
  name: string
  address: string
  image: string
  recentVisits: number
  description: string
}

interface ShopGridProps {
  shops: Shop[]
  onCardClick: (id: number) => void
}

export const ShopGrid = ({ shops, onCardClick }: ShopGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {shops.map((shop) => (
        <ShopCard key={shop.id} {...shop} onClick={onCardClick} />
      ))}
    </div>
  )
}
