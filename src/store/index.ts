import { configureStore } from "@reduxjs/toolkit";
import {
  authApi,
  restaurantApi,
  branchApi,
  fileUpload,
  qrMenuApi,
  profileApi,
  emailVerify,
  transactionApi,
} from "./services";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [restaurantApi.reducerPath]: restaurantApi.reducer,
    [branchApi.reducerPath]: branchApi.reducer,
    [fileUpload.reducerPath]: fileUpload.reducer,
    [qrMenuApi.reducerPath]: qrMenuApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [emailVerify.reducerPath]: emailVerify.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
    auth: authReducer, // Auth state slice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(restaurantApi.middleware)
      .concat(branchApi.middleware)
      .concat(fileUpload.middleware)
      .concat(qrMenuApi.middleware)
      .concat(profileApi.middleware)
      .concat(emailVerify.middleware)
      .concat(transactionApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
