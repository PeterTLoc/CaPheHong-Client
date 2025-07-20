"use client"

import React, { useState, useRef, useEffect } from "react"
import { ChevronDown, Check, X, Filter } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface TagFilterProps {
  tags: string[]
  activeTags: string[]
  onTagToggle: (tag: string) => void
  onClearAll?: () => void
}

const TagFilter: React.FC<TagFilterProps> = ({
  tags,
  activeTags,
  onTagToggle,
  onClearAll,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const selectedText = activeTags.length > 0 
    ? `${activeTags.length} ${activeTags.length === 1 ? 'filter' : 'filters'}`
    : "Not selected"

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2">
        <Filter size={12} strokeWidth={1} className="text-gray-600" />
        <span className="text-[13px] text-gray-600">Filter by tags:</span>
      </div>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex justify-between items-center min-w-[130px] min-h-[32px] pt-[5px] pb-[3px] px-3 rounded-[5px] text-[13px] bg-[#FBFBFB] border border-[#E5E5E5] focus:outline-none focus:bg-[#FFFFFF] transition-colors"
        >
          <span className="text-[13px] text-gray-700 pr-3">{selectedText}</span>
          <ChevronDown
            size={16}
            strokeWidth={1}
            className={`transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
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
              className="absolute top-full p-1 left-0 w-full bg-[#FBFBFB] border border-[#E5E5E5] rounded-[5px] shadow-lg z-50 max-h-60 overflow-y-auto"
            >
              <div className="flex flex-col gap-1">
                {activeTags.length > 0 && onClearAll && (
                  <button
                    onClick={onClearAll}
                    className="w-full px-3 pt-[5px] pb-[3px] text-left flex items-center gap-2 hover:bg-[#EAEAEA] transition-colors text-gray-700 border-b border-[#E5E5E5]"
                  >
                    <X size={12} className="text-red-500" />
                    <span className="text-[13px] text-red-500">Clear all tags</span>
                  </button>
                )}
                {Array.isArray(tags) ? tags.map((tag) => {
                const isActive = activeTags.includes(tag)
                
                return (
                  <button
                    key={tag}
                    onClick={() => {
                      onTagToggle(tag)
                      // Don't close dropdown when selecting
                    }}
                    className="w-full px-3 pt-[5px] pb-1 text-left flex items-center gap-2 hover:bg-[#EAEAEA] transition-colors text-gray-700"
                  >
                    <div
                      className={`w-4 h-4 rounded-[3px] border border-[#E5E5E5] flex items-center justify-center ${
                        isActive ? "bg-[#6F4E37] border-[#6F4E37]" : "bg-white"
                      }`}
                    >
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                          >
                            <Check size={12} color="#fff" strokeWidth={3} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <span className="text-[13px] capitalize">{tag}</span>
                  </button>
                )
              }) : null}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default TagFilter 