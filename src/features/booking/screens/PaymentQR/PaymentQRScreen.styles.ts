import { StyleSheet } from "react-native";
import { theme } from "@shared/constants/theme";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.grey100,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: theme.spacing.xxxl,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: -10,
    top: "50%",
    transform: [{ translateY: -17.5 }],
  },
  title: {
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.grey800,
  },
  qrContainer: {
    marginBottom: theme.spacing.xxxl,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.white,
    borderRadius: theme.radii.md,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  qrImage: {
    width: 250,
    height: 250,
  },
  loadingText: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.grey600,
    padding: theme.spacing.xl,
  },
  instructionContainer: {
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: theme.spacing.xxxl,
    alignItems: "flex-start",
  },
  amount: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    textAlign: "center",
    marginBottom: theme.spacing.xl,
    width: "100%",
    color: theme.colors.grey800,
  },
  instructionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    marginBottom: 10,
    color: theme.colors.grey800,
  },
  instructionStep: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.grey700,
    marginBottom: theme.spacing.sm,
    lineHeight: 24,
  },
  doneButton: {
    backgroundColor: theme.colors.info,
    paddingVertical: 15,
    borderRadius: theme.radii.sm,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  doneButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
  },
});
