"use client";

import { useState } from "react";

export default function MutationDemo() {
  const [items, setItems] = useState<number[]>([1, 2, 3]);

  function handleAdd() {
    const nextItems = [...items, items.length + 1];
    setItems(nextItems);
    console.log("Số phần tử:", nextItems.length);
  }

  return (
    <>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <button onClick={() => handleAdd()}>Add</button>
    </>
  );
}
