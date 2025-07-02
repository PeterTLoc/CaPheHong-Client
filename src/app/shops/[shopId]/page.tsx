"use client"

import { useParams, useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { MapPin } from "lucide-react"
import dynamic from "next/dynamic"
import { Shop } from "@/types/shop"
import { fetchShopById } from "@/services/shopService"
import { postComment } from "@/services/commentService"
import { parseAxiosError } from "@/utils/apiErrors"

const Map = dynamic(() => import("@/components/shops/Map"), { ssr: false })

const page = () => {
  const { shopId } = useParams()
  const router = useRouter()

  const [shop, setShop] = useState<Shop | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newComment, setNewComment] = useState("")
  const [posting, setPosting] = useState(false)

  useEffect(() => {
    const loadShop = async () => {
      if (!shopId) return

      try {
        const data = await fetchShopById(Number(shopId))
        setShop(data)
      } catch (err: any) {
        setError(err.message || "Failed to load shop.")
      } finally {
        setLoading(false)
      }
    }

    loadShop()
  }, [shopId])

  if (loading) return <div className="text-center py-10">Loading...</div>
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>
  if (!shop) return <div className="text-center py-10">Shop not found.</div>

  return (
    <div className="px-5">
      <div className="max-w-[1000px] mx-auto">
        <div className="title">
          <span
            onClick={() => router.push("/shops")}
            className="text-[#5F5F5F] hover:cursor-pointer hover:text-black"
          >
            Shops
          </span>
          <span className="mx-4">›</span>
          <span>{shop.title}</span>
        </div>

        {/* contents */}
        <div className="flex flex-col gap-1">
          <div className="grid grid-cols-2 gap-1">
            <img
              src="https://t4.ftcdn.net/jpg/01/05/90/77/360_F_105907729_4RzHYsHJ2UFt5koUI19fc6VzyFPEjeXe.jpg"
              alt={shop.title}
              className="w-full h-[300px] object-cover rounded-[5px]"
            />

            <div className="container text-sm space-y-4">
              <div>
                <h1 className="text-[22px] font-bold">{shop.title}</h1>
                {shop.map && (
                  <p className="text-[#616161] flex items-center gap-1">
                    <MapPin size={16} strokeWidth={1} />
                    {shop.map.address}
                  </p>
                )}
              </div>
              <p className="text-[#333]">{shop.body}</p>
            </div>
          </div>

          <div>
            <p className="subtitle">Map View</p>
            <div className="container">
              {shop.map ? (
                <Map
                  destination={{
                    lat: shop.map.latitude,
                    lng: shop.map.longitude,
                  }}
                />
              ) : (
                <p className="text-sm text-gray-500">
                  No location data available for this shop.
                </p>
              )}
            </div>
          </div>

          <h2 className="subtitle">Reviews & Comments</h2>
          <div className="container space-y-4">
            {shop.comments.length === 0 ? (
              <p className="text-sm text-gray-500">No comments yet.</p>
            ) : (
              <ul className="space-y-2">
                {shop.comments.map((comment) => (
                  <li
                    key={comment.id}
                    className="border border-gray-200 rounded-lg p-3 bg-gray-50"
                  >
                    <div className="text-sm font-semibold">
                      {comment.author}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(comment.created_at).toLocaleString()}
                    </div>
                    <p className="text-sm mt-1">{comment.content}</p>
                  </li>
                ))}
              </ul>
            )}

            {/* Always show the form below */}
            <div className="space-y-2 mt-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write your comment..."
                className="w-full border rounded-lg p-2 text-sm"
                rows={3}
              />

              <button
                onClick={async () => {
                  if (!newComment.trim()) return
                  if (!shop) return

                  try {
                    setPosting(true)
                    const newCmt = await postComment(shop.id, newComment)

                    setShop({
                      ...shop,
                      comments: [...shop.comments, newCmt],
                    })
                    setNewComment("")
                  } catch (error) {
                    const parsed = parseAxiosError(error)
                    console.error("Post comment failed:", parsed.message)
                  } finally {
                    setPosting(false)
                  }
                }}
                disabled={posting}
                className="px-3 py-1 text-sm bg-[#6F4E37] text-white rounded hover:opacity-80 disabled:opacity-50"
              >
                {posting ? "Posting..." : "Post Comment"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
