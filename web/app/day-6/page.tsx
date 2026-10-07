"use client";

import { useState } from "react";
import { useFetch } from "@/hooks/use-fetch";

import type { Post } from "../../../types";
import ContextDemo from "./context-demo";
import PostList from "../../components/post-list";

export default function FetchDemo() {
  const [url, setUrl] = useState("/api/posts");
  const result = useFetch<Post[]>(url);

  return (
    <main>
      <h1>Day 6: useFetch</h1>
      <button onClick={() => setUrl("/api/posts")}>Tải đúng</button>
      <button onClick={() => setUrl("/api/missing")}>Thử lỗi</button>
      <p>URL: {url}</p>

      {result.status === "loading" && <p>Đang tải...</p>}

      {result.status === "success" && (
        <ul>
          {result.data.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}

      {result.status === "error" && (
        <p role="alert">Lỗi: {result.error.message}</p>
      )}
      <section>
        <h2>Context: tách state và dispatch</h2>
        <ContextDemo />
      </section>
      <section>
        <h2>DevBlog: usePosts và tìm kiếm debounce</h2>
        <PostList />
      </section>
    </main>
  );
}
