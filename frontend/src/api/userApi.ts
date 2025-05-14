import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserData } from "../components/userCard/userType";
import { baseQueryWithReauth } from "./baseQueryWithReauth";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: (build) => ({
    getUserData: build.query<UserData, void>({
      query: () => "user/me",
      providesTags: ["User"],
    }),
  }),
});

export const { useGetUserDataQuery } = userApi;
