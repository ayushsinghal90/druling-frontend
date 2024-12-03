import { config } from "../config/env";

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
  AUTH_TOKEN: "auth_token",
  USER_PREFERENCES: "user_preferences",
  THEME: "theme",
} as const;

/**
 * Get item from local storage with type safety
 */
export const getStorageItem = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error reading from localStorage:`, error);
    return null;
  }
};

/**
 * Set item in local storage with error handling
 */
export const setStorageItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage:`, error);
  }
};

/**
 * Remove item from local storage
 */
export const removeStorageItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage:`, error);
  }
};

/**
 * Clear all storage items
 */
export const clearStorage = (): void => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error(`Error clearing localStorage:`, error);
  }
};

/**
 * Get authentication token
 */
export const getAuthToken = (): string | null => {
  return getStorageItem(STORAGE_KEYS.AUTH_TOKEN);
};

/**
 * Set authentication token with expiration
 */
export const setAuthToken = (token: string): void => {
  setStorageItem(STORAGE_KEYS.AUTH_TOKEN, token);
  // Set cookie for additional security
  document.cookie = `${config.auth.cookieName}=${token}; max-age=${
    config.auth.cookieExpires * 24 * 60 * 60
  }; path=/`;
};
