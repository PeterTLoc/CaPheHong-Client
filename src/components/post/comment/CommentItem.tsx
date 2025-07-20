import { User, ArrowUp, ArrowDown, MessageCircle } from "lucide-react"
import { Comment as CommentType } from "@/services/commentService"
import TimeAgo from "@/utils/TimeAgo"
import Replies from "../reply/ReplyList"

interface CommentItemProps {
  comment: CommentType
  onReply: (coment: CommentType) => void
  onVote: (commentId: number, voteType: 1 | -1) => void
}

export default function CommentItem({
  comment,
  onReply,
  onVote,
}: CommentItemProps) {
  return (
    <div className="flex gap-3">
      <div className="w-5 h-5 rounded-full bg-[#F3F3F3] flex items-center justify-center border border-[#B0B0B0]">
        <User size={20} className="text-[#B0B0B0]" />
      </div>
      <div>
        <div className="text-[13px] font-semibold flex items-center gap-2">
          {typeof comment.author === "object" &&
          comment.author !== null &&
          "name" in comment.author
            ? (comment.author as { name: string }).name
            : comment.author}
          <span className="text-[11px] text-gray-400">
            <TimeAgo date={comment.created_at} />
          </span>
        </div>
        <div className="text-[13px]">{comment.content}</div>
        <div className="flex gap-2 mt-1">
          <div className="flex items-stretch justify-between bg-[#FEFEFE] border border-[#ECECEC] rounded-[5px] min-h-[32px] min-w-[90px] text-[12px]">
            <button
              onClick={() => onVote(comment.id, 1)}
              className="flex-1 flex items-center justify-center gap-1 rounded-[3px] cursor-pointer transition-colors h-full hover:bg-[#F3F3F3]"
            >
              <ArrowUp size={16} className="hover:text-brown-700" />
              <span className="font-semibold">{comment.upvotes}</span>
            </button>
            <div className="border-l border-[#ECECEC] h-full" />
            <button
              onClick={() => onVote(comment.id, -1)}
              className="flex-1 flex items-center justify-center gap-1 rounded-[3px] cursor-pointer transition-colors h-full hover:bg-[#F3F3F3]"
            >
              <ArrowDown size={16} className="hover:text-brown-700" />
              <span className="font-semibold">{comment.downvotes}</span>
            </button>
          </div>
          <div
            className="flex items-center gap-1 bg-[#FEFEFE] border border-[#ECECEC] rounded-[5px] min-h-[32px] px-2 text-[12px] hover:bg-[#F3F3F3] cursor-pointer transition-colors"
            onClick={() => onReply(comment)}
          >
            <MessageCircle size={14} />
            <span>
              {comment.replies && comment.replies.length > 0
                ? ` ${comment.replies.length}`
                : ""}{" "}
              replies
            </span>
          </div>
        </div>
        {/* Render replies recursively if present */}
        <Replies
          replies={comment.replies || []}
          onReply={onReply}
          onVote={onVote}
        />
      </div>
    </div>
  )
}
