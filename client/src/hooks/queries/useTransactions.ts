import { useQuery } from "@tanstack/react-query";
import { ITransaction } from "../../types";
import { fetchTransactions } from "../../utils/api";
import dayjs from "dayjs";
import { useCategories } from "./useCategories";

// Define your date ranges in days for easier comparison
const DATE_RANGES = {
  month: 30,
  week: 7,
  twoWeeks: 14,
  threeMonths: 90,
};
const useTransactions = (accountId: string = "ALL") => {
  const { getCategoryNameById } = useCategories();
  const { data: transactions = [] } = useQuery<ITransaction[], Error>({
    queryKey: ["transactions", accountId],
    queryFn: fetchTransactions,
  });

  // Filter transactions by account ID and duration
  const filterTransactions = (duration: keyof typeof DATE_RANGES) => {
    const filteredByDate = checkDuration(transactions, duration);

    return accountId !== "ALL"
      ? filteredByDate.filter((t) => t.account_id === accountId)
      : filteredByDate;
  };

  const checkDuration = (
    transactions: ITransaction[],
    duration: keyof typeof DATE_RANGES
  ) => {
    const daysAgo = DATE_RANGES[duration];
    return transactions.filter((transaction) =>
      dayjs(transaction.date).isAfter(dayjs().subtract(daysAgo, "day"))
    );
  };

  const calculateCategoryExpenses = (duration: keyof typeof DATE_RANGES) => {
    const filteredTransactions = filterTransactions(duration);

    return filteredTransactions.reduce((acc, transaction) => {
      const categoryName = getCategoryNameById(transaction.category_id);

      if (!acc[categoryName]) {
        acc[categoryName] = 0;
      }
      acc[categoryName] += transaction.amount;
      return acc;
    }, {} as Record<string, number>);
  };

  return {
    data: transactions,
    filterTransactions,
    checkDuration,
    calculateCategoryExpenses,
  };
};

export default useTransactions;
