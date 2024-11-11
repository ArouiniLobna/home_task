import React, { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  addTracker,
  updateTracker,
  ITracker,
} from "../store/features/spendTracker/spendTrackerSlice";

import { TrackerForm } from "../components/features/spending-tracker/TrackerFrom";
import SpendingOverview from "../components/features/spending-tracker/SpendingOverview";
import SpendingHeader from "../components/features/spending-tracker/SpendingHeader";
import SpendingTrackerList from "../components/features/spending-tracker/SpendingTrackerList";
import { useTrackerDialog } from "../hooks/useTrackerDialog";

const SpendTrackerDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { isDialogOpen, currentTracker, openDialog, closeDialog } =
    useTrackerDialog();

  const handleCreateTracker = useCallback(
    (data: ITracker) => {
      dispatch(addTracker(data));
      closeDialog();
    },
    [dispatch, closeDialog]
  );

  const handleUpdateTracker = useCallback(
    (data: ITracker) => {
      dispatch(updateTracker(data));
      closeDialog();
    },
    [dispatch, closeDialog]
  );

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <SpendingHeader setIsDialogOpen={() => openDialog()} />
        <SpendingOverview />
        <div className="mt-8">
          <SpendingTrackerList handleSetCurrentTracker={openDialog} />
        </div>
        <TrackerForm
          isOpen={isDialogOpen}
          onClose={closeDialog}
          onSubmit={currentTracker ? handleUpdateTracker : handleCreateTracker}
          initialData={currentTracker}
          title={currentTracker ? "Edit Tracker" : "Create New Tracker"}
        />
      </div>
    </div>
  );
};

export default memo(SpendTrackerDashboard);
