"use client"

import { useAuth } from "@/context/AuthContext"
import { LoginForm, LoginFormErrors } from "@/types/auth"
import { parseAxiosError } from "@/utils/apiErrors"
import { validateLoginForm } from "@/utils/authValidation"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        className="flex flex-col bg-[#FBFBFB] p-5 border border-[#E5E5E5] rounded-md"
        onSubmit={handleSubmit}
      >
        <h1 className="text-[26px] font-bold self-center mb-6">Sign in</h1>

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

        <button
          className="text-white w-full min-h-[33px] pt-[5px] pb-[3px] rounded-[5px] text-[13px] bg-[#6F4E37] hover:opacity-75"
          type="submit"
          
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      {serverError && (
        <p className="mt-2 text-red-500 text-xs mx-auto w-[280px] text-center">
          {serverError}
        </p>
      )}
    </div>
  )
}

export default page
