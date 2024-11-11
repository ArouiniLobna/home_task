import React from "react";

type BudgetCardProps = {
  totalBudget: number | string;
  totalSpending: number | string;
};

const BudgetCard: React.FC<BudgetCardProps> = ({
  totalBudget,
  totalSpending,
}) => {
  // Convert props to numbers and remove any leading zeros
  const sanitizedTotalBudget = Number(totalBudget);
  const sanitizedTotalSpending = Number(totalSpending);

  // Calculate the percentage of the budget spent
  const spendingPercentage =
    (sanitizedTotalSpending / sanitizedTotalBudget) * 100;
  const isOverBudget = sanitizedTotalSpending > sanitizedTotalBudget;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto border-2 border-gray-200">
      <h2 className="text-lg font-bold text-gray-800 mb-4">
        Budget Remaining Overview:
      </h2>

      {/* Budget and Spending Details */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-gray-600 font-medium">
          <span>Total Budget:</span>
          <span className="ml-2 text-blue-600">
            ${sanitizedTotalBudget.toLocaleString()}
          </span>
        </div>
        <div className="text-gray-600 font-medium">
          <span>Total Spending:</span>
          <span
            className={`ml-2 ${
              isOverBudget ? "text-red-600 font-bold" : "text-green-600"
            }`}
          >
            ${sanitizedTotalSpending.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Spending Progress Indicator */}
      <div className="relative w-full h-4 bg-gray-300 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-in-out ${
            isOverBudget ? "bg-red-500" : "bg-blue-500"
          }`}
          style={{ width: `${Math.min(spendingPercentage, 100)}%` }}
        />
      </div>

      {/* Conditional Warning Message */}
      {isOverBudget && (
        <div className="mt-4 text-center">
          <span className="text-red-600 font-semibold">
            Warning: Over Budget!
          </span>
        </div>
      )}
    </div>
  );
};

export default BudgetCard;
