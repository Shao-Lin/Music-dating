import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://vibedating.ru/api",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

function shouldRefreshToken(error: FetchBaseQueryError) {
  // Обработка и 401 и некоторых 403
  if (error.status === 401) return true;

  if (error.status === 403) {
    const message =
      typeof error.data === "string"
        ? error.data
        : (error.data as any)?.message || "";

    // Подстрой под своё API — какое сообщение приходит при истёкшем access-токене?
    return (
      message.toLowerCase().includes("token expired") ||
      message.toLowerCase().includes("jwt expired") ||
      message.toLowerCase().includes("unauthorized")
    );
  }

  return false;
}

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && shouldRefreshToken(result.error)) {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      return result;
    }

    const refreshResult = await baseQuery(
      {
        url: "auth/refresh",
        method: "POST",
        body: { refreshToken },
      },
      api,
      extraOptions
    );

    const refreshData = refreshResult.data as RefreshResponse | undefined;

    if (refreshData?.accessToken && refreshData.refreshToken) {
      localStorage.setItem("accessToken", refreshData.accessToken);
      localStorage.setItem("refreshToken", refreshData.refreshToken);

      // Повторный вызов исходного запроса
      result = await baseQuery(args, api, extraOptions);
    } else {
      // refresh не удался — чистим токены
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  }

  return result;
};
