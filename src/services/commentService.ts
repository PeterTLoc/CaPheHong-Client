import { api } from "@/lib/api"
import { Comment } from "@/types/comment"

export const postComment = async (
  shopId: number,
  content: string
): Promise<Comment> => {
  const response = await api.post(`/api/dashboard/comments/`, {
    post: shopId,
    content,
  })

  return response.data
}
