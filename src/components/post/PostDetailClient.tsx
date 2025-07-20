"use client"

import { useEffect, useState } from "react"
import BreadCrumb from "@/components/ui/BreadCrumb"
import {
  User,
  ArrowUp,
  ArrowDown,
  MessageCircle,
} from "lucide-react"
import { fetchPostById, Post, votePost } from "@/services/postService"
import {
  fetchComments,
  createComment,
  voteComment,
  replyToComment,
  Comment as CommentType,
} from "@/services/commentService"
import PostContent from "./PostContent"
import CommentList from "./comment/CommentList"
import CommentModal from "./comment/CommentModal"
import ReplyModal from "./reply/ReplyModal"
import { motion } from "framer-motion"

interface PostDetailClientProps {
  postId: string
}

// Utility: format time ago
function timeAgo(dateString: string) {
  const now = new Date();
  const date = new Date(dateString);
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (isNaN(diff) || diff < 0) return '';
  if (diff < 60) return `${diff} second${diff !== 1 ? 's' : ''} ago`;
  const mins = Math.floor(diff / 60);
  if (mins < 60) return `${mins} minute${mins !== 1 ? 's' : ''} ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days !== 1 ? 's' : ''} ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months !== 1 ? 's' : ''} ago`;
  const years = Math.floor(days / 365);
  return `${years} year${years !== 1 ? 's' : ''} ago`;
}

export default function PostDetailClient({ postId }: PostDetailClientProps) {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [comments, setComments] = useState<CommentType[]>([])
  const [comment, setComment] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [userVote, setUserVote] = useState<1 | -1 | 0>(0)
  const [isVoting, setIsVoting] = useState(false)
  const [replyingToComment, setReplyingToComment] =
    useState<CommentType | null>(null)
  const [replyContent, setReplyContent] = useState("")
  const [replyModalOpen, setReplyModalOpen] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetchPostById(Number(postId))
      .then((data) => {
        setPost(data)
      })
      .catch(() => setError("Post not found."))
      .finally(() => setLoading(false))
    fetchComments(Number(postId)).then(setComments)
  }, [postId])

  const handleAddComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!comment.trim() || !post) return
    await createComment(post.id, comment)
    const updatedComments = await fetchComments(post.id)
    setComments(updatedComments)
    const updatedPost = await fetchPostById(post.id)
    setPost(updatedPost)
    setComment("")
    setModalOpen(false)
  }

  const handleUpvote = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    if (!post || userVote !== 0 || isVoting) return
    setIsVoting(true)
    await votePost(post.id, 1)
    setUserVote(1)
    const updated = await fetchPostById(post.id)
    setPost(updated)
    setIsVoting(false)
  }

  const handleDownvote = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    if (!post || userVote !== 0 || isVoting) return
    setIsVoting(true)
    await votePost(post.id, -1)
    setUserVote(-1)
    const updated = await fetchPostById(post.id)
    setPost(updated)
    setIsVoting(false)
  }

  const handleVoteComment = async (commentId: number, vote_type: 1 | -1) => {
    await voteComment(commentId, vote_type)
    if (post) {
      const updatedComments = await fetchComments(post.id)
      setComments(updatedComments)
    }
  }

  const handleReplyClick = (comment: CommentType) => {
    setReplyingToComment(comment)
    setReplyContent("")
    setReplyModalOpen(true)
  }

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!replyingToComment || !replyContent.trim()) return
    await replyToComment(replyingToComment.id, replyContent)
    setReplyModalOpen(false)
    setReplyingToComment(null)
    setReplyContent("")
    if (post) {
      const updatedComments = await fetchComments(post.id)
      setComments(updatedComments)
    }
  }

  // Recursive render for replies
  const renderReplies = (replies: any[]) => (
    <div className="mt-1 space-y-1">
      {[...replies].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).map((reply) => (
        <div key={reply.id} className="flex gap-2 py-2">
          <div className="w-5 h-5 rounded-full bg-[#F3F3F3] flex items-center justify-center border border-[#B0B0B0]">
            <User size={16} className="text-[#B0B0B0]" />
          </div>
          <div>
            <div className="text-[13px] font-semibold flex items-center gap-2">
              {reply.author.name}
              <span className="text-[11px] text-gray-400">
                {timeAgo(reply.created_at)}
              </span>
            </div>
            <div className="text-[13px]">{reply.content}</div>
            {reply.replies &&
              reply.replies.length > 0 &&
              renderReplies(reply.replies)}
          </div>
        </div>
      ))}
    </div>
  )

  if (loading) return (
    <div className="flex justify-center items-center min-h-[200px]">
      <div className="w-8 h-8 border-4 border-brown-500 border-t-transparent border-solid rounded-full animate-spin" />
    </div>
  )
  if (error || !post)
    return (
      <div className="text-red-500 text-center py-8">
        {error || "Post not found."}
      </div>
    )

  // Before rendering comments, sort them by created_at descending
  const sortedComments = [...comments].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  return (
    <>
      <BreadCrumb
        items={[{ label: "Posts", href: "/posts" }, { label: post.title }]}
      />
      <motion.div
        className="flex flex-col gap-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <PostContent
          post={post}
          userVote={userVote}
          isVoting={isVoting}
          handleUpvote={handleUpvote}
          handleDownvote={handleDownvote}
          commentCount={post.comment_count ?? comments.length}
          timeAgo={timeAgo}
        />
        <div className="max-w-[1000px]">
          <div className="container-top h-[69px] flex justify-between items-center">
            <h2 className="text-[13px]">
              {post.comment_count ?? comments.length} Comments
            </h2>
            <button
              className="button-brown cursor-pointer"
              onClick={() => setModalOpen(true)}
            >
              Add Comment
            </button>
          </div>
          <CommentModal
            open={modalOpen}
            comment={comment}
            setComment={setComment}
            onClose={() => setModalOpen(false)}
            onSubmit={handleAddComment}
          />
          <ReplyModal
            open={replyModalOpen}
            replyingToComment={replyingToComment}
            replyContent={replyContent}
            setReplyContent={setReplyContent}
            onClose={() => {
              setReplyModalOpen(false)
              setReplyingToComment(null)
            }}
            onSubmit={handleReplySubmit}
          />
          <div className="container-bottom">
            <CommentList
              comments={comments}
              onReply={handleReplyClick}
              onVote={handleVoteComment}
              timeAgo={timeAgo}
            />
          </div>
        </div>
      </motion.div>
    </>
  )
}
