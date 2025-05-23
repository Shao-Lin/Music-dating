import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";

// Мьютекс для предотвращения одновременных запросов на обновление токена
const mutex = new Mutex();

interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

const queryWithRefresh = fetchBaseQuery({
  baseUrl: "http://localhost:8088/",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("refreshToken");
    if (token) {
      headers.set("Authorization", `${token}`);
    }
    return headers;
  },
});

const queryWithAccess = fetchBaseQuery({
  baseUrl: "http://localhost:8088/",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  object,
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await queryWithAccess(args, api, extraOptions);

  if (result.error) {
    if (result.error.status === 500) {
      // Токен истек, пытаемся обновить
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
        try {
          const refreshToken = localStorage.getItem("refreshToken");
          if (!refreshToken) {
            console.error("No refreshToken available");
            return result;
          }
          console.log(args);
          console.log(api);
          console.log(extraOptions);

          const refreshResult = await queryWithRefresh(
            {
              url: "/auth/refresh", // Исправленный URL
              method: "POST",
              body: { refreshToken },
            },
            api,
            extraOptions
          );

          if (refreshResult.data) {
            const { accessToken, refreshToken: newRefreshToken } =
              refreshResult.data as RefreshTokenResponse;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", newRefreshToken);
            console.log("Token refreshed successfully");
            result = await queryWithAccess(args, api, extraOptions);
          } else {
            console.error("Failed to refresh token:", refreshResult.error);
            //localStorage.removeItem("accessToken");
            //localStorage.removeItem("refreshToken");
          }
        } finally {
          release();
        }
      } else {
        await mutex.waitForUnlock();
        result = await queryWithAccess(args, api, extraOptions);
      }
    } else if (result.error.status === 401) {
      // Ошибка доступа, токен может быть недействителен или недостаточно прав
      console.error(
        "Access forbidden. Check token validity or permissions:",
        result.error
      );
    }
  }

  return result;
};
