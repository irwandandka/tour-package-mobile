import { StyleSheet } from "react-native";
import { theme } from "@shared/constants/theme";

export default StyleSheet.create({
  recommendedSection: {
    flexDirection: "column",
    marginTop: 30,
    gap: 3,
  },
  recommendedTitle: {
    fontSize: 27,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.black,
  },
  recommendedCardGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 11,
    marginTop: theme.spacing.sm,
  },
  recommendedCard: {
    width: 260,
    height: 300,
    borderRadius: 15,
    padding: 14,
    marginBottom: theme.spacing.xl,
    backgroundColor: theme.colors.white,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 2, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  imageShadowWrapper: {
    height: "60%",
    borderRadius: theme.radii.md,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 6,
    elevation: 6,
  },
  imageClip: {
    flex: 1,
    borderRadius: theme.radii.md,
    overflow: "hidden",
  },
  recommendedCardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  recommendedCardParent: {
    marginTop: theme.spacing.sm,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  recommendedCardTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.secondaryDark,
  },
  recommendedCardLocationParent: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 5,
  },
  recommendedCardLocation: {
    fontSize: 15,
    color: theme.colors.black,
    fontWeight: theme.typography.fontWeight.regular,
  },
  recommendedCardBottomParent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  recommendedCardPrice: {
    fontSize: 17,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.black,
  },
  recommendedCardRatingParent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,
  },
  recommendedCardRating: {
    fontSize: 19,
    color: theme.colors.black,
    fontWeight: theme.typography.fontWeight.regular,
  },
});
