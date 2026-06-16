import {
  BookOpen,
  ClipboardCheck,
  Compass,
  LayoutDashboard,
  MessageSquarePlus,
  NotebookPen,
  Settings,
} from "lucide-react";

import type { AppNavigationItem } from "@/types/navigation";

export const appNavigation: AppNavigationItem[] = [
  {
    title: "Heute",
    description: "Fokus, Training und offene Impulse",
    href: "/dashboard",
    activePaths: ["/dashboard", "/morning"],
    state: "available",
    icon: LayoutDashboard,
  },
  {
    title: "Training",
    description: "Plan, Übungen und Fortschritt",
    href: "/training",
    activePaths: ["/training", "/progress", "/planner"],
    state: "available",
    icon: ClipboardCheck,
  },
  {
    title: "Journal",
    description: "Situationen und Reflexionen",
    href: "/journal",
    activePaths: ["/journal", "/quick-log", "/reflection"],
    state: "available",
    icon: NotebookPen,
  },
  {
    title: "Modelle",
    description: "Werkzeuge für konkrete Situationen",
    href: "/models",
    activePaths: ["/models"],
    state: "available",
    icon: BookOpen,
  },
  {
    title: "Profil",
    description: "Startprofil, Ziele und Rahmen",
    href: "/settings",
    activePaths: ["/settings", "/onboarding"],
    state: "available",
    icon: Settings,
  },
];

export const quickActionNavigation: AppNavigationItem = {
  title: "Quick Log",
  description: "Situation festhalten",
  href: "/quick-log",
  state: "available",
  icon: MessageSquarePlus,
};

export const mobileNavigation = [
  appNavigation[0],
  appNavigation[1],
  appNavigation[2],
  appNavigation[3],
  {
    title: "Profil",
    description: "Startprofil und Einstellungen",
    href: "/settings",
    state: "available",
    icon: Compass,
  },
] satisfies AppNavigationItem[];
