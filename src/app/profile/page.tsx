"use client"

import React from "react"
import { useAuth } from "@/context/AuthContext"

const ProfilePage = () => {
  const { user, loading } = useAuth()

  if (loading) return <div className="p-4">Loading...</div>
  if (!user) return <div className="p-4 text-red-500">User not found.</div>

  return (
    <div>
      <h1 className="title">Profile</h1>
      <div className="container">
        <div>
          <span className="font-semibold">Name:</span> {user.name}
        </div>
        <div>
          <span className="font-semibold">Email:</span> {user.email}
        </div>
        <div>
          <span className="font-semibold">Role:</span> {user.role}
        </div>
        <div>
          <span className="font-semibold">User ID:</span> {user.id}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
