import { createApi } from "@reduxjs/toolkit/query/react";
import { LoginRequest, RegisterRequest } from "../../types/request";
import {
  AuthResponse,
  ApiResponse,
  RefreshTokenResponse,
} from "../../types/response";
import { baseQueryWithoutReauth } from "./baseQueries";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithoutReauth,
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
        url: "/user/sign_up/",
        method: "POST",
        body: data,
      }),
    }),
    googleLogin: builder.mutation<ApiResponse<AuthResponse>, { token: string }>(
      {
        query: ({ token }) => ({
          url: "/user/google_login/",
          method: "POST",
          body: { token },
        }),
      }
    ),
    logout: builder.mutation<void, { refresh: string }>({
      query: ({ refresh }) => ({
        url: "/user/logout/",
        method: "POST",
        body: { refresh },
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
  useGoogleLoginMutation,
} = authApi;
