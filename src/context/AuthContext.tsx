import { parseAxiosError } from "@/utils/apiErrors"
import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"

interface User {
  id: number
  email: string
  role: string
  username: string
}

interface LoginForm {
  email: string
  password: string
}

interface RegisterForm {
  username: string
  email: string
  password: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (formData: { email: string; password: string }) => Promise<void>
  register: (formData: {
    username: string
    email: string
    password: string
  }) => Promise<User>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  if (!apiUrl) {
    throw new Error(
      "NEXT_PUBLIC_API_URL must be defined in environment variables."
    )
  }

  const api = axios.create({
    baseURL: apiUrl,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  })

  const fetchUser = async (): Promise<User | null> => {
    try {
      const response = await api.get<User>("/api/me")

      return response.data
    } catch (error) {
      console.error("Failed to fetch user: ", parseAxiosError(error))
      return null
    }
  }

  const login = async (formData: LoginForm): Promise<void> => {
    try {
      const response = await api.post<User>("/api/auth", formData)

      setUser(response.data)
    } catch (error) {
      const parsed = parseAxiosError(error)
      console.error("Login failed:", parsed.message)
      throw new Error(parsed.message)
    }
  }

  const register = async (formData: RegisterForm): Promise<User> => {
    try {
      const response = await api.post<User>("/api/register", formData)

      setUser(response.data)
      return response.data
    } catch (error) {
      const parsed = parseAxiosError(error)
      console.error("Login failed:", parsed.message)
      throw new Error(parsed.message)
    }
  }

  const logout = async () => {
    try {
      await api.post("/api/logout")
    } catch (error) {
      console.error("Logout error: ", parseAxiosError(error))
      throw parseAxiosError(error)
    } finally {
      setUser(null)
    }
  }

  useEffect(() => {
    const initialize = async () => {
      const currentUser = await fetchUser()
      setUser(currentUser)
      setLoading(false)
    }
    initialize()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
