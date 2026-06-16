export type OAuthProviderId = "google" | "apple";

export type OAuthProviderConfig = {
  id: OAuthProviderId;
  label: string;
  enabled: boolean;
};

export function getOAuthProviders(): OAuthProviderConfig[] {
  return [
    {
      id: "google",
      label: "Google",
      enabled: process.env.NEXT_PUBLIC_AUTH_GOOGLE_ENABLED === "true",
    },
    {
      id: "apple",
      label: "Apple",
      enabled: process.env.NEXT_PUBLIC_AUTH_APPLE_ENABLED === "true",
    },
  ];
}
