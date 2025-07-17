import { isAxiosError } from "axios"

export function parseAxiosError(error: unknown): { message: string } {
  if (isAxiosError(error)) {
    console.error("Full Axios error:", error)

    if (!error.response) {
      return {
        message: "No response received from server (network or CORS error).",
      }
    }

    const data = error.response.data
    console.error("Axios error response data:", data)

    if (typeof data?.message === "string") {
      return { message: data.message }
    }

    if (typeof data?.detail === "string") {
      return { message: data.detail }
    }

    if (typeof data === "object" && data !== null) {
      const messages: string[] = []

      for (const key in data) {
        const value = data[key]
        if (Array.isArray(value)) {
          messages.push(...value)
        } else if (typeof value === "string") {
          messages.push(value)
        }
      }

      if (messages.length > 0) {
        return { message: messages.join(", ") }
      }
    }
  }

  if (error instanceof Error) {
    return { message: error.message }
  }

  return { message: "Something went wrong" }
}
