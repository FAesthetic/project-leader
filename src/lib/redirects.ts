type SanitizeInternalPathOptions = {
  fallbackPath?: string;
  blockedPrefixes?: string[];
};

export function sanitizeInternalPath(
  value: string | null | undefined,
  options: SanitizeInternalPathOptions = {}
) {
  const fallbackPath = options.fallbackPath ?? "/dashboard";
  const blockedPrefixes = options.blockedPrefixes ?? ["/api", "/auth"];

  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return fallbackPath;
  }

  if (blockedPrefixes.some((prefix) => value.startsWith(prefix))) {
    return fallbackPath;
  }

  return value;
}
