import { StyleSheet } from "react-native";
import { theme } from "@shared/constants/theme";

export default StyleSheet.create({
  welcomeSection: {
    flexDirection: "column",
    marginTop: theme.spacing.xl,
    gap: 0,
  },
  welcomeTitle: {
    fontSize: theme.typography.fontSize.display,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.grey600,
  },
  welcomeSubtitle: {
    fontSize: 27,
    fontWeight: theme.typography.fontWeight.bold,
  },
});
