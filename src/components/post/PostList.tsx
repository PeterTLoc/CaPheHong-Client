"use client"

import React from "react"
import PostCard from "./PostCard"
import { updatePost, fetchPostById, Post, votePost } from "@/services/postService";

interface PostListProps {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const PostList: React.FC<PostListProps> = ({ posts, loading, error }) => {
  const [localPosts, setLocalPosts] = React.useState(posts);
  const [userVotes, setUserVotes] = React.useState<{ [id: number]: 1 | -1 | 0 }>({});

  React.useEffect(() => {
    setLocalPosts(posts);
  }, [posts]);

  const handleVote = async (id: number, type: "upvote" | "downvote") => {
    const currentVote = userVotes[id] || 0;
    let newVote: 1 | -1 | 0 = 0;
    let voteTypeForApi: 1 | -1 = 1;

    if (type === "upvote") {
      if (currentVote === 1) {
        // Remove upvote
        voteTypeForApi = -1;
        newVote = 0;
      } else {
        // Upvote (from no vote or from downvote)
        voteTypeForApi = 1;
        newVote = 1;
      }
    } else {
      if (currentVote === -1) {
        // Remove downvote
        voteTypeForApi = 1;
        newVote = 0;
      } else {
        // Downvote (from no vote or from upvote)
        voteTypeForApi = -1;
        newVote = -1;
      }
    }

    await votePost(id, voteTypeForApi);
    const updated = await fetchPostById(id);
    setLocalPosts(posts => posts.map(p => p.id === id ? updated! : p));
    setUserVotes(votes => ({ ...votes, [id]: newVote }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brown-700 border-solid"></div>
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">{error}</div>
  }

  if (!localPosts || localPosts.length === 0) {
    return <div className="container subtext text-[13px] text-center">No posts yet. Be the first to post!</div>
  }

  return (
    <div className="space-y-1">
      {localPosts
        .filter(post => post.id != null)
        .map((post) => (
          <PostCard key={post.id ?? `${post.title}-${post.created_at}`} post={post} onVote={handleVote} userVote={userVotes[post.id] || 0} />
        ))}
    </div>
  )
}

export default PostList 