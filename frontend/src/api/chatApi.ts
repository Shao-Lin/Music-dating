import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";
import type {
  ChatItemType,
  ChatMessageResponse,
} from "../components/chatItem/chatItemType";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Chats"],
  endpoints: (build) => ({
    createChat: build.mutation({
      query: (participants) => ({
        url: "chat",
        method: "POST",
        body: { participants: participants },
      }),
    }),
    getChats: build.query<ChatItemType[], void>({
      query: () => "chat",
      providesTags: ["Chats"],
    }),
    getMessages: build.query<
      ChatMessageResponse,
      { chatId: string | undefined; page?: number; size?: number }
    >({
      query: ({ chatId, page = 0, size = 30 }) =>
        `chat/${chatId}/messages?page=${page}&size=${size}`,
    }),
    getChatForMatchItem: build.query<ChatItemType, string>({
      query: (targetId) => `chat/${targetId}`,
    }),
    addMessage: build.mutation<void, { chatId: string; formData: FormData }>({
      query: ({ chatId, formData }) => ({
        url: `chat/${chatId}/messages`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Chats"],
    }),
  }),
});
export const {
  useCreateChatMutation,
  useGetChatsQuery,
  useGetMessagesQuery,
  useGetChatForMatchItemQuery,
  useAddMessageMutation,
} = chatApi;
