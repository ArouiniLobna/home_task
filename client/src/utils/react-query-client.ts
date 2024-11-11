// src/react-query-client.ts
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // Data remains fresh for 5 minutes
      refetchOnWindowFocus: false, // Avoid unnecessary refetches
      retry: 1, // Retry failed requests once
    },
  },
});
