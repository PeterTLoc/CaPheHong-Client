import axios from "axios"
import { refreshToken } from "@/services/authService"

const apiUrl = process.env.NEXT_PUBLIC_API_URL
if (!apiUrl) throw new Error("API URL not defined")

export const api = axios.create({
  baseURL: apiUrl,
})

// Request interceptor: attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken")
  if (token) {
    config.headers.Authorization = `JWT ${token}`
  }
  return config
})

// Response interceptor: refresh token on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      const refresh = localStorage.getItem("refreshToken")
      if (!refresh) return Promise.reject(error)

      try {
        const newAccess = await refreshToken(refresh)
        localStorage.setItem("accessToken", newAccess)

        originalRequest.headers["Authorization"] = `JWT ${newAccess}`
        return api(originalRequest)
      } catch (err) {
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  }
)
