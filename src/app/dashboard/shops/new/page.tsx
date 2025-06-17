"use client"

import { useState, useEffect } from "react"
import axios from "axios"

const AddShopPage = () => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const textarea = e.target
    textarea.style.height = "auto" // Reset height
    textarea.style.height = `${textarea.scrollHeight}px` // Set to content height
    setDescription(e.target.value)
  }

  useEffect(() => {
    // Generate preview when image changes
    if (image) {
      const objectUrl = URL.createObjectURL(image)
      setPreviewUrl(objectUrl)

      return () => URL.revokeObjectURL(objectUrl) // Cleanup
    }
  }, [image])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const token = localStorage.getItem("accessToken")
    if (!token) {
      alert("Not authenticated")
      return
    }

    const formData = new FormData()
    formData.append("name", name)
    formData.append("description", description)
    formData.append("location", location)
    if (image) {
      formData.append("image", image)
    }

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/shops/`,
        formData,
        {
          headers: {
            Authorization: `JWT ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      alert("Shop submitted!")
      setName("")
      setDescription("")
      setLocation("")
      setImage(null)
      setPreviewUrl(null)
    } catch (err) {
      console.error(err)
      alert("Error submitting shop.")
    }
  }

  return (
    <div>
      <h1 className="title">Add New Shop</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
        {/* LEFT: Image Preview */}
        <div className="container">
          <div className="w-full h-full overflow-hidden">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover rounded-[5px]"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#5F5F5F] text-[13px]">
                No image selected
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Form */}
        <div className="container">
          <form onSubmit={handleSubmit} className="flex flex-col gap-[10px]">
            <div className="flex justify-between items-center">
              <p className="text-[13px]">Name</p>
              <input
                placeholder="Shop Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input w-[280px]"
                required
              />
            </div>

            <div className="flex justify-between items-start gap-4">
              <p className="text-[13px]">Description</p>
              <textarea
                placeholder="Description"
                value={description}
                onChange={handleDescriptionChange}
                className="input w-[280px] overflow-hidden resize-none"
                required
              />
            </div>

            <div className="flex justify-between items-center gap-4">
              <p className="text-[13px]">Location</p>
              <input
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="input w-[280px]"
                required
              />
            </div>

            <div className="flex justify-between items-center gap-4">
              <p className="text-[13px]">Choose an image</p>
              <div className="relative w-[280px]">
                <label
                  htmlFor="imageUpload"
                  className="button p-3 text-center block w-full hover:bg-gray-100 cursor-pointer"
                >
                  Browse image
                </label>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) setImage(file)
                  }}
                  className="hidden"
                />
              </div>
            </div>

            <button type="submit" className="button hover:cursor-pointer">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddShopPage
