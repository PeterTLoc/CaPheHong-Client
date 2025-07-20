import { Comment as CommentType } from "@/services/commentService"

interface ReplyModalProps {
  open: boolean
  replyingToComment: CommentType | null
  replyContent: string
  setReplyContent: (v: string) => void
  onClose: () => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export default function ReplyModal({ open, replyingToComment, replyContent, setReplyContent, onClose, onSubmit }: ReplyModalProps) {
  if (!open || !replyingToComment) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-[5px] p-5 w-full max-w-[400px] shadow-lg relative">
        <div className="mb-3">
          <div className="text-xl font-bold">
            Replying to {""}
            <span>
              {typeof replyingToComment.author === "object" && replyingToComment.author !== null && "name" in replyingToComment.author
                ? (replyingToComment.author as { name: string }).name
                : replyingToComment.author}
            </span>
          </div>
          <span className="text-sm">
            {replyingToComment.content.slice(0, 60)}
            {replyingToComment.content.length > 60 ? "..." : ""}
          </span>
        </div>
        <form onSubmit={onSubmit} className="flex flex-col gap-2">
          <textarea
            className="input w-full min-h-[80px]"
            value={replyContent}
            onChange={e => setReplyContent(e.target.value)}
            placeholder="Write your reply..."
            required
          />
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" className="button cursor-pointer" onClick={onClose}>
              Cancel
            </button>
            <button className="button-brown cursor-pointer" type="submit">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 