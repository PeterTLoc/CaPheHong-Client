import PostDetailClient from "@/components/post/PostDetailClient";

export default function PostDetailPage({ params }: { params: { postId: string } }) {
  return (
    <div className="px-5">
      <div className="max-w-[1000px] mx-auto">
        <PostDetailClient postId={params.postId} />
      </div>
    </div>
  );
}
