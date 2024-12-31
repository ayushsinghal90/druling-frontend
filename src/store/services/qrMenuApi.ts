import { createApi } from "@reduxjs/toolkit/query/react";
import { MenuData } from "../../types";
import { SignedUrl, ApiResponse } from "../../types/response";
import { UploadMenu } from "../../types/request";
import { baseQueryWithReauth } from "./baseQueries";

export const qrMenuApi = createApi({
  reducerPath: "qrMenuApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getUploadUrl: builder.mutation<ApiResponse<SignedUrl[]>, UploadMenu>({
      query: (data) => ({
        url: "/menu/qr/upload_url/",
        method: "POST",
        body: data,
      }),
    }),
    createQrMenu: builder.mutation<ApiResponse<MenuData>, UploadMenu>({
      query: (data) => ({
        url: "/menu/qr/create/",
        method: "POST",
        body: data,
      }),
    }),
    getAllMenus: builder.query<ApiResponse<MenuData[]>, void>({
      query: () => ({
        url: "/menu/qr/list/",
        method: "GET",
      }),
    }),
    getMenuById: builder.query<ApiResponse<MenuData>, { id: string }>({
      query: ({ id }) => ({
        url: `/menu/qr/${id}/`,
        method: "GET",
      }),
    }),
    getMenuByBranchId: builder.query<ApiResponse<MenuData>, { id: string }>({
      query: ({ id }) => ({
        url: `/menu/qr/branch/${id}/`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetUploadUrlMutation,
  useCreateQrMenuMutation,
  useGetAllMenusQuery,
  useGetMenuByIdQuery,
  useGetMenuByBranchIdQuery,
} = qrMenuApi;
