import React, { useState } from "react";
import { ArrowUp, ArrowDown, MessageCircle, User } from "lucide-react";
import Link from 'next/link'
import TimeAgo from '@/utils/TimeAgo'

interface PostCardProps {
  post: any
  onView?: (id: number) => void
  onVote?: (id: number, type: "upvote" | "downvote") => void
  userVote?: 1 | -1 | 0
}

const PostCard: React.FC<PostCardProps> = ({ post, onVote, userVote = 0 }) => {
  const authorName = post.author?.name || "Unknown";
  const [isVoting, setIsVoting] = useState(false);

  const handleUpvote = () => {
    if (!onVote || userVote !== 0 || isVoting) return;
    setIsVoting(true);
    onVote(post.id, "upvote");
    setIsVoting(false);
  };

  const handleDownvote = () => {
    if (!onVote || userVote !== 0 || isVoting) return;
    setIsVoting(true);
    onVote(post.id, "downvote");
    setIsVoting(false);
  };

  return (
    <div className="container flex flex-col max-w-[1000px]">
      {/* First row: avatar, name, date */}
      <div className="flex items-center gap-2 mb-1">
        <div className="w-5 h-5 rounded-full bg-[#F3F3F3] flex items-center justify-center border border-[#B0B0B0]">
          <User size={20} className="text-[#B0B0B0]" />
        </div>
        <span className="text-[13px] font-semibold text-[#444]">
          {authorName}
        </span>
        <span className="text-[11px] text-[#8B8B8B]">
          <TimeAgo date={post.created_at} />
        </span>
      </div>

      {/* Title (only this is a link) */}
      <div className="flex items-center gap-2 my-1">
        <Link href={`/posts/${post.id}`} className="font-bold hover:underline">
          {post.title}
        </Link>
      </div>

      {/* Description */}
      <div className="text-[13px] text-[#8B8B8B] mb-3 line-clamp-3">
        {post.content}
      </div>

      {/* Voting and comments row as separate containers */}
      <div className="flex gap-2 mb-1">
        {/* Voting */}
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
        {/* Comments */}
        <Link href={`/posts/${post.id}`} className="flex items-center gap-1 bg-[#FEFEFE] border border-[#ECECEC] rounded-[5px] min-h-[32px] min-w-[90px] px-2 text-[12px] hover:bg-[#F3F3F3] cursor-pointer transition-colors">
          <MessageCircle size={14} />
          <span>{post.comments?.length ?? 0} comments</span>
        </Link>
      </div>
    </div>
  )
}

export default PostCard
