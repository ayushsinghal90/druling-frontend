import { createApi } from "@reduxjs/toolkit/query/react";
import { EmailVerify } from "../../types/request";
import { ApiResponse } from "../../types/response";
import { baseQueryWithoutReauth } from "./baseQueries";

export const emailVerify = createApi({
  reducerPath: "emailVerify",
  baseQuery: baseQueryWithoutReauth,
  endpoints: (builder) => ({
    sendCode: builder.mutation<ApiResponse<null>, EmailVerify>({
      query: (credentials) => ({
        url: "/user/email_verify/send_code/",
        method: "POST",
        body: credentials,
      }),
    }),
    verify: builder.mutation<ApiResponse<null>, EmailVerify>({
      query: (data) => ({
        url: "/user/email_verify/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSendCodeMutation, useVerifyMutation } = emailVerify;
