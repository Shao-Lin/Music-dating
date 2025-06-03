import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";
import { userApi } from "../api/userApi";
import { usersApi } from "../api/usersApi";
import { settingsAndEditProfileApi } from "../api/settingsAndEditProfileApi";
import { chatApi } from "../api/chatApi";
import authSlice from "./authSlice";
import setIdSlice from "./userData";

export const store = configureStore({
  reducer: {
    authUsers: authSlice,
    setDataUser: setIdSlice,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [settingsAndEditProfileApi.reducerPath]: settingsAndEditProfileApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      usersApi.middleware,
      settingsAndEditProfileApi.middleware,
      chatApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
