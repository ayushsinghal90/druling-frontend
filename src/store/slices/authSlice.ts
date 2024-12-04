import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, AuthTokens } from "../../types/auth";
import { storeTokens, clearTokens } from "../../utils/auth";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user?: User; tokens: AuthTokens }>
    ) => {
      const { user, tokens } = action.payload;
      if (user) {
        state.user = user;
      }
      state.accessToken = tokens.access;
      state.refreshToken = tokens.refresh;
      state.isAuthenticated = true;
      storeTokens(tokens);
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      clearTokens();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
