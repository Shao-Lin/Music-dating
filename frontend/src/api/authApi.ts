import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://vibedating.ru/api/auth",
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
      query: (credentials) => ({
        url: "request-code",
        method: "POST",
        params: credentials,
      }),
      invalidatesTags: ["AuthCode"], // ✅ добавили это
    }),
    sendingAuthCode: build.mutation({
      query: (code) => ({
        url: "verify-code",
        method: "POST",
        params: code,
      }),
      invalidatesTags: ["AuthCode"], // ✅ добавили это
    }),
    signupUser: build.mutation({
      query: (credentials) => {
        const formData = new FormData();
        formData.append("name", credentials.name);
        formData.append("about", credentials.about);
        formData.append("birthDate", credentials.birthDate.toISOString()); // дату в строку
        formData.append("city", credentials.city);
        formData.append("gender", credentials.gender);
        formData.append("login", credentials.login);
        formData.append("password", credentials.password);

        if (credentials.image) {
          formData.append("image", credentials.image);
        }

        return {
          url: "register",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useSignupUserMutation,
  useSendingEmailMutation,
  useSendingAuthCodeMutation,
} = authApi;
