import { createSlice } from "@reduxjs/toolkit";
import { ITransaction } from "../../../types";

interface TransactionsState {
  loading: boolean;
  error: string | null;
  selectedWeek: number;
}

const initialState: TransactionsState = {
  loading: false,
  error: null,
  selectedWeek: 0,
};
const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setSelectedWeek: (state, action) => {
      state.selectedWeek = action.payload;
    },
  },
});

export const { setSelectedWeek } = transactionsSlice.actions;
export default transactionsSlice.reducer;
