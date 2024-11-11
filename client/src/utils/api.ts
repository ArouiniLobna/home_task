export const fetchAccounts = async () => {
  const response = await fetch("http://localhost:3000/accounts");
  if (!response.ok) {
    throw new Error("Failed to fetch accounts");
  }
  return response.json();
};

export const fetchCategories = async () => {
  const response = await fetch("http://localhost:3000/categories");
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return response.json();
};

export const fetchTransactions = async () => {
  const response = await fetch("http://localhost:3000/transactions");
  if (!response.ok) {
    throw new Error("Failed to fetch transactions");
  }
  return response.json();
};
