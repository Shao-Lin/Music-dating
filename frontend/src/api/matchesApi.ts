import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MatchItemType } from "../components/matchItem/matchItemType";
import { SelectMatchType } from "../components/UI/selectMatch/selectMatchTypes";

export const matchesApi = createApi({
  reducerPath: "matchesApi",
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
  tagTypes: ["Matches", "UserFeed"], // Объявляем используемые теги

  endpoints: (build) => ({
    getListUserMatches: build.query<MatchItemType[], void>({
      query: () => "matches/list",
      providesTags: ["Matches"],
    }),

    deleteMatch: build.mutation({
      query: (id) => ({
        url: `matches/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Matches"], // Инвалидируем тег Matches
    }),

    selectMatch: build.mutation<void, SelectMatchType>({
      query: (matchData) => ({
        url: "matches",
        method: "POST",
        body: {
          me_id: matchData.userMe.MeId,
          me_match: matchData.userMe.meMatch,
          feed_id: matchData.userFeed.userFeedId,
        },
      }),
      invalidatesTags: [{ type: "UserFeed" }], // Инвалидируем оба тега
    }),
  }),
});

export const {
  useGetListUserMatchesQuery,
  useSelectMatchMutation,
  useDeleteMatchMutation,
} = matchesApi;
