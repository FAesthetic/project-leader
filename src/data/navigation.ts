import {
  ClipboardCheck,
  Home,
  MessageSquarePlus,
  NotebookPen,
  UsersRound,
} from "lucide-react";

import type { AppNavigationItem } from "@/types/navigation";

export const appNavigation: AppNavigationItem[] = [
  {
    title: "Heute",
    description: "Fokus, Logs und Zusagen",
    href: "/dashboard",
    activePaths: ["/dashboard", "/morning"],
    state: "available",
    icon: Home,
  },
  {
    title: "Training",
    description: "Plan, Werkzeuge, Fortschritt",
    href: "/training",
    activePaths: ["/training", "/progress", "/planner", "/models"],
    state: "available",
    icon: ClipboardCheck,
  },
  {
    title: "Log",
    description: "Situation schnell festhalten",
    href: "/quick-log",
    activePaths: ["/quick-log"],
    state: "available",
    icon: MessageSquarePlus,
  },
  {
    title: "Journal",
    description: "Abendreflexion und Muster",
    href: "/journal",
    activePaths: ["/journal", "/reflection"],
    state: "available",
    icon: NotebookPen,
  },
  {
    title: "Team",
    description: "Gespräche und Zusagen",
    href: "/team",
    activePaths: ["/team"],
    state: "available",
    icon: UsersRound,
  },
];

export const quickActionNavigation: AppNavigationItem = {
  title: "Log",
  description: "Situation festhalten",
  href: "/quick-log",
  state: "available",
  icon: MessageSquarePlus,
};

export const mobileNavigation = appNavigation;
