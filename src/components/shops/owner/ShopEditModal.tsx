import React, { useState } from "react"
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
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="w-[90%] max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-5 max-h-[90vh] overflow-y-auto space-y-4">
          <h2 className="text-xl font-bold">Edit Shop</h2>

          {/* Banner Upload */}
          <div>
            <label className="text-[13px] block mb-1">Image</label>
            <div className="mb-2">
              <img
                src={previewUrl || shop.banner}
                alt="Banner Preview"
                className="w-full h-40 object-cover rounded-[5px]"
              />
            </div>
            <div className="flex items-center gap-3">
              <label
                htmlFor="shop-image-upload"
                className="text-center min-w-[130px] min-h-[32px] pt-[7px] w-fit rounded-[5px] text-[13px] text-white bg-[#6F4E37] hover:opacity-75 cursor-pointer"
              >
                Browse Image
              </label>
              <span className="text-sm text-gray-500">
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
          </div>

          {/* Title */}
          <div>
            <label className="text-[13px] block mb-1">Title</label>
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full pt-[5px] pb-[3px] px-3 rounded-[5px] text-[13px] bg-[#FBFBFB] border border-[#E5E5E5] outline-none focus:border-[#6F4E37] focus:bg-white"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-[13px] block mb-1">Description</label>
            <textarea
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
              rows={3}
              className="w-full pt-[5px] pb-[3px] px-3 rounded-[5px] text-[13px] bg-[#FBFBFB] border border-[#E5E5E5] outline-none focus:border-[#6F4E37] focus:bg-white"
            />
          </div>

          {/* Map Placeholder */}
          <div>
            <label className="text-[13px] block mb-1">Location</label>
            <div className="h-40 w-full border border-dashed border-gray-300 rounded flex items-center justify-center text-gray-400 text-sm">
              Map selector coming soon...
            </div>
          </div>

          {/* Actions */}
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
  )
}

export default ShopEditModal
