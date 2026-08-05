import { StyleSheet } from "react-native";
import { theme } from "@shared/constants/theme";

export default StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  groupHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 31,
  },
  title: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
  },
  backButton: {
    padding: theme.spacing.sm,
  },
  saveButton: {
    padding: theme.spacing.sm,
  },
  groupProfile: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing.md,
    marginBottom: 31,
  },
  groupImage: {
    position: "relative",
  },
  imageProfile: {
    width: 150,
    height: 150,
    borderRadius: 90,
    padding: 7,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  uploadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.overlay,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 90,
  },
  wrapperIcon: {
    borderColor: theme.colors.grey600,
    borderWidth: 2,
    borderRadius: 50,
    padding: 6,
    backgroundColor: theme.colors.white,
  },
  iconAddPhoto: {
    position: "absolute",
    bottom: 11,
    right: 11,
  },

  groupInformation: {
    flexDirection: "column",
    gap: 15,
    marginTop: theme.spacing.xl,
  },
  titleInformation: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
  },
  inputField: {
    borderWidth: 1,
    borderColor: theme.colors.grey400,
    borderRadius: theme.radii.xs,
    padding: theme.spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputLabel: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing.sm,
  },
  fieldError: {
    fontSize: 12,
    color: theme.colors.error,
    marginTop: 4,
  },
});
