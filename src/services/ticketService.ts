import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { TicketServiceApiResponse } from "../types";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/services",
  }),
  endpoints: builder => ({
    getTicketsAndUsers: builder.query<TicketServiceApiResponse, void>({
      query: () => "frontend-assignment",
    }),
  }),
});

export const { useGetTicketsAndUsersQuery } = apiSlice;
