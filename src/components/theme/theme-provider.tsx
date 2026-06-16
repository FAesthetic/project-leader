"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

import type { AccentColor } from "@/types/theme";

type AccentContextValue = {
  accent: AccentColor;
  setAccent: (accent: AccentColor) => void;
};

const AccentContext = createContext<AccentContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [accent, setAccentState] = useState<AccentColor>("emerald");

  useEffect(() => {
    document.documentElement.dataset.accent = "emerald";

    const timeoutId = window.setTimeout(() => {
      const storedAccent = window.localStorage.getItem("project-leadership-accent");
      if (
        storedAccent === "emerald" ||
        storedAccent === "blue" ||
        storedAccent === "violet" ||
        storedAccent === "amber" ||
        storedAccent === "rose" ||
        storedAccent === "slate"
      ) {
        setAccentState(storedAccent);
        document.documentElement.dataset.accent = storedAccent;
      }
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  function setAccent(nextAccent: AccentColor) {
    setAccentState(nextAccent);
    document.documentElement.dataset.accent = nextAccent;
    window.localStorage.setItem("project-leadership-accent", nextAccent);
  }

  const accentValue = useMemo(
    () => ({ accent, setAccent }),
    [accent]
  );

  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AccentContext.Provider value={accentValue}>
        {children}
      </AccentContext.Provider>
    </NextThemeProvider>
  );
}

export function useAccent() {
  const context = useContext(AccentContext);

  if (!context) {
    throw new Error("useAccent must be used inside ThemeProvider");
  }

  return context;
}
