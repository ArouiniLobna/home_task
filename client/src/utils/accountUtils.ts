// src/utils/accountUtils.ts
import { IAccount, ICategory, ITransaction } from "../types";

export const calculateTotalBalance = (accounts?: IAccount[]): number => {
  if (!accounts) return 0;
  return accounts.reduce((sum, account) => sum + account.balances.current, 0);
};

// Mock category mapping (with colors for each category)
const categoryColors: { [key: string]: string } = {
  "1": "bg-green-500", // Food (Green)
  "2": "bg-blue-500", // Shopping (Blue)
  "3": "bg-yellow-500", // Education (Yellow)
  "4": "bg-gray-500", // Transportation (Gray)
  "5": "bg-red-500", // Groceries (Red)
};

// Function to calculate total expenses
export const calculateTotalExpenses = (
  transactions: ITransaction[],
  accountId: string
): number => {
  // Filter transactions for the specific account
  const accountTransactions = transactions.filter(
    (transaction) => transaction.account_id === accountId
  );

  // Sum up all the expenses
  const totalExpenses = accountTransactions.reduce((total, transaction) => {
    return total + transaction.amount;
  }, 0);

  return totalExpenses;
};

// Function to get the category name and color for a given category_id
export const getCategoryDetails = (
  categoryId: string,
  categories: ICategory[]
): { name: string; color: string } => {
  const category = categories.find((c) => c.id === categoryId);
  if (category) {
    return {
      name: category.name,
      color: categoryColors[categoryId] || "bg-gray-400", // Default color if not found
    };
  }
  return { name: "Unknown", color: "bg-gray-400" }; // Default for unknown category
};
