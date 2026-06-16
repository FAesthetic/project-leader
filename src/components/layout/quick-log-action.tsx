"use client";

import { MessageSquarePlus } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { quickActionNavigation } from "@/data/navigation";
import { cn } from "@/lib/utils";

type QuickLogActionProps = {
  className?: string;
  compact?: boolean;
};

export function QuickLogAction({ className, compact = false }: QuickLogActionProps) {
  if (compact) {
    return (
      <Button asChild size="icon" className={cn("rounded-full shadow-lg", className)}>
        <Link href={quickActionNavigation.href} aria-label="Quick Log öffnen">
          <MessageSquarePlus className="h-4 w-4" aria-hidden />
        </Link>
      </Button>
    );
  }

  return (
    <Button asChild className={cn("w-full justify-start gap-2", className)}>
      <Link href={quickActionNavigation.href}>
        <MessageSquarePlus className="h-4 w-4" aria-hidden />
        {quickActionNavigation.title}
      </Link>
    </Button>
  );
}
