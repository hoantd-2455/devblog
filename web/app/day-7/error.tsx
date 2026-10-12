"use client";

export default function Day7Error({ reset }: { reset: () => void }) {
  return (
    <div role="alert">
      <p>
        Không tải được bài viết. Suspense xử lý chờ; Error Boundary xử lý lỗi.
      </p>
      <button onClick={reset}>Thử lại</button>
    </div>
  );
}
