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
import ShopOverview from "@/components/shops/ShopOverview"

const Map = dynamic(() => import("@/components/shops/Map"), { ssr: false })

const page = () => {
  // Place all hooks at the top, unconditionally
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [shop, setShop] = useState<Shop | null>(null)
  const [avgRating, setAvgRating] = useState<number | null>(null)
  const [totalReviews, setTotalReviews] = useState<number | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [showReviewModal, setShowReviewModal] = useState(false)
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

  const fallbackImage =
    "https://plus.unsplash.com/premium_photo-1672987719865-b34bae00f8a4?q=80&w=1121&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

  return (
    <div className="max-w-[1000px] mx-auto">
      <div id="overview" className="title">
        <span
          onClick={() => router.push("/shops")}
          className="text-[#5F5F5F] hover:cursor-pointer hover:text-black"
        >
          Shops
        </span>
        <span className="mx-4">›</span>
        <span id="overview-title">{shop.title}</span>
      </div>

      {/* contents */}
      <div className="flex flex-col gap-1">
        <div className="flex flex-col gap-2">
          <ShopOverview
            src={shop.banner || fallbackImage}
            // src={fallbackImage}
            alt={shop.title}
            avgRating={avgRating}
            totalReviews={totalReviews}
            address={shop.map?.address}
            description={shop.body}
          />
        </div>

        <div id="map">
          <p id="map-subtitle" className="subtitle">
            Map View
          </p>
          <div>
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

        <div id="reviews">
          <h2 id="reviews-subtitle" className="subtitle">
            Reviews
          </h2>

          {/* Review list */}
          <div className="container">
            {/* Header with Add Review button */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
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
              {user ? (
                <button 
                  onClick={() => setShowReviewModal(true)}
                  className="button-brown"
                >
                  Add Review
                </button>
              ) : (
                <button 
                  onClick={() => router.push('/login')}
                  className="button-brown"
                >
                  Add Review
                </button>
              )}
            </div>
            
            <ReviewList reviews={reviews} />
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/5 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-[5px] p-5 w-full max-w-md mx-4 shadow-lg">
            <div className="flex justify-between items-center mb-[10px]">
              <h2 className="text-xl font-bold">Write a Review</h2>
              <button 
                onClick={() => setShowReviewModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <ReviewForm
              shopId={shop?.id}
              onReviewSubmitted={() => {
                setShowReviewModal(false)
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
        </div>
      )}
    </div>
  )
}

export default page
