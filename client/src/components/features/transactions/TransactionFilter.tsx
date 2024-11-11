// components/TransactionFilter.tsx
import React from "react";
import { IDateRange } from "../../../types";

type TransactionFilterProps = {
  dateRange: IDateRange;
  onChange: (range: IDateRange) => void;
};

const TransactionFilter: React.FC<TransactionFilterProps> = ({
  dateRange,
  onChange,
}) => {
  return (
    <div className="mb-4">
      <label className="block font-semibold mb-2">Filter by Duration</label>
      <select
        value={dateRange}
        onChange={(e) =>
          onChange(
            e.target.value as "month" | "week" | "twoWeeks" | "threeMonths"
          )
        }
        className="w-full rounded-md border border-gray-300 p-2"
      >
        <option value="month">Current Month</option>
        <option value="week">Past Week</option>
        <option value="twoWeeks">Past 2 Weeks</option>
        <option value="threeMonths">Past 3 Months</option>
      </select>
    </div>
  );
};

export default TransactionFilter;
