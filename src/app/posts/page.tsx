import React from "react"
import Breadcrumb from "@/components/ui/BreadCrumb"
import PostsPageClient from "@/components/post/PostsPageClient"

const page = () => {
  return (
    <div className="px-5">
      <div className="max-w-[1000px] mx-auto">
        <PostsPageClient />
      </div>
    </div>
  )
}

export default page
