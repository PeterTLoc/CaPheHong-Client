"use client"

import React from "react"
import { useAuth } from "@/context/AuthContext"
import Image from "next/image"
import Breadcrumb from "@/components/ui/BreadCrumb"
import {
  Star,
  MessageCircle,
  MapPin,
  UserCog,
  Heart,
  LifeBuoy,
  Pencil,
  Crown,
} from "lucide-react"
import { useState } from "react"
import ProfileAvatar from "@/components/profile/ProfileAvatar"
import ProfileInfo from "@/components/profile/ProfileInfo"
import { motion } from "framer-motion"

const ProfilePage = () => {
  const { user, loading, updateProfile } = useAuth()

  // For demo: hardcode premium status if not present
  const isPremium = (user as any)?.is_premium ?? true
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const avatar = (user as any)?.avatar || ""
  const updatedAt =
    user && "updated_at" in user && user.updated_at
      ? user.updated_at
      : Date.now()
  const avatarUrl = avatar
    ? avatar.startsWith("http")
      ? `${avatar}?t=${updatedAt}`
      : `${apiUrl}${avatar}?t=${updatedAt}`
    : ""

  // Demo stats
  const stats = [
    {
      icon: <MessageCircle size={14} strokeWidth={1} />,
      label: "Reviews",
      action: "written",
      value: 12,
    },
    {
      icon: <Heart size={14} strokeWidth={1} />,
      label: "Favorites",
      action: "saved",
      value: 8,
    },
  ]

  // Demo recent activity
  const recent = [
    { type: "Reviewed", name: "Highlands Coffee" },
    { type: "Favorited", name: "Wait Tea" },
    { type: "Visited", name: "Deer Coffee" },
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

  if (loading) return <div className="p-4">Loading...</div>
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
        {stats.length > 0 && (
          <>
            <span className="subtitle">Activity Summary</span>
            <div className="grid grid-cols-4 gap-3 w-full">
              {stats.slice(0, 3).map((stat, i) => (
                <div key={i} className="container flex flex-col gap-3">
                  <div className="flex gap-2 items-center">
                    <div>{stat.icon}</div>
                    <span className="subtext text-[11px]">{stat.label}</span>
                  </div>
                  <span className="font-bold text-[15px]">
                    {stat.value} {stat.action}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Plan Info */}
        <span className="subtitle">Plan Info</span>
        <div className="container flex justify-between items-center h-[69px]">
          <div className="flex gap-5 items-center">
            <Crown size={20} strokeWidth={1} />
            <div>
              <div className="text-[13px]">
                {user.is_premium ? "Personal Plan" : "Free Plan"}
              </div>
              <div className="subtext text-[11px]">
                {(user as any).premium_until
                  ? `Renews: ${new Date(
                      (user as any).premium_until
                    ).toLocaleDateString()}`
                  : "No renewal date"}
              </div>
            </div>
          </div>
          <button className="button-brown cursor-pointer" disabled>
            Upgrade Plans
          </button>
        </div>
      </motion.div>
    </>
  )
}

export default ProfilePage
