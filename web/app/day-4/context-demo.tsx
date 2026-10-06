"use client";

import { createContext, memo, useContext, useState } from "react";

type Theme = "light" | "dark";
const ThemeContext = createContext<Theme>("light");

const ThemeLabel = memo(function ThemeLabel() {
  const theme = useContext(ThemeContext);
  console.log("ThemeLabel render:", theme);
  return <p>Theme: {theme}</p>;
});

export default function ContextDemo() {
  const [theme, setTheme] = useState<Theme>("light");

  return (
    <>
      <button
        onClick={() =>
          setTheme((currentTheme) =>
            currentTheme === "light" ? "dark" : "light",
          )
        }
      >
        Change theme
      </button>
      <ThemeContext value={theme}>
        <ThemeLabel />
      </ThemeContext>
    </>
  );
}
