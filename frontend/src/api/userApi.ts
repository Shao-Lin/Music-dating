import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
<<<<<<< HEAD
import { UserData, UserId } from "../components/userCard/userType";
=======
import { UserData } from "../components/userCard/userType";
>>>>>>> 47c2cb4ade45b2dd244898924fe7d8e90a6a0159

export const userApi = createApi({
  reducerPath: "userApi",
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
  tagTypes: ["User"],
  endpoints: (build) => ({
    getUserData: build.query<UserData, void>({
      query: () => "users/me",
      providesTags: ["User"],
    }),
<<<<<<< HEAD
    getUserId: build.query<UserId, void>({
      query: () => "users/me",
      providesTags: ["User"],
    }),
  }),
});

export const { useGetUserDataQuery, useGetUserIdQuery } = userApi;
=======
  }),
});

export const { useGetUserDataQuery } = userApi;
>>>>>>> 47c2cb4ade45b2dd244898924fe7d8e90a6a0159
