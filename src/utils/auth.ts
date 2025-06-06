import { jwtDecode } from "jwt-decode";
import { AuthTokens } from "../types/response";
import { Profile, ProfileFeature } from "../types";

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

export const storeProfile = (profile: Profile): void => {
  localStorage.setItem("profile", JSON.stringify(profile));
};

export const storeProfileFeatures = (features: ProfileFeature[]): void => {
  localStorage.setItem("feature", JSON.stringify(features));
};

export const clearTokensAndProfile = (): void => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("tokenExpiration");
  localStorage.removeItem("profile");
  localStorage.removeItem("feature");
};

export const getStoredTokens = (): Partial<AuthTokens> => {
  return {
    access: localStorage.getItem("accessToken") || undefined,
    refresh: localStorage.getItem("refreshToken") || undefined,
  };
};

export const getStoredProfile = (): Profile | null => {
  const profile = localStorage.getItem("profile");
  return profile ? JSON.parse(profile) : null;
};

export const getStoredProfileFeatures = (): ProfileFeature[] | null => {
  const features = localStorage.getItem("feature");
  return features ? JSON.parse(features) : null;
};

export const createAuthHeaders = (accessToken: string) => ({
  Authorization: `Bearer ${accessToken}`,
});
