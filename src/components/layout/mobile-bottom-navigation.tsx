"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { mobileNavigation } from "@/data/navigation";
import { QuickLogAction } from "@/components/layout/quick-log-action";
import { cn } from "@/lib/utils";

export function MobileBottomNavigation() {
  const pathname = usePathname();

  return (
    <>
      <QuickLogAction
        compact
        className="fixed bottom-[5.6rem] right-4 z-40 h-12 w-12 lg:hidden"
      />
      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border/75 bg-background/90 px-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 backdrop-blur-xl lg:hidden"
        aria-label="Mobile Hauptnavigation"
      >
        <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
          {mobileNavigation.map((item) => {
            const Icon = item.icon;
            const isAvailable = item.state === "available";
            const activePaths = item.activePaths ?? [item.href];
            const isActive = activePaths.some((path) =>
              path === "/" ? pathname === "/" : pathname.startsWith(path)
            );

            if (!isAvailable) {
              return (
                <div
                  key={item.title}
                  className="flex h-14 flex-col items-center justify-center gap-1 rounded-xl text-muted-foreground/60"
                  aria-disabled="true"
                >
                  <Icon className="h-4 w-4" aria-hidden />
                  <span className="max-w-full truncate px-1 text-[11px]">
                    {item.title}
                  </span>
                </div>
              );
            }

            return (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  "flex h-14 flex-col items-center justify-center gap-1 rounded-xl transition-colors",
                  isActive
                    ? "bg-accent text-foreground"
                    : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="h-4 w-4" aria-hidden />
                <span className="max-w-full truncate px-1 text-[11px] font-medium">
                  {item.title}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
