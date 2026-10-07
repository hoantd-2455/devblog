"use client";

import { useState, useMemo } from "react";

function calculateTotal(limit: number) {
  let total = 0;
  for (let i = 0; i < limit; i++) {
    total += Math.sqrt(i);
  }
  return total;
}

export default function MemoDemo() {
  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(5_000_000);

  console.time("calculate");
  const total = useMemo(() => calculateTotal(limit), [limit]);
  console.timeEnd("calculate");
  return (
    <>
      <p>
        Total: {total} | Limit: {limit} | Count: {count}
      </p>
      <button onClick={() => setCount(count + 1)}>Count+</button>
      <button onClick={() => setLimit(limit + 1_000_000)}>Limit+</button>
    </>
  );
}
