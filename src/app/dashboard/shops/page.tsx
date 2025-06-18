"use client"

import React from "react"
import { shops } from "@/data/shop"
import { useRouter } from "next/navigation"

const ShopListPage = () => {
  const router = useRouter()

  const handleEdit = (id: number) => {
    router.push(`/shops/edit/${id}`)
  }

  const handleDelete = (id: number) => {
    // You can add a confirmation modal here
    console.log("Delete shop with ID:", id)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Shops</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {shops.map((shop) => (
          <div key={shop.id} className="border p-4 rounded shadow-sm bg-white">
            <h2 className="text-lg font-semibold">{shop.name}</h2>
            <p className="text-sm text-gray-600">{shop.address}</p>
            <p className="text-sm text-gray-500">Owner: {shop.owner}</p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleEdit(shop.id)}
                className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(shop.id)}
                className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ShopListPage
