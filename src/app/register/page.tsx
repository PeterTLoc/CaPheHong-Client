"use client"

import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

interface Errors {
  username?: string
  email?: string
  password?: string
  confirmPassword?: string
}

interface FormData {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const initialFormData: FormData = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
}

const validate = (form: FormData): Errors => {
  const newErrors: Errors = {}

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  if (!form.username) newErrors.username = "Username is required"

  if (!form.email) {
    newErrors.email = "Email is required"
  } else if (!isValidEmail(form.email)) {
    newErrors.email = "Email is invalid"
  }

  if (!form.password) {
    newErrors.password = "Password is required"
  } else if (form.password.length < 6) {
    newErrors.password = "Password must be at least 6 characters"
  }

  if (!form.confirmPassword) {
    newErrors.confirmPassword = "Please confirm your password"
  } else if (form.password !== form.confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match"
  }

  return newErrors
}

const page = () => {
  const [form, setForm] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<Errors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState("")
  const { register } = useAuth()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      await register({
        username: form.username,
        email: form.email,
        password: form.password,
      })

      router.push("/login")
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message)
      } else {
        setServerError("An unexpected error occurred")
      }
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
        <h1 className="text-[26px] font-bold self-center">
          Create a new account
        </h1>

        <div className="mt-[28px] w-fit flex flex-col">
          <div>
            <input
              className="input"
              placeholder="Username"
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
            <p className="text-red-500 text-xs">
              {errors.username || "\u00A0"}
            </p>
          </div>

          <div>
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
            <p className="text-red-500 text-xs">
              {errors.password || "\u00A0"}
            </p>
          </div>

          <div>
            <input
              className="input"
              placeholder="Confirm Password"
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
            <p className="text-red-500 text-xs">
              {errors.confirmPassword || "\u00A0"}
            </p>
          </div>

          <button
            className="self-end text-white mt-7 min-w-[130px] w-fit min-h-[33px] pt-[5px] pb-[3px] rounded-[5px] text-[13px] bg-[#6F4E37] hover:opacity-75"
            type="submit"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </div>
      </form>

      {serverError && (
        <p className="text-red-500 text-xs mx-auto w-[280px] text-center mt-2">
          {serverError}
        </p>
      )}
    </div>
  )
}

export default page
