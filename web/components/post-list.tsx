"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { fetchPosts } from "../../api/client";
import type { Post } from "../../types/index";
import PostCard from "./post-card";
import debounce from "../../module-1/day-1/utils/debounce";

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [query, setQuery] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const applySearch = useCallback((value: string) => {
    const schedule = debounce(
      (text: string) => setAppliedQuery(text),
      300,
      timerRef,
    );
    schedule(value);
  }, []);

  async function handleLoad() {
    const result = await fetchPosts();
    setPosts(result);
  }

  const handleUpdate = useCallback((id: number) => {
    setPosts((previous) =>
      previous.map((post) =>
        post.id === id ? { ...post, title: post.title + "!" } : post,
      ),
    );
  }, []);

  const keyword = appliedQuery.trim().toLowerCase();
  const visiblePosts = posts.filter((post) =>
    post.title.toLowerCase().includes(keyword),
  );

  useEffect(() => {
    const timer = timerRef;

    return () => {
      if (timer.current !== null) {
        clearTimeout(timer.current);
        timer.current = null;
      }
    };
  }, []);

  return (
    <>
      <button onClick={() => handleLoad()}>Tải bài viết</button>
      {visiblePosts.map((post) => (
        <PostCard key={post.id} post={post} onUpdate={handleUpdate} />
      ))}
      <input
        value={query}
        onChange={(event) => {
          const value = event.target.value;
          setQuery(value);
          applySearch(value);
        }}
        placeholder="Tìm theo tiêu đề"
      />
    </>
  );
}
