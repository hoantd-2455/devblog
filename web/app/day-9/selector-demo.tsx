"use client";
import { memo, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useFilterStore } from "../../stores/filter-store";
const TagReader = memo(function TagReader() {
  const tag = useFilterStore((state) => state.tag);
  console.log("Day 9 TagReader render:", tag);
  return <p>TagReader: {tag}</p>;
});
const QueryReader = memo(function QueryReader() {
  const query = useFilterStore((state) => state.query);
  console.log("Day 9 QueryReader render:", query);
  return <p>QueryReader: {query || "(rỗng)"}</p>;
});
const ActionReader = memo(function ActionReader() {
  const reset = useFilterStore((state) => state.resetFilters);
  console.log("Day 9 ActionReader render");
  return <button onClick={reset}>Reset từ ActionReader</button>;
});
const CombinedReader = memo(function CombinedReader() {
  const { tag, query } = useFilterStore(
    useShallow((state) => ({ tag: state.tag, query: state.query })),
  );
  console.log("Day 9 CombinedReader render:", tag, query);
  return (
    <p>
      useShallow: {tag} / {query || "(rỗng)"}
    </p>
  );
});
export default function SelectorDemo() {
  const [count, setCount] = useState(0);
  return (
    <>
      <p>
        Mở console. Chỉ đổi query: QueryReader và CombinedReader cập nhật; chỉ
        đổi tag: TagReader và CombinedReader cập nhật.
      </p>
      <button onClick={() => setCount((value) => value + 1)}>
        State cha: {count}
      </button>
      <TagReader />
      <QueryReader />
      <ActionReader />
      <CombinedReader />
    </>
  );
}
