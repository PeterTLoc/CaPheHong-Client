"use client"

import { parseAxiosError } from "@/utils/apiErrors"
import axios from "axios"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

interface Errors {
  password?: string
  re_password?: string
}

interface FormData {
  password: string
  re_password: string
}

const initialFormData: FormData = {
  password: "",
  re_password: "",
}

const validate = (form: FormData): Errors => {
  const errors: Errors = {}

  if (!form.password) {
    errors.password = "Password is required"
  } else if (form.password.length < 8) {
    errors.password = "Password must be at least 8 characters"
  }

  if (!form.re_password) {
    errors.re_password = "Please confirm your password"
  } else if (form.password !== form.re_password) {
    errors.re_password = "Passwords do not match"
  }

  return errors
}

const page = () => {
  const [form, setForm] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<Errors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState("")

  const router = useRouter()
  const { uid, token } = useParams();

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

    if (!uid || !token) {
      setServerError("Invalid reset link.")
      return
    }

    setErrors({})
    setIsLoading(true)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL
      const response = await axios.post(
        `${apiUrl}/api/auth/users/reset_password_confirm/`,
        {
          uid: uid,
          token: token,
          new_password: form.password,
        }
      )
      console.log("Reset password response:", response.data)

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
              name="re_password"
              value={form.re_password}
              onChange={handleChange}
              required
            />
            <p className="text-red-500 text-xs">
              {errors.re_password || "\u00A0"}
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
