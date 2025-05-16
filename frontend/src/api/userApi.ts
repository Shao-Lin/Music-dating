import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getUserData: build.query({
      query: () => "user/me",
    }),
  }),
});

export const { useGetUserDataQuery } = userApi;
