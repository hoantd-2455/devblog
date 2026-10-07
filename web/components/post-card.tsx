"use client";

import { memo } from "react";
import type { Post } from "../../types/index";

type PostCardProps = {
  post: Post;
  onUpdate: (id: number) => void;
};

const PostCard = memo(function PostCard({ post, onUpdate }: PostCardProps) {
  console.log("PostCard render:", post.id);

  return (
    <>
      <article>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <p>{post.author.name}</p>
        <button onClick={() => onUpdate(post.id)}>Sửa tiêu đề</button>
      </article>
    </>
  );
});

export default PostCard;
