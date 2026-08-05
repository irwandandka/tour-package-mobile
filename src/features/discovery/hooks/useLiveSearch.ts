import { useEffect, useState } from "react";
import { apiService, ApiResponse } from "@shared/api";
import { getApiErrorMessage } from "@shared/utils";
import { SearchGlobalResponse } from "@shared/types";

interface UseLiveSearchResult {
  query: string;
  setQuery: (query: string) => void;
  results: SearchGlobalResponse[];
  isSearching: boolean;
}

const MIN_QUERY_LENGTH = 3;
const DEBOUNCE_MS = 500;

/** Extracted from HomeScreen: debounced global search-as-you-type. */
export function useLiveSearch(): UseLiveSearchResult {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchGlobalResponse[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (query.length < MIN_QUERY_LENGTH) {
      setResults([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setIsSearching(true);
      try {
        const response = await apiService.get<ApiResponse<SearchGlobalResponse[]>>("v1/search", {
          query,
        });
        setResults(response.data);
      } catch (error) {
        console.error("Live search failed:", getApiErrorMessage(error));
      } finally {
        setIsSearching(false);
      }
    }, DEBOUNCE_MS);

    return () => clearTimeout(timeoutId);
  }, [query]);

  return { query, setQuery, results, isSearching };
}
