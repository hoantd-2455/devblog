"use client";

import { memo, useDeferredValue, useState, useTransition } from "react";

const items = Array.from({ length: 1800 }, (_, index) => ({
  id: index,
  title: `Bài ${index + 1}: ${["React", "Next.js", "JavaScript"][index % 3]}`,
}));

function SlowRow({ title }: { title: string }) {
  // Công việc giả lập trong các component nhỏ để React có điểm nhường xử lý.
  let score = 0;
  for (let index = 0; index < 12000; index++) score += Math.sqrt(index);
  return <li data-score={Math.round(score)}>{title}</li>;
}

const SlowList = memo(function SlowList({ query }: { query: string }) {
  const filtered = items.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="large-list">
      <p>
        {filtered.length} kết quả cho: {query || "tất cả"}
      </p>
      <ul>
        {filtered.map((item) => (
          <SlowRow key={item.id} title={item.title} />
        ))}
      </ul>
    </div>
  );
});

export default function TransitionDemo() {
  const [mode, setMode] = useState("transition");
  const [query, setQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const deferredQuery = useDeferredValue(query);
  const renderedQuery = mode === "deferred" ? deferredQuery : filterQuery;
  const stale = mode === "deferred" ? query !== deferredQuery : isPending;

  return (
    <>
      <label>
        Chế độ{" "}
        <select
          value={mode}
          onChange={(event) => {
            setMode(event.target.value);
            setFilterQuery(query);
          }}
        >
          <option value="sync">Đồng bộ</option>
          <option value="transition">useTransition</option>
          <option value="deferred">useDeferredValue</option>
        </select>
      </label>
      <label>
        Tìm danh sách lớn{" "}
        <input
          value={query}
          onChange={(event) => {
            const value = event.target.value;
            setQuery(value); // Input luôn cập nhật khẩn cấp.
            if (mode === "transition")
              startTransition(() => setFilterQuery(value));
            else if (mode === "sync") setFilterQuery(value);
          }}
        />
      </label>
      <p role="status">
        {stale ? "Đang cập nhật danh sách..." : "Danh sách đã cập nhật"}
      </p>
      <div style={{ opacity: stale ? 0.5 : 1 }}>
        <SlowList query={renderedQuery} />
      </div>
    </>
  );
}
