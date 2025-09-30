"use client";
import PostForm from "@/components/PostForm";

export default function CreatePostPage() {
  return (
    <div className="px-[22.5rem] py-8">
      <PostForm mode="create" />
    </div>
  );
}
