export function parseAxiosError(error: any): { message: string } {
  if (error?.response?.data?.message) {
    return { message: error.response.data.message }
  }

  if (error?.message) {
    return { message: error.message }
  }

  return { message: "Something went wrong" }
}
