"use client"

import { useState } from "react"
import { Coffee, Wifi, Dog, MapPin, Sun } from "lucide-react"

const filters = [
  { id: "open", label: "Open Now", icon: <Sun size={16} /> },
  { id: "nearby", label: "Nearby", icon: <MapPin size={16} /> },
  { id: "wifi", label: "Has Wi-Fi", icon: <Wifi size={16} /> },
  { id: "pet", label: "Pet Friendly", icon: <Dog size={16} /> },
  { id: "outdoor", label: "Outdoor Seating", icon: <Coffee size={16} /> },
]

const Sidebar = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  const handleClick = (filterId: string) => {
    setActiveFilter((prev) => (prev === filterId ? null : filterId))
    console.log("Filter applied:", filterId)
  }

  return (
    <div className="p-5">
      <div className="w-[280px] space-y-1 relative">
        {filters.map((filter) => (
          <div
            key={filter.id}
            onClick={() => handleClick(filter.id)}
            className={`sidebar-link relative flex items-center gap-[10px] cursor-pointer
              ${activeFilter === filter.id ? "bg-[#EAEAEA]" : ""}
            `}
          >
            {/* Brown vertical line on the left when active */}
            {activeFilter === filter.id && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 h-full w-[3px] bg-[#8B5E3C]" />
            )}

            {/* Push icon/text slightly to the right to make room for the bar */}
            <div className="pl-[6px] flex items-center gap-[10px]">
              {filter.icon}
              <span className="pt-[3px]">{filter.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
