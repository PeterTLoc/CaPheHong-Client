import { Comment as CommentType } from "@/services/commentService"
import CommentItem from "../comment/CommentItem"

interface RepliesProps {
  replies: CommentType[]
  onReply: (comment: CommentType) => void
  onVote: (commentId: number, voteType: 1 | -1) => void
}

export default function Replies({ replies, onReply, onVote }: RepliesProps) {
  if (!replies || replies.length === 0) return null
  return (
    <div className="ml-6 mt-2 space-y-2">
      {[...replies].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).map((reply) => (
        <CommentItem key={reply.id} comment={reply} onReply={onReply} onVote={onVote} />
      ))}
    </div>
  )
} 