import { StyleSheet } from "react-native";
import { theme } from "@shared/constants/theme";

export default StyleSheet.create({
  topBarSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  avatarSectionWrapper: {
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  avatarSection: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 28,
  },
  loginButtonText: {
    fontSize: 17,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
  },
});
