"use client";
import { useShallow } from "zustand/react/shallow";
import { useFilterStore } from "../../stores/filter-store";
export default function FilterSummary() {
  const { tag, query } = useFilterStore(
    useShallow((state) => ({ tag: state.tag, query: state.query })),
  );
  return (
    <aside>
      Bộ lọc dùng chung: tag={tag}, query={query || "(rỗng)"}
    </aside>
  );
}
