"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { DesktopSidebar } from "@/components/layout/desktop-sidebar";
import { MobileBottomNavigation } from "@/components/layout/mobile-bottom-navigation";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const isPublicRoute =
    pathname === "/" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/demo");

  if (isPublicRoute) {
    return (
      <div className="app-background min-h-screen bg-background text-foreground">
        <main id="main-content" className="relative z-10 min-h-screen">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="app-background min-h-screen bg-background text-foreground">
      <DesktopSidebar />
      <div className="relative min-h-screen pb-24 lg:pl-72 lg:pb-0">
        <header className="sticky top-0 z-20 border-b border-border/60 bg-background/82 px-4 py-3 backdrop-blur-xl lg:hidden">
          <div className="flex items-center justify-between gap-3">
            <Link href="/dashboard" className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">
                Project Leadership
              </p>
              <p className="truncate text-xs text-muted-foreground">
                Führung trainieren, nicht nur verwalten
              </p>
            </Link>
          </div>
        </header>
        <main id="main-content" className="relative z-10 min-h-screen">
          {children}
        </main>
      </div>
      <MobileBottomNavigation />
    </div>
  );
}
