"use client"

import React from "react"
import axios from "axios"
import ReviewForm from "@/components/shop/review/ReviewForm"
import { Review } from "@/types/shop"

interface ReviewModalProps {
  shopId: number
  user: any
  onClose: () => void
  onReviewSubmitted: (reviews: Review[], avgRating: number, totalReviews: number) => void
}

const ReviewModal: React.FC<ReviewModalProps> = ({ shopId, user, onClose, onReviewSubmitted }) => {
  const handleReviewSubmitted = async () => {
    // Refetch reviews and average rating after submission
    const token = localStorage.getItem("accessToken")
    const [reviewsRes, avgRes] = await Promise.all([
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/shop/${shopId}/reviews/`,
        token ? { headers: { Authorization: `JWT ${token}` } } : {}),
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/shop/${shopId}/average_rating/`,
        token ? { headers: { Authorization: `JWT ${token}` } } : {}),
    ])
    onReviewSubmitted(reviewsRes.data, avgRes.data.average_rating, avgRes.data.total_reviews)
  }

  return (
    <div className="fixed inset-0 bg-black/5 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-[5px] p-5 w-full max-w-md mx-4 shadow-lg">
        <div className="flex justify-between items-center mb-[10px]">
          <h2 className="text-xl font-bold">Write a Review</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            ✕
          </button>
        </div>
        <ReviewForm
          shopId={shopId}
          onReviewSubmitted={handleReviewSubmitted}
          user={user}
        />
      </div>
    </div>
  )
}

export default ReviewModal 