"use client";

import {
  Bell,
  Brain,
  Download,
  KeyRound,
  LogOut,
  Palette,
  Settings,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const menuItems = [
  {
    label: "Mein Führungsprofil",
    href: "/settings#profile",
    icon: UserRound,
  },
  {
    label: "Einstellungen",
    href: "/settings",
    icon: Settings,
  },
  {
    label: "Datenschutz & KI",
    href: "/settings#privacy-ai",
    icon: ShieldCheck,
  },
  {
    label: "API-Key",
    href: "/settings#api-key",
    icon: KeyRound,
  },
  {
    label: "Darstellung",
    href: "/settings#appearance",
    icon: Palette,
  },
  {
    label: "Reminder",
    href: "/settings#reminders",
    icon: Bell,
  },
  {
    label: "Daten exportieren/löschen",
    href: "/settings#data",
    icon: Download,
  },
];

type ProfileMenuProps = {
  initials?: string;
};

export function ProfileMenu({ initials = "LJ" }: ProfileMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-11 w-11 rounded-full border border-border bg-surface/70"
          aria-label="Profil und Einstellungen öffnen"
        >
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-accent text-xs font-semibold text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-72 rounded-2xl border-border bg-popover/95 p-2 backdrop-blur-xl"
      >
        <DropdownMenuLabel className="flex items-center gap-3 px-2 py-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-primary">
            <Brain className="h-4 w-4" aria-hidden />
          </span>
          <span>
            <span className="block text-sm font-semibold">Leaderjournal</span>
            <span className="block text-xs font-normal text-muted-foreground">
              Profil, KI und Darstellung
            </span>
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <DropdownMenuItem key={item.href} asChild>
              <Link href={item.href} className="cursor-pointer rounded-xl">
                <Icon className="h-4 w-4" aria-hidden />
                {item.label}
              </Link>
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuSeparator />
        <form action="/auth/sign-out" method="post">
          <DropdownMenuItem asChild>
            <button type="submit" className="w-full cursor-pointer rounded-xl">
              <LogOut className="h-4 w-4" aria-hidden />
              Abmelden
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
