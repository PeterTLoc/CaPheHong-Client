"use client"

import React, { useEffect, useState } from "react"
import { Shop, ShopPayload, ShopUpdatePayload } from "@/types/shop"
import ShopAddModal from "@/components/shops/owner/ShopAddModal"
import ShopList from "@/components/shops/owner/ShopList"
import {
  fetchShops,
  createShop,
  updateShop,
  deleteShop,
} from "@/services/shopService"

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
      <h1 className="title">Shops</h1>

      {/* Add shop */}
      <h2 className="subtitle-top">Add shop</h2>
      <ShopAddModal
        onShopAdded={(shop) => setShops((prev) => [shop, ...prev])}
      />

      {/* Edit/Delete shop */}
      <h2 className="subtitle">Shop list</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ShopList
          shops={shops}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      )}
    </main>
  )
}

export default ShopsPage
