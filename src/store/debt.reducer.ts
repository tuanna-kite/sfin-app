import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IDebt } from "../types/debt";

type DebtState = {
  debts: IDebt[];
};

const initialState: DebtState = {
  debts: [],
};

const debtSlice = createSlice({
  name: "debts",
  initialState,
  reducers: {
    debtRequest: (state, action: PayloadAction<IDebt>) => {
      state.debts = [action.payload, ...state.debts];
    },
  },
});

export const debtRequest = debtSlice.actions.debtRequest;
export const errorReducer = debtSlice.reducer;
