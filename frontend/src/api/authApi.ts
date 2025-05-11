import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://vibedating.ru/api/auth",
  }),
  tagTypes: ["AuthCode"],
  endpoints: (build) => ({
    loginUser: build.mutation({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
    sendingEmail: build.mutation({
      query: (email) => ({
        url: "request-code",
        method: "POST",
        params: { email },
      }),
      invalidatesTags: ["AuthCode"], // ✅ добавили это
    }),
    sendingAuthCode: build.mutation({
      query: (code) => ({
        url: `verify-code?email=${encodeURIComponent(
          code.email
        )}&code=${encodeURIComponent(code.code)}`,
        method: "POST",
      }),
      invalidatesTags: ["AuthCode"], // ✅ добавили это
    }),
    signupUser: build.mutation({
      query: (formData) => ({
        url: "register",
        method: "POST",
        body: formData,
        responseHandler: (response) => response.text(), // обработать как обычный текст
      }),
    }),
    logout: build.mutation({
      query: (token) => ({
        url: `logout?refreshToken=${encodeURIComponent(token)}`,
        method: "DELETE",
        responseHandler: (response) => response.text(),
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useSignupUserMutation,
  useSendingEmailMutation,
  useSendingAuthCodeMutation,
  useLogoutMutation,
} = authApi;
