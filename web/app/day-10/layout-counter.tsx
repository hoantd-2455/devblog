"use client";
import { useState } from "react";
export default function LayoutCounter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount((value) => value + 1)}>
      Counter trong layout: {count}
    </button>
  );
}
