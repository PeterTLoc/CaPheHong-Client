"use client"

import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export const RequireAuth = ({
  children,
  roles,
}: {
  children: React.ReactNode
  roles?: string[] // optional allowed roles
}) => {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login")
      } else if (roles && !roles.includes(user.role)) {
        router.push("/403") 
      }
    }
  }, [user, loading, roles, router])

  if (loading || !user || (roles && !roles.includes(user.role))) {
    return null
  }

  return <>{children}</>
}
