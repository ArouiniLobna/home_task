// BudgetCard.tsx
import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { getCategoryConfig } from "../../utils/categoryConfig";
import { ITracker } from "../../store/features/spendTracker/spendTrackerSlice";
import { useSpendingAnalytics } from "../../hooks/useSpendingAnalytics";
import { useCategories } from "../../hooks/queries/useCategories";

interface IBudgetCategoryCardProps {
  tracker: ITracker;
  onEdit: (tracker: ITracker) => void;
  onDelete: (id: number) => void;
}

const BudgetCategoryCard: React.FC<IBudgetCategoryCardProps> = ({
  tracker,
  onEdit,
  onDelete,
}) => {
  const { getCategoryNameById } = useCategories();

  const categoryName = getCategoryNameById(tracker.category);
  const { icon: Icon, color } = getCategoryConfig(categoryName);
  const { getWeeklySpendingByCategoryId } = useSpendingAnalytics();
  const spent = getWeeklySpendingByCategoryId(tracker.category);

  const spendingPercentage = Math.min((spent / tracker.limit) * 100, 100);

  return (
    <div className="flex items-center justify-between p-4 bg-white border-gray-400 border-2 rounded-lg">
      {/* Left section - Category Icon and Budget Info */}
      <div className="flex items-center flex-grow">
        <div className={`${color} rounded-full p-3`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="ml-4 flex-grow">
          <h3 className=" text-black font-bold ">{tracker.name}</h3>
          <p className="text-sm text-gray-500">
            {categoryName} - ${tracker.limit} {tracker.period}
          </p>
          <div className="mt-1 text-sm text-gray-600">
            <div>
              <span className=" font-bold">Weekly Budget</span>: $
              {tracker.limit.toLocaleString()}
            </div>
            <div>
              <span className="font-bold">Week spending</span>: $
              {spent.toLocaleString()}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative mt-2 w-full h-3 bg-gray-200 rounded-full">
            <div
              className={`absolute h-full rounded-full ${
                spendingPercentage > 100 ? " bg-red-900" : color
              }`}
              style={{
                width: `${spendingPercentage}%`,
              }}
            />
          </div>
          {/* Warning Message */}

          <p
            className={`text-sm font-semibold ${
              spendingPercentage > 100
                ? "text-red-600"
                : spendingPercentage > 75
                ? "text-yellow-600"
                : "text-green-600"
            }`}
          >
            {spendingPercentage > 100
              ? "You are Over Budget"
              : spendingPercentage > 75
              ? "You are almost reaching your Budget"
              : "Your are on Track"}
          </p>
        </div>
      </div>

      {/* Right section - Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(tracker)}
          className="p-2 text-blue-600 hover:text-blue-700 focus:outline-none"
          aria-label="Edit Tracker"
        >
          <PencilIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => onDelete(tracker.id)}
          className="p-2 text-red-600 hover:text-red-700 focus:outline-none"
          aria-label="Delete Tracker"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default BudgetCategoryCard;
