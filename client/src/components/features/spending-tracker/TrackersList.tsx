import React from "react";
import { ITracker } from "../../../store/features/spendTracker/spendTrackerSlice";
import BudgetCategoryCard from "../../reusables/BudgetCategoryCard";

interface TrackersListProps {
  trackers: ITracker[];
  onEdit: (tracker: any) => void;
  onDelete: (id: number) => void;
}

export const TrackersList: React.FC<TrackersListProps> = ({
  trackers,
  onEdit,
  onDelete,
}) => {
  const handleEdit = (tracker: ITracker) => {
    onEdit(tracker);
  };

  const handleDelete = (id: number) => {
    onDelete(id);
  };
  return (
    <div className="space-y-4">
      {trackers.map((tracker) => (
        <BudgetCategoryCard
          key={tracker.id}
          onEdit={handleEdit}
          onDelete={handleDelete}
          tracker={tracker}
        />
      ))}
    </div>
  );
};
