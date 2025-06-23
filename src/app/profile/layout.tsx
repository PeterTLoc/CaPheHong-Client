import Sidebar from "@/components/ui/navigation/Sidebar"
import React from "react"

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex flex-1 justify-center px-5">
        <main className="w-full max-w-[1000px]">{children}</main>
      </div>
    </div>
  )
}
