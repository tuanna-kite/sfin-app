import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserProfile } from "../types/user";

type UserState = {
  user: UserProfile | null;
};

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, actions: PayloadAction<UserProfile>) => {
      const {payload} = actions;
      state.user = {
        phone: payload.phone,
        password: payload.password,
      };
    },
    removeUser: (state) => {
      state.user = null;
    },
  },
});

export const setUser = userSlice.actions.setUser;
export const removeUser = userSlice.actions.removeUser;
export const userReducer = userSlice.reducer;
