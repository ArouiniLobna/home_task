// slices/spendTrackerSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface ITracker {
  id: number;
  name: string;
  category: string;
  limit: number;
  period: "weekly" | "monthly";
}

interface TrackersState {
  items: ITracker[];
  loading: boolean;
  error: string | null;
}

const initialState: TrackersState = {
  items: [],
  loading: false,
  error: null,
};

const trackersSlice = createSlice({
  name: "trackers",
  initialState,
  reducers: {
    addTracker: (state, action: PayloadAction<Omit<ITracker, "id">>) => {
      const id = state.items.length
        ? Math.max(...state.items.map((t) => t.id)) + 1
        : 1;
      state.items.push({ ...action.payload, id });
    },
    updateTracker: (state, action: PayloadAction<ITracker>) => {
      const index = state.items.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteTracker: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addTracker, updateTracker, deleteTracker } =
  trackersSlice.actions;
export default trackersSlice.reducer;
