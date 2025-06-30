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
    <div className="w-[280px] px-5 pt-[19px]">
      <nav className="flex flex-col gap-1">
        <div className="rounded-[5px] pb-[17px] flex items-center gap-[10px]">
          <CircleUserRound strokeWidth={0.5} size={60} />
          <div>
            <p className="text-[13px] font-semibold">{user.name}</p>
            <p className="text-[11px]">{accountType}</p>
          </div>
        </div>

        {children}

        <button
          onClick={logout}
          className="sidebar-link flex items-center gap-[10px] text-red-500"
        >
          <LogOut size={20} strokeWidth={1} />
          <div>Logout</div>
        </button>
      </nav>
    </div>
  )
}

export default SidebarLayout
