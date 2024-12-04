import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
} from "@reduxjs/toolkit/query/react";
import {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  RefreshTokenResponse,
} from "../../types/auth";
import { config } from "../../config/env";
import { RootState } from "../index";
import { setCredentials, logout } from "../slices/authSlice";
import { getStoredTokens } from "../../utils/auth";

const baseQuery = fetchBaseQuery({
  baseUrl: config.api.baseUrl,
  credentials: "include",
  timeout: config.api.timeout,
  prepareHeaders: (headers, { getState }) => {
    const { accessToken } = (getState() as RootState).auth;
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const { refreshToken } = getStoredTokens();

    if (!refreshToken) {
      api.dispatch(logout());
      return result;
    }

    const refreshResult = await baseQuery(
      {
        url: "/token/refresh",
        method: "POST",
        body: { refresh: refreshToken },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const { data } = refreshResult.data as RefreshTokenResponse;
      api.dispatch(
        setCredentials({
          tokens: {
            access: data.access,
            refresh: data.refresh,
          },
        })
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/user/login/",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<AuthResponse, RegisterRequest>({
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
    refresh: builder.mutation<RefreshTokenResponse, string>({
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
