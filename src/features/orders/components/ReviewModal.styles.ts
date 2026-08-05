import { StyleSheet } from "react-native";
import { theme } from "@shared/constants/theme";

export default StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: theme.colors.overlay,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: theme.colors.white,
    borderRadius: theme.radii.lg,
    padding: 24,
    alignItems: "center",
  },
  title: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.grey700,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.grey500,
    marginBottom: theme.spacing.xl,
  },
  starsContainer: {
    flexDirection: "row",
    marginBottom: theme.spacing.xl,
  },
  star: {
    marginHorizontal: 5,
  },
  commentInput: {
    width: "100%",
    height: 100,
    borderWidth: 1,
    borderColor: theme.colors.grey300,
    borderRadius: theme.radii.xs,
    padding: theme.spacing.md,
    textAlignVertical: "top",
    marginBottom: 24,
    fontSize: theme.typography.fontSize.sm,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  cancelButton: {
    flex: 1,
    padding: 14,
    borderRadius: theme.radii.md,
    alignItems: "center",
    marginRight: theme.spacing.sm,
  },
  cancelButtonText: {
    color: theme.colors.grey500,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
  },
  submitButton: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    padding: 14,
    borderRadius: theme.radii.md,
    alignItems: "center",
    marginLeft: theme.spacing.sm,
  },
  submitButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
  },
  disabledButton: {
    backgroundColor: theme.colors.grey500,
  },
});
