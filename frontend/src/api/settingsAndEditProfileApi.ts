import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";

export const settingsAndEditProfileApi = createApi({
  reducerPath: "settingsAndEditProfileApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["UserSettings", "User"], // ← обязательно
  endpoints: (build) => ({
    getSettingsData: build.query({
      query: () => "user/settings",
      providesTags: ["UserSettings"], // ← помечаем кэш
    }),
    editSettings: build.mutation({
      query: (settings) => ({
        url: "user/settings",
        method: "PUT",
        body: settings,
      }),
      invalidatesTags: ["UserSettings"], // ← сбрасываем кэш
    }),
    editProfile: build.mutation({
      query: (userData) => ({
        url: "user/edit-profile",
        method: "PUT",
        body: userData,
      }),
      invalidatesTags: ["UserSettings", "User"], // ← сбрасываем кэш
    }),
    buySub: build.mutation({
      query: () => ({
        url: "user/buy-sub",
        method: "POST",
      }),
    }),
    patchActiveTrack: build.mutation({
      query: (trackId) => ({
        url: `user/${trackId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"], // ← сбрасываем кэш
    }),
    regenerateTracks: build.mutation({
      query: () => ({
        url: `user/regenerate-track`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"], // ← сбрасываем кэш
    }),
  }),
});

export const {
  useGetSettingsDataQuery,
  useEditSettingsMutation,
  useEditProfileMutation,
  useBuySubMutation,
  usePatchActiveTrackMutation,
  useRegenerateTracksMutation,
} = settingsAndEditProfileApi;
