import { StyleSheet } from "react-native";
import { theme } from "@shared/constants/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    marginBottom: 21,
  },
  title: {
    fontSize: 23,
    fontWeight: theme.typography.fontWeight.bold,
    textAlign: "center",
    flex: 1,
  },
  backButton: {
    padding: 6,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  menuDivider: {
    borderBottomColor: theme.colors.grey400,
    borderBottomWidth: 1,
  },
  listGroup: {
    flexDirection: "column",
    gap: 9,
    marginVertical: 21,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 7,
  },
  groupFlag: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: theme.spacing.md,
  },
  wrapperFlag: {
    padding: 2,
    borderRadius: 20,
    backgroundColor: theme.colors.white,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  flagLogo: {
    width: 28,
    height: 28,
    borderRadius: 15,
  },
  listTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.grey700,
  },
  listToggleSelect: {
    padding: theme.spacing.sm,
  },

  outerCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.grey400,
    justifyContent: "center",
    alignItems: "center",
  },

  // One-off selected-state blue, distinct from the theme's brand secondary
  // blue — not in docs/color-audit.md's consolidated palette, kept literal.
  outerCircleSelected: {
    borderColor: "#1609ccff",
  },

  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#1203bcb4",
  },
  listDivider: {
    borderBottomColor: theme.colors.grey400,
    borderBottomWidth: 0.6,
  },
});
