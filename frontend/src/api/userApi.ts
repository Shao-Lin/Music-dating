import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"], // ← обязательно
  endpoints: (build) => ({
    getUserData: build.query({
      query: () => "user/me",
      providesTags: ["User"], // ← помечаем кэш
    }),
    addPhoto: build.mutation({
      query: (photo) => ({
        url: "user/upload-photo",
        method: "POST",
        body: photo,
      }),
      invalidatesTags: ["User"], // ← сбрасываем кэш
    }),
    deletePhoto: build.mutation({
      query: (id: string) => ({
        url: `user/${id}/delete-photo`, // вставляем id в URL
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserDataQuery,
  useAddPhotoMutation,
  useDeletePhotoMutation,
} = userApi;
