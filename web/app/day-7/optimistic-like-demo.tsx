"use client";

import {
  startTransition,
  useActionState,
  useOptimistic,
  useState,
} from "react";
import { simulateMutation } from "../../lib/day-7-actions";

export default function LikeButton({ postId }: { postId: number }) {
  const [likes, setLikes] = useState(0);
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    likes,
    (current, increment: number) => current + increment,
  );

  const [result, action, isPending] = useActionState(
    async (_previous: { error: string | null }, formData: FormData) => {
      addOptimisticLike(1);
      try {
        await simulateMutation(formData.get("fail") === "on");
        // Sau await, đánh dấu cập nhật dữ liệu xác nhận là transition.
        startTransition(() => setLikes((previous) => previous + 1));
        return { error: null };
      } catch (error) {
        // Không cập nhật likes: khi Action kết thúc, optimistic tự trở về base.
        return {
          error: error instanceof Error ? error.message : "Lỗi lưu like",
        };
      }
    },
    { error: null },
  );

  return (
    <form action={action} aria-label={`Like bài ${postId}`}>
      <button type="submit" disabled={isPending}>
        Like: {optimisticLikes}
      </button>
      <label>
        <input type="checkbox" name="fail" disabled={isPending} /> Giả lập lỗi
        like
      </label>
      {isPending && <span role="status">Đang lưu like...</span>}
      {result.error && <p role="alert">{result.error}</p>}
    </form>
  );
}
