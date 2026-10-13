"use client";
import { useFilterStore } from "../stores/filter-store";
import { usePosts } from "../hooks/use-posts";
export default function PostFilters() {
  const tag = useFilterStore((state) => state.tag);
  const query = useFilterStore((state) => state.query);
  const setTag = useFilterStore((state) => state.setTag);
  const setQuery = useFilterStore((state) => state.setQuery);
  const reset = useFilterStore((state) => state.resetFilters);
  // Danh sách đầy đủ cho options: không mất tag khi kết quả lọc chỉ còn một nhóm.
  const posts = usePosts().data ?? [];
  const tags = [...new Set(posts.flatMap((post) => post.tags ?? []))];
  return (
    <div>
      <label>
        Lọc tag{" "}
        <select value={tag} onChange={(event) => setTag(event.target.value)}>
          <option value="all">Tất cả</option>
          {tags.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>
      <label>
        Từ khóa{" "}
        <input
          placeholder="Tìm theo tiêu đề"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      <button onClick={reset}>Xóa bộ lọc</button>
    </div>
  );
}
