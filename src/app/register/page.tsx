"use client"

import CustomDropdown from "@/components/ui/CustomDropdown"
import { useAuth } from "@/context/AuthContext"
import { RegisterForm, RegisterFormErrors } from "@/types/auth"
import { parseAxiosError } from "@/utils/apiErrors"
import { validateRegisterForm } from "@/utils/authValidation"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"

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
  const { register, login } = useAuth()

  const options = [
    { value: "guest", label: "Guest" },
    { value: "owner", label: "Owner" },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof RegisterFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleRoleChange = (value: string) => {
    setForm((prev) => ({ ...prev, role: value }))
    
    // Clear role error when a valid option is selected
    if (errors.role) {
      setErrors((prev) => ({ ...prev, role: undefined }))
    }
  }

  const handleDropdownOpen = (e: React.MouseEvent) => {
    // Prevent any form events from being triggered
    e.preventDefault()
    e.stopPropagation()
    
    // Clear role error when dropdown is opened
    setErrors((prev) => ({ ...prev, role: undefined }))
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
      await login({ email: form.email, password: form.password })

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
        backgroundImage: "url('/images/backgroundloginregister.png')"
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      <form
        className="flex flex-col bg-[#FBFBFB] p-5 border border-[#E5E5E5] rounded-md relative z-10 shadow-lg"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="text-[13px] flex justify-start mb-4">
          <Link
            className="text-[#5F5F5F] hover:text-black hover:underline flex items-center gap-1"
            href="/login"
          >
            <ArrowLeft className="w-3 h-3" />
            Back to Login
          </Link>
        </div>

        <h1 className="text-[26px] font-bold self-center mb-6">
          Create a new account
        </h1>

        <div className="mb-4">
          <input
            className="input"
            placeholder="Username"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
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
          />
          {errors.re_password && (
            <p className="text-red-500 text-xs">{errors.re_password}</p>
          )}
        </div>

        <div className="mb-4">
          <CustomDropdown
            options={options}
            value={form.role}
            onChange={handleRoleChange}
            placeholder="Choose role"
            onOpen={handleDropdownOpen}
          />
          {errors.role && (
            <p className="text-red-500 text-xs">{errors.role}</p>
          )}
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
            {isLoading ? "Registering..." : "Register"}
          </button>
        </div>
      </form>

      {serverError && (
        <p className="text-red-500 text-xs mx-auto w-[280px] text-center mt-2 relative z-10">
          {serverError}
        </p>
      )}
    </div>
  )
}

export default page
