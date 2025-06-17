import { api } from "@/lib/axios"
import { LoginForm, RegisterForm, User } from "@/types/auth"
import { parseAxiosError } from "@/utils/apiErrors"

export const loginUser = async (
  formData: LoginForm
): Promise<{ access: string; refresh: string; user: User }> => {
  try {
    const { data } = await api.post("/api/auth/jwt/create/", formData)
    const { access, refresh } = data

    // Save tokens immediately so fetchUser can work with interceptor
    localStorage.setItem("accessToken", access)
    localStorage.setItem("refreshToken", refresh)

    const user = await fetchUser()

    return { access, refresh, user }
  } catch (error) {
    const parsed = parseAxiosError(error)
    throw new Error(parsed.message)
  }
}

export const registerUser = async (formData: RegisterForm): Promise<User> => {
  try {
    const { data } = await api.post("/api/auth/users/", formData)
    return data
  } catch (error) {
    const parsed = parseAxiosError(error)
    throw new Error(parsed.message)
  }
}

export const fetchUser = async (): Promise<User> => {
  try {
    const { data } = await api.get("/api/auth/users/me/")
    return data
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
