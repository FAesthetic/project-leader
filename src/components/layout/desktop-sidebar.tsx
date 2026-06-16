"use client";

import { CircleDot } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { appNavigation } from "@/data/navigation";
import { QuickLogAction } from "@/components/layout/quick-log-action";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export function DesktopSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-sidebar-border bg-sidebar/88 px-4 py-5 text-sidebar-foreground backdrop-blur-2xl lg:flex lg:flex-col">
      <Link
        href="/dashboard"
        className="flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-sidebar-accent"
        aria-label="Project Leadership Startseite"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-sidebar-border bg-accent text-primary shadow-[inset_0_1px_0_hsl(var(--foreground)/0.08)]">
          <CircleDot className="h-5 w-5" aria-hidden />
        </span>
        <span>
          <span className="block text-sm font-semibold text-sidebar-foreground">
            Project Leadership
          </span>
          <span className="block text-xs text-sidebar-foreground/60">
            Jeden Tag 1 % besser führen
          </span>
        </span>
      </Link>

      <div className="my-5 rounded-2xl border border-sidebar-border bg-surface/48 p-3">
        <p className="text-xs font-medium leading-5 text-sidebar-foreground/68">
          Heute: Ein Fokus, eine Situation, ein sauberer nächster Impuls.
        </p>
      </div>

      <nav className="flex flex-col gap-1 pr-1" aria-label="Hauptnavigation">
        {appNavigation.map((item) => {
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
                className="group flex min-h-11 items-center gap-3 rounded-xl px-3 py-2 text-sidebar-foreground/45"
                aria-disabled="true"
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">
                    {item.title}
                  </span>
                  <span className="block truncate text-xs">
                    {item.description}
                  </span>
                </span>
                <Badge variant="outline" className="border-sidebar-border text-[10px]">
                  später
                </Badge>
              </div>
            );
          }

          return (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                "flex min-h-12 items-center gap-3 rounded-xl px-3 py-2.5 transition-colors",
                isActive
                  ? "bg-accent text-foreground"
                  : "text-sidebar-foreground/68 hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium">
                  {item.title}
                </span>
                <span className="block truncate text-[11px] text-sidebar-foreground/55">
                  {item.description}
                </span>
              </span>
            </Link>
          );
        })}
      </nav>

      <Separator className="my-5 bg-sidebar-border" />

      <QuickLogAction />

      <div className="mt-auto rounded-2xl border border-sidebar-border bg-surface/48 p-3">
        <p className="text-xs font-medium leading-5 text-sidebar-foreground/72">
          Ziele, Arbeitsrhythmus und App-Rahmen liegen im Profil.
        </p>
      </div>
    </aside>
  );
}
