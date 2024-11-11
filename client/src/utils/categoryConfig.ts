// categoryConfig.ts
import {
  ShoppingCartIcon,
  AcademicCapIcon,
  TruckIcon,
  ShoppingBagIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";

type CategoryConfig = {
  icon: React.ElementType;
  color: string;
};

export const categoryConfigs: Record<string, CategoryConfig> = {
  Food: {
    icon: BuildingStorefrontIcon, // Assuming FastFoodIcon represents food
    color: "bg-yellow-500",
  },
  Shopping: {
    icon: ShoppingBagIcon,
    color: "bg-pink-500",
  },
  Education: {
    icon: AcademicCapIcon,
    color: "bg-indigo-500",
  },
  Transportation: {
    icon: TruckIcon,
    color: "bg-gray-500",
  },
  Groceries: {
    icon: ShoppingCartIcon,
    color: "bg-purple-500",
  },
};

// Helper function to get category config by name
export const getCategoryConfig = (categoryName: string): CategoryConfig => {
  return (
    categoryConfigs[categoryName] || {
      icon: ShoppingCartIcon,
      color: "bg-gray-500",
    }
  ); // default config
};
