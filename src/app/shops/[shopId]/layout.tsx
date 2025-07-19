"use client"

import { ReactNode } from "react"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Shop } from "@/types/shop"
import { fetchShopById } from "@/services/shopService"
import TableOfContents from "@/components/shops/TableOfContents"

interface LayoutProps {
  children: ReactNode
}

export default function ShopLayout({ children }: LayoutProps) {
  const { shopId } = useParams()
  const [shop, setShop] = useState<Shop | null>(null)

  useEffect(() => {
    const loadShop = async () => {
      if (!shopId) return
      try {
        const data = await fetchShopById(Number(shopId))
        setShop(data)
      } catch (err) {
        console.error("Failed to load shop for TOC:", err)
      }
    }
    loadShop()
  }, [shopId])

  return (
    <div className="flex">
      <TableOfContents shop={shop} />
      <div className="flex-1 lg:ml-[320px] px-5">
        <div className="max-w-[1000px] mx-auto">{children}</div>
      </div>
    </div>
  )
}
