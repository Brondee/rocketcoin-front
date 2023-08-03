import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  name: null,
  surname: null,
  login: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      const { email, name, surname, login } = action.payload;
      state.email = email;
      state.name = name;
      state.surname = surname;
      state.login = login;
    },
  },
});

export const { setUserInfo } = userSlice.actions;

export default userSlice.reducer;
