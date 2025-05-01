import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserData } from "../components/userCard/userType";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/v1",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (build) => ({
    getUserData: build.query<UserData, void>({
      query: () => "users/me",
      providesTags: ["User"],
    }),
  }),
});

export const { useGetUserDataQuery } = userApi;
