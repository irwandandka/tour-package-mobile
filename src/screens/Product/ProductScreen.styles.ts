import { StyleSheet } from "react-native";

const COLORS = {
  primary: "#3A5694",
  orange: "#FF8000",
  white: "#FFFFFF",
  black: "#000000",
  lightGray: "#F5F5F5",
  gray: "#8A8A8A",
  darkGray: "#333333",
  yellow: "#FBBC04",
  red: "#EF4444",
};

export default StyleSheet.create({
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 350,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 16,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 8,
    borderRadius: 20,
  },
  container: {
    padding: 16,
    paddingBottom: 100,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.darkGray,
    marginBottom: 8,
  },
  locationParent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  locationTitle: {
    fontSize: 15,
    color: COLORS.gray,
  },

  panelSection: {
    flexDirection: "row",
    gap: 24,
    marginTop: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
  },
  panelButton: {
    paddingBottom: 12,
    position: "relative",
  },
  panelText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.gray,
  },
  panelTextActive: {
    color: COLORS.primary,
  },
  activeIndicator: {
    height: 3,
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    position: "absolute",
    bottom: -1,
    left: 0,
    right: 0,
  },

  generalSection: {
    paddingTop: 24,
    gap: 24,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: COLORS.lightGray,
    padding: 16,
    borderRadius: 12,
  },
  infoBox: {
    alignItems: "center",
    gap: 8,
  },
  infoBoxTitle: {
    fontSize: 14,
    color: COLORS.gray,
  },
  infoBoxValue: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  infoBoxText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.darkGray,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.darkGray,
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.darkGray,
    textAlign: "justify",
  },
  readMoreText: {
    fontSize: 15,
    color: COLORS.primary,
    fontWeight: "700",
    marginTop: 4,
  },

  itineraryContainer: {
    paddingTop: 24,
    gap: 16,
  },
  itineraryCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  itineraryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.lightGray,
  },
  itineraryDayTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.darkGray,
  },
  itineraryContentWrapper: {
    padding: 16,
    flexDirection: "row",
    gap: 16,
  },
  timeline: {
    alignItems: "center",
  },
  timelineDot: {},
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: COLORS.primary,
  },
  timelineContent: {
    flex: 1,
    gap: 8,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.darkGray,
  },
  timelineDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.gray,
    textAlign: "justify",
  },
  timelineFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  timelineTime: {
    fontSize: 14,
    color: COLORS.gray,
    fontWeight: "500",
  },
  showMapText: {
    fontSize: 14,
    color: COLORS.red,
    fontWeight: "700",
  },

  reviewSection: {
    paddingTop: 24,
    gap: 16,
  },
  reviewCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  reviewCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reviewDate: {
    fontSize: 13,
    color: COLORS.gray,
  },
  reviewComment: {
    fontSize: 15,
    fontStyle: "italic",
    lineHeight: 22,
    color: COLORS.darkGray,
  },
  reviewUserInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: "#EAEAEA",
    paddingTop: 12,
    marginTop: 4,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  reviewName: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.darkGray,
  },
  reviewEmail: {
    fontSize: 13,
    color: COLORS.gray,
  },

  floatingBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: "#EAEAEA",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  priceLabel: {
    fontSize: 14,
    color: COLORS.gray,
  },
  priceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  bookNowButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  bookNowButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },

  modalContainer: {/* ... ... */},
  mapContainer: {/* ... ... */},
  closeButton: {/* ... ... */},

  ratingDurationContainer: {
    flexDirection: "row",

    justifyContent: "flex-start",

    alignItems: "center",

    marginTop: 20,

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

    color: "black",
  },

  generalSectionText: {
    fontSize: 19,

    color: "#666",

    textAlign: "right",

    fontWeight: "bold",

    marginTop: 5,
  },

  generalDurationText: {
    fontSize: 19,

    width: "65%",

    color: "black",

    fontWeight: "500",

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

    marginTop: 20,
  },

  generalDescriptionTitle: {
    fontSize: 21,

    fontWeight: "bold",

    color: "black",
  },

  generalDescriptionText: {
    fontSize: 15,

    textAlign: "justify",
  },

  generalDescriptionReadMore: {
    fontSize: 15,

    color: "#EF4444",

    fontWeight: "700",
  },
});
