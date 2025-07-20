"use client"

import { ReactNode } from "react"

interface LayoutProps {
  children: ReactNode
}

export default function ShopLayout({ children }: LayoutProps) {
  return (
    <div className="px-5">
      <div className="max-w-[1000px] mx-auto">{children}</div>
    </div>
  )
}
