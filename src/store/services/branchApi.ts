import { createApi } from "@reduxjs/toolkit/query/react";
import { Restaurant } from "../../types";
import { ApiResponse } from "../../types/response";
import { baseQueryWithReauth } from "./baseQueries";

export const branckApi = createApi({
  reducerPath: "branckApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    createBranch: builder.query<ApiResponse<Restaurant[]>, void>({
      query: () => ({
        url: "/restaurant/list/",
        method: "POST",
      }),
    }),
  }),
});

export const { useCreateBranchQuery } = branckApi;
