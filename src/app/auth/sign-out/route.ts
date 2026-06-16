import { NextResponse } from "next/server";

import { DEMO_MODE_COOKIE } from "@/lib/demo-mode";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch {
    // Local demo mode can be used before Supabase is fully configured.
  }

  const response = NextResponse.redirect(new URL("/login", request.url), {
    status: 303,
  });

  response.cookies.set(DEMO_MODE_COOKIE, "", {
    path: "/",
    maxAge: 0,
  });

  return response;
}
