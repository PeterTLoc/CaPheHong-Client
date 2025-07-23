"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { User, Star, Crown, LayoutDashboard, Store, LogOut } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

// Navigation configurations
const guestLinks = [
  {
    href: "/profile",
    label: "Profile",
    icon: <User size={20} strokeWidth={1} />,
  },
]

const ownerLinks = [
  {
    href: "/dashboard/shops",
    label: "Shops",
    icon: <Store size={20} strokeWidth={1} />,
  },
]

const Sidebar = () => {
  const { user, loading, logout } = useAuth()
  const pathname = usePathname()

  if (loading) return null
  if (!user) {
    return (
      <div className="w-[280px] m-4 text-sm text-gray-500">
        User not authenticated.
      </div>
    )
  }

  const links = user.role === "owner" ? ownerLinks : guestLinks
  const activeIdx = links.findIndex((link) =>
    user.role === "owner"
      ? link.href === "/dashboard"
        ? pathname === "/dashboard"
        : pathname.startsWith(link.href)
      : pathname === link.href
  )

  return (
    <div className="px-5 pt-[19px] hidden lg:flex">
      <nav className="flex flex-col gap-1">
        <div className="flex flex-col gap-1 w-[280px] relative">
          {/* Vertical bar for active state */}
          {activeIdx !== -1 && (
            <motion.div
              layout
              layoutId="sidebar-active-bar"
              className="absolute left-0 w-[3px] h-9 bg-[#6F4E37] rounded z-20"
              style={{
                top: `calc(${activeIdx} * 41px)`,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}

          {/* Navigation links */}
          {links.map((link, idx) => {
            const isActive =
              user.role === "owner"
                ? link.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(link.href)
                : pathname === link.href

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

        {/* Logout button */}
        <button
          onClick={logout}
          className="sidebar-link flex items-center gap-[14px] text-red-500 cursor-pointer"
        >
          <LogOut size={20} strokeWidth={1} />
          <div className="sidebar-link-text">Logout</div>
        </button>
      </nav>
    </div>
  )
}

export default Sidebar
