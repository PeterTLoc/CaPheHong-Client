"use client"

import { usePathname } from "next/navigation"
import React from "react"
import { Navbar } from "./Navbar"
import { Footer } from "@/components/home/Footer"

const NavbarWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const hideNav =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/forgot-password" ||
    pathname.startsWith("/password-reset/")

  return (
    <div className="min-h-screen flex flex-col">
      {!hideNav && <Navbar />}
      <div className={`flex-1 ${!hideNav ? "pt-[84px]" : ""}`}>
        {children}
      </div>
      {!hideNav && <Footer />}
    </div>
  )
}

export default NavbarWrapper
