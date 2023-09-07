import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPopup } from "../types/popup";

type PopupState = {
  popup: IPopup | null;
};

const initialState: PopupState = {
  popup: null,
};

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    setPopup: (state, actions: PayloadAction<IPopup>) => {
      state.popup = actions.payload;
    },
    removePopup: (state) => {
      state.popup = null;
    },
  },
});

export const setPopup = popupSlice.actions.setPopup;
export const removePopup = popupSlice.actions.removePopup;
export const popupReducer = popupSlice.reducer;
