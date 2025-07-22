"use client"

import React, { useState, useEffect } from "react"
import { createShop } from "@/services/shopService"
import { Shop, ShopPayload } from "@/types/shop"
import { slugify } from "@/utils/slugify"

interface ShopAddModalProps {
  onShopAdded: (shop: Shop) => void
}

const ShopAddModal: React.FC<ShopAddModalProps> = ({ onShopAdded }) => {
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [bannerFile, setBannerFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [mapName, setMapName] = useState("")
  const [address, setAddress] = useState("")
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const t = e.target
    t.style.height = "auto"
    t.style.height = `${t.scrollHeight}px`
    setBody(t.value)
  }

  useEffect(() => {
    if (!bannerFile) {
      setPreviewUrl(null)
      return
    }
    const url = URL.createObjectURL(bannerFile)
    setPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [bannerFile])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!bannerFile) {
      alert("Please select an image file.")
      return
    }

    const payload: ShopPayload = {
      title,
      body,
      slug: slugify(title),
      banner: bannerFile,
      map: {
        name: mapName,
        address: address,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
    }

    try {
      const newShop = await createShop(payload)
      onShopAdded(newShop)
      alert("Shop submitted!")

      setTitle("")
      setBody("")
      setBannerFile(null)
      setShowForm(false)
    } catch (err) {
      console.error(err)
      alert("Error submitting shop.")
    }
  }

  return (
    <div className="mb-1">
      {/* Trigger button */}
      <div className="section">
        <div className="section-text">Add a new shop</div>
        <button className="button-brown" onClick={() => setShowForm(true)}>
          Add Shop
        </button>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-4 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-lg relative">
            {/* Close button */}
            <button
              className="absolute top-3 right-3 text-sm text-gray-500 hover:text-black"
              onClick={() => setShowForm(false)}
            >
              ✕
            </button>

            {/* Title */}
            <h2 className="text-xl font-semibold mb-4">Add Shop</h2>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {/* Preview */}
              <div className="w-full h-64 overflow-hidden rounded">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-sm text-gray-400">
                    No image selected
                  </div>
                )}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <label className="flex flex-col text-sm gap-1">
                  Title
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Shop title"
                    className="input"
                    required
                  />
                </label>

                <label className="flex flex-col text-sm gap-1">
                  Body
                  <textarea
                    value={body}
                    onChange={handleBodyChange}
                    placeholder="Shop description"
                    className="input resize-none"
                    rows={3}
                    required
                  />
                </label>

                <label className="flex flex-col text-sm gap-1">
                  Map Name
                  <input
                    type="text"
                    value={mapName}
                    onChange={(e) => setMapName(e.target.value)}
                    placeholder="e.g., Starbucks at Market St"
                    className="input"
                    required
                  />
                </label>

                <label className="flex flex-col text-sm gap-1">
                  Address
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 Market St, SF"
                    className="input"
                    required
                  />
                </label>

                <label className="flex flex-col text-sm gap-1">
                  Latitude
                  <input
                    type="number"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    className="input"
                    required
                  />
                </label>

                <label className="flex flex-col text-sm gap-1">
                  Longitude
                  <input
                    type="number"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    className="input"
                    required
                  />
                </label>

                <label className="flex flex-col text-sm gap-1">
                  Banner Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      setBannerFile(file || null)
                    }}
                    required
                    className="input"
                  />
                  {bannerFile && (
                    <span className="text-xs text-gray-500 mt-1 truncate">
                      {bannerFile.name}
                    </span>
                  )}
                </label>

                <button type="submit" className="button mt-2">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShopAddModal
