"use client";
import { useState, type ReactNode } from "react";
export default function InteractiveShell({
  children,
}: {
  children: ReactNode;
}) {
  const [visible, setVisible] = useState(true);
  return (
    <section>
      <button onClick={() => setVisible((value) => !value)}>
        {visible ? "Ẩn nội dung server" : "Hiện nội dung server"}
      </button>
      {visible && children}
    </section>
  );
}
