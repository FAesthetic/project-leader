import { NextRequest, NextResponse } from "next/server";

import {
  DEMO_MODE_COOKIE,
  DEMO_MODE_COOKIE_VALUE,
  isDemoModeEnabled,
} from "@/lib/demo-mode";
import { sanitizeInternalPath } from "@/lib/redirects";

export function GET(request: NextRequest) {
  return startDemo(request);
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  return startDemo(request, formData.get("next")?.toString());
}

function startDemo(request: NextRequest, formNextPath?: string) {
  if (!isDemoModeEnabled()) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const requestUrl = new URL(request.url);
  const nextPath = sanitizeInternalPath(
    formNextPath ?? requestUrl.searchParams.get("next")
  );
  const response = NextResponse.redirect(new URL(nextPath, requestUrl.origin));

  response.cookies.set(DEMO_MODE_COOKIE, DEMO_MODE_COOKIE_VALUE, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}
