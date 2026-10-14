import Link from "next/link";
import type { ReactNode } from "react";
import LayoutCounter from "./layout-counter";
import "./day-10.css";
export default function Day10Layout({ children }: { children: ReactNode }) {
  return (
    <div className="day-10">
      <header>
        <h1>Module 4 · Day 10</h1>
        <nav>
          <Link href="/" prefetch={false}>
            Feed
          </Link>
          <Link href="/day-10" prefetch={false}>
            Tổng quan
          </Link>
          <Link href="/day-10/boundary" prefetch={false}>
            Client boundary
          </Link>
        </nav>
        <LayoutCounter />
      </header>
      {children}
    </div>
  );
}
