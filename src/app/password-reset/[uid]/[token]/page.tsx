"use client"

import { ResetPasswordFormData, ResetPasswordFormErrors } from "@/types/auth"
import { parseAxiosError } from "@/utils/apiErrors"
import { validateResetPasswordForm } from "@/utils/authValidation"
import axios from "axios"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import Spinner from '@/components/ui/Spinner'

const initialResetPasswordFormData: ResetPasswordFormData = {
  password: "",
  re_password: "",
}
const apiUrl = process.env.NEXT_PUBLIC_API_URL

if (!apiUrl) {
  throw new Error(
    "NEXT_PUBLIC_API_URL must be defined in environment variables."
  )
}

const page = () => {
  const [form, setForm] = useState<ResetPasswordFormData>(
    initialResetPasswordFormData
  )
  const [errors, setErrors] = useState<ResetPasswordFormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState("")
  const { uid, token } = useParams()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setServerError("")

    const validationErrors = validateResetPasswordForm(form)

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
      await axios.post(`${apiUrl}/api/auth/users/reset_password_confirm/`, {
        uid: uid,
        token: token,
        new_password: form.password,
      })

      router.push("/login")
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
        <h1 className="text-[26px] font-bold self-center mb-6">
          Create a new password
        </h1>

        <div className="w-fit flex flex-col">
          <div className="mb-4">
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

          <div className="mb-6">
            <input
              className="input"
              placeholder="Confirm Password"
              type="password"
              name="re_password"
              value={form.re_password}
              onChange={handleChange}
              required
            />
            {errors.re_password && (
              <p className="text-red-500 text-xs">{errors.re_password}</p>
            )}
          </div>

          <button
            className="self-end text-white min-w-[130px] w-fit min-h-[33px] pt-[5px] pb-[3px] rounded-[5px] text-[13px] bg-[#6F4E37] hover:opacity-75"
            type="submit"
          >
            {isLoading ? <Spinner /> : "Create"}
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
