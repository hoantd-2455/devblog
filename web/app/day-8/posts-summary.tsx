"use client";
import { usePosts } from "../../hooks/use-posts";
export default function PostsSummary() {
  const query = usePosts();
  return (
    <p aria-live="polite">
      Cache dùng chung: {query.data?.length ?? 0} bài · Tổng like:{" "}
      {query.data?.reduce((sum, post) => sum + (post.likes ?? 0), 0) ?? 0}
    </p>
  );
}
