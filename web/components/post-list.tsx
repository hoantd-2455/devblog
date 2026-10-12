"use client";

import { useState, useTransition } from "react";
import type { Post } from "../../types";
import { useDebouncedValue } from "../hooks/use-debounced-value";
import { usePosts } from "../hooks/use-posts";
import PostCard from "./post-card";
import PostListSkeleton from "./post-list-skeleton";

export default function PostList({
  initialPosts = [],
}: {
  initialPosts?: Post[];
}) {
  const { state, loadPosts, updatePostTitle } = usePosts(initialPosts);
  const [query, setQuery] = useState("");
  const appliedQuery = useDebouncedValue(query, 300);
  const [selectedTag, setSelectedTag] = useState("all");
  const [filterTag, setFilterTag] = useState("all");
  const [isPending, startTransition] = useTransition();

  const posts = state.status === "success" ? state.data : [];
  const keyword = appliedQuery.trim().toLowerCase();
  const tags = [...new Set(posts.flatMap((post) => post.tags ?? []))];
  const visiblePosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(keyword) &&
      (filterTag === "all" || post.tags?.includes(filterTag)),
  );

  return (
    <>
      <button onClick={loadPosts}>Tải bài viết</button>
      {state.status === "loading" && <PostListSkeleton />}
      {state.status === "error" && (
        <p role="alert">Lỗi: {state.error.message}</p>
      )}
      <label>
        Lọc tag
        <select
          value={selectedTag}
          onChange={(event) => {
            const tag = event.target.value;
            setSelectedTag(tag); // Cập nhật lựa chọn ngay.
            startTransition(() => setFilterTag(tag)); // Danh sách ưu tiên thấp.
          }}
        >
          <option value="all">Tất cả</option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </label>
      {isPending && <p role="status">Đang lọc tag...</p>}
      {state.status === "success" && visiblePosts.length === 0 && (
        <p>Không có bài phù hợp.</p>
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
