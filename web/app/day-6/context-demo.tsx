"use client";

import { createContext, memo, useContext, useState, useCallback } from "react";

type Theme = "light" | "dark";

const ThemeStateContext = createContext<Theme | null>(null);
const ThemeDispatchContext = createContext<(() => void) | null>(null);

const ThemeLabel = memo(function ThemeLabel() {
  const theme = useContext(ThemeStateContext);

  if (theme === null) {
    throw new Error("ThemeLabel cần nằm trong ThemeStateContext.Provider");
  }

  console.log("ThemeLabel render");

  return <p>Theme: {theme}</p>;
});

const ThemeButton = memo(function ThemeButton() {
  const toggleTheme = useContext(ThemeDispatchContext);

  if (toggleTheme === null) {
    throw new Error("ThemeButton cần nằm trong ThemeDispatchContext.Provider");
  }

  console.log("ThemeButton render");

  return <button onClick={toggleTheme}>Đổi theme</button>;
});

export default function ContextDemo() {
  const [theme, setTheme] = useState<Theme>("light");
  const [count, setCount] = useState(0);

  const toggleTheme = useCallback(() => {
    setTheme((previous) => (previous === "light" ? "dark" : "light"));
  }, []);

  return (
    <ThemeStateContext.Provider value={theme}>
      <ThemeDispatchContext.Provider value={toggleTheme}>
        <button onClick={() => setCount((previous) => previous + 1)}>
          Count: {count}
        </button>

        <ThemeLabel />
        <ThemeButton />
      </ThemeDispatchContext.Provider>
    </ThemeStateContext.Provider>
  );
}
