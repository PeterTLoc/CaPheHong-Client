interface CommentModalProps {
  open: boolean
  comment: string
  setComment: (v: string) => void
  onClose: () => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export default function CommentModal({ open, comment, setComment, onClose, onSubmit }: CommentModalProps) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-[8px] p-5 w-full max-w-[400px] shadow-lg relative">
        <h2 className="text-xl font-bold mb-3">Add Comment</h2>
        <form onSubmit={onSubmit} className="flex flex-col gap-2">
          <textarea
            className="input w-full min-h-[80px]"
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Add a comment..."
            maxLength={300}
            required
          />
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" className="button cursor-pointer" onClick={onClose}>
              Cancel
            </button>
            <button className="button-brown cursor-pointer" type="submit">
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 