"use client"

import React from "react"
import { ShopCard } from "./ShopCard"
import { Shop } from "@/types/shop"


interface ShopGridProps {
  shops: Shop[]
  onCardClick: (id: number) => void
}

export const ShopGrid = ({ shops, onCardClick }: ShopGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {shops.map((shop) => (
        <ShopCard
          key={shop.id}
          id={shop.id}
          title={shop.title}
          body={shop.body}
          banner={shop.banner}
          onClick={onCardClick}
        />
      ))}
    </div>
  )
}
