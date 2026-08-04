import { StyleSheet } from "react-native";
import { theme } from "@shared/constants/theme";

export default StyleSheet.create({
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: theme.spacing.xl,
    backgroundColor: theme.colors.white,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: 15,
    borderRadius: 15,
    shadowColor: theme.colors.black,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  searchInput: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  searchIcon: {
    marginRight: theme.spacing.sm,
  },
  textInput: {
    flex: 1,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.grey700,
  },
  filterIcon: {
    marginLeft: theme.spacing.md,
  },
  resultsContainer: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.white,
    borderRadius: theme.radii.sm,
    maxHeight: 300,
    shadowColor: theme.colors.black,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    zIndex: 1000,
  },
  resultItem: {
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey200,
  },
  resultText: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.grey700,
  },
});
