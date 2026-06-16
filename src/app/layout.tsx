import type { Metadata } from "next";

import { AppShell } from "@/components/layout/app-shell";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

import "./globals.css";

const appUrl = getAppUrl();

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  applicationName: "Project Leadership",
  title: {
    default: "Project Leadership",
    template: "%s · Project Leadership",
  },
  description:
    "Leadership, Selbstführung und Resilienz jeden Tag bewusst trainieren.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Project Leadership",
    description:
      "Leadership, Selbstführung und Resilienz jeden Tag bewusst trainieren.",
    url: appUrl,
    siteName: "Project Leadership",
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <TooltipProvider>
            <AppShell>{children}</AppShell>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

function getAppUrl() {
  const configuredUrl =
    process.env.NEXT_PUBLIC_APP_URL ?? "https://leaderjournal.de";

  try {
    return new URL(configuredUrl).origin;
  } catch {
    return "https://leaderjournal.de";
  }
}
