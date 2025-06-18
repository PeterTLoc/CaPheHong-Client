"use client"

import React from "react"
import { MapPin } from "lucide-react"

interface ShopCardProps {
  id: number
  name: string
  address: string
  image: string
  recentVisits: number
  onClick: (id: number) => void
}

export const ShopCard = ({
  id,
  name,
  address,
  image,
  recentVisits,
  onClick,
}: ShopCardProps) => {
  return (
    <div
      className="group bg-[#FBFBFB] border border-[#E5E5E5] rounded-[5px] transform transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:cursor-pointer"
      onClick={() => onClick(id)}
    >
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="rounded-t-[5px] h-40 w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 rounded-t-[5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="text-xs bg-white/90 text-[#6F4E37] px-1 py-[6px] rounded-[4px] flex items-center gap-[2px] shadow-sm">
            <MapPin strokeWidth={1} size={14} />
            View Map
          </div>
        </div>
      </div>

      <div className="text-sm p-3">
        <h2 className="text-base font-semibold truncate mb-[2px]">{name}</h2>
        <div className="text-[#616161] truncate flex items-center gap-[2px]">
          <p>{address}</p>
        </div>
        <div className="text-[#6F4E37]">
          {recentVisits} visits this {recentVisits > 50 ? "week" : "month"}
        </div>
      </div>
    </div>
  )
}
