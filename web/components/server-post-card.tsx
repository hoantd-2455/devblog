import "server-only";
import Link from "next/link";
import type { Post } from "../../types";
import FeedLikeButton from "./feed-like-button";
import styles from "./server-post-card.module.css";
export default function ServerPostCard({ post }: { post: Post }) {
  console.log("[RSC] ServerPostCard:", post.id);
  return (
    <article className={styles.card}>
      <h2>
        <Link href={`/day-10/posts/${post.id}`} prefetch={false}>
          {post.title}
        </Link>
      </h2>
      <p>{post.body}</p>
      <p>Tác giả: {post.author.name}</p>
      <p>Tags: {(post.tags ?? []).join(", ")}</p>
      <FeedLikeButton postId={post.id} initialLikes={post.likes ?? 0} />
    </article>
  );
}
