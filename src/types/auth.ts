export interface User {
  id: number
  email: string
  role: string
  name: string
  avatar?: string
  is_premium?: boolean
  created_at?: string
}

export interface LoginForm {
  email: string
  password: string
}

export interface LoginFormErrors {
  email?: string
  password?: string
}

export interface RegisterForm {
  name: string
  email: string
  password: string
  re_password: string
  role: string
}

export interface RegisterFormErrors {
  name?: string
  email?: string
  password?: string
  re_password?: string
  role?: string
}

export interface AuthContextType {
  user: User | null
  loading: boolean
  login: (formData: { email: string; password: string }) => Promise<void>
  register: (formData: {
    name: string
    email: string
    password: string
    re_password: string
    role: string
  }) => Promise<User>
  logout: () => void
  updateProfile: (fields: Partial<User>) => Promise<User>
}

export interface ResetPasswordFormErrors {
  password?: string
  re_password?: string
}

export interface ResetPasswordFormData {
  password: string
  re_password: string
}
