"use client"

import React, { useEffect, useState } from "react"
import { useAuth } from "@/context/AuthContext"
import Breadcrumb from "@/components/ui/BreadCrumb"
import { MessageCircle, Pencil } from "lucide-react"
import { fetchPostsByUser, fetchReviewsByUser } from "@/services/postService"
import ProfileAvatar from "@/components/profile/ProfileAvatar"
import ProfileInfo from "@/components/profile/ProfileInfo"
import { motion } from "framer-motion"
import Spinner from "@/components/ui/Spinner"

const ProfilePage = () => {
  const { user, loading, updateProfile } = useAuth()

  const [userPostCount, setUserPostCount] = useState<number | null>(null)
  const [userReviewCount, setUserReviewCount] = useState<number | null>(null)
  const [statsLoading, setStatsLoading] = useState(false)

  useEffect(() => {
    const fetchCounts = async () => {
      if (!user) return
      setStatsLoading(true)
      try {
        const [posts, reviews] = await Promise.all([
          fetchPostsByUser(user.email),
          fetchReviewsByUser(user.id),
        ])
        setUserPostCount(typeof posts.count === 'number' ? posts.count : 0)
        setUserReviewCount(typeof reviews.count === 'number' ? reviews.count : 0)
      } catch (err) {
        setUserPostCount(0)
        setUserReviewCount(0)
      } finally {
        setStatsLoading(false)
      }
    }
    fetchCounts()
  }, [user])

  const stats = [
    {
      icon: <MessageCircle size={14} strokeWidth={1} />,
      label: "Reviews",
      action: "written",
      value: userReviewCount,
    },
    {
      icon: <Pencil size={14} strokeWidth={1} />,
      label: "Posts",
      action: "created",
      value: userPostCount,
    },
  ]

  const [modalOpen, setModalOpen] = useState(false)
  const [nameInput, setNameInput] = useState(user?.name || "")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  React.useEffect(() => {
    setNameInput(user?.name || "")
  }, [user, modalOpen])

  const handleEditName = () => {
    setModalOpen(true)
    setError("")
  }
  const handleCancelEdit = () => {
    setModalOpen(false)
    setNameInput(user?.name || "")
    setError("")
  }
  const handleSaveName = async () => {
    setSaving(true)
    setError("")
    try {
      await updateProfile({ name: nameInput })
      setModalOpen(false)
    } catch (e: any) {
      setError(e.message || "Failed to update name")
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Spinner />
  if (!user) return <div className="p-4 text-red-500">User not found.</div>

  return (
    <>
      <Breadcrumb items={[{ label: "Profile" }]} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex flex-col w-full max-w-[1000px] mx-auto"
      >
        {/* Profile Header */}
        <ProfileAvatar
          user={{
            name: user.name,
            avatar: user.avatar ?? null,
            is_premium: !!user.is_premium,
          }}
        />

        {/* Profile info */}
        <span className="subtitle">Profile</span>
        <ProfileInfo user={user} updateProfile={updateProfile} />

        {/* Activity Summary */}
        <span className="subtitle">Activity Summary</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1 w-full">
          {statsLoading ? (
            <div className="col-span-full flex justify-center items-center py-6 text-[13px] text-gray-500">Loading activity...</div>
          ) : (
            stats.map((stat, i) => (
              <div key={i} className="container flex flex-col gap-3">
                <div className="flex gap-2 items-center">
                  <div>{stat.icon}</div>
                  <span className="subtext text-[11px]">{stat.label}</span>
                </div>
                <span className="font-bold text-[15px]">
                  {stat.value ?? 0} {stat.action}
                </span>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </>
  )
}

export default ProfilePage
