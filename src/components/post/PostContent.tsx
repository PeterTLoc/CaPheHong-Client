import { User, ArrowUp, ArrowDown, MessageCircle } from "lucide-react"
import { Post } from "@/services/postService"

interface PostContentProps {
  post: Post
  userVote: 1 | -1 | 0
  isVoting: boolean
  handleUpvote: (e?: React.MouseEvent) => void
  handleDownvote: (e?: React.MouseEvent) => void
  commentCount: number
  timeAgo: (date: string) => string
}

export default function PostContent({ post, userVote, isVoting, handleUpvote, handleDownvote, commentCount, timeAgo }: PostContentProps) {
  return (
    <div className="container flex flex-col max-w-[1000px]">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-5 h-5 rounded-full bg-[#F3F3F3] flex items-center justify-center border border-[#B0B0B0]">
          <User size={20} className="text-[#B0B0B0]" />
        </div>
        <span className="text-[13px] font-semibold text-[#444]">
          {post.author?.name || "Unknown"}
        </span>
        <span className="text-[11px] text-[#8B8B8B]">
          {timeAgo(post.created_at)}
        </span>
      </div>
      <div className="flex items-center gap-2 my-1">
        <span className="font-bold">{post.title}</span>
      </div>
      <div className="text-[13px] mb-3 line-clamp-3">{post.content}</div>
      <div className="flex gap-2 mb-1">
        <div className="flex items-stretch justify-between bg-[#FEFEFE] border border-[#ECECEC] rounded-[5px] min-h-[32px] min-w-[90px] text-[12px]">
          <button
            onClick={handleUpvote}
            disabled={userVote !== 0 || isVoting}
            className="flex-1 flex items-center justify-center gap-1 rounded-[3px] cursor-pointer transition-colors h-full hover:bg-[#F3F3F3]"
          >
            <ArrowUp size={16} className="hover:text-brown-700" />
            <span className="font-semibold">{post.upvotes}</span>
          </button>
          <div className="border-l border-[#ECECEC] h-full" />
          <button
            onClick={handleDownvote}
            disabled={userVote !== 0 || isVoting}
            className="flex-1 flex items-center justify-center gap-1 rounded-[3px] cursor-pointer transition-colors h-full hover:bg-[#F3F3F3]"
          >
            <ArrowDown size={16} className="hover:text-brown-700" />
            <span className="font-semibold">{post.downvotes}</span>
          </button>
        </div>
        <div className="flex items-center gap-1 bg-[#FEFEFE] border border-[#ECECEC] rounded-[5px] min-h-[32px] min-w-[90px] px-2 text-[12px] hover:bg-[#F3F3F3] cursor-pointer transition-colors">
          <MessageCircle size={14} />
          <span>{commentCount} comments</span>
        </div>
      </div>
    </div>
  )
} 