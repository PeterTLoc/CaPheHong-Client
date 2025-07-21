import CommentItem from "./CommentItem"
import { Comment as CommentType } from "@/services/commentService"

interface CommentListProps {
  comments: CommentType[]
  onReply: (comment: CommentType) => void
  onVote: (commentId: number, voteType: 1 | -1) => void
  timeAgo: (date: string) => string
}

export default function CommentList({ comments, onReply, onVote, timeAgo }: CommentListProps) {
  const sortedComments = [...comments].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  if (sortedComments.length === 0) {
    return <div className="subtext text-xs">No comments yet.</div>
  }
  return (
    <div className="space-y-5">
      {sortedComments.map((c) => (
        <CommentItem key={c.id} comment={c} onReply={onReply} onVote={onVote} />
      ))}
    </div>
  )
} 