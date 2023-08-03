import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalSingInOpen: false,
  isModalSingUpOpen: false,
  isModalResetOpen: false,
  isModalSentMailOpen: false,
  isModalPtcOpen: false,
  tokensPtcReward: 0,
  expPtcReward: 0,
  ptcId: 0,
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setModalOpen: (state, action) => {
      const { type, status } = action.payload;
      if (type === "signin") {
        state.isModalSingInOpen = status;
      } else if (type === "signup") {
        state.isModalSingUpOpen = status;
      } else if (type === "reset") {
        state.isModalResetOpen = status;
      } else if (type === "sentMail") {
        state.isModalSentMailOpen = status;
      } else if (type === "ptc") {
        state.isModalPtcOpen = status;
      }
    },
    setPtcRewards: (state, action) => {
      state.tokensPtcReward = action.payload.tokens;
      state.expPtcReward = action.payload.exp;
      state.ptcId = action.payload.ptcId;
      console.log(action);
    },
  },
});

export const { setModalOpen, setPtcRewards } = generalSlice.actions;

export default generalSlice.reducer;
