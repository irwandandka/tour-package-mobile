import { StyleSheet } from "react-native";
import { theme } from "@shared/constants/theme";

/**
 * Migrated with theme tokens. Also drops 11 style keys that were dead code
 * (defined, never referenced by any of the 4 section components or this
 * file): panelButton, activeIndicator, infoContainer, infoBox,
 * infoBoxTitle, infoBoxValue, infoBoxText, descriptionTitle,
 * descriptionText, readMoreText, showMapText.
 */
export default StyleSheet.create({
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 350,
    borderBottomLeftRadius: theme.radii.lg,
    borderBottomRightRadius: theme.radii.lg,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 16,
    backgroundColor: theme.colors.overlay,
    padding: theme.spacing.sm,
    borderRadius: theme.radii.xl,
  },
  container: {
    padding: 16,
    paddingBottom: 100,
  },
  title: {
    fontSize: 22,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.grey700,
    marginBottom: theme.spacing.sm,
  },
  locationParent: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  locationTitle: {
    fontSize: 15,
    color: theme.colors.grey500,
  },

  panelSection: {
    flexDirection: "row",
    gap: theme.spacing.xxl,
    marginTop: theme.spacing.xxl,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey200,
  },
  panelText: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.grey500,
  },
  panelTextActive: {
    color: theme.colors.secondary,
  },

  generalSection: {
    paddingTop: theme.spacing.xxl,
    gap: theme.spacing.xxl,
  },

  itineraryContainer: {
    paddingTop: theme.spacing.xxl,
    gap: theme.spacing.lg,
  },
  itineraryCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radii.md,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: theme.colors.grey200,
  },
  itineraryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: theme.colors.grey100,
  },
  itineraryDayTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.grey700,
  },
  itineraryContentWrapper: {
    padding: 16,
    flexDirection: "row",
    gap: theme.spacing.lg,
  },
  timeline: {
    alignItems: "center",
  },
  timelineDot: {},
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: theme.colors.secondary,
  },
  timelineContent: {
    flex: 1,
    gap: theme.spacing.sm,
  },
  timelineTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.grey700,
  },
  timelineDescription: {
    fontSize: theme.typography.fontSize.sm,
    lineHeight: 20,
    color: theme.colors.grey500,
    textAlign: "justify",
  },
  timelineFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing.sm,
  },
  timelineTime: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.grey500,
    fontWeight: theme.typography.fontWeight.medium,
  },

  reviewSection: {
    paddingTop: theme.spacing.xxl,
    gap: theme.spacing.lg,
  },
  reviewCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radii.md,
    padding: 16,
    gap: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.grey200,
  },
  reviewCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reviewDate: {
    fontSize: 13,
    color: theme.colors.grey500,
  },
  reviewComment: {
    fontSize: 15,
    fontStyle: "italic",
    lineHeight: 22,
    color: theme.colors.grey700,
  },
  reviewUserInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.grey200,
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.xxs,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  reviewName: {
    fontSize: 15,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.grey700,
  },
  reviewEmail: {
    fontSize: 13,
    color: theme.colors.grey500,
  },

  floatingBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.grey200,
    elevation: 10,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  priceLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.grey500,
  },
  priceText: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.secondary,
  },
  bookNowButton: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: 30,
    borderRadius: theme.radii.sm,
  },
  bookNowButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
  },

  // Empty stubs, preserved as-is: the "show on map" modal they style is
  // reachable in code (ItinerarySection renders it) but its only trigger
  // is a commented-out button, so it's practically unreachable today.
  // Filling in real styling for a disabled feature is out of scope here.
  modalContainer: {},
  mapContainer: {},
  closeButton: {},

  ratingDurationContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: theme.spacing.xl,
    gap: 29,
  },
  generalSubSection: {
    flexDirection: "column",
    width: "21%",
    height: 70,
    justifyContent: "space-between",
  },
  generalSubSectionIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 9,
  },
  generalSubSectionText: {
    fontSize: 23,
    color: theme.colors.black,
  },
  generalSectionText: {
    fontSize: 19,
    color: theme.colors.grey600,
    textAlign: "right",
    fontWeight: theme.typography.fontWeight.bold,
    marginTop: 5,
  },
  generalDurationText: {
    fontSize: 19,
    width: "65%",
    color: theme.colors.black,
    fontWeight: theme.typography.fontWeight.medium,
    textAlign: "right",
  },
  generalSubSectionDuration: {
    flexDirection: "column",
    width: "27%",
    justifyContent: "space-between",
  },
  generalDescriptionSection: {
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 13,
    marginTop: theme.spacing.xl,
  },
  generalDescriptionTitle: {
    fontSize: 21,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.black,
  },
  generalDescriptionText: {
    fontSize: 15,
    textAlign: "justify",
  },
  generalDescriptionReadMore: {
    fontSize: 15,
    color: theme.colors.error,
    fontWeight: theme.typography.fontWeight.bold,
  },
});
