import { createApi } from "@reduxjs/toolkit/query/react";
import { Restaurant } from "../../types";
import { ApiResponse } from "../../types/response";
import { baseQueryWithReauth } from "./baseQueries";

export const restaurantApi = createApi({
  reducerPath: "restaurantApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllRestaurants: builder.query<ApiResponse<Restaurant[]>, void>({
      query: () => ({
        url: "/restaurant/list/",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllRestaurantsQuery } = restaurantApi;
