import { useQuery } from "@tanstack/react-query";
import { ICategory } from "../../types";
import { fetchCategories } from "../../utils/api";

export const useCategories = () => {
  const { data, ...queryInfo } = useQuery<ICategory[], Error>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // Helper function to get a category name by ID
  const getCategoryNameById = (id: string): string => {
    const category = data?.find((cat) => cat.id === id);
    return category ? category.name : "Unknown";
  };

  return {
    data,
    getCategoryNameById,
    ...queryInfo,
  };
};
