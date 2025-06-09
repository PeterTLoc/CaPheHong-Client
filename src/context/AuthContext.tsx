"use client"

import { AuthContextType, LoginForm, RegisterForm, User } from "@/types/auth"
import { parseAxiosError } from "@/utils/apiErrors"
import axios from "axios"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

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
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  if (!apiUrl) {
    throw new Error(
      "NEXT_PUBLIC_API_URL must be defined in environment variables."
    )
  }

  const refreshAccessToken = useCallback(async (): Promise<string | null> => {
    const refreshToken = localStorage.getItem("refreshToken")
    if (!refreshToken) return null

    try {
      const { data } = await axios.post(`${apiUrl}/api/auth/jwt/refresh/`, {
        refresh: refreshToken,
      })
      const { access } = data
      localStorage.setItem("accessToken", access)
      setAccessToken(access)
      return access
    } catch (e) {
      console.error("Refresh token failed", e)
      return null
    }
  }, [apiUrl])

  const fetchUser = async (accessToken: string): Promise<User | null> => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/auth/users/me/`, {
        headers: {
          Authorization: `JWT ${accessToken}`,
        },
        // withCredentials: true,
      })
      
      return data
    } catch (error) {
      const parsed = parseAxiosError(error)
      console.error("Fetch user failed:", parsed.message)
      throw new Error(parsed.message)
    }
  }

  const login = async (formData: LoginForm): Promise<void> => {
    try {
      const { data } = await axios.post(
        `${apiUrl}/api/auth/jwt/create/`,
        formData,
        {
          // withCredentials: true,
        }
      )
      const { access, refresh } = data
      localStorage.setItem("accessToken", access)
      localStorage.setItem("refreshToken", refresh)
      setAccessToken(access)

      const user = await fetchUser(access)

      if (user) {
        setUser(user)
      } else {
        throw new Error("Failed to fetch user after login")
      }
    } catch (error) {
      const parsed = parseAxiosError(error)
      console.error("Login failed:", parsed.message)
      throw new Error(parsed.message)
    }
  }

  const register = async (formData: RegisterForm): Promise<User> => {
    try {
      const { data } = await axios.post(`${apiUrl}/api/auth/users/`, formData, {
        withCredentials: true,
      })

      setUser(data)
      return data
    } catch (error) {
      const parsed = parseAxiosError(error)
      console.error("Register failed:", parsed.message)
      throw new Error(parsed.message)
    }
  }

  const logout = async () => {
    // try {
    //   await axios.post(`${apiUrl}/api/auth/token/logout/`, null, {
    //     withCredentials: true,
    //   })
    // } catch (error) {
    //   const parsed = parseAxiosError(error)
    //   console.error("Logout failed:", parsed.message)
    //   throw new Error(parsed.message)
    // } finally {
    //   localStorage.removeItem("accessToken")
    //   localStorage.removeItem("refreshToken")
    //   setUser(null)
    //   setAccessToken(null)
    // }

    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    setUser(null)
    setAccessToken(null)
  }

  useEffect(() => {
    const initialize = async () => {
      if (!accessToken) {
        setLoading(false)
        return
      }
      try {
        const currentUser = await fetchUser(accessToken)
        setUser(currentUser)
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    initialize()
  }, [accessToken])

  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if (token) {
      setAccessToken(token)
    } else {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true
          const newAccessToken = await refreshAccessToken()

          if (newAccessToken) {
            originalRequest.headers["Authorization"] = `JWT ${newAccessToken}`
            return axios(originalRequest)
          }
        }
        return Promise.reject(error)
      }
    )

    return () => {
      axios.interceptors.response.eject(interceptor)
    }
  }, [refreshAccessToken])

  const contextValue = useMemo(
    () => ({ user, loading, login, register, logout }),
    [user, loading]
  )

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
