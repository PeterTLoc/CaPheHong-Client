import { api } from "@/lib/api";

export interface Comment {
  id: number;
  post: number;
  content: string;
  author: string;
  created_at: string;
  updated_at: string;
  upvotes: number;
  downvotes: number;
  score: number;
  replies?: Comment[];
}

export async function fetchComments(postId: number): Promise<Comment[]> {
  const { data } = await api.get(`/api/meet/comments/?post_id=${postId}`);
  return data.results || data; // Adjust if your API returns results array
}

export async function createComment(postId: number, content: string): Promise<Comment> {
  const { data } = await api.post("/api/meet/comments/", { post_id: postId, content });
  return data;
}

export async function voteComment(commentId: number, vote_type: 1 | -1): Promise<any> {
  const { data } = await api.post(`/api/meet/comments/${commentId}/vote/`, { vote_type });
  return data;
}

export async function replyToComment(commentId: number, content: string): Promise<any> {
  const { data } = await api.post(`/api/meet/comments/${commentId}/reply/`, { content });
  return data;
}
