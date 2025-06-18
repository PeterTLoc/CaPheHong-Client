"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

interface FilterDropdownProps {
  selected: string
  setSelected: (val: string) => void
  options: string[]
}

export const FilterDropdown = ({
  selected,
  setSelected,
  options,
}: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

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
  )
}
