import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";
import { userApi } from "../api/userApi";
import { usersApi } from "../api/usersApi";
import { matchesApi } from "../api/matchesApi";
import { messagesApi } from "../api/messagesApi";
import authSlice from "./authSlice";
import setIdSlice from "./userData";

export const store = configureStore({
  reducer: {
    authUsers: authSlice,
    setDataUser: setIdSlice,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [matchesApi.reducerPath]: matchesApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      usersApi.middleware,
      matchesApi.middleware,
      messagesApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
