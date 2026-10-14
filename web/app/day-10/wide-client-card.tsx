"use client";
import { useState } from "react";
import type { Post } from "../../../types";
// Bản trước refactor: cả phần tĩnh lẫn tương tác cùng nằm trong client module.
export default function WideClientCard({ post }: { post: Post }) {
  const [likes, setLikes] = useState(post.likes ?? 0);
  return (
    <article className="wide-card">
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <p>{post.author.name}</p>
      <button onClick={() => setLikes((value) => value + 1)}>
        Like cục bộ: {likes}
      </button>
    </article>
  );
}
