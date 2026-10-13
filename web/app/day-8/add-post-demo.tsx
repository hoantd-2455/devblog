"use client";
import { useState, type FormEvent } from "react";
import { useIsMutating } from "@tanstack/react-query";
import { postsMutationKey, useAddPost } from "../../hooks/use-post-mutations";
import { usePosts } from "../../hooks/use-posts";
export default function AddPostDemo() {
  const posts = usePosts();
  const mutation = useAddPost();
  const [title, setTitle] = useState("");
  const [shouldFail, setShouldFail] = useState(false);
  const busy = useIsMutating({ mutationKey: postsMutationKey }) > 0;
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim()) return;
    mutation.mutate(
      { title: title.trim(), shouldFail },
      { onSuccess: () => setTitle("") },
    );
  }
  return (
    <form onSubmit={submit} aria-label="Thêm bài">
      <label>
        Tiêu đề bài mới{" "}
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
          disabled={busy}
        />
      </label>
      <label>
        <input
          type="checkbox"
          checked={shouldFail}
          onChange={(event) => setShouldFail(event.target.checked)}
          disabled={busy}
        />{" "}
        Giả lập lỗi thêm bài
      </label>
      <button disabled={busy || !posts.isSuccess} type="submit">
        {mutation.isPending ? "Đang thêm..." : "Thêm bài"}
      </button>
      {mutation.error && (
        <p role="alert">{mutation.error.message} — Bài tạm đã bị rollback.</p>
      )}
      {mutation.isSuccess && <p role="status">Đã lưu bài và đồng bộ cache.</p>}
    </form>
  );
}
