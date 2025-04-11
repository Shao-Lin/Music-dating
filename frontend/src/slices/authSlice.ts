import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialStateType = {
  login: string | null;
  password: string | null;
};

type PayloadType = {
  login: string;
  password: string;
};

const initialState: InitialStateType = {
  login: null,
  password: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<PayloadType>) => {
      const { login, password } = action.payload;
      state.login = login;
      state.password = password;
    },
    deleteCredentials: (state) => {
      state.login = null;
      state.password = null;
    },
  },
});

export const { setCredentials, deleteCredentials } = authSlice.actions;
export default authSlice.reducer;
