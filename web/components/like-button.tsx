"use client";
import { useState, type FormEvent } from "react";
import { useLikePost } from "../hooks/use-post-mutations";
export default function LikeButton({
  postId,
  likes,
  disabled = false,
}: {
  postId: number;
  likes: number;
  disabled?: boolean;
}) {
  const [shouldFail, setShouldFail] = useState(false);
  const mutation = useLikePost();
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    mutation.mutate({ id: postId, shouldFail });
  }
  return (
    <form onSubmit={submit} aria-label={`Like bài ${postId}`}>
      <button disabled={disabled || mutation.isPending} type="submit">
        Like: {likes}
      </button>
      <label>
        <input
          type="checkbox"
          checked={shouldFail}
          onChange={(event) => setShouldFail(event.target.checked)}
          disabled={disabled || mutation.isPending}
        />{" "}
        Giả lập lỗi like
      </label>
      {mutation.isPending && <span role="status">Đang lưu like...</span>}
      {mutation.error && (
        <p role="alert">{mutation.error.message} — Đã rollback cache.</p>
      )}
    </form>
  );
}
