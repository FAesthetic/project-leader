"use client";

import { Check } from "lucide-react";

import { accentOptions } from "@/data/theme-options";
import { useAccent } from "@/components/theme/theme-provider";
import { cn } from "@/lib/utils";

export function AccentColorPicker({ compact = false }: { compact?: boolean }) {
  const { accent, setAccent } = useAccent();

  return (
    <div
      className={cn(
        "flex flex-wrap gap-2",
        compact && "max-w-[11rem]"
      )}
      aria-label="Akzentfarbe auswählen"
    >
      {accentOptions.map((option) => {
        const active = option.value === accent;

        return (
          <button
            key={option.value}
            type="button"
            className={cn(
              "flex h-9 items-center gap-2 rounded-full border border-border bg-surface px-2.5 text-xs font-medium text-muted-foreground transition hover:text-foreground",
              active && "border-primary text-foreground"
            )}
            onClick={() => setAccent(option.value)}
            aria-pressed={active}
            title={option.label}
          >
            <span
              className={cn("h-4 w-4 rounded-full", option.className)}
              aria-hidden
            />
            {compact ? <span className="sr-only">{option.label}</span> : option.label}
            {active ? <Check className="h-3.5 w-3.5 text-primary" aria-hidden /> : null}
          </button>
        );
      })}
    </div>
  );
}
