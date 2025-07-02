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
      <div className="flex min-h-[calc(100vh-163px)]">
        <Sidebar />

        <div className="flex flex-col flex-1 px-5 overflow-hidden">
          <div className="w-full max-w-[1000px] mx-auto">

            <main className="h-[calc(100vh-163px)] overflow-y-auto">
              {children}
            </main>
          </div>
        </div>
      </div>
    </RequireAuth>
  )
}
