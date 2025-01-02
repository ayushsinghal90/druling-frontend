import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthTokens } from "../../types/response";
import { Profile } from "../../types";
import {
  storeTokens,
  clearTokensAndProfile,
  getStoredTokens,
  storeProfile,
  getStoredProfile,
} from "../../utils/auth";

// Get initial state from localStorage if available
const getInitialState = (): AuthState => {
  const storedTokens = getStoredTokens();
  const storedProfile = getStoredProfile();

  return {
    profile: storedProfile || null,
    accessToken: storedTokens?.access || null,
    refreshToken: storedTokens?.refresh || null,
    isAuthenticated: !!storedTokens?.access,
  };
};

interface AuthState {
  profile: Profile | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ profile?: Profile; tokens: AuthTokens }>
    ) => {
      const { profile, tokens } = action.payload;
      if (profile) {
        state.profile = profile;
        storeProfile(profile as Profile);
      }
      state.accessToken = tokens.access;
      state.refreshToken = tokens.refresh;
      state.isAuthenticated = true;
      storeTokens(tokens);
    },
    logout: (state) => {
      state.profile = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      clearTokensAndProfile();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
