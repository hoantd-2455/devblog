"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import type { Post } from "../../types";
import { readResponse, postsKey } from "../lib/posts-query";
import { updateCachedPost } from "../lib/post-cache";
export default function FeedLikeButton({
  postId,
  initialLikes,
}: {
  postId: number;
  initialLikes: number;
}) {
  const router = useRouter();
  const client = useQueryClient();
  const [likes, setLikes] = useState(initialLikes);
  const [previousServerLikes, setPreviousServerLikes] = useState(initialLikes);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shouldFail, setShouldFail] = useState(false);
  // router.refresh có thể truyền props mới mà giữ state của Client Component.
  if (initialLikes !== previousServerLikes && !pending) {
    setPreviousServerLikes(initialLikes);
    setLikes(initialLikes);
  }
  async function like() {
    const previous = likes;
    setLikes(previous + 1);
    setPending(true);
    setError(null);
    try {
      const updated = await readResponse<Post>(
        await fetch(`/api/posts/${postId}/like`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ shouldFail }),
        }),
      );
      setLikes(updated.likes ?? 0);
      updateCachedPost(client, postId, () => updated);
      void client.invalidateQueries({ queryKey: postsKey });
      router.refresh(); // Đọc lại RSC, không reload toàn bộ browser.
    } catch (error) {
      setLikes(previous);
      setError(error instanceof Error ? error.message : "Lỗi like");
    } finally {
      setPending(false);
    }
  }
  return (
    <div>
      <button onClick={like} disabled={pending}>
        Like: {likes}
      </button>
      <label>
        <input
          type="checkbox"
          checked={shouldFail}
          onChange={(event) => setShouldFail(event.target.checked)}
          disabled={pending}
        />{" "}
        Giả lập lỗi
      </label>
      {pending && <span role="status"> Đang lưu...</span>}
      {error && <p role="alert">{error} — Đã hoàn tác like.</p>}
    </div>
  );
}
