import { RequireAuth } from "@/components/auth/RequireAuth"
import Sidebar from "@/components/layout/Sidebar"
import React from "react"

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RequireAuth>
      <div className="flex">
        <Sidebar />

        <div className="px-5 w-full">
          <div className="mx-auto max-w-[1000px] w-full">
            <main>{children}</main>
          </div>
        </div>
      </div>
    </RequireAuth>
  )
}
