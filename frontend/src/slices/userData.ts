import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialStateType = {
  userId: string | null;
  activeIndexImage: number;
};

type PayloadType = {
  userId: string | null;
};
type IndexType = {
  activeIndexImage: number;
};

const initialState: InitialStateType = {
  userId: null,
  activeIndexImage: 0,
};

const setIdSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<PayloadType>) => {
      const { userId } = action.payload;
      state.userId = userId;
    },
    setActiveImage: (state, action: PayloadAction<IndexType>) => {
      const { activeIndexImage } = action.payload;
      state.activeIndexImage = activeIndexImage;
    },
  },
});

export const { setId, setActiveImage } = setIdSlice.actions;
export default setIdSlice.reducer;
