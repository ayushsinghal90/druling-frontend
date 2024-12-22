import { createApi } from "@reduxjs/toolkit/query/react";
import { LoginRequest, RegisterRequest } from "../../types/request";
import {
  AuthResponse,
  ApiResponse,
  RefreshTokenResponse,
} from "../../types/response";
import { baseQueryWithReauth } from "./baseQueries";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponse<AuthResponse>, LoginRequest>({
      query: (credentials) => ({
        url: "/user/login/",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<ApiResponse<AuthResponse>, RegisterRequest>({
      query: (data) => ({
        url: "/user/sign-up/",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout/",
        method: "POST",
      }),
    }),
    refresh: builder.mutation<ApiResponse<RefreshTokenResponse>, string>({
      query: (refresh) => ({
        url: "/token/refresh/",
        method: "POST",
        body: { refresh },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useRefreshMutation,
} = authApi;
