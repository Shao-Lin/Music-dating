import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialStateType = {
  id: string | null;
  activeIndexImage: number;
};

type PayloadType = {
  id: string | null;
};
type IndexType = {
  activeIndexImage: number;
};

const initialState: InitialStateType = {
  id: null,
  activeIndexImage: 0,
};

const setIdSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<PayloadType>) => {
      const { id } = action.payload;
      state.id = id;
    },
    setActiveImage: (state, action: PayloadAction<IndexType>) => {
      const { activeIndexImage } = action.payload;
      state.activeIndexImage = activeIndexImage;
    },
  },
});

export const { setId, setActiveImage } = setIdSlice.actions;
export default setIdSlice.reducer;
