// Accounts api interface of single object
export interface IAccount {
  account_id: string;
  balances: {
    available: number;
    current: number;
    iso_currency_code: string;
  };
  name: string;
  official_name: string;
  subtype: string;
  type: string;
}

// Define the structure of a Transaction object
export interface ITransaction {
  account_id: string;
  amount: number;
  iso_currency_code: string;
  category_id: string;
  date: string; // assuming dateFormatted returns a string
  merchant_name: string;
  merchant_id: string;
  logo_url: string;
  website: string;
  payment_channel: string;
  pending: boolean;
}

export interface ICategory {
  id: string; // Unique identifier for the category
  name: string; // Name of the category (e.g., "Food", "Shopping", etc.)
}

export interface ICategoryExpense {
  [key: string]: number;
}

export type IDateRange = "month" | "week" | "twoWeeks" | "threeMonths";
