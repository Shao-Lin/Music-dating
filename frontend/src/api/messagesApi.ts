import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { MessageType } from "../components/UI/message/messageType";

export const messagesApi = createApi({
  reducerPath: "messagesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Messages"],
  endpoints: (build) => ({
    getMessages: build.query<MessageType[], void>({
      query: () => "/messages",
    }),
    addMessage: build.mutation({
      query: (body) => ({
        url: "/messages",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Messages"],
    }),
  }),
});

export const { useGetMessagesQuery, useAddMessageMutation } = messagesApi;
