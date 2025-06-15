import { StyleSheet, Dimensions } from "react-native";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "flex-start",
  },
  menuContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: screenWidth * 0.8,
    backgroundColor: "#fff",
    padding: 20,
    elevation: 5,
    zIndex: 999,
    height: screenHeight,
  },
  menuBarClose: {
    left: 280,
    top: 40,
  },
  menuProfileParent: {
    flexDirection: "column",
    gap: 5,
    marginTop: 40,
    marginBottom: 20,
  },
  menuBarAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginBottom: 3,
  },
  menuUserName: {
    fontSize: 17,
    fontWeight: "bold",
  },
  menuUserEmail: {
    fontSize: 15,
    color: "#636060",
    fontWeight: "semibold",
  },
  menuDivider: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  menuParent: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: screenHeight * 0.7,
  },
  menuItemParent: {
    flexDirection: "column",
    gap: 33,
    marginTop: 23,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 19,
  },
  menuText: {
    fontSize: 20,
    fontWeight: "semibold",
  },
  loginButtonText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#FF8000",
  },
  topBarSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  locationText: {
    fontSize: 21,
    color: "#636060",
    fontWeight: "semibold",
  },
  avatarSectionWrapper: {
    // Tempatkan shadow di sini untuk memastikan bayangan terlihat
    shadowColor: "#000",
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
  welcomeSection: {
    flexDirection: "column",
    marginTop: 20,
    gap: 0,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: "semibold",
    color: "#636060",
  },
  welcomeSubtitle: {
    fontSize: 27,
    fontWeight: "bold",
  },
  searchSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    backgroundColor: "lightgrey",
    opacity: 0.7,
    paddingVertical: 17,
    paddingHorizontal: 21,
    borderRadius: 15,
  },
  searchInput: {
    flexDirection: "row",
    alignItems: "center",
    gap: 21,
  },
  searchText: {
    fontSize: 17,
    color: "#636060",
  },
  topDestinationSection: {
    marginTop: 30,
    flexDirection: "column",
    gap: 12,
  },
  topDestinationTitle: {
    fontSize: 27,
    fontWeight: "bold",
    color: "black",
  },
  topDestinationButtonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 11,
  },
  topDestinationButton: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E5E5E5",
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical: 13,
    paddingHorizontal: 19,
  },
  topDestinationButtonText: {
    fontSize: 17,
    color: "black",
    fontWeight: "regular",
  },
  topDestinationButtonSelected: {
    backgroundColor: "#FF8000",
    borderRadius: 15,
    paddingVertical: 13,
    paddingHorizontal: 19,
  },
  topDestinationButtonTextSelected: {
    fontSize: 17,
    color: "#FFFFFF",
    fontWeight: "regular",
  },
  topDestinationCardGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 11,
  },
  topDestinationCard: {
    width: 180,
    height: 220,
    position: "relative",
  },
  topDestinationCardImage: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  topDestinationCardTitle: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#FFFFFF",
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: "center",
  },
  topDestinationCardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Dark overlay
    borderRadius: 15,
  },
  recommendedSection: {
    flexDirection: "column",
    marginTop: 30,
    gap: 3,
  },
  recommendedTitle: {
    fontSize: 27,
    fontWeight: "bold",
    color: "black",
  },
  recommendedCardGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 11,
    marginTop: 10,
  },
  recommendedCard: {
    width: 270,
    height: 250,
    borderRadius: 15,
    padding: 14,
    backgroundColor: "#FFFFFF",
  },
  recommendedCardImage: {
    width: "100%",
    height: "60%",
    borderRadius: 15,
  },
  recommendedCardParent: {
    marginTop: 10,
    flexDirection: "column",
    gap: 9,
  },
  recommendedCardTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#263C54",
  },
  recommendedCardLocationParent: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 5,
  },
  recommendedCardLocation: {
    fontSize: 15,
    color: "black",
    fontWeight: "regular",
  },
  recommendedCardBottomParent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  recommendedCardPrice: {
    fontSize: 21,
    fontWeight: "semibold",
    color: "black",
  },
  recommendedCardRatingParent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,
  },
  recommendedCardRating: {
    fontSize: 19,
    color: "black",
    fontWeight: "regular",
  },
  skeletonItem: {
    width: 100,
    height: 40,
    borderRadius: 10,
    marginRight: 10,
  }
});