import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialStateType = {
  userId: string | null;
  activeIndexImage: number;
  partnerId: string | null;
};

type PayloadType = {
  userId: string | null;
};
type IndexType = {
  activeIndexImage: number;
};
type PartnerType = {
  partnerId: string | null;
};

const initialState: InitialStateType = {
  userId: null,
  activeIndexImage: 0,
  partnerId: null,
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
    setPartnerId: (state, action: PayloadAction<PartnerType>) => {
      const { partnerId } = action.payload;
      state.partnerId = partnerId;
    },
  },
});

export const { setId, setActiveImage, setPartnerId } = setIdSlice.actions;
export default setIdSlice.reducer;
