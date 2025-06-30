"use client"

import { LayoutDashboard, Store } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const SidebarOwner = () => {
  const pathname = usePathname()

  const isActive = (href: string, exact = false) =>
    exact ? pathname === href : pathname.startsWith(href)

  const linkClasses = (active: boolean) =>
    `sidebar-link flex items-center gap-[10px] relative pl-2 ${
      active ? "bg-[#EAEAEA]" : ""
    }`

  const ActiveBar = ({ active }: { active: boolean }) =>
    active ? (
      <div className="absolute left-0 h-4 w-[3px] bg-[#6F4E37] rounded-[5px]" />
    ) : null

  return (
    <div className="space-y-2">
      <Link
        href="/dashboard"
        className={linkClasses(isActive("/dashboard", true))}
      >
        <ActiveBar active={isActive("/dashboard", true)} />
        <LayoutDashboard size={20} strokeWidth={1} />
        <div className="sidebar-link-text">Dashboard</div>
      </Link>

      <Link
        href="/dashboard/shops"
        className={linkClasses(isActive("/dashboard/shops"))}
      >
        <ActiveBar active={isActive("/dashboard/shops")} />
        <Store size={20} strokeWidth={1} />
        <div className="sidebar-link-text">Shops</div>
      </Link>
    </div>
  )
}

export default SidebarOwner
