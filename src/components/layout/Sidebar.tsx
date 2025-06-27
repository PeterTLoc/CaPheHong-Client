"use client"

import { useAuth } from "@/context/AuthContext"
import SidebarGuest from "./SidebarGuest"
import SidebarLayout from "./SidebarLayout"
import SidebarOwner from "./SidebarOwner"

const Sidebar = () => {
  const { user, loading } = useAuth()

  if (loading) return null
  if (!user) {
    return (
      <div className="w-[280px] m-4 text-sm text-gray-500">
        User not authenticated.
      </div>
    )
  }

  return (
    <SidebarLayout>
      {user.role === "owner" ? <SidebarOwner /> : <SidebarGuest />}
    </SidebarLayout>
  )
}

export default Sidebar
