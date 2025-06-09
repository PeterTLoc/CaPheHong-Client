import { isAxiosError } from "axios"

export function parseAxiosError(error: unknown): { message: string } {
  if (isAxiosError(error)) {
    const data = error.response?.data
    console.error("Axios error response data:", error.response?.data)

    if (typeof data?.message === "string") {
      return { message: data.message }
    }

    if (typeof data?.detail === "string") {
      return { message: data.detail }
    }

    if (typeof data === "object") {
      for (const key in data) {
        const value = data[key]
        if (
          Array.isArray(value) &&
          value.length > 0 &&
          typeof value[0] === "string"
        ) {
          return { message: value[0] }
        }
      }
    }
  }

  if (error instanceof Error) {
    return { message: error.message }
  }

  return { message: "Something went wrong" }
}
