import React, { useState, useEffect } from "react"
import { Shop, ShopUpdatePayload } from "@/types/shop"

interface Props {
  open: boolean
  shop: Shop
  onCancel: () => void
  onSave: (updated: ShopUpdatePayload) => void
}

const ShopEditModal: React.FC<Props> = ({ open, shop, onCancel, onSave }) => {
  const [editTitle, setEditTitle] = useState(shop.title)
  const [editBody, setEditBody] = useState(shop.body)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [bannerFile, setBannerFile] = useState<File | null>(null)

  useEffect(() => {
    setEditTitle(shop.title)
    setEditBody(shop.body)
    setPreviewUrl(null)
    setBannerFile(null)
  }, [shop])

  const handleSave = () => {
    const payload: ShopUpdatePayload = {
      title: editTitle,
      body: editBody,
      banner: bannerFile ?? shop.banner,
    }

    onSave(payload)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-4 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-lg relative">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-sm text-gray-500 hover:text-black"
          onClick={onCancel}
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">Edit Shop</h2>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {/* Image preview */}
          <div className="w-full h-64 overflow-hidden rounded">
            {previewUrl || shop.banner ? (
              <img
                src={previewUrl || shop.banner}
                alt="Preview"
                className="w-full h-full object-cover rounded"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-sm text-gray-400">
                No image selected
              </div>
            )}
          </div>

          {/* Form section */}
          <div className="flex flex-col gap-3">
            <label className="flex flex-col text-sm gap-1">
              Title
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="input"
              />
            </label>

            <label className="flex flex-col text-sm gap-1">
              Description
              <textarea
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
                className="input resize-none"
                rows={3}
              />
            </label>

            <label className="flex flex-col text-sm gap-1">
              Banner Image
              <div className="flex items-center gap-3">
                <label
                  htmlFor="shop-image-upload"
                  className="button cursor-pointer"
                >
                  Browse Image
                </label>
                <span className="text-sm text-gray-500 truncate max-w-[200px]">
                  {bannerFile?.name || "No image selected"}
                </span>
              </div>
              <input
                id="shop-image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    setBannerFile(file)
                    setPreviewUrl(URL.createObjectURL(file))
                  }
                }}
              />
            </label>

            <div>
              <label className="text-sm block mb-1">Location</label>
              <div className="h-40 w-full border border-dashed border-gray-300 rounded flex items-center justify-center text-gray-400 text-sm">
                Map selector coming soon...
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2 text-sm">
              <button onClick={onCancel} className="button">
                Cancel
              </button>
              <button onClick={handleSave} className="button-brown">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopEditModal
