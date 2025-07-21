"use client"

import PostDetailClient from "@/components/post/PostDetailClient";
import { useParams } from "next/navigation";

export default function PostDetailPage() {
  const { postId } = useParams();
  if (!postId || Array.isArray(postId)) return null;
  return (
    <div className="px-5">
      <div className="max-w-[1000px] mx-auto">
        <PostDetailClient postId={postId} />
      </div>
    </div>
  );
}
