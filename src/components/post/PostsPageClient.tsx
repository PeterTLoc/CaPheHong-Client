"use client"

import React, { useState, useEffect } from "react"
import AddPost from "./AddPost"
import PostList from "./PostList"
import BreadCrumb from '@/components/ui/BreadCrumb'
import { fetchPosts, createPost, Post } from "@/services/postService"
import { motion } from "framer-motion"
import TimeAgo from "@/utils/TimeAgo"
import Spinner from '@/components/ui/Spinner'

const PostsPageClient: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetchPosts()
      .then(data => setPosts(data))
      .catch(() => setError("Failed to load posts"))
      .finally(() => setLoading(false))
  }, [])

  const handleAddPost = async (data: { title: string; content: string }) => {
    setLoading(true)
    try {
      await createPost({ title: data.title, content: data.content })
      // Fetch the latest posts from the backend after adding
      const updatedPosts = await fetchPosts()
      setPosts(updatedPosts)
    } catch {
      setError("Failed to add post")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <BreadCrumb items={[{ label: 'Posts' }]} />
      {loading ? (
        <Spinner />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <AddPost onAddPost={handleAddPost} count={posts.length} />
          <PostList posts={posts} loading={loading} error={error} />
        </motion.div>
      )}
    </>
  )
}

export default PostsPageClient 