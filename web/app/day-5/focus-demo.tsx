"use client";

import { useRef } from "react";

export default function FocusDemo() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <button onClick={() => inputRef.current?.focus()}>Focus</button>
      <input ref={inputRef} placeholder="Nhập nội dung" />
    </>
  );
}
