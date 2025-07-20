import { api } from "@/lib/api"

export interface Post {
  id: number
  title: string
  content: string // changed from 'body' to 'content' to match API
  author: { id: number; name: string }
  created_at: string
  updated_at: string
  upvotes: number
  downvotes: number
  score: number
  comments: any[]
  comment_count: number
  banner?: string
  map?: {
    id: number
    name: string
    address: string
    latitude: number
    longitude: number
  } | null
  tags?: { id: number; name: string }[]
}

export interface PostPayload {
  title: string
  content: string
  banner?: File
  map_data?: {
    name: string
    address: string
    latitude: number
    longitude: number
  }
  tag_ids?: number[]
  upvotes?: number
  downvotes?: number
}

export async function fetchPosts(): Promise<Post[]> {
  const { data } = await api.get("/api/meet/posts/");
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.results)) return data.results;
  return [];
}

export async function fetchPostById(id: number): Promise<Post | null> {
  const { data } = await api.get(`/api/meet/posts/${id}/`);
  return data || null;
}

export async function createPost(postData: PostPayload): Promise<Post | null> {
  const formData = new FormData();
  formData.append("title", postData.title);
  formData.append("content", postData.content);
  if (postData.banner) formData.append("banner", postData.banner);
  if (postData.map_data) formData.append("map_data", JSON.stringify(postData.map_data));
  if (postData.tag_ids) postData.tag_ids.forEach(id => formData.append("tag_ids", String(id)));

  const { data } = await api.post("/api/meet/posts/", formData);
  return data || null;
}

export const updatePost = async (id: number, payload: Partial<PostPayload>): Promise<Post> => {
  const formData = new FormData();
  if (payload.title !== undefined) formData.append("title", payload.title);
  if (payload.content !== undefined) formData.append("content", payload.content);
  if (payload.banner) formData.append("banner", payload.banner);
  if (payload.map_data) formData.append("map_data", JSON.stringify(payload.map_data));
  if (payload.tag_ids) payload.tag_ids.forEach(id => formData.append("tag_ids", String(id)));
  if (payload.upvotes !== undefined) formData.append("upvotes", String(payload.upvotes));
  if (payload.downvotes !== undefined) formData.append("downvotes", String(payload.downvotes));

  const { data } = await api.patch(`/api/meet/posts/${id}/`, formData);
  return data;
}

export const deletePost = async (id: number): Promise<void> => {
  await api.delete(`/api/meet/posts/${id}/`);
}

export async function votePost(id: number, vote_type: 1 | -1): Promise<void> {
  await api.post(`/api/meet/posts/${id}/vote/`, { vote_type });
}

export async function fetchPostsByUser(email: string) {
  const token = localStorage.getItem("accessToken")
  const res = await api.get(`/api/dashboard/shop/?owner__email=${encodeURIComponent(email)}`,
    token ? { headers: { Authorization: `JWT ${token}` } } : {}
  )
  return res.data
}

export async function fetchReviewsByUser(userId: number) {
  const token = localStorage.getItem("accessToken")
  const res = await api.get(`/api/dashboard/reviews/?author=${userId}`,
    token ? { headers: { Authorization: `JWT ${token}` } } : {}
  )
  return res.data
} 