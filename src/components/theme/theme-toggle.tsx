"use client";

import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const themeOptions = [
  { value: "light", label: "Hell", icon: Sun },
  { value: "dark", label: "Dunkel", icon: Moon },
  { value: "system", label: "System", icon: Laptop },
];

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setMounted(true), 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  if (!mounted) {
    return (
      <div className="h-10 rounded-xl border border-border bg-surface-muted/60" />
    );
  }

  return (
    <div
      className={cn(
        "inline-grid rounded-xl border border-border bg-surface-muted/70 p-1",
        compact ? "grid-cols-3" : "grid-cols-3"
      )}
      aria-label="Darstellung auswählen"
    >
      {themeOptions.map((option) => {
        const Icon = option.icon;
        const active = theme === option.value;

        return (
          <Button
            key={option.value}
            type="button"
            variant={active ? "secondary" : "ghost"}
            size={compact ? "icon" : "sm"}
            className={cn(
              "h-8 rounded-lg shadow-none",
              compact ? "w-8 px-0" : "px-3",
              active && "bg-background text-foreground"
            )}
            onClick={() => setTheme(option.value)}
            aria-pressed={active}
            title={option.label}
          >
            <Icon className="h-4 w-4" aria-hidden />
            {compact ? <span className="sr-only">{option.label}</span> : option.label}
          </Button>
        );
      })}
    </div>
  );
}
