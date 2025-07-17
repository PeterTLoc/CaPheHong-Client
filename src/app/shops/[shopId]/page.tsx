"use client"

import { useParams, useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { MapPin, Star, Info, AlignLeft } from "lucide-react"
import dynamic from "next/dynamic"
import { Shop } from "@/types/shop"
import { fetchShopById } from "@/services/shopService"
import { parseAxiosError } from "@/utils/apiErrors"
import axios from "axios"
import { useAuth } from "@/context/AuthContext"
import { Review } from "@/types/shop"
import ReviewForm from "@/components/shops/ReviewForm"
import ReviewList from "@/components/shops/ReviewList"

const Map = dynamic(() => import("@/components/shops/Map"), { ssr: false })

const page = () => {
  // Place all hooks at the top, unconditionally
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [shop, setShop] = useState<Shop | null>(null)
  const [avgRating, setAvgRating] = useState<number | null>(null)
  const [totalReviews, setTotalReviews] = useState<number | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const { user } = useAuth()
  const { shopId } = useParams()
  const router = useRouter()

  // Fetch shop details
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

  // Fetch average rating
  useEffect(() => {
    const fetchAvg = async () => {
      if (!shopId) return
      try {
        const token = localStorage.getItem("accessToken")
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/shop/${shopId}/average_rating/`,
          token ? { headers: { Authorization: `JWT ${token}` } } : {}
        )
        setAvgRating(res.data.average_rating)
        setTotalReviews(res.data.total_reviews)
      } catch {}
    }
    fetchAvg()
  }, [shopId, shop])

  // Fetch reviews on page load and when shopId changes
  useEffect(() => {
    const fetchReviews = async () => {
      if (!shopId) return
      try {
        const token = localStorage.getItem("accessToken")
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/shop/${shopId}/reviews/`,
          token ? { headers: { Authorization: `JWT ${token}` } } : {}
        )
        setReviews(res.data)
        console.log("Fetched reviews:", res.data) // Debug log
      } catch (err) {
        // Optionally handle error
      }
    }
    fetchReviews()
  }, [shopId])

  if (loading) return <div className="text-center py-10">Loading...</div>
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>
  if (!shop) return <div className="text-center py-10">Shop not found.</div>

  // Only display reviews in the feedback list
  const getFeedbacks = () => {
    return (reviews || [])
      .map((r) => ({ ...r, type: "review" }))
      .sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      )
  }

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
              // src={shop.banner}
              src={
                "https://plus.unsplash.com/premium_photo-1672987719865-b34bae00f8a4?q=80&w=1121&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt={shop.title}
              className="w-full h-[300px] object-cover rounded-[5px]"
            />

            {/* Shop info: single column label-value layout with icons */}
            <div className="flex flex-col gap-5 bg-white rounded-[5px] p-6 shadow-sm">
              <div>
                <div className="flex items-center gap-1 text-[#888] font-semibold text-xs mb-1">
                  <MapPin size={14} className="inline-block" /> Address
                </div>
                <div className="text-sm">{shop.map?.address || "N/A"}</div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-[#888] font-semibold text-xs mb-1">
                  <AlignLeft size={14} className="inline-block" /> Description
                </div>
                <div className="text-sm">{shop.body}</div>
              </div>
            </div>
          </div>

          <div>
            <p className="subtitle">Map View</p>
            <div className="max-w-[1000px]">
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

          <h2 className="subtitle">Reviews</h2>

          <div className="container max-w-[1000px]">
            {/* Review form (only for logged-in users) */}
            <ReviewForm
              shopId={shop?.id}
              onReviewSubmitted={() => {
                // Refetch reviews and average rating after submission
                const fetchReviews = async () => {
                  if (!shop?.id) return
                  const token = localStorage.getItem("accessToken")
                  const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/shop/${shop.id}/reviews/`,
                    token ? { headers: { Authorization: `JWT ${token}` } } : {}
                  )
                  setReviews(res.data)
                }
                const fetchAvg = async () => {
                  if (!shop?.id) return
                  const token = localStorage.getItem("accessToken")
                  const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/shop/${shop.id}/average_rating/`,
                    token ? { headers: { Authorization: `JWT ${token}` } } : {}
                  )
                  setAvgRating(res.data.average_rating)
                  setTotalReviews(res.data.total_reviews)
                }
                fetchReviews()
                fetchAvg()
              }}
              user={user}
            />
          </div>

          {/* Review list */}
          <div className="container max-w-[1000px]">
            {/* Average rating display (unchanged) */}
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold">Average Rating:</span>
              {avgRating !== null ? (
                <span className="flex items-center gap-1">
                  {avgRating}{" "}
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-xs text-gray-500">
                    ({totalReviews} reviews)
                  </span>
                </span>
              ) : (
                <span className="text-xs text-gray-500">No reviews yet.</span>
              )}
            </div>
            <ReviewList reviews={reviews} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
