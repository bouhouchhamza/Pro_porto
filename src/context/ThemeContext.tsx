"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type ThemePreference = "dark" | "light" | "system";
export type ResolvedTheme = "dark" | "light";

interface ThemeContextValue {
  theme: ThemePreference;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: ThemePreference) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = "portfolio-theme-preference";

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemePreference>("dark");
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("dark");
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage or document attribute on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as ThemePreference | null;
      const initialTheme: ThemePreference =
        stored === "dark" || stored === "light" || stored === "system"
          ? stored
          : "dark";

      const initialResolved: ResolvedTheme =
        initialTheme === "system" ? getSystemTheme() : initialTheme;

      setThemeState(initialTheme);
      setResolvedTheme(initialResolved);
      document.documentElement.setAttribute("data-theme", initialResolved);
      document.documentElement.classList.remove("theme-dark", "theme-light");
      document.documentElement.classList.add(`theme-${initialResolved}`);
    } catch {
      // Fallback safely to dark
      setThemeState("dark");
      setResolvedTheme("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } finally {
      setMounted(true);
    }
  }, []);

  // Apply theme changes to document and localStorage
  const applyTheme = useCallback(
    (newTheme: ThemePreference) => {
      const resolved: ResolvedTheme =
        newTheme === "system" ? getSystemTheme() : newTheme;

      setThemeState(newTheme);
      setResolvedTheme(resolved);

      try {
        localStorage.setItem(STORAGE_KEY, newTheme);
      } catch {
        // Storage might be restricted
      }

      if (typeof document !== "undefined") {
        document.documentElement.setAttribute("data-theme", resolved);
        document.documentElement.classList.remove("theme-dark", "theme-light");
        document.documentElement.classList.add(`theme-${resolved}`);

        // Broadcast custom event for Three.js and other non-React listeners
        window.dispatchEvent(
          new CustomEvent("portfolio-theme-change", {
            detail: { theme: newTheme, resolvedTheme: resolved },
          }),
        );
      }
    },
    [],
  );

  // Listen to OS prefers-color-scheme when in 'system' mode
  useEffect(() => {
    if (!mounted || theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      const resolved: ResolvedTheme = e.matches ? "dark" : "light";
      setResolvedTheme(resolved);
      document.documentElement.setAttribute("data-theme", resolved);
      document.documentElement.classList.remove("theme-dark", "theme-light");
      document.documentElement.classList.add(`theme-${resolved}`);

      window.dispatchEvent(
        new CustomEvent("portfolio-theme-change", {
          detail: { theme: "system", resolvedTheme: resolved },
        }),
      );
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [mounted, theme]);

  const toggleTheme = useCallback(() => {
    const next: ThemePreference = resolvedTheme === "dark" ? "light" : "dark";
    applyTheme(next);
  }, [resolvedTheme, applyTheme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        setTheme: applyTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
