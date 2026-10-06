"use client";

import { memo } from "react";
import type { Post } from "../../types/index";

const PostCard = memo(function PostCard({ post }: { post: Post }) {
  console.log("PostCard render:", post.id);

  return (
    <>
      <article>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <p>{post.author.name}</p>
      </article>
    </>
  );
});

export default PostCard;
