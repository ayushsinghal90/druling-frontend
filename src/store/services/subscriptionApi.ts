import { createApi } from "@reduxjs/toolkit/query/react";
import { Subscription } from "../../types";
import { baseQueryWithReauth } from "./baseQueries";
import { ApiResponse } from "../../types/response";

export const subscriptionApi = createApi({
  reducerPath: "subscriptionApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllSubscriptions: builder.query<ApiResponse<Subscription[]>, void>({
      query: () => ({
        url: "/subscription/all/",
        method: "GET",
      }),
    }),
    getSubscriptionById: builder.query<ApiResponse<Subscription>, { id: string }>({
      query: ({ id }) => ({
        url: `/subscription/${id}/`,
        method: "GET",
      }),
    }),
  })
});

export const {
  useGetAllSubscriptionsQuery,
  useGetSubscriptionByIdQuery
} = subscriptionApi;
