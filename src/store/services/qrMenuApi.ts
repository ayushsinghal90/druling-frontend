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
  }),
});

export const { useGetUploadUrlMutation, useCreateQrMenuMutation } = qrMenuApi;
