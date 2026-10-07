"use client";

import { memo, useState, useCallback } from "react";
import MemoDemo from "./memo-demo";
import StaleClosureDemo from "./stale-closure-demo";
import FocusDemo from "./focus-demo";
import PostList from "@/components/post-list";

const Child = memo(function Child({ onSelect }: { onSelect: () => void }) {
  console.log("Child render");
  return <button onClick={onSelect}>Chọn</button>;
});

export default function Parent() {
  const [count, setCount] = useState(0);

  console.log("Parent render");

  const handleSelect = useCallback(() => {
    console.log("Da chon");
  }, []);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>{count}: Plus+</button>
      <Child onSelect={handleSelect} />
      <MemoDemo />
      <StaleClosureDemo />
      <FocusDemo />
      <PostList />
    </>
  );
}
