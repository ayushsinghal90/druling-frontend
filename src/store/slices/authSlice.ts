import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthTokens } from "../../types/response";
import { Profile, ProfileFeature } from "../../types";
import {
  storeTokens,
  clearTokensAndProfile,
  getStoredTokens,
  storeProfile,
  getStoredProfile,
  storeProfileFeatures,
  getStoredProfileFeatures,
} from "../../utils/auth";

// Get initial state from localStorage if available
const getInitialState = (): AuthState => {
  const storedTokens = getStoredTokens();
  const storedProfile = getStoredProfile();
  const storedFeatures = getStoredProfileFeatures();

  return {
    profile: storedProfile || null,
    features: storedFeatures || null,
    accessToken: storedTokens?.access || null,
    refreshToken: storedTokens?.refresh || null,
    isAuthenticated: !!storedTokens?.access,
  };
};

interface AuthState {
  profile: Profile | null;
  features: ProfileFeature[] | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    setProfile: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload;
      storeProfile(action.payload as Profile);
    },
    setProfileFeatures: (state, action: PayloadAction<ProfileFeature[]>) => {
      state.features = action.payload;
      storeProfileFeatures(action.payload as ProfileFeature[]);
    },
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

export const { setProfile, setProfileFeatures, setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
