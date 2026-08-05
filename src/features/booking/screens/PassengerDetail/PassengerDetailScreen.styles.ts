import { StyleSheet } from "react-native";
import { theme } from "@shared/constants/theme";

export default StyleSheet.create({
  container: {
    padding: 21,
  },
  backButton: {
    backgroundColor: theme.colors.grey500,
    opacity: 0.8,
    padding: 5,
    borderRadius: 21,
    marginBottom: 5,
    alignSelf: "flex-start",
  },
  headerSection: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: theme.spacing.xl,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: theme.typography.fontWeight.bold,
    textAlign: "left",
    marginBottom: 13,
    color: theme.colors.black,
  },
  card: {
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: theme.colors.grey100,
    borderRadius: theme.radii.sm,
    borderWidth: 0.8,
    borderColor: theme.colors.grey300,
  },
  cardTopSide: {
    height: 200,
  },
  cardImage: {
    width: "100%",
    height: "100%",
    borderTopRightRadius: theme.radii.sm,
    borderTopLeftRadius: theme.radii.sm,
    resizeMode: "cover",
  },
  cardBottomSide: {
    justifyContent: "center",
  },
  cardTitleWrapper: {
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.xl,
  },
  cardTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.grey700,
  },
  cardRatingWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 15,
  },
  cardStarIcon: {
    marginRight: theme.spacing.sm,
  },
  cardStarRating: {
    fontSize: 19,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.black,
  },
  textNights: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.grey500,
  },

  contactInformationTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing.md,
  },
  contactInformationCard: {
    flexDirection: "column",
    backgroundColor: theme.colors.grey50,
    borderRadius: theme.radii.xs,
    padding: 16,
    marginBottom: 16,
  },
  contactInformationWrapper: {
    flexDirection: "column",
    gap: 5,
  },
  groupLabel: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    marginBottom: theme.spacing.sm,
  },
  inputLabel: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    marginBottom: 4,
  },
  inputText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.regular,
    borderWidth: 1,
    borderColor: theme.colors.grey200,
    borderRadius: theme.radii.xs,
    padding: theme.spacing.md,
    marginBottom: 14,
  },
  fieldError: {
    fontSize: 12,
    color: theme.colors.error,
    marginTop: -10,
    marginBottom: theme.spacing.sm,
  },
  groupParentPassenger: {
    flexDirection: "column",
    gap: theme.spacing.md,
  },
  roomDetailName: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.grey700,
  },
  passengerTitleCount: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    marginVertical: theme.spacing.sm,
  },
  groupInputPassenger: {
    flexDirection: "column",
    backgroundColor: theme.colors.white,
    gap: theme.spacing.md,
    padding: theme.spacing.md,
    borderRadius: theme.radii.xs,
  },
  continueButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radii.xs,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
  },
  continueButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    textAlign: "center",
  },
  disabledButton: {
    backgroundColor: "#f5c487ff",
    borderRadius: theme.radii.xs,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
  },
  disabledButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    textAlign: "center",
  },
});
