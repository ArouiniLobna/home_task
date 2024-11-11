import React, { memo } from "react";
import { useSelector } from "react-redux";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { formatDate, getWeekRange } from "../../../utils/dateUtils";
import { RootState } from "../../../store";

interface ISpendingHeaderProps {
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SpendingHeader: React.FC<ISpendingHeaderProps> = ({
  setIsDialogOpen,
}) => {
  const selectedWeek = useSelector(
    (state: RootState) => state.transactions.selectedWeek
  );
  const weekRange = getWeekRange(selectedWeek);
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };
  return (
    <div className="mb-8 flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Spend Tracker Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          {formatDate(weekRange.start)} - {formatDate(weekRange.end)}
        </p>
      </div>
      <button
        onClick={handleOpenDialog}
        className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-6 py-3 rounded-md"
      >
        <PlusCircleIcon className="w-4 h-4" />
        Create Tracker
      </button>
    </div>
  );
};

export default memo(SpendingHeader);
