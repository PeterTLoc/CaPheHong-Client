"use client"

import { useState, useEffect, useRef } from "react"
import { Shop } from "@/types/shop"
import { Info, MapPin, MessageSquare } from "lucide-react"
import { motion } from "framer-motion"

interface TableOfContentsProps {
  shop: Shop | null
}

const TableOfContents = ({ shop }: TableOfContentsProps) => {
  const [activeSection, setActiveSection] = useState("overview")
  const [barPosition, setBarPosition] = useState(0)
  const linkRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const isNearBottom = (scrollPosition + windowHeight) >= (documentHeight - 100) // Within 100px of bottom

      let currentSection = "overview"

      // Only check for bottom detection if we've scrolled down a bit (not at the very top)
      if (scrollPosition > 200 && isNearBottom) {
        currentSection = "reviews"
      }
      // Check if we're past the reviews subtitle
      else {
        const reviewsElement = document.getElementById("reviews-subtitle")
        if (reviewsElement && scrollPosition >= reviewsElement.offsetTop) {
          currentSection = "reviews"
        }
        // Check if we're past the map subtitle
        else {
          const mapElement = document.getElementById("map-subtitle")
          if (mapElement && scrollPosition >= mapElement.offsetTop) {
            currentSection = "map"
          }
          // Otherwise, we're in overview
          else {
            currentSection = "overview"
          }
        }
      }

      console.log('Scroll position:', scrollPosition, 'Near bottom:', isNearBottom, 'Active section:', currentSection) // Debug log

      setActiveSection(currentSection)
      
      // Update bar position based on active link
      const activeLink = linkRefs.current[currentSection]
      if (activeLink) {
        const container = activeLink.parentElement
        if (container) {
          const linkTop = activeLink.offsetTop
          setBarPosition(linkTop)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    
    // Call once on mount with a small delay to ensure proper initial state
    setTimeout(() => {
      handleScroll()
    }, 100)
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const subtitleIdMap: { [key: string]: string } = {
      overview: "overview-title",
      map: "map-subtitle",
      reviews: "reviews-subtitle"
    }
    
    const targetId = subtitleIdMap[sectionId]
    const element = document.getElementById(targetId)
    
    if (element) {
      const navbarHeight = 84
      const padding = 20
      const targetPosition = element.offsetTop - navbarHeight - padding
      
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      })
    }
  }

  const sections = [
    { id: "overview", label: "Overview", icon: <Info size={16} /> },
    { id: "map", label: "Map View", icon: <MapPin size={16} /> },
    { id: "reviews", label: "Reviews", icon: <MessageSquare size={16} /> },
  ]

  return (
    <div className="fixed top-[84px] left-0 h-[calc(100vh-84px-60px)] overflow-y-auto w-[280px] lg:block hidden">
      <div className="m-5 relative">
        <h3 className="subtitle-top">Contents</h3>

        <div className="relative space-y-1">
          {/* Moving active indicator bar */}
          <motion.div
            className="absolute left-0 w-[3px] h-9 bg-[#6F4E37] rounded-r-sm z-10"
            animate={{
              y: barPosition
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
          />

          {sections.map((section) => (
            <div
              key={section.id}
              ref={(el) => {
                linkRefs.current[section.id] = el
              }}
              onClick={() => scrollToSection(section.id)}
              className={`sidebar-link flex gap-[14px] items-center cursor-pointer relative ${
                activeSection === section.id ? "bg-[#EAEAEA]" : ""
              }`}
            >
              <div>{section.icon}</div>
              <span className="sidebar-link-text">{section.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TableOfContents 