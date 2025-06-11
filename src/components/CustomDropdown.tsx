"use client"

import React, { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"

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
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Choose item",
  className = "",
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

  return (
    <div className={`relative min-w-[280px] ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
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

      {isOpen && (
        <ul className="absolute z-10 w-full max-h-60 overflow-auto bg-white border border-gray-200 rounded-md shadow-lg text-[13px]">
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
      )}
    </div>
  )
}

export default CustomDropdown
