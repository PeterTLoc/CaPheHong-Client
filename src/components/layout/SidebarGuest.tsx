"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, Star, Crown } from "lucide-react"
import { motion } from "framer-motion"

const links = [
  { href: "/profile", label: "Profile", icon: <User size={20} strokeWidth={1} /> },
  { href: "/profile/favorites", label: "Favorites", icon: <Star size={20} strokeWidth={1} /> },
  { href: "/profile/upgrade-plan", label: "Upgrade Plans", icon: <Crown size={20} strokeWidth={1} /> },
]

const SidebarGuest = () => {
  const pathname = usePathname()
  const activeIdx = links.findIndex(link => pathname === link.href)

  return (
    <div className="flex flex-col gap-1 w-[280px] relative">
      {/* Vertical bar */}
      {activeIdx !== -1 && (
        <motion.div
          layout
          layoutId="sidebar-guest-active-bar"
          className="absolute left-0 w-[3px] h-9 bg-[#6F4E37] rounded z-20"
          style={{
            top: `calc(${activeIdx} * 41px)`
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
      {links.map((link, idx) => {
        const isActive = pathname === link.href
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`sidebar-link flex items-center gap-[14px] relative z-10 ${
              isActive ? "bg-[#EAEAEA]" : ""
            }`}
          >
            {link.icon}
            <span className="sidebar-link-text">{link.label}</span>
          </Link>
        )
      })}
    </div>
  )
}

export default SidebarGuest
