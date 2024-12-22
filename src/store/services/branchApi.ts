import { createApi } from "@reduxjs/toolkit/query/react";
import { Branch } from "../../types";
import { ApiResponse } from "../../types/response";
import { CreateBranch } from "../../types/request";
import { baseQueryWithReauth } from "./baseQueries";

export const branckApi = createApi({
  reducerPath: "branckApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    createBranch: builder.query<ApiResponse<Branch>, CreateBranch>({
      query: () => ({
        url: "/branch/create/",
        method: "POST",
      }),
    }),
  }),
});

export const { useCreateBranchQuery } = branckApi;
