import axios from "axios"
import { refreshToken } from "@/services/authService"

const apiUrl = process.env.NEXT_PUBLIC_API_URL
if (!apiUrl) throw new Error("API URL not defined")

export const api = axios.create({
  baseURL: apiUrl,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken")

  if (token) {
    config.headers.Authorization = `JWT ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as any
    const isRefreshUrl = originalRequest?.url?.includes("/auth/jwt/refresh/")

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isRefreshUrl
    ) {
      originalRequest._retry = true

      const refresh = localStorage.getItem("refreshToken")
      if (!refresh) return Promise.reject(error)

      try {
        const newAccess = await refreshToken(refresh)
        localStorage.setItem("accessToken", newAccess)

        api.defaults.headers.common["Authorization"] = `JWT ${newAccess}`
        originalRequest.headers["Authorization"] = `JWT ${newAccess}`

        return api(originalRequest)
      } catch (err) {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")

        if (typeof window !== "undefined") {
          window.location.href = "/login"
        }

        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  }
)
