import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";
import { UserData } from "../components/userCard/userType";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getRecommendations: build.query<UserData[], { page: number; size: number }>(
      {
        query: ({ page, size }) => ({
          url: "users/recommendations",
          params: { page, size },
        }),
      }
    ),
  }),
});

export const { useGetRecommendationsQuery } = usersApi;
