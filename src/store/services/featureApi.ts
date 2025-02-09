import { createApi } from "@reduxjs/toolkit/query/react";
import { ProfileFeature } from "../../types";
import { baseQueryWithReauth } from "./baseQueries";
import { ApiResponse } from "../../types/response";

export const featureApi = createApi({
  reducerPath: "featureApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllFeatures: builder.query<ApiResponse<ProfileFeature[]>, void>({
      query: () => ({
        url: "/feature/profile/all/",
        method: "GET",
      }),
    }),
  })
});

export const {
  useGetAllFeaturesQuery,
} = featureApi;
