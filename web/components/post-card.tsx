"use client";

import { memo } from "react";
import type { Post } from "../../types/index";
import LikeButton from "./like-button";

type PostCardProps = {
  post: Post;
  onUpdate: (id: number) => void;
  disabled?: boolean;
};

const PostCard = memo(function PostCard({
  post,
  onUpdate,
  disabled = false,
}: PostCardProps) {
  console.log("PostCard render:", post.id);

  return (
    <>
      <article>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <p>{post.author.name}</p>
        <p>Tags: {(post.tags ?? []).join(", ")}</p>
        <button disabled={disabled} onClick={() => onUpdate(post.id)}>
          Sửa tiêu đề
        </button>
        <LikeButton
          postId={post.id}
          likes={post.likes ?? 0}
          disabled={disabled}
        />
      </article>
    </>
  );
});

export default PostCard;
