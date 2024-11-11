// components/AccountSelector.tsx
import React from "react";
import { useSelectedAccount } from "../hooks/useSelectedAccount";

type AccountSelectorProps = {
  selectedAccountId: string;
  onSelect: (accountId: string) => void;
};

const AccountSelector: React.FC<AccountSelectorProps> = ({
  selectedAccountId,
  onSelect,
}) => {
  const { accounts } = useSelectedAccount();
  return (
    <div className="mb-4">
      <label htmlFor="accountSelect" className="block font-semibold mb-2">
        Select Account
      </label>
      <select
        id="accountSelect"
        value={selectedAccountId}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full rounded-md border border-gray-300 p-2"
      >
        <option value="ALL">All Accounts</option>
        {accounts?.map((account) => (
          <option key={account.account_id} value={account.account_id}>
            {account.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AccountSelector;
