"use client"

import React, { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type Option = {
  value: string
  label: string
}

type CustomDropdownProps = {
  options: Option[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  onOpen?: (e: React.MouseEvent) => void
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Choose item",
  className = "",
  onOpen,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || placeholder

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleToggle = (e: React.MouseEvent) => {
    const newIsOpen = !isOpen
    setIsOpen(newIsOpen)

    // Call onOpen when opening the dropdown
    if (newIsOpen && onOpen) {
      onOpen(e)
    }
  }

  return (
    <div className={`relative min-w-[280px] ${className}`} ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className="w-full min-h-[32px] pt-[5px] pb-[3px] px-3 rounded-[5px] text-[13px] bg-[#FBFBFB] border border-b-[#868686] border-t-[#E5E5E5] border-l-[#E5E5E5] border-r-[#E5E5E5] flex items-center justify-between focus:outline-none"
      >
        <span className={value ? "text-black" : "text-gray-400"}>
          {selectedLabel}
        </span>

        <ChevronDown
          className={`w-4 h-4 text-gray-500 ml-2 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              y: -4,
              opacity: 0.8,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -4,
              opacity: 0.8,
            }}
            transition={{
              duration: 0.15,
              ease: "easeOut",
            }}
            className="absolute z-10 w-full top-full"
          >
            <ul className="bg-white border border-gray-200 rounded-md shadow-lg text-[13px] max-h-60 overflow-auto">
              {options.map((option) => (
                <li
                  key={option.value}
                  className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                    option.value === value ? "bg-gray-100 font-medium" : ""
                  }`}
                  onClick={() => {
                    onChange(option.value)
                    setIsOpen(false)
                  }}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CustomDropdown
