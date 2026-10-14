"use client";
import { useEffect } from "react";
export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Day 10 route error:", error);
  }, [error]);
  return (
    <div role="alert" style={{ padding: 24 }}>
      <h2>Không tải được nội dung</h2>
      <p>Bạn có thể thử lại hoặc mở feed không giả lập lỗi.</p>
      <button onClick={reset}>Thử lại</button>{" "}
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- Khôi phục bằng document navigation để reset route error boundary. */}
      <a href="/">Về feed</a>
    </div>
  );
}
