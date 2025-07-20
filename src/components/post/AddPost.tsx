"use client"

import React, { useState } from "react"
import AddPostModal from "./AddPostModal"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"

interface AddPostProps {
  onAddPost: (data: { title: string; content: string }) => void
  count: number
}

const AddPost: React.FC<AddPostProps> = ({ onAddPost, count }) => {
  const [open, setOpen] = useState(false)
  const { user } = useAuth()
  const router = useRouter()

  const handleClick = () => {
    if (!user) {
      router.push("/login")
      return
    }
    if (!user.is_premium) {
      router.push("/profile/upgrade-plan")
      return
    }
    setOpen(true)
  }

  return (
    <div className="container max-w-[1000px] h-[69px] flex items-center justify-between mb-1">
      <div className="text-[13px]">{count} posts</div>
      <button className="button-brown cursor-pointer" onClick={handleClick}>
        Add Post
      </button>
      <AddPostModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={onAddPost}
      />
    </div>
  )
}

export default AddPost
