import { StyleSheet } from "react-native";
import { theme } from "@shared/constants/theme";

/** Drops groupAmount/titleTotalAmount/amountTotal styling duplicates
 * that existed alongside groupTotalAmount but were never all wired up
 * consistently — consolidated into the fields actually used below. */
export default StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
  },
  backButton: {
    backgroundColor: theme.colors.grey400,
    opacity: 0.8,
    padding: 5,
    borderRadius: 21,
    marginBottom: 15,
    alignSelf: "flex-start",
  },
  groupSearch: {
    borderRadius: theme.radii.xs,
    backgroundColor: theme.colors.white,
    padding: 16,
    marginBottom: 15,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  searchTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.black,
    marginBottom: 5,
  },
  searchSubtitle: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.regular,
    color: theme.colors.grey600,
    marginBottom: theme.spacing.md,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.grey400,
    borderRadius: theme.radii.sm,
    padding: theme.spacing.md,
    marginTop: theme.spacing.sm,
  },

  groupPaymentMethod: {
    borderRadius: theme.radii.xs,
    backgroundColor: theme.colors.white,
    padding: 16,
    marginBottom: 15,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  listPaymentMethod: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  groupLogoTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spacing.md,
  },
  titlePaymentMethod: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.black,
    marginBottom: 5,
  },
  logoPaymentMethod: {
    width: 100,
    height: 50,
    borderRadius: theme.radii.xs,
    marginRight: theme.spacing.md,
    resizeMode: "contain",
  },
  toggleSelect: {
    padding: 10,
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.grey400,
    justifyContent: "center",
    alignItems: "center",
  },
  ringActive: {
    borderColor: theme.colors.success,
    borderWidth: 3,
  },

  groupTotalAmount: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: theme.radii.xs,
    backgroundColor: theme.colors.white,
    padding: 16,
    marginBottom: 15,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  titleTotalAmount: {
    fontSize: 17,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.black,
  },
  amountTotal: {
    fontSize: 15,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.grey600,
  },
  buttonChoose: {
    borderRadius: theme.radii.xs,
    backgroundColor: theme.colors.success,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: theme.spacing.md,
  },
  textButtonChoose: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.white,
  },
  buttonUnchoosed: {
    borderRadius: theme.radii.xs,
    backgroundColor: theme.colors.grey500,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: theme.spacing.md,
  },
});
