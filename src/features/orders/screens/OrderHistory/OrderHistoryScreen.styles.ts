import { StyleSheet } from "react-native";
import { theme } from "@shared/constants/theme";

/** statusBadge/statusText dropped — that styling now lives in the shared StatusBadge component. */
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.grey100,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: theme.colors.white,
  },
  title: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.grey700,
  },
  backButton: {
    padding: 6,
  },
  groupTabStatus: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.white,
  },
  itemTabStatus: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: 16,
    borderRadius: theme.radii.xl,
  },
  textTabStatus: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    textTransform: "capitalize",
  },
  activeTab: { backgroundColor: theme.colors.primary },
  activeTextTab: { color: theme.colors.white },
  inactiveTab: { backgroundColor: theme.colors.grey100 },
  inactiveTextTab: { color: theme.colors.grey700 },

  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radii.md,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    gap: theme.spacing.md,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  productTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.grey700,
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  iconCalendar: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.grey500,
  },
  orderDate: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.grey500,
    fontWeight: theme.typography.fontWeight.medium,
  },
  orderPrice: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.grey700,
    textAlign: "left",
  },
  buttonGroup: {
    flexDirection: "row",
    gap: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.grey100,
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.xxs,
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: theme.radii.xs,
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeight.bold,
    fontSize: theme.typography.fontSize.sm,
  },
  primaryButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: theme.radii.xs,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: theme.colors.white,
    fontWeight: theme.typography.fontWeight.bold,
    fontSize: theme.typography.fontSize.sm,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.grey500,
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.grey500,
    marginTop: theme.spacing.sm,
  },
});
