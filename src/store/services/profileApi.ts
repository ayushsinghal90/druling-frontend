import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiResponse } from "../../types/response";
import { baseQueryWithReauth } from "./baseQueries";
import { Profile } from "../../types";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    updateProfile: builder.mutation<ApiResponse<Profile>, Profile>({
      query: (data) => ({
        url: "/profile/update/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useUpdateProfileMutation } = profileApi;
