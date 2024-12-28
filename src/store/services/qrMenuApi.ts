import { createApi } from "@reduxjs/toolkit/query/react";
import { QrMenu } from "../../types";
import { SignedUrlMenuUpload, ApiResponse } from "../../types/response";
import { UploadUrl } from "../../types/request";
import { baseQueryWithReauth } from "./baseQueries";

export const qrMenuApi = createApi({
  reducerPath: "qrMenuApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getUploadUrl: builder.mutation<ApiResponse<SignedUrlMenuUpload>, UploadUrl>(
      {
        query: (data) => ({
          url: "/menu/qr/upload_url/",
          method: "POST",
          body: data,
        }),
      }
    ),
    createQrMenu: builder.mutation<ApiResponse<QrMenu>, QrMenu>({
      query: (data) => ({
        url: "/menu/qr/create/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetUploadUrlMutation, useCreateQrMenuMutation } = qrMenuApi;
