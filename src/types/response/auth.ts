import { Profile } from "../profile";

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface AuthResponse {
  profile: Profile;
  access: string;
  refresh: string;
}

export interface RefreshTokenResponse {
  access: string;
  refresh: string;
}
