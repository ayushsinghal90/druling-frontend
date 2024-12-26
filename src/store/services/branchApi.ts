import { createApi } from "@reduxjs/toolkit/query/react";
import { Branch } from "../../types";
import { ApiResponse } from "../../types/response";
import { CreateBranch, UpdateBranch } from "../../types/request";
import { baseQueryWithReauth } from "./baseQueries";

export const branchApi = createApi({
  reducerPath: "branchApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    createBranch: builder.mutation<ApiResponse<Branch>, CreateBranch>({
      query: (data) => ({
        url: "/branch/create/",
        method: "POST",
        body: data,
      }),
    }),
    updateBranch: builder.mutation<
      ApiResponse<Branch>,
      { id: string; data: UpdateBranch }
    >({
      query: ({ id, data }) => ({
        url: `/branch/${id}/`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const { useCreateBranchMutation, useUpdateBranchMutation } = branchApi;
