import { fetchBaseQuery, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { RefreshTokenResponse } from "../../types/response";
import { config } from "../../config/env";
import { RootState } from "../index";
import { setCredentials } from "../slices/authSlice";
import { getStoredTokens } from "../../utils/auth";

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

export const baseQueryWithReauth: BaseQueryFn = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const { refresh } = getStoredTokens();

    if (!refresh) {
      window.location.replace("/logout");
    }

    try {
      const refreshResult = await baseQuery(
        {
          url: "/token/refresh/",
          method: "POST",
          body: { refresh },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        const data = refreshResult.data as RefreshTokenResponse;
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
        window.location.replace("/logout");
      }
    } catch {
      window.location.replace("/logout");
    }
  }

  return result;
};
