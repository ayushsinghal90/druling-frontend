import { z } from "zod";

// Environment variable schema
const envSchema = z.object({
  // API Configuration
  VITE_API_URL: z.string().url(),
  VITE_API_TIMEOUT: z.string().transform(Number),

  // Authentication
  VITE_AUTH_COOKIE_NAME: z.string(),
  VITE_AUTH_COOKIE_EXPIRES: z.string().transform(Number),

  // Feature Flags
  VITE_ENABLE_SOCIAL_LOGIN: z.string().transform((v) => v === "true"),
  VITE_ENABLE_ANALYTICS: z.string().transform((v) => v === "true"),

  // External Services
  VITE_GOOGLE_CLIENT_ID: z.string(),
  VITE_GITHUB_CLIENT_ID: z.string(),

  // Application
  VITE_APP_NAME: z.string(),
  VITE_APP_DESCRIPTION: z.string(),
  VITE_SUPPORT_EMAIL: z.string().email(),
});

// Parse and validate environment variables
const env = envSchema.parse(import.meta.env);

// Export typed configuration object
export const config = {
  api: {
    baseUrl: env.VITE_API_URL,
    timeout: env.VITE_API_TIMEOUT,
  },
  auth: {
    cookieName: env.VITE_AUTH_COOKIE_NAME,
    cookieExpires: env.VITE_AUTH_COOKIE_EXPIRES,
  },
  features: {
    socialLogin: env.VITE_ENABLE_SOCIAL_LOGIN,
    analytics: env.VITE_ENABLE_ANALYTICS,
  },
  services: {
    google: {
      clientId: env.VITE_GOOGLE_CLIENT_ID,
    },
  },
  app: {
    name: env.VITE_APP_NAME,
    description: env.VITE_APP_DESCRIPTION,
    supportEmail: env.VITE_SUPPORT_EMAIL,
  },
} as const;

// Type for the entire config object
export type Config = typeof config;
