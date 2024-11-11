// components/DonutChart.tsx
import React, { useMemo } from "react";
import { IDateRange } from "../../../types";
import DoughnutChart from "../../reusables/Chart";
import useTransactions from "../../../hooks/queries/useTransactions";

type DonutChartProps = {
  selectedAccountId: string;
  dateRange: IDateRange;
};

const TransactionsChart: React.FC<DonutChartProps> = ({
  selectedAccountId,
  dateRange,
}) => {
  const { calculateCategoryExpenses } = useTransactions(selectedAccountId);

  const categoryExpenses = calculateCategoryExpenses(dateRange);

  // Prepare chart data
  const chartData = useMemo(() => {
    return {
      labels: Object.keys(categoryExpenses),
      datasets: [
        {
          data: Object.values(categoryExpenses),
          backgroundColor: [
            "#f97316",
            "#3b82f6",
            "#16a34a",
            "#e11d48",
            "#9333ea",
          ], // Example colors
        },
      ],
    };
  }, [categoryExpenses]);
  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="font-bold text-lg">Expenses Breakdown</h2>
      <div
        style={{ overflow: "hidden", maxHeight: "400px", marginBottom: "20px" }}
      >
        <DoughnutChart data={chartData} />
      </div>
    </div>
  );
};

export default TransactionsChart;
