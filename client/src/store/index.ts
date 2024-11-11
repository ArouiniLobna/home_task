// store.ts
import { configureStore } from "@reduxjs/toolkit";
import spendTrackerReducer from "./features/spendTracker/spendTrackerSlice";
import transactionsReducer from "./features/transactions/transactionsSlice";

export const store = configureStore({
  reducer: {
    trackers: spendTrackerReducer,
    transactions: transactionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
