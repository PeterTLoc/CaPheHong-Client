"use client"

import { useAuth } from "@/context/AuthContext"
import { parseAxiosError } from "@/utils/apiErrors"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

interface Errors {
  email?: string
  password?: string
}

interface FormData {
  email: string
  password: string
}

const initialFormData: FormData = {
  email: "",
  password: "",
}

const validate = (form: FormData): Errors => {
  const errors: Errors = {}

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  if (!form.email) {
    errors.email = "Email is required"
  } else if (!isValidEmail(form.email)) {
    errors.email = "Invalid email format"
  }

  if (!form.password) {
    errors.password = "Password is required"
  } else if (form.password.length < 8) {
    errors.password = "Password must be at least 8 characters"
  }

  return errors
}

const page = () => {
  const [form, setForm] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<Errors>({})
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

    const validationErrors = validate(form)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setIsLoading(true)

    try {
      await login(form)
      const res = await fetch("https://caphehong.shop/api/auth/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        //credentials: "include",
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.message || "Login failed")
      }

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
        className="flex flex-col bg-[#FBFBFB] p-6 border border-[#E5E5E5] rounded-md"
        onSubmit={handleSubmit}
      >
        <h1 className="text-[26px] font-bold self-center">Sign in</h1>
        {serverError && (
          <p className="text-red-500 text-xs mt-2 mx-auto w-[280px] text-center">
            {serverError}
          </p>
        )}

        <div className="mt-[28px]">
          <input
            className="input"
            placeholder="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <p className="text-red-500 text-xs">{errors.email || "\u00A0"}</p>
        </div>

        <div>
          <input
            className="input"
            placeholder="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <p className="text-red-500 text-xs">{errors.password || "\u00A0"}</p>
        </div>

        <div className="text-[13px] flex justify-between">
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
          className="text-white mt-7 w-full min-h-[33px] pt-[5px] pb-[3px] rounded-[5px] text-[13px] bg-[#6F4E37] hover:opacity-75"
          type="submit"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  )
}

export default page
