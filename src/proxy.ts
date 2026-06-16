import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import {
  DEMO_MODE_COOKIE,
  isDemoCookieActive,
  isDemoModeEnabled,
} from "@/lib/demo-mode";

const protectedPathPrefixes = [
  "/dashboard",
  "/training",
  "/morning",
  "/quick-log",
  "/journal",
  "/reflection",
  "/team",
  "/models",
  "/progress",
  "/planner",
  "/settings",
  "/onboarding",
];

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });
  const pathname = request.nextUrl.pathname;
  const demoActive =
    isDemoModeEnabled() &&
    isDemoCookieActive(request.cookies.get(DEMO_MODE_COOKIE)?.value);

  if (demoActive && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (demoActive && isProtectedPath(pathname)) {
    return response;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    if (isProtectedPath(pathname)) {
      return redirectToLogin(request);
    }

    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (pathname === "/login" && user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isProtectedPath(pathname) && !user) {
    return redirectToLogin(request);
  }

  return response;
}

export const config = {
  matcher: [
    "/login",
    "/dashboard/:path*",
    "/training/:path*",
    "/morning/:path*",
    "/quick-log/:path*",
    "/journal/:path*",
    "/reflection/:path*",
    "/team/:path*",
    "/models/:path*",
    "/progress/:path*",
    "/planner/:path*",
    "/settings/:path*",
    "/onboarding/:path*",
  ],
};

function isProtectedPath(pathname: string) {
  return protectedPathPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

function redirectToLogin(request: NextRequest) {
  const redirectUrl = new URL("/login", request.url);

  redirectUrl.searchParams.set(
    "next",
    `${request.nextUrl.pathname}${request.nextUrl.search}`
  );

  return NextResponse.redirect(redirectUrl);
}
