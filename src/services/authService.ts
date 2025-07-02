import { api } from "@/lib/api"
import { LoginForm, RegisterForm, User } from "@/types/auth"
import { parseAxiosError } from "@/utils/apiErrors"
import axios from "axios"

export const loginUser = async (
  formData: LoginForm
): Promise<{ access: string; refresh: string; user: User }> => {
  try {
    console.log("Sending to login API:", formData)

    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/jwt/create/`,
      formData
    )
    
    const { access, refresh } = data

    localStorage.setItem("accessToken", access)
    localStorage.setItem("refreshToken", refresh)

    const user = await fetchUser()

    return { access, refresh, user }
  } catch (error) {
    console.error("Login error:", error)
    const parsed = parseAxiosError(error)
    throw new Error(parsed.message)
  }
}

export const registerUser = async (formData: RegisterForm): Promise<User> => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/users/`,
      formData
    )
    return data
  } catch (error) {
    const parsed = parseAxiosError(error)
    throw new Error(parsed.message)
  }
}

export const fetchUser = async (): Promise<User> => {
  const accessToken = localStorage.getItem("accessToken")

  if (!accessToken) {
    throw new Error("No access token found. User may not be logged in.")
  }

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/users/me/`,
      {
        headers: {
          Authorization: `JWT ${accessToken}`,
        },
      }
    )

    return Array.isArray(data) ? data[0] : data
  } catch (error) {
    const parsed = parseAxiosError(error)
    throw new Error(parsed.message)
  }
}

export const refreshToken = async (refreshToken: string): Promise<string> => {
  try {
    const { data } = await api.post("/api/auth/jwt/refresh/", {
      refresh: refreshToken,
    })

    return data.access
  } catch (error) {
    const parsed = parseAxiosError(error)
    throw new Error(parsed.message)
  }
}
