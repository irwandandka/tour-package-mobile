import { StyleSheet } from "react-native";
import { theme } from "@shared/constants/theme";

export default StyleSheet.create({
  topDestinationSection: {
    marginTop: 30,
    flexDirection: "column",
    gap: theme.spacing.md,
  },
  topDestinationTitle: {
    fontSize: 27,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.black,
  },
  topDestinationButtonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 11,
  },
  topDestinationButton: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.grey300,
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical: 13,
    paddingHorizontal: theme.spacing.xl,
  },
  topDestinationButtonText: {
    fontSize: 17,
    color: theme.colors.black,
    fontWeight: theme.typography.fontWeight.regular,
  },
  topDestinationButtonSelected: {
    backgroundColor: theme.colors.primary,
    borderRadius: 15,
    paddingVertical: 13,
    paddingHorizontal: theme.spacing.xl,
  },
  topDestinationButtonTextSelected: {
    fontSize: 17,
    color: theme.colors.white,
    fontWeight: theme.typography.fontWeight.regular,
  },
  topDestinationCardGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 11,
  },
  topDestinationCard: {
    width: 180,
    height: 220,
    position: "relative",
  },
  topDestinationCardImage: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  topDestinationCardTitle: {
    fontSize: 23,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.white,
    position: "absolute",
    bottom: theme.spacing.sm,
    left: 0,
    right: 0,
    textAlign: "center",
  },
  topDestinationCardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.overlay,
    borderRadius: 15,
  },
});
