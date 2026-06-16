"use client";

import { CircleDot } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { appNavigation } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function DesktopSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-24 border-r border-sidebar-border bg-sidebar/88 px-3 py-4 text-sidebar-foreground backdrop-blur-2xl lg:flex lg:flex-col">
      <Link
        href="/dashboard"
        className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-sidebar-border bg-accent text-primary shadow-[inset_0_1px_0_hsl(var(--foreground)/0.08)]"
        aria-label="Leaderjournal Heute"
      >
        <CircleDot className="h-5 w-5" aria-hidden />
      </Link>

      <nav
        className="mt-8 flex flex-1 flex-col items-center gap-2"
        aria-label="Hauptnavigation"
      >
        {appNavigation.map((item, index) => {
          const Icon = item.icon;
          const activePaths = item.activePaths ?? [item.href];
          const isActive = activePaths.some((path) =>
            path === "/" ? pathname === "/" : pathname.startsWith(path)
          );
          const isLog = item.title === "Log";

          return (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                "group flex w-full flex-col items-center justify-center gap-1 rounded-2xl px-2 py-3 text-center transition-colors",
                isActive
                  ? "bg-accent text-foreground"
                  : "text-sidebar-foreground/66 hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground",
                isLog && "my-2 border border-primary/25 bg-primary text-primary-foreground hover:bg-primary/90"
              )}
              aria-current={isActive ? "page" : undefined}
              aria-label={item.description}
            >
              <Icon className={cn("h-5 w-5", isLog && "h-6 w-6")} aria-hidden />
              <span className="text-[11px] font-medium leading-4">{item.title}</span>
              {index === 4 ? <span className="sr-only">letzter Hauptbereich</span> : null}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
