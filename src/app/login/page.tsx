"use client"

import { useAuth } from "@/context/AuthContext"
import { LoginForm, LoginFormErrors } from "@/types/auth"
import { parseAxiosError } from "@/utils/apiErrors"
import { validateLoginForm } from "@/utils/authValidation"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { Loader2, Home } from "lucide-react"
import Spinner from "@/components/ui/Spinner"

const initialLoginFormData: LoginForm = {
  email: "",
  password: "",
}

const page = () => {
  const [form, setForm] = useState<LoginForm>(initialLoginFormData)
  const [errors, setErrors] = useState<LoginFormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState("")

  const router = useRouter()
  const { login } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setServerError("")

    const validationErrors = validateLoginForm(form)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setIsLoading(true)

    try {
      await login(form)

      router.push("/")
    } catch (error: unknown) {
      const { message } = parseAxiosError(error)
      setServerError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/backgroundloginregister.png')",
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/20"></div>

      <form
        className="flex flex-col bg-[#FBFBFB] p-5 border border-[#E5E5E5] rounded-md relative z-10 shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="text-xs flex items-center justify-start mb-4">
          <Link
            className="text-[#5F5F5F] hover:text-black hover:underline flex items-center gap-1"
            href="/"
          >
            <Home className="w-3 h-3" />
            Back to Home
          </Link>
        </div>

        <h1 className="text-[26px] font-bold mb-6">Sign in</h1>

        <div className="mb-4">
          <input
            className="input"
            placeholder="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}
        </div>

        <div className="mb-2">
          <input
            className="input"
            placeholder="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password}</p>
          )}
        </div>

        <div className="text-[13px] flex justify-between mb-6">
          <Link
            className="text-[#5F5F5F] hover:text-black hover:underline"
            href="/forgot-password"
          >
            Forget password?
          </Link>
          <Link
            className="text-[#5F5F5F] hover:text-black hover:underline"
            href="/register"
          >
            Register now
          </Link>
        </div>

        <div className="mt-2 flex justify-end">
          <button
            disabled={isLoading}
            className={`text-white w-[130px] min-h-[33px] pt-[5px] pb-[3px] rounded-[5px] text-[13px] flex items-center justify-center gap-2 ${
              isLoading
                ? "bg-[#BFBFBF] cursor-not-allowed"
                : "bg-[#6F4E37] hover:opacity-75"
            }`}
            type="submit"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {isLoading ? "Loading" : "Sign in"}
          </button>
        </div>
      </form>

      {serverError && (
        <p className="mt-2 text-red-500 text-xs mx-auto w-[280px] text-center relative z-10">
          {serverError}
        </p>
      )}
    </div>
  )
}

export default page
