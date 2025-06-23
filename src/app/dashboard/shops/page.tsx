"use client"

import React from "react"
import { shops } from "@/data/shop"
import { useRouter } from "next/navigation"

const page = () => {
  const router = useRouter()

  const handleEdit = (id: number) => {
    router.push(`/shops/edit/${id}`)
  }

  const handleDelete = (id: number) => {
    console.log("Delete shop with ID:", id)
  }

  return (
    <div>
      <h1 className="title">Shops</h1>
      <table className="container">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
              Image
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
              Name
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
              Description
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
              Address
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {shops.map((shop) => (
            <tr key={shop.id} className="hover:bg-gray-50">
              <td className="px-4 py-2">
                <img
                  src={shop.image}
                  alt={shop.name}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="px-4 py-2 text-sm font-semibold">{shop.name}</td>
              <td className="px-4 py-2 text-sm text-gray-600">
                {shop.description}
              </td>
              <td className="px-4 py-2 text-sm text-gray-600">
                {shop.address}
              </td>
              <td className="px-4 py-2 space-x-2 text-sm flex">
                <button
                  onClick={() => handleEdit(shop.id)}
                  className="hover:cursor-pointer"
                >
                  Edit
                </button>

                <p>|</p>

                <button
                  onClick={() => handleDelete(shop.id)}
                  className="text-red-400 hover:cursor-pointer"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default page
