import { StyleSheet } from "react-native";
import { theme } from "@shared/constants/theme";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.grey100,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  statusBox: {
    alignItems: "center",
    marginBottom: 40,
    padding: 30,
    borderRadius: theme.radii.xl,
    backgroundColor: theme.colors.white,
    width: "100%",
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  statusText: {
    fontSize: theme.typography.fontSize.xxxl,
    fontWeight: theme.typography.fontWeight.bold,
    marginTop: theme.spacing.xl,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  messageText: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.grey600,
    marginTop: 10,
    textAlign: "center",
  },
  pendingIcon: {
    color: theme.colors.info,
  },
  successIcon: {
    color: theme.colors.success,
  },
  failedIcon: {
    color: theme.colors.error,
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: theme.colors.info,
    borderRadius: theme.radii.sm,
    alignItems: "center",
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
  },
});
