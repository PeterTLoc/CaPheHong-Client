"use client"

import { usePathname } from "next/navigation"
import React from "react"

import { Footer } from "@/components/layout/Footer"
import { Header } from "./Header"

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const hideNav =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/forgot-password" ||
    pathname.startsWith("/password-reset/")

  return (
    <div className="min-h-screen flex flex-col">
      {!hideNav && <Header />}
      <div className={`flex-1 ${!hideNav ? "pt-[84px]" : ""}`}>
        {children}
      </div>
      {!hideNav && <Footer />}
    </div>
  )
}

export default LayoutWrapper
