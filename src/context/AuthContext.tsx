"use client"

import { AuthContextType, LoginForm, RegisterForm, User } from "@/types/auth"
import { parseAxiosError } from "@/utils/apiErrors"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { loginUser, registerUser, fetchUser, updateProfile as updateProfileApi } from "@/services/authService"
import { useRouter } from "next/navigation"

const AuthContext = createContext<AuthContextType | undefined>(undefined)
AuthContext.displayName = "AuthContext"

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const login = useCallback(async (formData: LoginForm): Promise<void> => {
    try {
      const { access, refresh, user } = await loginUser(formData)
      localStorage.setItem("accessToken", access)
      localStorage.setItem("refreshToken", refresh)

      console.log("User data", user)
      setUser(user)
    } catch (error) {
      const parsed = parseAxiosError(error)
      console.error("Login failed:", parsed.message)
      throw new Error(parsed.message)
    }
  }, [])

  const register = useCallback(
    async (formData: RegisterForm): Promise<User> => {
      try {
        const user = await registerUser(formData)
        setUser(user)
        return user
      } catch (error) {
        const parsed = parseAxiosError(error)
        console.error("Register failed:", parsed.message)
        throw new Error(parsed.message)
      }
    },
    []
  )

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    setUser(null)
    router.push("/login")
  }, [])

  const updateProfile = useCallback(
    async (fields: Partial<User> | FormData) => {
      await updateProfileApi(fields)
      const currentUser = await fetchUser()
      setUser(currentUser)
      return currentUser
    },
    []
  )

  useEffect(() => {
    const initialize = async () => {
      const token = localStorage.getItem("accessToken")
      if (!token) {
        setLoading(false)
        return
      }
      try {
        const currentUser = await fetchUser()
        setUser(currentUser)
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    initialize()
  }, [])

  const contextValue = useMemo<AuthContextType>(
    () => ({
      user,
      loading,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      updateProfile,
    }),
    [user, loading, login, register, logout, updateProfile]
  )

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
