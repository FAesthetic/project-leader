"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { mobileNavigation } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function MobileBottomNavigation() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border/75 bg-background/92 px-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 backdrop-blur-xl lg:hidden"
      aria-label="Mobile Hauptnavigation"
    >
      <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
        {mobileNavigation.map((item) => {
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
                "flex h-14 flex-col items-center justify-center gap-1 rounded-2xl transition-colors",
                isActive
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground",
                isLog &&
                  "h-16 -translate-y-2 border border-primary/30 bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/92"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className={cn("h-4 w-4", isLog && "h-5 w-5")} aria-hidden />
              <span className="max-w-full truncate px-1 text-[11px] font-semibold">
                {item.title}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
