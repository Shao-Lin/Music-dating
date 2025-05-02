import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialStateType = {
  id: string | null;
};

type PayloadType = {
  id: string | null;
};

const initialState: InitialStateType = {
  id: null,
};

const setIdSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<PayloadType>) => {
      const { id } = action.payload;
      state.id = id;
    },
  },
});

export const { setId } = setIdSlice.actions;
export default setIdSlice.reducer;
