import { jwtDecode } from "jwt-decode";
import { AuthTokens } from "../types/auth";

interface JWTPayload {
  exp: number;
  user_id: string;
  token_type: string;
}

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JWTPayload>(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch {
    return true;
  }
};

export const getTokenExpiration = (token: string): number => {
  try {
    const decoded = jwtDecode<JWTPayload>(token);
    return decoded.exp * 1000; // Convert to milliseconds
  } catch {
    return 0;
  }
};

export const storeTokens = (tokens: AuthTokens): void => {
  localStorage.setItem("accessToken", tokens.access);
  localStorage.setItem("refreshToken", tokens.refresh);
  localStorage.setItem(
    "tokenExpiration",
    getTokenExpiration(tokens.access).toString()
  );
};

export const getStoredTokens = (): Partial<AuthTokens> => {
  return {
    access: localStorage.getItem("accessToken") || undefined,
    refresh: localStorage.getItem("refreshToken") || undefined,
  };
};

export const clearTokens = (): void => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("tokenExpiration");
};

export const createAuthHeaders = (accessToken: string) => ({
  Authorization: `Bearer ${accessToken}`,
});
