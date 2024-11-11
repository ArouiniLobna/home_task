import React from "react";
interface ITransactionsAccountNameProps {
  selectedAccountId: string;
}
const TransactionsAccountName: React.FC<ITransactionsAccountNameProps> = ({
  selectedAccountId,
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-xl font-bold">
        {selectedAccountId === "ALL"
          ? "All Accounts"
          : `Account ${selectedAccountId}`}
      </h1>
    </div>
  );
};

export default TransactionsAccountName;
