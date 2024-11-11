import { useQuery } from "@tanstack/react-query";
import { IAccount } from "../../types";
import { fetchAccounts } from "../../utils/api";

export const useAccounts = () => {
  return useQuery<IAccount[], Error>({
    queryKey: ["accounts"],
    queryFn: fetchAccounts,
  });
};
