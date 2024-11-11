import { useAccounts } from "../hooks/queries/useAccounts";
import { useParams } from "react-router-dom";

export const useSelectedAccount = () => {
  const { accountId } = useParams<{ accountId?: string }>();
  const { data: accounts, isLoading: accountsLoading } = useAccounts();

  return { accountId, accounts, accountsLoading };
};
