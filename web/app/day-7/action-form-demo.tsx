"use client";

import {
  startTransition,
  useActionState,
  useOptimistic,
  useState,
} from "react";
import { simulateMutation } from "../../lib/day-7-actions";

type Message = { id: string; text: string; pending?: boolean };
type Result = { error: string | null; message: string | null };

export default function ActionFormDemo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (current, message: Message) => [...current, { ...message, pending: true }],
  );
  const [result, formAction, isPending] = useActionState<Result, FormData>(
    async (_previous, formData) => {
      const text = String(formData.get("message") ?? "").trim();
      if (!text) return { error: "Hãy nhập nội dung.", message: null };
      const message = { id: crypto.randomUUID(), text };
      addOptimisticMessage(message);
      try {
        await simulateMutation(formData.get("fail") === "on");
        startTransition(() =>
          setMessages((previous) => [...previous, message]),
        );
        return { error: null, message: "Đã lưu nội dung." };
      } catch (error) {
        return {
          error: error instanceof Error ? error.message : "Lỗi submit",
          message: null,
        };
      }
    },
    { error: null, message: null },
  );

  return (
    <>
      <form action={formAction} aria-label="Form Actions">
        <label>
          Nội dung <input name="message" required disabled={isPending} />
        </label>
        <label>
          <input type="checkbox" name="fail" disabled={isPending} /> Giả lập lỗi
          submit
        </label>
        <button type="submit" disabled={isPending}>
          {isPending ? "Đang gửi..." : "Gửi nội dung"}
        </button>
      </form>
      {result.error && <p role="alert">{result.error}</p>}
      {result.message && <p role="status">{result.message}</p>}
      <ul>
        {optimisticMessages.map((message) => (
          <li key={message.id}>
            {message.text}
            {message.pending ? " — Đang gửi..." : " — Đã lưu"}
          </li>
        ))}
      </ul>
    </>
  );
}
