"use client"

import { parseAxiosError } from "@/utils/apiErrors"
import axios from "axios"
import React, { useState } from "react"

const validate = (email: string): string => {
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  if (!email) {
    return "Email is required"
  } else if (!isValidEmail(email)) {
    return "Email is invalid"
  }

  return ""
}

const page = () => {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setServerError("")
    setSuccess(false)

    const validationError = validate(email)

    if (validationError) {
      setError(validationError)
      return
    }

    setError("")
    setIsLoading(true)

    try {

      const apiUrl = process.env.NEXT_PUBLIC_API_URL
      const response = await axios.post(
        `${apiUrl}/api/auth/users/reset_password/`,
        { email },
      )

      const res = await fetch(`https://caphehong.shop/api/forgot-password/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })


      setSuccess(true)
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
        <h1 className="text-[26px] font-bold">Forgot Password</h1>

        <div className="mt-[28px] w-fit flex flex-col">
          <input
            className="input"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <p className="text-red-500 text-xs">{error || "\u00A0"}</p>

        <button
          className="self-end text-white mt-7 min-w-[130px] w-fit min-h-[33px] pt-[5px] pb-[3px] rounded-[5px] text-[13px] bg-[#6F4E37] hover:opacity-75"
          type="submit"
        >
          {isLoading ? "Sending..." : "Send reset link"}
        </button>
      </form>

      {success && (
        <p className="text-green-500 text-xs mt-2">
          A password reset link has been sent.
        </p>
      )}

      {serverError && (
        <p className="mt-2 text-red-500 text-xs mx-auto w-[280px] text-center">
          {serverError}
        </p>
      )}
    </div>
  )
}

export default page
