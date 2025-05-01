// userFeedApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserData } from "../components/userCard/userType";

export const userFeedApi = createApi({
  reducerPath: "userFeedApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "api/v1",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["UserFeed"], // Добавляем тип тега
  endpoints: (build) => ({
    getUserFeedData: build.query<UserData, void>({
      query: () => "users",
      providesTags: ["UserFeed"], // Помечаем, что этот endpoint предоставляет данные с тегом 'UserFeed'
    }),
  }),
});

export const { useGetUserFeedDataQuery } = userFeedApi;
