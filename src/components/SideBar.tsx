"use client"

import React from "react"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import { CircleUserRound } from "lucide-react"

const Sidebar = () => {
  // const { user } = useAuth()

  // if (!user) return null
  const user = {
    id: 1,
    email: "demo@user.com",
    role: "business", // or "user"
    name: "Demo User",
  }

  const isBusiness = user.role === "business"

  return (
    <div className="w-[280px] m-4">
      <nav className="flex flex-col gap-1">
        <h2 className="rounded-[5px] pb-[17px] flex items-center gap-[10px]">
          <CircleUserRound strokeWidth={0.5} size={60} />

          {isBusiness ? (
            <div>
              <p className="text-[13px] font-semibold">{user.name}</p>
              <p className="text-[11px]">Owner account</p>
            </div>
          ) : (
            <div>
              <p>{user.name}</p>
              <p>User account</p>
            </div>
          )}
        </h2>

        {isBusiness ? (
          <>
            <>
              <Link className="sidebar-link" href="/dashboard">
                Dashboard Overview
              </Link>

              <Link className="sidebar-link" href="/dashboard/shops">
                Manage Shops
              </Link>

              <Link className="sidebar-link" href="/dashboard/shops/new">
                Create New Shop
              </Link>

              <Link className="sidebar-link" href="/dashboard/orders">
                View Orders
              </Link>

              <Link className="sidebar-link" href="/dashboard/settings">
                Business Settings
              </Link>
            </>
          </>
        ) : (
          <>
            <Link className="sidebar-link" href="/profile">
              Overview
            </Link>
            <Link className="sidebar-link" href="/profile/orders">
              My Orders
            </Link>
            <Link className="sidebar-link" href="/profile/favorites">
              Favorites
            </Link>
            <Link className="sidebar-link" href="/profile/reviews">
              My Reviews
            </Link>
            <Link className="sidebar-link" href="/profile/settings">
              Account Settings
            </Link>
          </>
        )}

        <Link className="sidebar-link" href="/logout">
          Logout
        </Link>
      </nav>
    </div>
  )
}

export default Sidebar
