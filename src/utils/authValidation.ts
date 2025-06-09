import {
  LoginForm,
  LoginFormErrors,
  RegisterForm,
  RegisterFormErrors,
  ResetPasswordFormData,
  ResetPasswordFormErrors,
} from "@/types/auth"

export const validateLoginForm = (form: LoginForm): LoginFormErrors => {
  const errors: LoginFormErrors = {}
  const emailError = validateEmail(form.email)
  const passwordError = validatePassword(form.password)

  if (emailError) {
    errors.email = emailError
  }

  if (passwordError) {
    errors.password = passwordError
  }

  return errors
}

export const validateRegisterForm = (
  form: RegisterForm
): RegisterFormErrors => {
  const errors: RegisterFormErrors = {}
  const emailError = validateEmail(form.email)
  const passwordError = validatePassword(form.password)
  const passwordMatchError = validatePasswordMatch(
    form.password,
    form.re_password
  )

  if (!form.name) {
    errors.name = "Name is required"
  }

  if (emailError) {
    errors.email = emailError
  }

  if (passwordError) {
    errors.password = passwordError
  }

  if (passwordMatchError) {
    errors.re_password = passwordMatchError
  }

  return errors
}

export const validateResetPasswordForm = (
  form: ResetPasswordFormData
): ResetPasswordFormErrors => {
  const errors: ResetPasswordFormErrors = {}
  const passwordError = validatePassword(form.password)
  const passwordMatchError = validatePasswordMatch(
    form.password,
    form.re_password
  )

  if (passwordError) {
    errors.password = passwordError
  }

  if (passwordMatchError) {
    errors.re_password = passwordMatchError
  }

  return errors
}

export const validateEmail = (email: string): string => {
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  if (!email) {
    return "Email is required"
  } else if (!isValidEmail(email)) {
    return "Invalid email format"
  }

  return ""
}

export const validatePassword = (password: string): string => {
  if (!password) {
    return "Password is required"
  }
  if (password.length < 8) {
    return "Password must be at least 8 characters"
  }
  return ""
}

export const validatePasswordMatch = (
  password: string,
  re_password: string
): string => {
  if (!re_password) {
    return "Please confirm your password"
  }
  if (password !== re_password) {
    return "Passwords do not match"
  }
  return ""
}
