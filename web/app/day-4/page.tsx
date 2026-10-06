"use client";

import { memo, useState } from "react";
import KeyDemo from "./key-demo";
import MutationDemo from "./mutation-demo";
import PostList from "@/components/post-list";
import ContextDemo from "./context-demo";

const Child = memo(function Child() {
  console.log("Child render");
  return <p>Tôi là component con</p>;
});

export default function Parent() {
  const [count, setCount] = useState(0);
  console.log("Parent render");

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <Child />
      <KeyDemo />
      <MutationDemo />
      <PostList />
      <ContextDemo />
    </>
  );
}
