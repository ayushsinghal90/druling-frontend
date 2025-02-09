import { createApi } from "@reduxjs/toolkit/query/react";
import { Transaction } from "../../types";
import { baseQueryWithReauth } from "./baseQueries";
import { ApiResponse } from "../../types/response";

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // createQrMenu: builder.mutation<ApiResponse<Transaction>, UploadMenu>({
    //   query: (data) => ({
    //     url: "/menu/qr/create/",
    //     method: "POST",
    //     body: data,
    //   }),
    // }),
    getAllTransactions: builder.query<ApiResponse<Transaction[]>, void>({
      query: () => ({
        url: "/transaction/all/",
        method: "GET",
      }),
    }),
  })
});

export const {
  useGetAllTransactionsQuery
} = transactionApi;
