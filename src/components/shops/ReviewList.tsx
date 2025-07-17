import React from "react"
import { Star } from "lucide-react"
import { Review } from "@/types/shop"

interface ReviewListProps {
  reviews: Review[]
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <p className="text-sm text-gray-500">No reviews yet.</p>
  }
  return (
    <ul className="space-y-10">
      {reviews.map((review) => (
        <li
          key={review.id}
          className="flex flex-col"
        >
          <div className="flex items-center gap-1 mb-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={13}
                className={
                  review.rating >= star
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
          </div>

          <div className="flex items-center gap-[10px]">
            <div className="text-[13px] font-bold">{review.author}</div>
            <div className="text-xs text-[#8B8B8B]">{new Date(review.created_at).toLocaleString()}</div>
          </div>

          <p className="text-[13px]">{review.content}</p>
        </li>
      ))}
    </ul>
  )
}

export default ReviewList
