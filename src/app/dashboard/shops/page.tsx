"use client"

import React, { useEffect, useState } from "react"
import { Shop, ShopPayload, ShopUpdatePayload } from "@/types/shop"
import ShopAddModal from "@/components/dashboard/ShopAddModal"
import ShopList from "@/components/dashboard/ShopList"
import {
  fetchShops,
  createShop,
  updateShop,
  deleteShop,
} from "@/services/shopService"
import Spinner from "@/components/ui/Spinner"
import Breadcrumb from "@/components/ui/BreadCrumb"

const ShopsPage = () => {
  const [shops, setShops] = useState<Shop[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadShops = async () => {
      try {
        const data = await fetchShops()
        setShops(data)
      } catch (err: any) {
        setError(err.message || "Failed to load shops")
      } finally {
        setLoading(false)
      }
    }

    loadShops()
  }, [])

  const handleAdd = async (payload: ShopPayload) => {
    try {
      const newShop = await createShop(payload)
      setShops((prev) => [newShop, ...prev])
    } catch (err: any) {
      alert(err.message || "Failed to add shop")
    }
  }

  const handleUpdate = async (id: number, payload: ShopUpdatePayload) => {
    try {
      const updated = await updateShop(id, payload)
      setShops((prev) => prev.map((s) => (s.id === id ? updated : s)))
    } catch (err: any) {
      alert(err.message || "Failed to update shop")
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteShop(id)
      setShops((prev) => prev.filter((s) => s.id !== id))
    } catch (err: any) {
      alert(err.message || "Failed to delete shop")
    }
  }

  return (
    <main>
      <div className="h-[calc(100vh-163px)] px-5 overflow-y-auto">
        <div className="max-w-[1000px]">
          <h1 className="title">Shops</h1>
          {/* Add shop */}
          <ShopAddModal
            onShopAdded={(shop) => setShops((prev) => [shop, ...prev])}
          />

          {/* Edit/Delete shop */}
          {loading ? (
            <Spinner />
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <ShopList
              shops={shops}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          )}
        </div>
      </div>
    </main>
  )
}

export default ShopsPage
