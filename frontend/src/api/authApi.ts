import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/v1",
  }),
  tagTypes: ["AuthCode"], // ✅ обязательно указываем здесь список всех тегов
  endpoints: (build) => ({
    loginUser: build.mutation({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
    sendingEmail: build.mutation({
      query: (credentials) => ({
        url: "saveEmail",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["AuthCode"], // ✅ добавили это
    }),
    getAuthCode: build.query<string, void>({
      query: () => "authCode",
      providesTags: ["AuthCode"], // ✅ обязательно
    }),
    signupUser: build.mutation({
      query: (credentials) => ({
        url: "register",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useSignupUserMutation,
  useSendingEmailMutation,
  useGetAuthCodeQuery,
} = authApi;
