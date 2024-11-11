import Card from "../../reusables/Card";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedWeek } from "../../../store/features/transactions/transactionsSlice";
import { SpendingChart } from "./SpendingChart";
import { RootState } from "../../../store";
import { useSpendingAnalytics } from "../../../hooks/useSpendingAnalytics";
import { memo } from "react";
import BudgetCard from "../../reusables/BudgetCard";

const SpendingOverview = () => {
  const dispatch = useDispatch();
  const selectedWeek = useSelector(
    (state: RootState) => state.transactions.selectedWeek
  );
  const { spendingByCategory, totalSpent, totalBudget } =
    useSpendingAnalytics();

  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Spending Overview
        </h2>
        {/* Week Selector */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => dispatch(setSelectedWeek(selectedWeek - 1))}
            className="p-2"
          >
            {"<"} {/* Icon for previous week */}
          </button>
          <span className="text-gray-600">Week {Math.abs(selectedWeek)}</span>
          <button
            onClick={() => dispatch(setSelectedWeek(selectedWeek + 1))}
            className="p-2"
          >
            {">"} {/* Icon for next week */}
          </button>
        </div>
      </div>
      {/* Display the spending chart */}
      <SpendingChart data={spendingByCategory || []} />
      <div className="mt-5">
        <BudgetCard totalSpending={totalSpent || 0} totalBudget={totalBudget} />
      </div>
    </Card>
  );
};

export default memo(SpendingOverview);
