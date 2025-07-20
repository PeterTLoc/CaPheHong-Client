import { Star } from "lucide-react"

type ShopOverviewProps = {
  src: string
  alt: string
  avgRating: number | null
  totalReviews: number | null
  address?: string
  description?: string
}

const ShopOverview = ({
  src,
  alt,
  avgRating,
  totalReviews,
  address,
  description,
}: ShopOverviewProps) => (
  <div className="flex flex-col gap-2">
    <img
      className="w-[500px] aspect-[16/9] object-cover rounded-[5px]"
      src={src}
      alt={alt}
    />

    <div className="flex flex-col gap-2 bg-white rounded-[5px] p-6 shadow-sm justify-center">
      <div className="flex items-start gap-4 text-[13px]">
        <span className="font-semibold text-[#888] min-w-[110px]">
          Average Review
        </span>
        <span className="flex items-center gap-2">
          {avgRating !== null ? (
            <>
              <div className="flex gap-1">
                <span>{avgRating}</span>
                <Star size={16} className="text-yellow-400 fill-yellow-400" />
              </div>
              <span className="text-[11px] subtext">
                ({totalReviews} reviews)
              </span>
            </>
          ) : (
            <span className="text-xs text-gray-500">No reviews yet.</span>
          )}
        </span>
      </div>
      <div className="flex items-start gap-4 text-[13px]">
        <span className="font-semibold text-[#888] min-w-[110px]">Address</span>
        <span className="flex flex-col gap-1">
          {address
            ? address
                .split(",")
                .map((part, idx) => <span key={idx}>{part.trim()}</span>)
            : "N/A"}
        </span>
      </div>
      <div className="flex items-start gap-4 text-[13px]">
        <span className="font-semibold text-[#888] min-w-[110px]">
          Description
        </span>
        <span>{description}</span>
      </div>
    </div>
  </div>
)

export default ShopOverview
