"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, MapPin } from "lucide-react"
import React, { useEffect, useRef, useState } from "react"

const shops = [
  {
    id: 1,
    name: "The Roasted Bean",
    address: "123 Coffee St, Hoan Kiem, Hanoi",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
    recentVisits: 132,
  },
  {
    id: 2,
    name: "Cafe Pho Co",
    address: "11 Hang Gai, Hoan Kiem, Hanoi",
    image:
      "https://www.handspan.com/uploads/1%20HANOI%20%26%20AROUND/Hanoi/Blog-%20620x400/Trill-Rooftop-Cafe.jpg",
    recentVisits: 208,
  },
  {
    id: 3,
    name: "Tranquil Cups",
    address: "78 Tran Hung Dao, Hoan Kiem, Hanoi",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    recentVisits: 94,
  },
  {
    id: 4,
    name: "Egg Coffee Haven",
    address: "22 Ta Hien, Hoan Kiem, Hanoi",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb",
    recentVisits: 76,
  },
  {
    id: 5,
    name: "Skyline Sips",
    address: "101 Dinh Tien Hoang, Hanoi",
    image:
      "https://statics.vinwonders.com/rooftop-bar-in-hanoi-01_1682859725.jpg",
    recentVisits: 49,
  },
]

const options = ["All types", "Open now", "High rating"]

const page = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(options[0])
  const dropdownRef = useRef<HTMLDivElement>(null); 

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="max-w-[1000px] mx-auto">
      <h1 className="text-[25px] font-bold mb-5">Discover Coffee Shops</h1>

      {/* Filter dropdown */}
      <div className="flex justify-between items-center mb-3">
        {shops.length && (
          <div className="text-[13px]">{shops.length} shops found</div>
        )}

        <div className="flex justify-center items-center text-[13px] gap-2">
          <p className="text-[#616161]">Filter by: </p>
          <div className="relative w-48 text-sm" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="px-3 pt-[3px] text-[13px] w-full bg-[#FBFBFB] border border-[#E5E5E5] rounded-[5px] h-8 flex justify-between items-center focus:outline-none"
            >
              {selected}
              <ChevronDown
                size={16}
                strokeWidth={1}
                className={`transition-transform duration-200 ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.1, ease: "easeInOut" }}
                  className="overflow-hidden flex flex-col gap-1 p-1 text-[13px] absolute top-full left-0 w-full bg-[#FBFBFB] border border-[#E5E5E5] rounded-[5px] z-50"
                >
                  {options.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelected(option)
                        setIsOpen(false)
                      }}
                      className={`w-full text-left px-3 pt-2 pb-[7px] hover:bg-[#F0F0F0] rounded-r-[5px] ${
                        selected === option
                          ? "bg-[#F0F0F0] border-l-[3px] border-l-[#6F4E37]"
                          : "border-l-[3px] border-transparent"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Shop list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {shops.map((shop) => (
          <div
            key={shop.id}
            className="group bg-[#FBFBFB] border border-[#E5E5E5] rounded-[5px] transform transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:cursor-pointer"
          >
            <div className="relative">
              <img
                src={shop.image}
                alt={shop.name}
                className="rounded-t-[5px] h-40 w-full object-cover"
              />

              {/* Overlay shown on hover */}
              <div className="absolute inset-0 bg-black/30 rounded-t-[5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-xs bg-white/90 text-[#6F4E37] px-1 py-[6px] rounded-[4px] flex items-center gap-[2px] shadow-sm">
                  <MapPin strokeWidth={1} size={14} />
                  View Map
                </div>
              </div>
            </div>

            <div className="text-sm p-3">
              <h2 className="text-base font-semibold truncate mb-[2px]">
                {shop.name}
              </h2>

              <div className="text-[#616161] truncate flex items-center gap-[2px]">
                <p>{shop.address}</p>
              </div>

              <div className="text-[#6F4E37]">
                {shop.recentVisits} visits this{" "}
                {shop.recentVisits > 50 ? "week" : "month"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default page
