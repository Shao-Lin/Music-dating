import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";
import { userApi } from "../api/userApi";
import { userFeedApi } from "../api/userFeedApi";
import { matchesApi } from "../api/matchesApi";
<<<<<<< HEAD
=======
import { messagesApi } from "../api/messagesApi";
>>>>>>> 47c2cb4ade45b2dd244898924fe7d8e90a6a0159
import authSlice from "./authSlice";
import setIdSlice from "./userData";

export const store = configureStore({
  reducer: {
    authUsers: authSlice,
    setDataUser: setIdSlice,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [userFeedApi.reducerPath]: userFeedApi.reducer,
    [matchesApi.reducerPath]: matchesApi.reducer,
<<<<<<< HEAD
=======
    [messagesApi.reducerPath]: messagesApi.reducer,
>>>>>>> 47c2cb4ade45b2dd244898924fe7d8e90a6a0159
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      userFeedApi.middleware,
<<<<<<< HEAD
      matchesApi.middleware
=======
      matchesApi.middleware,
      messagesApi.middleware
>>>>>>> 47c2cb4ade45b2dd244898924fe7d8e90a6a0159
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
