import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/authApi";
import { restaurantApi } from "./services/restaurantApi"; // Another RTK Query API
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer, // Auth API slice
    [restaurantApi.reducerPath]: restaurantApi.reducer, // Restaurant API slice
    auth: authReducer, // Auth state slice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(restaurantApi.middleware), // Add multiple middlewares
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
