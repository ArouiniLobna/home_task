// components/AccountsOverview.tsx
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useAccounts } from "../hooks/queries/useAccounts";
import { calculateTotalBalance } from "../utils/accountUtils";
import Card from "../components/reusables/Card";
import Chart from "../components/reusables/Chart";

const AccountsOverview = () => {
  const { data: accounts, error, isLoading } = useAccounts();

  // avoid unnecessary calculation until details in accounts changes
  const totalBalance = useMemo(
    () => calculateTotalBalance(accounts),
    [accounts]
  );

  const chartData = useMemo(() => {
    if (!accounts) return { labels: [], datasets: [] };

    return {
      labels: accounts.map((account) => account.name),
      datasets: [
        {
          label: "Account Balances",
          data: accounts.map((account) => account.balances.current),
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(153, 102, 255)",
            "rgb(255, 159, 64)",
          ],
          hoverOffset: 4,
        },
      ],
    };
  }, [accounts]);

  if (isLoading) return <p>Loading accounts...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Card title="Your Accounts">
        {/* Accounts List */}
        <div className="space-y-4">
          {accounts?.map((account) => (
            <Link
              key={account.account_id}
              className="flex justify-between items-center p-4 hover:bg-gray-100 cursor-pointer rounded-lg border-b-2"
              to={`/transactions/${account.account_id}`}
            >
              <span className="text-gray-700 font-medium">{account.name}</span>
              <span className="text-gray-900 font-semibold text-right">
                ${account.balances.current.toFixed(2)}
              </span>
            </Link>
          ))}
        </div>

        {/* Doughnut Chart */}
        <div className="mt-8">
          <Chart
            data={chartData}
            options={{
              plugins: {
                legend: {
                  title: {
                    display: true,
                    text: "Total Balance: $" + `${totalBalance.toFixed(2)}`,
                    position: "start",
                  },
                  position: "left",
                  labels: {
                    boxWidth: 12,
                    padding: 15,
                  },
                },
              },
            }}
          />
        </div>
      </Card>
    </div>
  );
};

export default AccountsOverview;
