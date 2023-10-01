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
  tokensBonusReward: 0,
  expBonusReward: 0,
  curLang: "en",
  isModalAdblockOpen: false,
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
      } else if (type === "adblock") {
        state.isModalAdblockOpen = status;
      }
    },
    setPtcRewards: (state, action) => {
      state.tokensPtcReward = action.payload.tokens;
      state.expPtcReward = action.payload.exp;
      state.ptcId = action.payload.ptcId;
      console.log(action);
    },
    setBonusReward: (state, action) => {
      state.tokensBonusReward = action.payload.tokens;
      state.expBonusReward = action.payload.exp;
    },
    setCurLang: (state, action) => {
      state.curLang = action.payload;
    },
  },
});

export const { setModalOpen, setPtcRewards, setBonusReward, setCurLang } =
  generalSlice.actions;

export default generalSlice.reducer;
