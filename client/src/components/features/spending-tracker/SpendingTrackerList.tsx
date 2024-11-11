import React, { memo } from "react";
import Card from "../../reusables/Card";
import { TrackersList } from "./TrackersList";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { deleteTracker } from "../../../store/features/spendTracker/spendTrackerSlice";

interface ISpendingTrackerListProps {
  handleSetCurrentTracker: (tracker: any) => void;
}

const SpendingTrackerList: React.FC<ISpendingTrackerListProps> = ({
  handleSetCurrentTracker,
}) => {
  const dispatch = useDispatch();
  const trackers = useSelector((state: RootState) => state.trackers.items);
  const handleDeleteTracker = (id: number) => {
    dispatch(deleteTracker(id));
  };
  return (
    <Card>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Active Trackers
      </h2>
      <TrackersList
        trackers={trackers}
        onEdit={handleSetCurrentTracker}
        onDelete={handleDeleteTracker}
      />
    </Card>
  );
};

export default memo(SpendingTrackerList);
