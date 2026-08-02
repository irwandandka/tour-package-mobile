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
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1000,
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
  },
  menuParent: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: screenHeight * 0.7,
  },
  menuItemParent: {
    flexDirection: "column",
    gap: 21,
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
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },

  searchInput: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  searchIcon: {
    marginRight: 10,
  },

  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },

  filterIcon: {
    marginLeft: 12,
  },

  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 15,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  resultsContainer: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 12,
    maxHeight: 300,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    zIndex: 1000,
  },
  resultItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  resultText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  resultSubText: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
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
    backgroundColor: "rgba(0, 0, 0, 0.3)",
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
    width: 260,
    height: 300,
    borderRadius: 15,
    padding: 14,
    marginBottom: 20,
    backgroundColor: "#FFFFFF",

    shadowColor: "#000",
    shadowOffset: { width: 2, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  imageShadowWrapper: {
    height: "60%",
    borderRadius: 12,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 6,
    elevation: 6,
  },

  imageClip: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  recommendedCardImageWrapper: {
    borderRadius: 15,
    overflow: "hidden",
    flex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  recommendedCardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  recommendedCardParent: {
    marginTop: 10,
    flex: 1,
    flexDirection: "column",
    justifyContent: 'space-between',
  },
  recommendedCardTitle: {
    fontSize: 18,
    fontWeight: "800",
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
    fontSize: 17,
    fontWeight: "600",
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