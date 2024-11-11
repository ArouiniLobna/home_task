// components/TransactionsList.tsx
import React from "react";
import { IDateRange } from "../../../types";
import useTransactions from "../../../hooks/queries/useTransactions";

type TransactionsListProps = {
  selectedAccountId: string;
  dateRange: IDateRange;
};

const TransactionsList: React.FC<TransactionsListProps> = ({
  selectedAccountId,
  dateRange,
}) => {
  const { filterTransactions } = useTransactions(selectedAccountId);
  const transactions = filterTransactions(dateRange);

  return (
    <div className="mt-4">
      <h2 className="text-lg font-bold">Transactions</h2>
      <ul className="mt-2 space-y-2">
        {transactions.map((transaction) => (
          <li
            key={transaction.merchant_id}
            className="border p-4 rounded-md flex justify-between bg-white"
          >
            <span>{transaction.merchant_name}</span>
            <span className="text-right">
              {transaction.amount} {transaction.iso_currency_code}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionsList;
