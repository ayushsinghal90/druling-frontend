import { User } from "../user";

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface AuthResponse {
  payload: User;
  access: string;
  refresh: string;
}

export interface RefreshTokenResponse {
  access: string;
  refresh: string;
}
