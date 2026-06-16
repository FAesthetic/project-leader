import type { LucideIcon } from "lucide-react";

export type NavigationState = "available" | "planned";

export type AppNavigationItem = {
  title: string;
  description: string;
  href: string;
  activePaths?: string[];
  state: NavigationState;
  icon: LucideIcon;
};
