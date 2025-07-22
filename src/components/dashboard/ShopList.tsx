"use client"

import React, { useState } from "react"
import { Shop, ShopUpdatePayload } from "@/types/shop"
import ShopItem from "./ShopItem"
import { useAuth } from "@/context/AuthContext"

interface ShopListProps {
  shops: Shop[]
  onDelete: (id: number) => void
  onUpdate: (id: number, payload: ShopUpdatePayload) => void
}

const ShopList: React.FC<ShopListProps> = ({ shops, onDelete, onUpdate }) => {
  const [editingShopId, setEditingShopId] = useState<number | null>(null)
  const { user } = useAuth()

  const handleEdit = (shopId: number) => {
    setEditingShopId(shopId)
  }

  const handleCancel = () => {
    setEditingShopId(null)
  }

  const handleSave = (id: number, updatedPayload: ShopUpdatePayload) => {
    onUpdate(id, updatedPayload)
    setEditingShopId(null)
  }

  const userShops = shops.filter((shop) => shop.owner === user?.email)

  return (
    <div className="w-full flex flex-col gap-1">
      {userShops.length === 0 ? (
        <p className="container text-[11px] max-w-[1000px] subtext">
          No shops yet. Add one to get started.
        </p>
      ) : (
        userShops.map((shop) => (
          <ShopItem
            key={shop.id}
            shop={shop}
            isEditing={editingShopId === shop.id}
            onEdit={() => handleEdit(shop.id)}
            onCancel={handleCancel}
            onSave={(payload) => handleSave(shop.id, payload)}
            onDelete={() => onDelete(shop.id)}
          />
        ))
      )}
    </div>
  )
}

export default ShopList
