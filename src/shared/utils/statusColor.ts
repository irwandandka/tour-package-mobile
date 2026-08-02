import { colors } from "@shared/constants/theme";

/**
 * Consolidates two diverging implementations: OrderDetailScreen checked for
 * "completed"/"processed"/"cancelled"/default(pending), OrderHistoryScreen
 * checked for "settlement"/"cancelled"|"canceled"/"entry"|default — genuinely
 * different status vocabularies for what should be the same booking status
 * enum. This covers the union of both so whichever strings the backend
 * actually returns, neither screen's replacement silently falls through to
 * the wrong bucket.
 */
export type BookingStatus =
  | "completed"
  | "settlement"
  | "processed"
  | "pending"
  | "entry"
  | "cancelled"
  | "canceled"
  | (string & {});

export interface StatusColorTokens {
  background: string;
  border: string;
  text: string;
}

export function getStatusColor(status: BookingStatus): StatusColorTokens {
  switch (status?.toLowerCase()) {
    case "completed":
    case "settlement":
      return {
        background: colors.successBackground,
        border: colors.success,
        text: colors.success,
      };
    case "processed":
      return {
        background: colors.infoBackground,
        border: colors.info,
        text: colors.info,
      };
    case "cancelled":
    case "canceled":
      return {
        background: colors.errorBackground,
        border: colors.error,
        text: colors.error,
      };
    case "entry":
    case "pending":
    default:
      return {
        background: colors.warningBackground,
        border: colors.warning,
        text: colors.warning,
      };
  }
}
