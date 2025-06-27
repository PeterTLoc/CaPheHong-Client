import { RequireAuth } from "@/components/auth/RequireAuth"
import Sidebar from "@/components/layout/Sidebar"
import React from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RequireAuth roles={["owner"]}>
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex flex-1 justify-center px-5">
          <main className="w-full max-w-[1000px]">{children}</main>
        </div>
      </div>
    </RequireAuth>
  )
}
