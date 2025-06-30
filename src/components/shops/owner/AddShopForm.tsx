"use client"

import React, { useState, useEffect } from "react"
import { createShop } from "@/services/shopService"
import { Shop, ShopPayload } from "@/types/shop"
import { slugify } from "@/utils/slugify"

interface AddShopFormProps {
  onShopAdded: (shop: Shop) => void
}

const AddShopForm: React.FC<AddShopFormProps> = ({ onShopAdded }) => {
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [bannerFile, setBannerFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

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
    <div>
      <div className="section mb-1">
        <div className="section-text">Add a new shop</div>
        <button className="button-brown" onClick={() => setShowForm((p) => !p)}>
          {showForm ? "Cancel" : "Add Shop"}
        </button>
      </div>

      {showForm && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-1 mt-1">
          {/* preview */}
          <div className="container w-full h-64 overflow-hidden">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover rounded-[5px]"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-[13px] subtext">
                No image selected
              </div>
            )}
          </div>

          {/* form */}
          <div className="container">
            <form onSubmit={handleSubmit} className="flex flex-col gap-[10px]">
              <label className="flex justify-between items-center">
                <span className="text-[13px]">Title</span>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Shop title"
                  className="input w-full max-w-[280px]"
                  required
                />
              </label>

              <label className="flex justify-between items-start gap-4">
                <span className="text-[13px]">Body</span>
                <textarea
                  value={body}
                  onChange={handleBodyChange}
                  placeholder="Shop description"
                  className="input w-full max-w-[280px] resize-none"
                  rows={3}
                  required
                />
              </label>

              <label className="flex justify-between items-center gap-4">
                <span className="text-[13px]">Banner image</span>

                <div className="relative">
                  <label className="button cursor-pointer">
                    <button className="button">Browse image</button>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        setBannerFile(file || null)
                      }}
                      required
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </label>

                  {bannerFile && (
                    <div className="text-[12px] text-gray-600 mt-1 truncate max-w-[200px]">
                      {bannerFile.name}
                    </div>
                  )}
                </div>
              </label>

              <button type="submit" className="button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddShopForm
