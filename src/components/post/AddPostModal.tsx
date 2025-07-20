"use client"

import React, { useState } from "react"

interface AddPostModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: { title: string; content: string }) => void
}

const AddPostModal: React.FC<AddPostModalProps> = ({ open, onClose, onSubmit }) => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-[8px] p-5 w-full max-w-[400px] shadow-lg relative">
        <h2 className="text-xl font-bold mb-3">Add Post</h2>
        <form
          onSubmit={e => {
            e.preventDefault()
            onSubmit({ title, content })
            setTitle("")
            setContent("")
            onClose()
          }}
        >
          <div className="mb-3">
            <label className="block text-[13px] mb-1 font-semibold">Title</label>
            <input
              className="input w-full"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              maxLength={75}
            />
          </div>
          <div className="mb-3">
            <label className="block text-[13px] mb-1 font-semibold">Content</label>
            <textarea
              className="input w-full min-h-[80px]"
              value={content}
              onChange={e => setContent(e.target.value)}
              required
              maxLength={1000}
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" className="button cursor-pointer" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="button-brown cursor-pointer">
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddPostModal 