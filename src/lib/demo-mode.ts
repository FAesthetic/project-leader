export const DEMO_MODE_COOKIE = "project-leadership-demo";
export const DEMO_MODE_COOKIE_VALUE = "active";

export function isDemoModeEnabled() {
  return (
    process.env.DEMO_MODE_ENABLED === "true" ||
    process.env.NEXT_PUBLIC_DEMO_MODE_ENABLED === "true" ||
    process.env.NODE_ENV !== "production"
  );
}

export function isDemoCookieActive(value: string | undefined) {
  return value === DEMO_MODE_COOKIE_VALUE;
}
