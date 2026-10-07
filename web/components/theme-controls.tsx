"use client";

import { memo } from "react";
import { useTheme, useToggleTheme } from "./theme-provider";

const ThemeStatus = memo(function ThemeStatus() {
  const theme = useTheme();
  return <span>Giao diện: {theme === "light" ? "Sáng" : "Tối"}</span>;
});

const ThemeToggle = memo(function ThemeToggle() {
  const toggleTheme = useToggleTheme();
  return <button onClick={toggleTheme}>Đổi giao diện toàn app</button>;
});

export default function ThemeControls() {
  return (
    <header className="theme-controls">
      <ThemeStatus />
      <ThemeToggle />
    </header>
  );
}
