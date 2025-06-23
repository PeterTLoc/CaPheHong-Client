"use client"

import CustomDropdown from "@/components/CustomDropdown"
import { useAuth } from "@/context/AuthContext"
import { RegisterForm, RegisterFormErrors } from "@/types/auth"
import { parseAxiosError } from "@/utils/apiErrors"
import { validateRegisterForm } from "@/utils/authValidation"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

const initialRegisterFormData: RegisterForm = {
  name: "",
  email: "",
  password: "",
  re_password: "",
  role: ""
}

const page = () => {
  const [form, setForm] = useState<RegisterForm>(initialRegisterFormData)
  const [errors, setErrors] = useState<RegisterFormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState("")

  const router = useRouter()
  const { register } = useAuth()

  const options = [
    { value: "guest", label: "Guest" },
    { value: "owner", label: "Owner" },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setServerError("")

    const validationErrors = validateRegisterForm(form)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setIsLoading(true)

    try {
      await register(form)

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
        <h1 className="text-[26px] font-bold self-center mb-6">
          Create a new account
        </h1>

        <div className="w-fit flex flex-col">
          <div className="mb-4">
            <input
              className="input"
              placeholder="Username"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name}</p>
            )}
          </div>

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

          <div className="mb-4">
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

          <div className="mb-6">
            <CustomDropdown
              options={options}
              value={form.role}
              onChange={(value) =>
                setForm((prev) => ({ ...prev, role: value }))
              }
              placeholder="Choose role"
            />
            {errors.role && (
              <p className="text-red-500 text-xs">{errors.role}</p>
            )}
          </div>

          <button
            className="self-end text-white min-w-[130px] w-fit min-h-[33px] pt-[5px] pb-[3px] rounded-[5px] text-[13px] bg-[#6F4E37] hover:opacity-75"
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
