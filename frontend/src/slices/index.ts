import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";
import authSlice from "./authSlice";

export const store = configureStore({
  reducer: {
    authUsers: authSlice,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
