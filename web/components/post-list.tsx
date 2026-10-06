"use client";

import { useState } from "react";
import { fetchPosts } from "../../api/client";
import type { Post } from "../../types/index";
import PostCard from "./post-card";

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);

  async function handleLoad() {
    const result = await fetchPosts();
    setPosts(result);
  }

  function handleUpdate() {
    setPosts((previous) =>
      previous.map((post) =>
        post.id === 1 ? { ...post, title: post.title + "!" } : post,
      ),
    );
  }

  return (
    <>
      <button onClick={() => handleLoad()}>Tải bài viết</button>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      <button onClick={() => handleUpdate()}>Sửa tiêu đề bài 1</button>
    </>
  );
}
