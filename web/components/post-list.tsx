"use client";

import { useState } from "react";
import { useDebouncedValue } from "../hooks/use-debounced-value";
import { usePosts } from "../hooks/use-posts";
import PostCard from "./post-card";

export default function PostList() {
  const { state, loadPosts, updatePostTitle } = usePosts();
  const [query, setQuery] = useState("");
  const appliedQuery = useDebouncedValue(query, 300);

  const posts = state.status === "success" ? state.data : [];
  const keyword = appliedQuery.trim().toLowerCase();
  const visiblePosts = posts.filter((post) =>
    post.title.toLowerCase().includes(keyword),
  );

  return (
    <>
      <button onClick={loadPosts}>Tải bài viết</button>
      {state.status === "loading" && <p>Đang tải bài viết...</p>}
      {state.status === "error" && (
        <p role="alert">Lỗi: {state.error.message}</p>
      )}
      {visiblePosts.map((post) => (
        <PostCard key={post.id} post={post} onUpdate={updatePostTitle} />
      ))}
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Tìm theo tiêu đề"
      />
    </>
  );
}
