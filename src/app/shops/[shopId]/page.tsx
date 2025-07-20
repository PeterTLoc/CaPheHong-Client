"use client"

import { useParams, useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { Star } from "lucide-react"
import axios from "axios"
import { useAuth } from "@/context/AuthContext"
import { Review } from "@/types/shop"
import { Shop } from "@/types/shop"
import ReviewForm from "@/components/shop/review/ReviewForm"
import ReviewList from "@/components/shop/review/ReviewList"
import ShopOverview from "@/components/shop/ShopOverview"
import dynamic from "next/dynamic"
import Breadcrumb from "@/components/ui/BreadCrumb"
import { motion } from "framer-motion"
import { fetchShopById } from "@/services/shopService"
import ReviewModal from "@/components/shop/review/ReviewModal"
import Spinner from "@/components/ui/Spinner"

const ShopMap = dynamic(() => import("@/components/shop/ShopMap"), { ssr: false })

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
      } catch (err) {
        // Optionally handle error
      }
    }
    fetchReviews()
  }, [shopId])

  if (loading) return <Spinner />
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>
  if (!shop) return <div className="text-center py-10">Shop not found.</div>

  return (
    <div className="max-w-[1000px] mx-auto">
      <Breadcrumb
        items={[{ label: "Shops", href: "/shops" }, { label: shop.title }]}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* contents */}
        <div className="flex flex-col gap-1">
          <div className="flex flex-col gap-2">
            <ShopOverview
              src={
                shop.banner ||
                "https://plus.unsplash.com/premium_photo-1672987719865-b34bae00f8a4?q=80&w=1121&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt={shop.title}
              avgRating={avgRating}
              totalReviews={totalReviews}
              address={shop.map?.address}
              description={shop.body}
            />
          </div>

          <div>
            <p className="subtitle">
              Map View
            </p>
            <div>
              {shop.map ? (
                <ShopMap
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

          <div>
            <h2 className="subtitle">
              Reviews
            </h2>
            {/* Review list */}
            <div className="max-w-[1000px]">
              <div className="container-top flex justify-between items-center h-[69px]">
                <div className="text-[13px]">
                  <span>{totalReviews ?? 0} reviews</span>
                </div>
                
                {user ? (
                  <button
                    onClick={() => setShowReviewModal(true)}
                    className="button-brown cursor-pointer"
                  >
                    Add Review
                  </button>
                ) : (
                  <button
                    onClick={() => router.push("/login")}
                    className="button-brown cursor-pointer"
                  >
                    Add Review
                  </button>
                )}
              </div>
              <div className="container-bottom">
                <ReviewList reviews={reviews} />
              </div>
            </div>
          </div>
        </div>

        {/* Review Modal */}
        {showReviewModal && shop?.id && (
          <ReviewModal
            shopId={shop.id}
            user={user}
            onClose={() => setShowReviewModal(false)}
            onReviewSubmitted={(newReviews, newAvg, newTotal) => {
              setReviews(newReviews)
              setAvgRating(newAvg)
              setTotalReviews(newTotal)
              setShowReviewModal(false)
            }}
          />
        )}
      </motion.div>
    </div>
  )
}
export default page

