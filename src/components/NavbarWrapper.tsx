"use client"

import { usePathname } from "next/navigation"
import React from "react"
import { Navbar } from "./Navbar"

const NavbarWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const hideNav =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/forgot-password" ||
    pathname.startsWith("/password-reset/")

  return (
    <>
      {!hideNav && <Navbar />}
      {children}
    </>
  )
}

export default NavbarWrapper
