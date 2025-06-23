"use client"

import React from "react"
import { CircleUserRound } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import Link from "next/link"

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="w-[280px] m-4 text-sm text-gray-500">
        User not authenticated.
      </div>
    )
  }

  const accountType = user.role === "owner" ? "Owner account" : "User account"

  return (
    <div className="w-[280px] m-4">
      <nav className="flex flex-col gap-1">
        <div className="rounded-[5px] pb-[17px] flex items-center gap-[10px]">
          <CircleUserRound strokeWidth={0.5} size={60} />
          <div>
            <p className="text-[13px] font-semibold">{user.name}</p>
            <p className="text-[11px]">{accountType}</p>
          </div>
        </div>

        {children}

        <Link className="sidebar-link" href="/logout">
          Logout
        </Link>
      </nav>
    </div>
  )
}

export default SidebarLayout
