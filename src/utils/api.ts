import { config } from "../config/env";

/**
 * Default API request headers
 */
export const defaultHeaders = {
  "Content-Type": "application/json",
} as const;

/**
 * API endpoints configuration
 */
export const endpoints = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
  },
  menu: {
    list: "/menus",
    create: "/menus",
    update: (id: string) => `/menus/${id}`,
    delete: (id: string) => `/menus/${id}`,
  },
  qr: {
    generate: "/qr/generate",
    list: "/qr/codes",
    delete: (id: string) => `/qr/codes/${id}`,
  },
} as const;

/**
 * API response error handler
 */
export const handleApiError = (error: unknown): Error => {
  if (error instanceof Error) {
    return error;
  }
  return new Error("An unexpected error occurred");
};

/**
 * Build full API URL
 */
export const buildApiUrl = (path: string): string => {
  return `${config.api.baseUrl}${path}`;
};
