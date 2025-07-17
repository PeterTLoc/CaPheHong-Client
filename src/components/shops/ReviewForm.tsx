import React, { useState } from "react"
import { Star } from "lucide-react"
import axios from "axios"

interface ReviewFormProps {
  shopId: number
  onReviewSubmitted: () => void
  user?: any
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  shopId,
  onReviewSubmitted,
  user,
}) => {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState("")
  const [error, setError] = useState("")
  const [posting, setPosting] = useState(false)

  const handleSubmit = async () => {
    setError("")
    if (!rating) {
      setError("Please select a star rating.")
      return
    }
    if (!comment.trim()) {
      setError("Please enter your review comment.")
      return
    }
    try {
      setPosting(true)
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/shop/${shopId}/add_review/`,
        {
          rating,
          title: "",
          content: comment,
        },
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      setComment("")
      setRating(0)
      onReviewSubmitted()
    } catch (error: any) {
      let message = "Failed to submit review."
      if (error?.response?.data) {
        const data = error.response.data
        if (typeof data === "string") {
          message = data
        } else if (data.error) {
          message = data.error
        } else if (data.detail) {
          message = data.detail
        } else if (typeof data === "object") {
          message = Object.values(data).flat().join(" ")
        }
      }
      setError(message)
    } finally {
      setPosting(false)
    }
  }

  if (!user) return null

  return (
    <div className="">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-sm font-semibold">Your Rating</span>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={20}
              className={`cursor-pointer ${
                (hoverRating || rating) >= star
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review..."
        className="text-sm w-full border border-[#E5E5E5] rounded-[5px] p-5 focus:border-[#6F4E37] focus:border focus:outline-none"
        rows={3}
      />

      <button
        onClick={handleSubmit}
        disabled={posting}
        className="button-brown"
      >
        {posting ? "Submitting..." : "Submit Review"}
      </button>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  )
}

export default ReviewForm
