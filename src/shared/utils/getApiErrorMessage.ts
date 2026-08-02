import axios from "axios";
import { ApiErrorBody } from "@shared/api/types";

const DEFAULT_MESSAGE = "Something went wrong. Please try again.";
const NETWORK_MESSAGE = "Unable to reach the server. Check your connection and try again.";

/**
 * Replaces the copy-pasted
 *   if (error.response) {...} else if (error.request) {...} else {...}
 * triage block found in 8+ screens, which only ever logged to the console
 * and left every screen to invent its own (often missing) user-facing
 * message. Returns a message ready to hand to Toast/Alert.
 */
export function getApiErrorMessage(error: unknown, fallback: string = DEFAULT_MESSAGE): string {
  if (axios.isAxiosError<ApiErrorBody>(error)) {
    if (error.response) {
      console.error("API error response:", error.response.data);
      return error.response.data?.message || fallback;
    }

    if (error.request) {
      console.error("API no response received:", error.request);
      return NETWORK_MESSAGE;
    }

    console.error("API request setup error:", error.message);
    return error.message || fallback;
  }

  console.error("Unexpected error:", error);
  return fallback;
}
