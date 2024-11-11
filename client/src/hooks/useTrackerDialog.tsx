import { useCallback, useState } from "react";
import { ITracker } from "../store/features/spendTracker/spendTrackerSlice";

export const useTrackerDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTracker, setCurrentTracker] = useState<ITracker | null>(null);

  const openDialog = useCallback((tracker?: ITracker) => {
    setCurrentTracker(tracker || null);
    setIsDialogOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsDialogOpen(false);
    setCurrentTracker(null);
  }, []);

  return {
    isDialogOpen,
    currentTracker,
    openDialog,
    closeDialog,
  };
};
