"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

const ThemeStateContext = createContext<Theme | null>(null);
const ThemeDispatchContext = createContext<(() => void) | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const toggleTheme = useCallback(() => {
    setTheme((previous) => (previous === "light" ? "dark" : "light"));
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <ThemeStateContext.Provider value={theme}>
      <ThemeDispatchContext.Provider value={toggleTheme}>
        {children}
      </ThemeDispatchContext.Provider>
    </ThemeStateContext.Provider>
  );
}

export function useTheme() {
  const theme = useContext(ThemeStateContext);
  if (theme === null) throw new Error("useTheme cần nằm trong ThemeProvider");
  return theme;
}

export function useToggleTheme() {
  const toggleTheme = useContext(ThemeDispatchContext);
  if (toggleTheme === null) {
    throw new Error("useToggleTheme cần nằm trong ThemeProvider");
  }
  return toggleTheme;
}
