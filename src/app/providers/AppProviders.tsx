import { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@shared/api/queryClient";

/**
 * Grows in later phases: SafeAreaProvider and ErrorBoundary land in
 * Phase 5/13 once navigation is restructured and the boundary component
 * exists. Kept to just the query client here so Phase 2 doesn't reach
 * further into App.tsx than this phase's scope.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
