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

  roomSection: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: theme.spacing.xl,
  },
  titleRoomSection: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.black,
    marginBottom: theme.spacing.md,
  },
  roomCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radii.sm,
    borderWidth: 0.5,
    borderColor: theme.colors.grey300,
    marginBottom: 15,
  },
  roomCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 0.5,
    borderColor: theme.colors.grey300,
  },
  roomCardHeaderButtonAdd: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: 15,
    borderRadius: theme.radii.xs,
    color: theme.colors.white,
    fontWeight: theme.typography.fontWeight.bold,
  },
  roomCardButtonAddTitle: {
    color: theme.colors.white,
    fontWeight: theme.typography.fontWeight.bold,
  },
  roomCardHeaderTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.grey700,
  },
  roomCardHeaderAllotment: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.grey600,
  },
  roomCardBody: {
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 15,
    gap: 25,
  },
  roomCardBodyImage: {
    width: 80,
    height: 80,
    borderRadius: theme.radii.sm,
    marginRight: 15,
  },
  roomTitleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  roomCardBodyTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.black,
  },
  roomTitleWithDelete: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  roomCardInputGrouping: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
  },
  roomCardBodyInputWrapper: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    gap: theme.spacing.md,
  },
  roomCardBodyInputTitle: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.grey600,
  },
  roomInputGroup: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.grey300,
    borderRadius: theme.radii.xs,
    paddingHorizontal: theme.spacing.md,
  },
  roomInputButtonDecrement: {
    padding: 5,
    borderRadius: 21,
  },
  roomInputTextDecrement: {
    fontSize: 17,
    color: theme.colors.black,
    textAlign: "center",
    width: 25,
    height: 25,
    lineHeight: 25,
  },
  roomInputButtonIncrement: {
    padding: 5,
    borderRadius: 21,
  },
  roomInputTextIncrement: {
    fontSize: 17,
    color: theme.colors.black,
    textAlign: "center",
    width: 25,
    height: 25,
    lineHeight: 25,
  },
  inputValue: {
    width: 30,
    textAlign: "center",
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.black,
  },

  travelSummaryCard: {
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: theme.colors.white,
    borderRadius: theme.radii.sm,
    borderWidth: 0.5,
    borderColor: theme.colors.grey300,
    padding: 15,
    marginBottom: theme.spacing.xl,
    gap: 15,
  },
  travelSummaryTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.black,
    marginBottom: theme.spacing.md,
  },
  dateSummaryGroup: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 15,
    marginLeft: theme.spacing.md,
  },
  dateSummaryTextGroup: {
    flexDirection: "column",
    justifyContent: "center",
    gap: 5,
  },
  dateSummaryText: {
    fontSize: 12,
    color: theme.colors.grey700,
  },
  dateSummaryString: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.black,
    fontWeight: theme.typography.fontWeight.bold,
  },
  dateSummaryDayName: {
    fontSize: 12,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.grey600,
  },
  wrapperRoomDetail: {
    flexDirection: "column",
    gap: theme.spacing.md,
  },
  groupRoomDetail: {
    flexDirection: "column",
    gap: 7,
  },
  noRoomSelectedText: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.grey500,
    textAlign: "center",
  },
  roomTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.black,
  },
  roomSequence: {
    fontSize: 15,
    color: theme.colors.black,
    fontWeight: theme.typography.fontWeight.bold,
  },
  roomPricing: {
    fontSize: 15,
    color: theme.colors.black,
    fontWeight: theme.typography.fontWeight.semibold,
    textAlign: "right",
  },

  groupTotalPrice: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalPriceText: {
    fontSize: 19,
    color: theme.colors.black,
    fontWeight: theme.typography.fontWeight.bold,
  },
  totalPriceValue: {
    fontSize: 21,
    color: theme.colors.black,
    fontWeight: theme.typography.fontWeight.bold,
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
  // "#f5c487ff" is a one-off lighter tint of the primary orange used only
  // for this disabled state — not in the consolidated palette
  // (docs/color-audit.md "Not consolidated"), kept as a literal.
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
  travelSummaryDisclaimer: {
    fontSize: 15,
    color: theme.colors.grey600,
    textAlign: "center",
    fontWeight: theme.typography.fontWeight.regular,
  },
});
