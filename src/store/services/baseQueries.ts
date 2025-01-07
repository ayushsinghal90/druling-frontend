import {
  fetchBaseQuery,
  BaseQueryFn,
  BaseQueryApi,
} from "@reduxjs/toolkit/query/react";
import { RefreshTokenResponse } from "../../types/response";
import { config } from "../../config/env";
import { RootState } from "../index";
import { setCredentials } from "../slices/authSlice";
import { getStoredTokens } from "../../utils/auth";

const redirectToLogout = () => window.location.replace("/logout");

export const baseQuery = fetchBaseQuery({
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

const handleTokenRefresh = async (api: BaseQueryApi, extraOptions: object) => {
  const { refresh } = getStoredTokens();

  if (!refresh) {
    redirectToLogout();
    return null;
  }

  const refreshResult = await baseQuery(
    {
      url: "/token/refresh/",
      method: "POST",
      body: { refresh },
    },
    api,
    extraOptions
  );

  if (!refreshResult.data) {
    redirectToLogout();
    return null;
  }

  const data = refreshResult.data as RefreshTokenResponse;
  api.dispatch(
    setCredentials({
      tokens: {
        access: data.access,
        refresh: data.refresh,
      },
    })
  );

  return true;
};

export const baseQueryWithReauth: BaseQueryFn = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    try {
      const refreshSuccess = await handleTokenRefresh(api, extraOptions);
      if (!refreshSuccess) return result;

      result = await baseQuery(args, api, extraOptions);
      if (result.error?.status === 401) {
        redirectToLogout();
      }
    } catch {
      redirectToLogout();
    }
  }

  return result;
};

export const baseQueryWithoutReauth: BaseQueryFn = async (
  args,
  api,
  extraOptions
) => {
  return await baseQuery(args, api, extraOptions);
};
