"use client"

import { useSearchParams } from "next/navigation"
import { useRouter } from "next/router"
import React, { useState } from "react"

interface Errors {
  password?: string
  confirmPassword?: string
}

interface FormData {
  password: string
  confirmPassword: string
}

const initialFormData: FormData = {
  password: "",
  confirmPassword: "",
}

const validate = (form: FormData): Errors => {
  const newErrors: Errors = {}

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
  const router = useRouter()
  const searchParams = useSearchParams()

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

    const token = searchParams.get("token")

    if (!token) {
      setServerError("Invalid or missing token.")
      setIsLoading(false)
      return
    }

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/reset-password/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: form.password, token }),
      })

      const data = await res.json()

      if (!res.ok) {
        setServerError(data.message || "Reset password failed")
        return
      }

      router.push("/")
    } catch (err) {
      setServerError("Server error. Please try again.")
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
          Create a new password
        </h1>

        <div className="mt-[28px] w-fit flex flex-col">
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
            {isLoading ? "Loading..." : "Create"}
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
