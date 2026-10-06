"use client";

import { useState } from "react";

type Item = { id: number; title: string };

function Row({ item }: { item: Item }) {
  const [note, setNote] = useState("");

  return (
    <div>
      <span>{item.title}: </span>
      <input value={note} onChange={(event) => setNote(event.target.value)} />
    </div>
  );
}

const list: Item[] = [
  { id: 1, title: "JavaScript" },
  { id: 2, title: "React" },
  { id: 3, title: "Next.js" },
];

export default function KeyDemo() {
  const [items, setItems] = useState(list);
  return (
    <>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Row item={item} />
          </li>
        ))}
      </ul>
      <button onClick={() => setItems((previous) => [...previous].reverse())}>
        Reverse
      </button>
    </>
  );
}
