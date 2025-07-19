"use client"

import React from "react"
import { CircleUserRound, LogOut } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuth()

  if (!user) {
    return (
      <div className="w-[280px] m-4 text-sm text-gray-500">
        User not authenticated.
      </div>
    )
  }

  const accountType = user.role === "owner" ? "Owner account" : "User account"

  return (
    <div className="px-5 pt-[19px]">
      <nav className="flex flex-col gap-1">
        {children}
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

export default SidebarLayout
