// src/hooks/useSpendingAnalytics.ts
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useCategories } from "./queries/useCategories";
import useTransactions from "./queries/useTransactions";

export const useSpendingAnalytics = () => {
  const { data: transactions } = useTransactions();

  const { items: trackers } = useSelector((state: RootState) => state.trackers);
  const selectedWeek = useSelector(
    (state: RootState) => state.transactions.selectedWeek
  );
  const { data: categories } = useCategories();

  // returning helper functions
  return useMemo(() => {
    // Create a mapping of category names to category IDs for efficient lookup
    const categoriesByName = categories?.reduce(
      (
        acc: { [x: string]: any },
        category: { name: string | number; id: any }
      ) => {
        acc[category.name] = category.id;
        return acc;
      },
      {} as Record<string, string>
    );

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - selectedWeek * 7);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 7);

    const weeklyTransactions = transactions.filter((t) => {
      const transactionDate = new Date(t.date);

      return transactionDate >= startDate && transactionDate < endDate;
    });

    const spendingByCategory = categories?.map(
      (cat: { id: string; name: any }) => {
        const spent = weeklyTransactions
          .filter((t) => t.category_id === cat.id)
          .reduce((sum, t) => sum + Number(t.amount), 0);

        const tracker = trackers.find((t) => t.category === cat.id);

        return {
          name: cat.name,
          spent,
          limit: tracker?.limit || 0,
          percentage: tracker?.limit ? (spent / tracker.limit) * 100 : 0,
        };
      }
    );

    // get weekly spending by a category ID
    const getWeeklySpendingByCategoryId = (categoryId: string) => {
      return weeklyTransactions
        .filter((t) => t.category_id === categoryId)
        .reduce((sum, t) => sum + Number(t.amount), 0);
    };

    // Find weekly spending by category name
    const getWeeklySpendingByCategoryName = (categoryName: string) => {
      const categoryId = categoriesByName?.[categoryName];
      if (!categoryId) return 0;

      return weeklyTransactions
        .filter((t) => t.category_id === categoryId)
        .reduce((sum, t) => sum + Number(t.amount), 0);
    };

    return {
      spendingByCategory,
      getWeeklySpendingByCategoryId,
      getWeeklySpendingByCategoryName,
      totalSpent: spendingByCategory?.reduce(
        (sum: any, cat: { spent: any }) => Number(sum) + Number(cat.spent),
        0
      ),
      totalBudget: trackers.reduce(
        (sum, t) => Number(sum) + Number(t.limit),
        0
      ),
    };
  }, [transactions, trackers, selectedWeek]);
};
