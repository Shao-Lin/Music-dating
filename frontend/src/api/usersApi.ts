import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";
import { RecommendationUser } from "../components/userCard/userType";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Recommendations", "Matches"],
  endpoints: (build) => ({
    getRecommendations: build.query<
      RecommendationUser[],
      { page: number; size: number }
    >({
      query: ({ page, size }) => ({
        url: "users/recommendations",
        params: { page, size },
      }),
      providesTags: ["Recommendations"],
    }),
    likeTarget: build.mutation({
      query: (targetId) => ({
        url: `users/${targetId}/like`,
        method: "POST",
      }),
      invalidatesTags: ["Recommendations", "Matches"],
    }),
    dislikeTarget: build.mutation({
      query: (targetId) => ({
        url: `users/${targetId}/dislike`,
        method: "POST",
      }),
      invalidatesTags: ["Recommendations", "Matches"],
    }),
    getMatchesData: build.query<RecommendationUser[], void>({
      query: () => "users/matches",
      providesTags: ["Matches"], // ← помечаем кэш
    }),
  }),
});

export const {
  useGetRecommendationsQuery,
  useLikeTargetMutation,
  useDislikeTargetMutation,
  useGetMatchesDataQuery,
} = usersApi;
