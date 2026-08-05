import { StyleSheet } from "react-native";
import { theme } from "@shared/constants/theme";

/**
 * statusBadge/statusText/statusBadgeCompleted/statusTextCompleted/
 * statusBadgeProcessed/statusTextProcessed/statusBadgeCancelled/
 * statusTextCancelled/statusBadgePending/statusTextPending all dropped —
 * that styling now lives in the shared StatusBadge component, consolidated
 * with OrderHistoryScreen's version of the same status-color logic.
 */
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.grey100,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey200,
  },
  title: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.grey700,
  },
  backButton: {
    padding: 6,
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radii.md,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.grey700,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: theme.spacing.md,
  },
  infoLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.grey500,
  },
  infoValue: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.grey700,
    fontWeight: theme.typography.fontWeight.medium,
    flex: 1,
    textAlign: "right",
  },
  serviceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  serviceImage: {
    width: 60,
    height: 60,
    borderRadius: theme.radii.xs,
    marginRight: theme.spacing.md,
  },
  serviceTextContainer: {
    flex: 1,
  },
  serviceName: {
    fontSize: 15,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.grey700,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.grey200,
    marginVertical: theme.spacing.md,
  },
  totalLabel: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.grey700,
  },
  totalValue: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
  },
  actionContainer: {
    flexDirection: "column",
    padding: 16,
    gap: 16,
  },
  primaryButton: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: theme.colors.primary,
    padding: 14,
    borderRadius: theme.radii.md,
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  primaryButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: theme.colors.white,
    padding: 14,
    borderRadius: theme.radii.md,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.primary,
    gap: theme.spacing.sm,
  },
  secondaryButtonText: {
    color: theme.colors.primary,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
  },
  cancelButton: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: theme.colors.errorBackground,
    padding: 14,
    borderRadius: theme.radii.md,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.error,
    gap: theme.spacing.sm,
  },
  cancelButtonText: {
    color: theme.colors.error,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
  },
  disabledButton: {
    backgroundColor: theme.colors.grey500,
    borderColor: theme.colors.grey500,
  },
  disabledButtonText: {
    color: theme.colors.grey700,
  },
  reviewButton: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: theme.colors.white,
    padding: 14,
    borderRadius: theme.radii.md,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.primary,
    gap: theme.spacing.sm,
  },
  reviewButtonText: {
    color: theme.colors.primary,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
  },
});
