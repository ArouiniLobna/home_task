import { useEffect, useState } from "react";
import AccountSelector from "../components/AccountSelector";
import TransactionFilter from "../components/features/transactions/TransactionFilter";
import TransactionsList from "../components/features/transactions/TransactionsList";
import TransactionsChart from "../components/features/transactions/TransactionsChart";
import { useCategories } from "../hooks/queries/useCategories";
import { IDateRange } from "../types";
import { useSelectedAccount } from "../hooks/useSelectedAccount";
import TransactionsAccountName from "../components/features/transactions/TransactionsAccountName";

const TransactionsPage = () => {
  const { accounts, accountsLoading, accountId } = useSelectedAccount();
  const { data: categoriesData, isLoading: categoriesLoading } =
    useCategories();
  // we nee dto keep it in the parent to make sure child component render when value changes
  const [selectedAccountId, setSelectedAccountId] = useState<string | "ALL">(
    "ALL"
  );

  const [dateRange, setDateRange] = useState<IDateRange>("month");
  useEffect(() => {
    if (accountId && accounts) {
      const foundAccount = accounts.find(
        (account) => account.account_id === accountId
      );
      if (foundAccount) {
        setSelectedAccountId(foundAccount.account_id);
      }
    }
  }, [accountId, accounts]);

  if (accountsLoading || !accounts || categoriesLoading || !categoriesData)
    return <div>Loading.....</div>;
  return (
    <div className="container mx-auto p-4">
      <TransactionsAccountName selectedAccountId={selectedAccountId} />
      <div className="flex flex-col md:flex-row md:space-x-4">
        {/* Left side */}
        <div className="flex-1">
          <AccountSelector
            selectedAccountId={selectedAccountId}
            onSelect={setSelectedAccountId}
          />
          <TransactionFilter dateRange={dateRange} onChange={setDateRange} />
        </div>

        {/* Right side */}
        <div className="flex-1">
          <TransactionsChart
            selectedAccountId={selectedAccountId}
            dateRange={dateRange}
          />
        </div>
      </div>

      <TransactionsList
        selectedAccountId={selectedAccountId}
        dateRange={dateRange}
      />
    </div>
  );
};

export default TransactionsPage;
